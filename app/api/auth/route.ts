import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import bcrypt from 'bcrypt'
import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set')
}

export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email}
    `

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const user = result.rows[0]
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Create a JWT token
    const token = await new SignJWT({ 
      userId: user.id, 
      userType: user.user_type 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(JWT_SECRET))

    const response = NextResponse.json({ 
      message: 'Login successful',
      userType: user.user_type,
    })

    // Set httpOnly cookie
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7200 // 2 hours
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

