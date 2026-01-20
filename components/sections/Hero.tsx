import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image - The Guided Hand */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-guided-hand.jpg"
          alt="Therapist gently guiding a child's hand - ABA therapy in action"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />

        {/* Dark gradient overlay - darker on left for text, lighter on right for image */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(
              to right,
              rgba(26, 46, 68, 0.9) 0%,
              rgba(26, 46, 68, 0.75) 35%,
              rgba(26, 46, 68, 0.5) 60%,
              rgba(26, 46, 68, 0.3) 100%
            )`
          }}
        />

        {/* Subtle starlight/guidance glow overlay in upper right */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 80% 25%, rgba(255, 255, 255, 0.12) 0%, transparent 40%),
              radial-gradient(circle at 85% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 12%)
            `
          }}
        />
      </div>

      {/* Content - LEFT ALIGNED */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Small accent - DE-EMPHASIZED per client feedback */}
          <div className="flex items-center gap-3 mb-4 opacity-70">
            <div className="w-8 h-0.5 bg-orange-500" />
            <span className="text-white/70 text-xs uppercase tracking-[0.2em]">
              Guiding ABA Careers Forward
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Your North Star for Pathways to Better Outcomes
          </h1>

          {/* Subheadline - SHORTENED per client feedback */}
          <p className="text-base md:text-lg text-white/75 mb-8 max-w-xl leading-relaxed">
            Helping ABA clinics build stable teams—and BCBAs and RBTs find careers where they thrive.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/facilities"
              className="text-center bg-orange-500 text-white px-8 py-4 rounded-full font-semibold uppercase tracking-wide hover:bg-orange-600 transition-colors text-sm"
            >
              Hire ABA Talent
            </Link>
            <Link
              href="/clinicians"
              className="text-center bg-white text-orange-500 px-8 py-4 rounded-full font-semibold uppercase tracking-wide hover:bg-gray-100 transition-colors text-sm"
            >
              Find ABA Jobs
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
