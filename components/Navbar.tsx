'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="AJB Poultry Farm Logo"
                  width={80}
                  height={80}
                  style={{ height: 'auto',width:'auto' }}
                  className="mr-2"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="border-white text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/about" className="border-transparent text-indigo-200 hover:text-white hover:border-indigo-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                About
              </Link>
              <Link href="/services" className="border-transparent text-indigo-200 hover:text-white hover:border-indigo-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Services
              </Link>
              <Link href="/contact" className="border-transparent text-indigo-200 hover:text-white hover:border-indigo-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link href="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Login
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/" className="bg-indigo-700 text-white block pl-3 pr-4 py-2 border-l-4 border-white text-base font-medium">
            Home
          </Link>
          <Link href="/about" className="text-indigo-200 hover:text-white hover:bg-indigo-700 hover:border-indigo-300 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">
            About
          </Link>
          <Link href="/services" className="text-indigo-200 hover:text-white hover:bg-indigo-700 hover:border-indigo-300 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">
            Services
          </Link>
          <Link href="/contact" className="text-indigo-200 hover:text-white hover:bg-indigo-700 hover:border-indigo-300 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">
            Contact
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="mt-3 space-y-1">
            <Link href="/login" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

