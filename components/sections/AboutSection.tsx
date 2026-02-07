import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-orange-500" />
              <span className="text-gray-600 text-sm font-medium">Who We Are</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About Polaris Pathways
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                ABA work is a journey — for organizations, for professionals, and for the families they serve. Growth is rarely linear. Burnout is real. Hiring is hard. And finding the right fit can feel overwhelming on both sides.
              </p>
              <p>
                Polaris Pathways exists to bring clarity, direction, and stability to that journey. We help ABA organizations build strong, sustainable teams. We help BCBAs and RBTs find roles where they can grow, stay, and thrive.
              </p>

              {/* Optional: make this feel more “designed” */}
              <p className="font-medium text-gray-900 border-l-2 border-orange-500 pl-4">
                We believe when people feel supported and aligned, everyone moves forward together.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:col-span-7">
            <div className="aspect-square sm:aspect-[4/3] lg:aspect-[16/10] xl:aspect-[3/2] rounded-lg overflow-hidden shadow-md ring-1 ring-black/5">
              <Image
                src="/images/about.jpg"
                alt="ABA therapists working with children in a play-based learning environment"
                fill
                className="object-cover object-[50%_58%] sm:object-[50%_42%] lg:object-[50%_68%] xl:object-[50%_66%]"
                quality={85}
                priority={false}
              />
            </div>

            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-500/10 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
