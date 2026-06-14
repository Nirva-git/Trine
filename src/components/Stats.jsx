import './Stats.css'

const stats = [
  {
    value: '1 CR+',
    label: 'Sq. Ft. Successfully Executed',
  },
  {
    value: '50+',
    label: "Completed Project Till March'26",
  },
  {
    value: '12+',
    label: 'Ongoing Projects With 40 Lacs Sq. Ft. Area',
  },
  {
    value: '250+',
    label: 'Technical And Skilled Professionals',
  },
]

export default function Stats() {
  return (
    <section className="stats" id="strength">
      <div className="container stats-grid">
        {stats.map((item, index) => (
          <div key={item.value} className="stat-item">
            {index > 0 && <span className="stat-divider" aria-hidden="true" />}
            <p className="stat-value">{item.value}</p>
            <p className="stat-label">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
