import { Star, Quote } from 'lucide-react'

export default function SocialProof() {
  const testimonials = [
    {
      name: 'Natoya E.',
      role: 'BCBA',
      content: 'Polaris helped me land a BCBA role with a fantastic company. They understood my priorities and worked with me each step of the way. I couldn\'t be happier with their level of professionalism and communication.',
      rating: 5
    },
    {
      name: 'Emily S.',
      role: 'RBT',
      content: 'As an RBT, it\'s rare to feel truly seen in the job search process, but Polaris changed that for me. They checked in constantly, prepped me before interviews, and made sure the offer fit my long-term goals.',
      rating: 5
    },
    {
      name: 'Jennifer L.',
      role: 'Clinical Director',
      content: 'Partnering with Polaris Pathways means we can rely on them before, during, and after a search. Our staffing has never been more stable.',
      rating: 5
    }
  ]

  const stats = [
    { value: 'Clinical-First', label: 'Vetting with BCBA Oversight' },
    { value: 'Culture-Fit', label: 'Aligned Placements' },
    { value: 'Long-Term', label: 'Retention Focus' }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        {/* Section Title with orange accent */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-0.5 bg-orange-500" />
            <span className="text-gray-600 text-sm font-medium">Testimonials</span>
            <div className="w-10 h-0.5 bg-orange-500" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by ABA clinics and behavioral health providers nationwide
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-orange-500/20" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-orange-500 fill-orange-500" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-gray-100 pt-4">
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-orange-500 font-medium">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-navy-800 rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="relative">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70">
                  {stat.label}
                </div>
                {index < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
