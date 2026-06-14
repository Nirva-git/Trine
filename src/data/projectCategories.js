export const PROJECT_CATEGORIES = [
  {
    slug: 'residential',
    label: 'Residential',
    description:
      'At Trine, we aim to provide you with the lifestyle you deserve. With the best layouts, our homes help you to connect between comfort and luxury. Enriched with the best amenities and services, we offer you homes that are truly meant for you.',
    heroImage:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&h=600&fit=crop&q=80',
    projects: [
      {
        name: 'The North',
        image:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&h=500&fit=crop&q=80',
      },
      {
        name: 'Palash homes',
        image:
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&h=500&fit=crop&q=80',
      },
      {
        name: 'Serene Elegancy',
        image:
          'https://images.unsplash.com/photo-1511818966892-93c6900aeffe?w=700&h=500&fit=crop&q=80',
      },
    ],
  },
  {
    slug: 'commercial',
    label: 'Commercial',
    description:
      'We thoroughly ensure that your work-place gets the best out of you. From ideation to creation, our locations and structures offer efficient workspaces that make sure productivity and convenience all at the same place.',
    heroImage:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=600&fit=crop&q=80',
    projects: [
      {
        name: 'Shivam Trade Center',
        image:
          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&h=500&fit=crop&q=80',
      },
      {
        name: 'Sun South Trade',
        image:
          'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&h=500&fit=crop&q=80',
      },
      {
        name: 'Sun Orbit',
        image:
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&h=500&fit=crop&q=80',
      },
    ],
  },
  {
    slug: 'institutional',
    label: 'Institutional',
    description:
      'We build educational and institutional spaces that inspire learning and growth. Our expertise spans campuses, schools, and universities — delivering structures that meet the highest standards of safety, functionality, and design.',
    heroImage:
      'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=600&fit=crop&q=80',
    projects: [
      {
        name: 'Nirma University',
        image:
          'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&h=500&fit=crop&q=80',
      },
      {
        name: 'Nirma Vidhyavihar – Bodakdev',
        image:
          'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&h=500&fit=crop&q=80',
      },
      {
        name: 'Nirma Vidhyavihar – Chharodi',
        image:
          'https://images.unsplash.com/photo-1562774053-701939374585?w=700&h=500&fit=crop&q=80',
      },
    ],
  },
  {
    slug: 'hospitality',
    label: 'Hospitality',
    description:
      "We thrive to build various projects, including extensive range of services to provide world-class luxury hotels and resorts. We have earned our reputation as a leading hospitality builder by viewing our projects through the owner's eyes.",
    heroImage:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&h=500&fit=crop&q=80',
    projects: [
      {
        name: 'Karnavati Club & Resorts',
        image:
          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&h=500&fit=crop&q=80',
      },
      {
        name: 'Hotel Kristar',
        image:
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&h=500&fit=crop&q=80',
      },
    ],
  },
  {
    slug: 'industrial',
    label: 'Industrial',
    description:
      'We leverage latest technology and standard industry-leading operating procedures to produce timely results that maximize your production with efficiency.',
    heroImage:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&h=600&fit=crop&q=80',
    projects: [
      {
        name: 'IGR Ausom Refinery',
        image:
          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&h=500&fit=crop&q=80',
      },
      {
        name: 'Sun Mark Stainless Steel Factory',
        image:
          'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&h=500&fit=crop&q=80',
      },
    ],
  },
  {
    slug: 'individual-houses',
    label: 'Individual Houses',
    description:
      'Every home tells a unique story. We craft bespoke individual houses that reflect your vision, combining architectural excellence with personalized design to create spaces that are truly yours.',
    heroImage:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=600&fit=crop&q=80',
    projects: [
      {
        name: 'Bsafal House',
        image:
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&h=500&fit=crop&q=80',
      },
      {
        name: 'Khandwala House',
        image:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&h=500&fit=crop&q=80',
      },
      {
        name: 'Ratna Corporate House',
        image:
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&h=500&fit=crop&q=80',
      },
    ],
  },
]

export function getCategoryBySlug(slug) {
  return PROJECT_CATEGORIES.find((cat) => cat.slug === slug)
}
