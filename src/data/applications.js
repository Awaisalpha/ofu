// Ids run in order with no gaps, because new applications are numbered by count.
// Portfolio links are fictional.
export const applications = [
  // The demo student's own applications
  {
    id: 'app-1',
    opportunityId: 'opp-1',
    studentId: 'user-1',
    coverNote: 'I built three React projects during my degree and would love to grow as a frontend developer on your team.',
    portfolioUrl: 'https://hira-aslam.example.com',
    status: 'Submitted',
    appliedOffsetDays: -2,
  },
  {
    id: 'app-2',
    opportunityId: 'opp-8',
    studentId: 'user-1',
    coverNote: 'I run the social media pages for our university society and enjoy writing content.',
    portfolioUrl: '',
    status: 'Accepted',
    appliedOffsetDays: -6,
    decidedOffsetDays: -5,
  },
  {
    id: 'app-3',
    opportunityId: 'opp-10',
    studentId: 'user-1',
    coverNote: 'I am interested in learning how a large finance team works day to day.',
    portfolioUrl: '',
    status: 'Rejected',
    appliedOffsetDays: -20,
    decidedOffsetDays: -19,
  },

  // Other students applying to the demo alumnus's posts (opp-1 and opp-6)
  {
    id: 'app-4',
    opportunityId: 'opp-1',
    studentId: 'user-4',
    coverNote:
      'My final year project was a React dashboard for a local NGO that tracks food donations across Lahore. I built the whole frontend, from the component library to the charts, and worked with two backend developers on the API. I am comfortable with Git, code reviews and turning Figma designs into responsive pages, and I would love to keep doing that on a real product team.',
    portfolioUrl: 'https://usman-tariq.example.com',
    status: 'Submitted',
    appliedOffsetDays: -3,
  },
  {
    id: 'app-5',
    opportunityId: 'opp-6',
    studentId: 'user-5',
    coverNote: 'I have designed apps for two class projects in Figma and would like real-world experience.',
    portfolioUrl: 'https://mahnoor-designs.example.com',
    status: 'Submitted',
    appliedOffsetDays: -1,
  },

  // Applications to other alumni's posts
  {
    id: 'app-6',
    opportunityId: 'opp-9',
    studentId: 'user-7',
    coverNote: 'I completed an online networking and security course and play CTF competitions on weekends.',
    portfolioUrl: '',
    status: 'Accepted',
    appliedOffsetDays: -4,
    decidedOffsetDays: -3,
  },
  {
    id: 'app-7',
    opportunityId: 'opp-22',
    studentId: 'user-9',
    coverNote: 'Our team of three has already worked together on a traffic data project.',
    portfolioUrl: '',
    status: 'Submitted',
    appliedOffsetDays: -2,
  },

  // More applicants for the demo alumnus, so every status shows on the Applicants page
  {
    id: 'app-8',
    opportunityId: 'opp-1',
    studentId: 'user-7',
    coverNote: 'I have been building small React apps for two years and recently shipped a booking site for a local gym.',
    portfolioUrl: '',
    status: 'Accepted',
    appliedOffsetDays: -5,
    decidedOffsetDays: -4,
  },
  {
    id: 'app-9',
    opportunityId: 'opp-1',
    studentId: 'user-8',
    coverNote: 'I am a second year student who enjoys CSS and wants to learn how a real frontend team works.',
    portfolioUrl: '',
    status: 'Rejected',
    appliedOffsetDays: -4,
    decidedOffsetDays: -3,
  },
  {
    id: 'app-10',
    opportunityId: 'opp-6',
    studentId: 'user-9',
    coverNote:
      'I redesigned our department website as a class project and ran usability tests with ten students. The feedback changed the navigation completely, which taught me to test early. I would love to bring that habit to real client work at your studio.',
    portfolioUrl: 'https://ayesha-nadeem.example.com',
    status: 'Accepted',
    appliedOffsetDays: -3,
    decidedOffsetDays: -2,
  },
  {
    id: 'app-11',
    opportunityId: 'opp-6',
    studentId: 'user-13',
    coverNote: 'I am new to design but I learn quickly and have finished an online Figma course.',
    portfolioUrl: '',
    status: 'Rejected',
    appliedOffsetDays: -2,
    decidedOffsetDays: -1,
  },
]
