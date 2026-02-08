import { Compass, Users, TrendingUp } from 'lucide-react'

export default function ThreePillars() {
  const pillars = [
    {
      icon: Compass,
      title: 'Guided Careers',
      description: 'We help clinicians move forward with clarity, confidence, and long-term growth never just a quick placement.'
    },
    {
      icon: Users,
      title: 'Stable Teams',
      description: 'We help clinics reduce burnout, turnover, and disruption with clinically aligned, culture-fit staffing.'
    },
    {
      icon: TrendingUp,
      title: 'Better Outcomes',
      description: 'When teams are stable and people are well placed, children progress, families trust, and organizations thrive.'
    }
  ]

  return (
    <section id="three-pillars" className="py-20 hero-gradient">
      <div className="container-custom">
        {/* Title with dotted accent */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            The Polaris Pillars
          </h2>
          {/* Orange dotted accent */}
          <div className="flex items-center justify-center gap-1 mt-3">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <div className="w-8 h-0.5 bg-orange-500 ml-1" />
          </div>
        </div>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-orange-500" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
