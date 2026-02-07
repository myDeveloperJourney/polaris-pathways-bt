import Link from 'next/link'
import { Star, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-white">
      {/* Partner Logos Section */}
      <div className="container-custom py-12 border-b border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <span className="text-white/60 text-sm font-medium">Join us in supporting</span>
          <div className="flex items-center gap-8 opacity-60">
            <span className="text-white font-medium">Partner Organizations</span>
            <span className="text-white font-medium">ABA Clinics</span>
            <span className="text-white font-medium">Behavioral Health</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* <Star className="w-6 h-6 text-orange-500 fill-orange-500" /> */}
              <span className="text-lg font-semibold uppercase tracking-wide">Polaris Pathways</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Your North Star for Pathways to Better Outcomes. Guiding ABA clinics and professionals toward stable, growth-focused partnerships.
            </p>
          </div>

          {/* Job Seekers */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">Job Seekers</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/clinicians" className="text-white/60 hover:text-orange-400 transition-colors text-sm">
                Find ABA Jobs
              </Link>
              <Link href="/clinicians" className="text-white/60 hover:text-orange-400 transition-colors text-sm">
                BCBA Opportunities
              </Link>
              <Link href="/clinicians" className="text-white/60 hover:text-orange-400 transition-colors text-sm">
                RBT Positions
              </Link>
            </nav>
          </div>

          {/* Employers */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">Employers</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/facilities" className="text-white/60 hover:text-orange-400 transition-colors text-sm">
                Hire ABA Talent
              </Link>
              <Link href="#about" className="text-white/60 hover:text-orange-400 transition-colors text-sm">
                Our Approach
              </Link>
              <Link href="/facilities" className="text-white/60 hover:text-orange-400 transition-colors text-sm">
                Staffing Solutions
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">Company</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#about" className="text-white/60 hover:text-orange-400 transition-colors text-sm">
                Our Story
              </Link>
              <Link href="/privacy" className="text-white/60 hover:text-orange-400 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-orange-400 transition-colors text-sm">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-custom py-6 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-white/60 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <span className="text-white/30">|</span>
            <span className="text-white/60 text-sm">
              Polaris Pathways © 2025
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
