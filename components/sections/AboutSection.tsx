import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Section label with orange accent */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-orange-500" />
              <span className="text-gray-600 text-sm font-medium">Know Who We Are</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About our company
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                ABA work is a journey for clinics, for clinicians, and for the families they serve. Growth is rarely linear. Burnout is real. Hiring is hard. And finding the right fit can feel overwhelming on both sides.
              </p>
              <p>
                Polaris Pathways Behavioral Talent exists to bring clarity, direction, and stability to that journey. We guide ABA clinics toward strong, sustainable teams. We guide BCBAs and RBTs toward careers where they can grow, stay, and thrive.
              </p>
              <p className="font-medium text-gray-800">
                We believe when people feel supported and aligned, better outcomes follow.
              </p>
            </div>
          </div>

          {/* Right Image - ABA Therapy specific */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/about-aba-therapy.jpg"
                alt="BCBA working with a child during an ABA therapy session"
                fill
                className="object-cover"
                quality={85}
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-500/10 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
