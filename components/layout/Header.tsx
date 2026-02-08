'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Star } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-800">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="text-lg font-semibold text-white uppercase tracking-wide leading-tight">
              Polaris Pathways
            </span>
            <span className="text-[10px] font-medium text-white/70 uppercase tracking-[0.15em] pl-2">
              Behavioral Talent
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-orange-400 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="#about"
              className="text-white hover:text-orange-400 font-medium transition-colors"
            >
              Our Story
            </Link>
            <Link
              href="/facilities"
              className="text-white hover:text-orange-400 font-medium transition-colors"
            >
              Employers
            </Link>
            <Link
              href="/clinicians"
              className="text-white hover:text-orange-400 font-medium transition-colors"
            >
              Job Seekers
            </Link>
            {/* <Link
              href="/clinicians"
              className="text-white hover:text-orange-400 font-medium transition-colors flex items-center gap-2"
            >
              View Jobs
              <span className="bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                +
              </span>
            </Link> */}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-navy-800 border-t border-white/10 shadow-lg">
            <nav className="flex flex-col p-4 space-y-4">
              <Link
                href="/"
                className="text-white hover:text-orange-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-white hover:text-orange-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Story
              </Link>
              <Link
                href="/facilities"
                className="text-white hover:text-orange-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Employers
              </Link>
              <Link
                href="/clinicians"
                className="text-white hover:text-orange-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Job Seekers
              </Link>
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                <Link
                  href="/clinicians"
                  className="btn-orange text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Find ABA Jobs
                </Link>
                <Link
                  href="/facilities"
                  className="btn-outline-light text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hire ABA Talent
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
