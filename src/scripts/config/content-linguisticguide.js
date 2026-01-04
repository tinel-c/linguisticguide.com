/**
 * Content Configuration - LinguisticGuide.com
 * Updated with actual content from existing site
 */

export const siteConfig = {
  // Site Metadata
  siteName: 'Linguistic Guide',
  tagline: 'Technical translations from German and English into Romanian',
  description: '10 years of experience and over 3 million words translated and revised',
  email: 'monica.vlad@linguisticguide.com',

  // Hero Section
  hero: {
    title: ['Monica Vlad', 'Professional Technical Translator'],
    subtitle: '10 years of experience and over 3 million words translated and revised',
    description: 'Technical translations from German and English into Romanian',
    primaryCTA: 'About Me',
    secondaryCTA: 'Get Started'
  },

  // About Section
  about: {
    subtitle: 'About Me',
    title: 'Professional Technical Translation Services',
    description: [
      'With over 10 years of experience in professional technical translation, I specialize in delivering accurate translations from German and English into Romanian.',
      'Having translated and revised over 3 million words, I bring meticulous attention to detail and deep technical expertise to every project.'
    ],
    stats: [
      { number: 3000000, label: 'Words Translated' },
      { number: 10, label: 'Years Experience' },
      { number: 2, label: 'Language Pairs' }
    ],
    credentials: [
      'Specialized in Technical Translations',
      'German to Romanian Translation',
      'English to Romanian Translation',
      'Over 10 years of professional experience',
      'More than 3 million words translated and revised'
    ]
  },

  // Services
  services: [
    {
      id: 'technical',
      title: 'Technical Translation',
      description: 'Specialized translation of technical documentation, manuals, and specifications from German and English into Romanian.',
      icon: 'document'
    },
    {
      id: 'german-romanian',
      title: 'German to Romanian',
      description: 'Professional translation services from German to Romanian with native-level accuracy and technical precision.',
      icon: 'language'
    },
    {
      id: 'english-romanian',
      title: 'English to Romanian',
      description: 'Expert English to Romanian translation for technical documents, business communications, and specialized content.',
      icon: 'globe'
    },
    {
      id: 'revision',
      title: 'Translation Revision',
      description: 'Professional revision and quality assurance of existing translations to ensure accuracy and consistency.',
      icon: 'check'
    },
    {
      id: 'automotive',
      title: 'Automotive Industry',
      description: 'Specialized knowledge in automotive terminology and technical documentation translation.',
      icon: 'car'
    },
    {
      id: 'industrial',
      title: 'Industrial & Engineering',
      description: 'Translation of industrial, engineering, and manufacturing documentation with technical precision.',
      icon: 'tools'
    }
  ],

  // Industries & Specializations
  industries: [
    { icon: '🚗', label: 'Automotive' },
    { icon: '🏭', label: 'Industrial' },
    { icon: '🔧', label: 'Engineering' },
    { icon: '⚙️', label: 'Manufacturing' },
    { icon: '💼', label: 'Business' },
    { icon: '📄', label: 'Documentation' }
  ],

  // Testimonials (Placeholder - update with real testimonials if available)
  testimonials: [
    {
      rating: 5,
      text: 'Outstanding quality and attention to detail. The technical translation was accurate and delivered on time.',
      author: 'Client Name',
      position: 'Position, Company'
    }
  ],

  // Process Steps
  process: [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'We discuss your project requirements, technical specifications, timeline, and specific terminology needs.'
    },
    {
      number: '02',
      title: 'Analysis & Preparation',
      description: 'I review the source material, research terminology, and prepare glossaries specific to your industry.'
    },
    {
      number: '03',
      title: 'Translation',
      description: 'Careful translation preserving technical accuracy and meaning while maintaining natural Romanian language flow.'
    },
    {
      number: '04',
      title: 'Quality Assurance',
      description: 'Thorough revision and quality checks to ensure technical accuracy and linguistic quality.'
    },
    {
      number: '05',
      title: 'Delivery & Support',
      description: 'Final delivery in your preferred format with ongoing support for any questions or clarifications.'
    }
  ],

  // Contact Info
  contact: {
    title: 'I AM ACCEPTING NEW PROJECTS',
    description: 'Please contact us for any questions regarding our services. References and free of charge translation tests are available upon request.',
    email: 'monica.vlad@linguisticguide.com',
    responseTime: 'Within 24 hours',
    workingHours: 'Monday - Friday, 9AM - 6PM (Bucharest Time)'
  },

  // Social Links
  social: {
    proz: 'https://www.proz.com/feedback-card/638170?text=Monica%20Vlad%20%7C%20Feedback%20card',
    linkedin: 'https://www.linkedin.com/in/monica-vlad-1300185/',
    xing: 'https://www.xing.com/'
  }
};

export default siteConfig;
