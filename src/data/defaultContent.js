const asset = (path) => encodeURI(path)

export const DEFAULT_CONTENT = {
  site: {
    contactTitle: "Let's Get In Touch!!",
    contactSubtitle: "We Won't Spam You Paaaaaka!!",
    careersTitle: 'Looking For A Job',
    careersSubtitle: 'We Have Something For Everyone!!',
    companyEmail: 'info@trineprojects.com',
  },
  clients: [
    ['Goyal & Co.', '/clients/GOYAL&CO. B&W.png', '/clients/colored/GOYAL&CO. COLOR.png'],
    ['KIFS', '/clients/KIFS B&W.png', '/clients/colored/KIFS COLOR.png'],
    ['Sheetal Infrastructure', '/clients/SHEETAL B&W.png', '/clients/colored/SHEETAL INFA. COLOR.png'],
    ['Ratna', '/clients/RATNA B&W.png', '/clients/colored/RATNA COLOR.png'],
    ['United Buildcon', '/clients/UNITED BUILDCON B&W.png', '/clients/colored/UNITED BUILDCON COLOR.png'],
    ['Shilp', '/clients/SHILP B&W.png', '/clients/colored/SHILP COLOR.png'],
    ['Sun', '/clients/SUN B&W.png', '/clients/colored/SUN COLOR.png'],
    ['Savvy', '/clients/SAVVY B&W.png', '/clients/colored/SAVVY COLOR.png'],
    ['Zaveri Realty', '/clients/ZAVERI B&W.png', '/clients/colored/ZAVERI COLOR.png'],
    ['AAA Realty', '/clients/AAA B&W.png', '/clients/colored/AAA REALITY COLOR.png'],
    ['True Value', '/clients/TRUE VALUE B&W.png', '/clients/colored/TRUE VALUE COLOR.png'],
  ].map(([name, bw, color], index) => ({
    id: `client-${index + 1}`,
    name,
    bw: asset(bw),
    color: asset(color),
  })),
  projectCategories: [
    {
      id: 'category-commercial',
      slug: 'commercial',
      label: 'Commercial',
      description: 'From ideation to creation, our locations and structures offer efficient workspaces that combine productivity and convenience.',
      heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=600&fit=crop&q=80',
      projects: [
        ['Shivam Trade Center', 'Commercial @Ahmedabad', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&h=900&fit=crop&q=80'],
        ['Sun South Trade', 'Commercial @Ahmedabad', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&h=900&fit=crop&q=80'],
        ['Sun Orbit', 'Commercial @Ahmedabad', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&h=900&fit=crop&q=80'],
      ],
    },
    {
      id: 'category-residential',
      slug: 'residential',
      label: 'Residential',
      description: 'At Trine, we aim to provide you with the lifestyle you deserve. With the best layouts, our homes connect comfort and luxury.',
      heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&h=600&fit=crop&q=80',
      projects: [
        ['The North', 'Residential @Ahmedabad', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&h=900&fit=crop&q=80'],
        ['Palash Homes', 'Residential @Ahmedabad', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&h=900&fit=crop&q=80'],
        ['Serene Elegancy', 'Residential @Ahmedabad', 'https://images.unsplash.com/photo-1511818966892-93c6900aeffe?w=700&h=900&fit=crop&q=80'],
      ],
    },
    {
      id: 'category-individual-houses',
      slug: 'individual-houses',
      label: 'Individual Houses',
      description: 'We craft individual houses that reflect each client’s vision through thoughtful planning and construction.',
      heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=600&fit=crop&q=80',
      projects: [
        ['Bsafal House', 'Individual House @Ahmedabad', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&h=900&fit=crop&q=80'],
        ['Khandwala House', 'Individual House @Ahmedabad', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&h=900&fit=crop&q=80'],
      ],
    },
    {
      id: 'category-institutional',
      slug: 'institutional',
      label: 'Institutional',
      description: 'We build educational and institutional spaces that inspire learning and growth while meeting high standards of safety and design.',
      heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=600&fit=crop&q=80',
      projects: [
        ['Nirma University', 'Institutional @Ahmedabad', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&h=900&fit=crop&q=80'],
        ['Nirma Vidhyavihar', 'Institutional @Ahmedabad', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&h=900&fit=crop&q=80'],
      ],
    },
    {
      id: 'category-industrial',
      slug: 'industrial',
      label: 'Industrial',
      description: 'We use modern technology and proven operating procedures to deliver efficient industrial facilities.',
      heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&h=600&fit=crop&q=80',
      projects: [
        ['IGR Ausom Refinery', 'Industrial @Gujarat', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&h=900&fit=crop&q=80'],
        ['Sun Mark Factory', 'Industrial @Gujarat', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&h=900&fit=crop&q=80'],
      ],
    },
    {
      id: 'category-hospitality',
      slug: 'hospitality',
      label: 'Hospitality',
      description: 'We deliver hotels and resorts with a focus on guest experience, operational detail and long-term quality.',
      heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&h=600&fit=crop&q=80',
      projects: [
        ['Karnavati Club & Resorts', 'Hospitality @Ahmedabad', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&h=900&fit=crop&q=80'],
        ['Hotel Kristar', 'Hospitality @Ahmedabad', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&h=900&fit=crop&q=80'],
      ],
    },
  ].map((category) => ({
    ...category,
    projects: category.projects.map(([name, location, image], index) => ({
      id: `${category.slug}-project-${index + 1}`,
      name,
      title: name,
      location,
      image,
    })),
  })),
  jobs: [
    'Sr. Civil Engineer',
    'Jr. Civil Engineer',
    'Jr. Billing Engineer',
    'Site Supervisor',
    'Safety Officer',
    'Quantity Surveyor',
  ].map((title, index) => ({ id: `job-${index + 1}`, title, image: '' })),
  machinery: [
    'Tower Crane',
    'Passenger Hoist',
    'Concrete Pump',
    'Bar Bending Machine',
  ].map((title, index) => ({ id: `machine-${index + 1}`, title, image: '' })),
  leaders: [
    { id: 'leader-1', name: 'Mr. Tejash Shah', image: '', biography: 'Add the director biography from the admin panel.' },
    { id: 'leader-2', name: 'Mr. Pravin Patel', image: '', biography: 'Add the director biography from the admin panel.' },
  ],
  lifeEvents: [
    ['Food Distribution Day', '2021'],
    ['Full Trine Family Dinner', '2021'],
    ['Box Cricket Tournament', '2021'],
    ['Trine Mehfil - Diwali Event', '2025'],
  ].map(([title, year], index) => ({ id: `event-${index + 1}`, title, year, image: '' })),
  services: {
    civilTitle: 'Civil Constructions',
    civilDescription: 'We have years of experience in performing all types of civil construction work, right from excavation to finishing with external development.',
    civilImage: '',
    turnkeyTitle: 'Turnkey Project Services',
    turnkeyDescription: 'We execute turnkey projects from the initial stage to final handover with transparency, efficiency and strong ethics.',
    turnkeyImage: '',
    coreTitle: 'Core Values',
    coreDescription: 'We care about our clients, exceed their needs and continuously pursue excellence.',
    coreImage: '',
    activities: ['Earth Work', 'Trimix Work', 'Piling', 'RCC Work', 'Rendering Work', 'Masonry', 'All Type of Fishing', 'Painting Work', 'Fabrication', 'Electric Work']
      .map((title, index) => ({ id: `activity-${index + 1}`, title, image: '' })),
    values: ['Quality Construction', 'Support', 'Client Satisfaction', 'Innovative Construction', 'Timeline Execution', 'Safety', 'Value Addition'],
  },
}

export function cloneDefaultContent() {
  return JSON.parse(JSON.stringify(DEFAULT_CONTENT))
}
