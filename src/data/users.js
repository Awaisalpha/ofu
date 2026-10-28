// The three people the "View as" switcher acts as.
export const CURRENT_STUDENT_ID = 'user-1'
export const CURRENT_ALUMNI_ID = 'user-2'
export const CURRENT_ADMIN_ID = 'user-3'

// All names and emails are fictional.
// The demo alumnus has an organisation, which pre-fills the Post opportunity form.
export const users = [
  { id: 'user-1', name: 'Hira Aslam', email: 'hira.aslam@example.com', role: 'student', isActive: true, joinedOffsetDays: -120 },
  { id: 'user-2', name: 'Bilal Rana', email: 'bilal.rana@example.com', role: 'alumni', organisation: 'Ravi Byte Labs', isActive: true, joinedOffsetDays: -300 },
  { id: 'user-3', name: 'Sana Iqbal', email: 'sana.iqbal@example.com', role: 'admin', isActive: true, joinedOffsetDays: -400 },
  { id: 'user-4', name: 'Usman Tariq', email: 'usman.tariq@example.com', role: 'student', isActive: true, joinedOffsetDays: -90 },
  { id: 'user-5', name: 'Mahnoor Sheikh', email: 'mahnoor.sheikh@example.com', role: 'student', isActive: true, joinedOffsetDays: -75 },
  { id: 'user-6', name: 'Ahmed Javed', email: 'ahmed.javed@example.com', role: 'student', isActive: false, joinedOffsetDays: -200 },
  { id: 'user-7', name: 'Zara Malik', email: 'zara.malik@example.com', role: 'student', isActive: true, joinedOffsetDays: -26 },
  { id: 'user-8', name: 'Hamza Qureshi', email: 'hamza.qureshi@example.com', role: 'student', isActive: true, joinedOffsetDays: -13 },
  { id: 'user-9', name: 'Ayesha Nadeem', email: 'ayesha.nadeem@example.com', role: 'student', isActive: true, joinedOffsetDays: -9 },
  { id: 'user-10', name: 'Faisal Butt', email: 'faisal.butt@example.com', role: 'alumni', isActive: true, joinedOffsetDays: -250 },
  { id: 'user-11', name: 'Nida Farooq', email: 'nida.farooq@example.com', role: 'alumni', isActive: true, joinedOffsetDays: -180 },
  { id: 'user-12', name: 'Kamran Haider', email: 'kamran.haider@example.com', role: 'alumni', isActive: false, joinedOffsetDays: -320 },
  { id: 'user-13', name: 'Rabia Anwar', email: 'rabia.anwar@example.com', role: 'student', isActive: true, joinedOffsetDays: -5 },

  // Students who joined during the last month, so the admin charts have a realistic shape
  { id: 'user-14', name: 'Areeba Khalid', email: 'areeba.khalid@example.com', role: 'student', isActive: true, joinedOffsetDays: -28 },
  { id: 'user-15', name: 'Saad Mehmood', email: 'saad.mehmood@example.com', role: 'student', isActive: true, joinedOffsetDays: -24 },
  { id: 'user-16', name: 'Iqra Shahid', email: 'iqra.shahid@example.com', role: 'student', isActive: true, joinedOffsetDays: -19 },
  { id: 'user-17', name: 'Taha Rizwan', email: 'taha.rizwan@example.com', role: 'student', isActive: true, joinedOffsetDays: -15 },
  { id: 'user-18', name: 'Komal Yousaf', email: 'komal.yousaf@example.com', role: 'student', isActive: true, joinedOffsetDays: -11 },
  { id: 'user-19', name: 'Danish Akram', email: 'danish.akram@example.com', role: 'student', isActive: true, joinedOffsetDays: -6 },
  { id: 'user-20', name: 'Maryam Zafar', email: 'maryam.zafar@example.com', role: 'student', isActive: true, joinedOffsetDays: -4 },
  { id: 'user-21', name: 'Hamid Latif', email: 'hamid.latif@example.com', role: 'student', isActive: true, joinedOffsetDays: -2 },
]
