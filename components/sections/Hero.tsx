import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image - Path to the North Star */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-woman-with-child.jpg"
          alt="Adult and child sitting together, looking at a starry sky with a bright North Star guiding the way - metaphor for Polaris Pathways guiding ABA careers"
          fill
          priority
          className="object-cover object-[25%_60%] md:object-[50%_50%]"
          quality={90}
        />

        {/* Dark gradient overlay - ensures text readability while preserving the star and figures */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(
              to right,
              rgba(15, 23, 42, 0.85) 0%,
              rgba(15, 23, 42, 0.7) 40%,
              rgba(15, 23, 42, 0.4) 70%,
              rgba(15, 23, 42, 0.2) 100%
            )`
          }}
        />

        {/* Subtle vertical gradient to darken bottom for grounding */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: `linear-gradient(
              to top,
              rgba(15, 23, 42, 0.5) 0%,
              transparent 30%
            )`
          }}
        />
      </div>

      {/* Content - LEFT ALIGNED */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Tagline - minimized per Mark's feedback */}
          <span className="text-white/50 text-xs uppercase tracking-[0.2em] mb-6 block">
            Guiding ABA Careers Forward
          </span>

          {/* Main Headline - Option 1 */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Your North Star in ABA Talent
          </h1>

          {/* Subheadline - single sentence, slightly reduced for image-forward feel */}
          <p className="text-sm md:text-base text-white/70 mb-8 max-w-lg leading-relaxed">
            Helping clinics build stable teams, and helping clinicians find roles where they thrive.
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
