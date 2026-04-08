/**
 * Seed script — run once to populate the database with test data.
 * Usage: npx ts-node -r tsconfig-paths/register src/seed.ts
 */

import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/school-admin';

// ─── Schemas ────────────────────────────────────────────────────────────────

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  avatar: String,
  role: String,
  permissions: [String],
  isActive: Boolean,
}, { timestamps: true });

const DepartmentSchema = new mongoose.Schema({
  departmentName: String,
  hodName: String,
  phone: String,
  email: String,
  studentCapacity: Number,
  establishedYear: Number,
  totalFaculty: Number,
  description: String,
  isActive: Boolean,
}, { timestamps: true });

const TeacherSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  img: String,
  name: String,
  email: String,
  dni: String,
  gender: String,
  mobile: String,
  departmentId: mongoose.Types.ObjectId,
  laboralDependency: String,
  salarialCategory: String,
  emergencyName: String,
  emergencyMobile: String,
  address: String,
  subjectSpecialization: String,
  experienceYears: Number,
  status: String,
  birthdate: Date,
  bio: String,
}, { timestamps: true });

const StudentSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  img: String,
  name: String,
  email: String,
  dni: String,
  gender: String,
  residenceZone: String,
  birthdate: Date,
  address: String,
  parentGuardianName: String,
  parentGuardianMobile: String,
  fatherName: String,
  fatherMobile: String,
  motherName: String,
  motherMobile: String,
  status: String,
}, { timestamps: true });

const CourseSchema = new mongoose.Schema({
  courseCode: String,
  courseName: String,
  description: String,
  departmentId: mongoose.Types.ObjectId,
  credits: Number,
  durationWeeks: Number,
  isElective: Boolean,
  status: String,
}, { timestamps: true });

const ClassSectionSchema = new mongoose.Schema({
  className: String,
  classCode: String,
  courseId: mongoose.Types.ObjectId,
  teacherId: mongoose.Types.ObjectId,
  startDate: Date,
  endDate: Date,
  roomNumber: String,
  schedule: String,
  semester: String,
  academicYear: String,
  classCapacity: Number,
  status: String,
  classType: String,
}, { timestamps: true });

const EnrollmentSchema = new mongoose.Schema({
  studentId: mongoose.Types.ObjectId,
  classSectionId: mongoose.Types.ObjectId,
  courseId: mongoose.Types.ObjectId,
  teacherId: mongoose.Types.ObjectId,
  academicYear: String,
  semester: String,
  enrolledAt: Date,
  grade: String,
  gradePoints: Number,
  status: String,
  notes: String,
}, { timestamps: true });

// ─── Models ─────────────────────────────────────────────────────────────────

const User       = mongoose.model('User',         UserSchema);
const Department = mongoose.model('Department',   DepartmentSchema);
const Teacher    = mongoose.model('Teacher',      TeacherSchema);
const Student    = mongoose.model('Student',      StudentSchema);
const Course     = mongoose.model('Course',       CourseSchema);
const ClassSection = mongoose.model('ClassSection', ClassSectionSchema);
const Enrollment = mongoose.model('Enrollment',   EnrollmentSchema);

// ─── Seed ───────────────────────────────────────────────────────────────────

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('✔ Connected to MongoDB');

  // Wipe existing data
  await Promise.all([
    User.deleteMany({}),
    Department.deleteMany({}),
    Teacher.deleteMany({}),
    Student.deleteMany({}),
    Course.deleteMany({}),
    ClassSection.deleteMany({}),
    Enrollment.deleteMany({}),
  ]);
  console.log('✔ Cleared existing collections');

  // ── 1. Users (1 per role) ───────────────────────────────────────────────
  const hashPwd = (plain: string) => bcrypt.hash(plain, 10);

  const [superAdminUser, adminUser, teacherUser, studentUser] = await User.insertMany([
    {
      username: 'superadmin',
      password: await hashPwd('superadmin@123'),
      name: 'Super Admin',
      email: 'superadmin@school.org',
      avatar: 'assets/images/user/admin.jpg',
      role: 'SUPERADMIN',
      permissions: ['canAdd', 'canDelete', 'canEdit', 'canRead'],
      isActive: true,
    },
    {
      username: 'admin',
      password: await hashPwd('admin@123'),
      name: 'Sarah Smith',
      email: 'admin@school.org',
      avatar: 'assets/images/user/admin.jpg',
      role: 'ADMIN',
      permissions: ['canAdd', 'canDelete', 'canEdit', 'canRead'],
      isActive: true,
    },
    {
      username: 'teacher',
      password: await hashPwd('teacher@123'),
      name: 'James Wilson',
      email: 'teacher@school.org',
      avatar: 'assets/images/user/user1.jpg',
      role: 'TEACHER',
      permissions: ['canEdit', 'canRead'],
      isActive: true,
    },
    {
      username: 'student',
      password: await hashPwd('student@123'),
      name: 'Emily Davis',
      email: 'student@school.org',
      avatar: 'assets/images/user/user1.jpg',
      role: 'STUDENT',
      permissions: ['canRead'],
      isActive: true,
    },
  ]);
  console.log('✔ Users seeded (4)');

  // ── 2. Departments (5) ──────────────────────────────────────────────────
  const [deptCS, deptMath, deptPhysics, deptBusiness, deptHistory] = await Department.insertMany([
    {
      departmentName: 'Computer Science',
      hodName: 'Dr. Alan Turing',
      phone: '+1-555-0101',
      email: 'cs@school.org',
      studentCapacity: 200,
      establishedYear: 1985,
      totalFaculty: 15,
      description: 'Department of Computer Science and Software Engineering',
      isActive: true,
    },
    {
      departmentName: 'Mathematics',
      hodName: 'Dr. Emmy Noether',
      phone: '+1-555-0102',
      email: 'math@school.org',
      studentCapacity: 150,
      establishedYear: 1960,
      totalFaculty: 12,
      description: 'Department of Pure and Applied Mathematics',
      isActive: true,
    },
    {
      departmentName: 'Physics',
      hodName: 'Dr. Marie Curie',
      phone: '+1-555-0103',
      email: 'physics@school.org',
      studentCapacity: 120,
      establishedYear: 1965,
      totalFaculty: 10,
      description: 'Department of Physics and Astrophysics',
      isActive: true,
    },
    {
      departmentName: 'Business Administration',
      hodName: 'Dr. Peter Drucker',
      phone: '+1-555-0104',
      email: 'business@school.org',
      studentCapacity: 250,
      establishedYear: 1975,
      totalFaculty: 18,
      description: 'Department of Business Administration and Management',
      isActive: true,
    },
    {
      departmentName: 'History',
      hodName: 'Dr. Howard Zinn',
      phone: '+1-555-0105',
      email: 'history@school.org',
      studentCapacity: 100,
      establishedYear: 1955,
      totalFaculty: 8,
      description: 'Department of World and American History',
      isActive: true,
    },
  ]);
  console.log('✔ Departments seeded (5)');

  // ── 3. Teachers (5) ─────────────────────────────────────────────────────
  const [t1, t2, t3, t4, t5] = await Teacher.insertMany([
    {
      userId: teacherUser._id,
      img: 'assets/images/user/user1.jpg',
      name: 'James Wilson',
      email: 'j.wilson@school.org',
      dni: '100001111',
      gender: 'Male',
      mobile: '+1-555-1001',
      departmentId: deptCS._id,
      laboralDependency: 'Nomb. Definitivo',
      salarialCategory: 'F',
      emergencyName: 'Anna Wilson',
      emergencyMobile: '+1-555-9001',
      address: '123 Oak Street, Springfield',
      subjectSpecialization: 'Algorithms & Data Structures',
      experienceYears: 12,
      status: 'active',
      birthdate: new Date('1980-03-22'),
      bio: 'Experienced CS professor specializing in algorithms and software design.',
    },
    {
      img: 'assets/images/user/user1.jpg',
      name: 'Linda Chen',
      email: 'l.chen@school.org',
      dni: '100002222',
      gender: 'Female',
      mobile: '+1-555-1002',
      departmentId: deptMath._id,
      laboralDependency: 'Nomb. Definitivo',
      salarialCategory: 'G',
      emergencyName: 'Wei Chen',
      emergencyMobile: '+1-555-9002',
      address: '456 Maple Ave, Springfield',
      subjectSpecialization: 'Calculus & Linear Algebra',
      experienceYears: 15,
      status: 'active',
      birthdate: new Date('1977-07-14'),
      bio: 'Passionate mathematician with research focus on abstract algebra.',
    },
    {
      img: 'assets/images/user/user1.jpg',
      name: 'Robert Khan',
      email: 'r.khan@school.org',
      dni: '100003333',
      gender: 'Male',
      mobile: '+1-555-1003',
      departmentId: deptPhysics._id,
      laboralDependency: 'Nomb. Provisional',
      salarialCategory: 'D',
      emergencyName: 'Sara Khan',
      emergencyMobile: '+1-555-9003',
      address: '789 Pine Road, Springfield',
      subjectSpecialization: 'Quantum Mechanics',
      experienceYears: 8,
      status: 'active',
      birthdate: new Date('1985-11-05'),
      bio: 'Researcher in quantum physics with several published papers.',
    },
    {
      img: 'assets/images/user/user1.jpg',
      name: 'Maria Santos',
      email: 'm.santos@school.org',
      dni: '100004444',
      gender: 'Female',
      mobile: '+1-555-1004',
      departmentId: deptBusiness._id,
      laboralDependency: 'Contrato',
      salarialCategory: 'H',
      emergencyName: 'Luis Santos',
      emergencyMobile: '+1-555-9004',
      address: '321 Elm Blvd, Springfield',
      subjectSpecialization: 'Strategic Management',
      experienceYears: 14,
      status: 'active',
      birthdate: new Date('1978-09-30'),
      bio: 'Former Fortune 500 executive turned academic with industry expertise.',
    },
    {
      img: 'assets/images/user/user1.jpg',
      name: 'Thomas Baker',
      email: 't.baker@school.org',
      dni: '100005555',
      gender: 'Male',
      mobile: '+1-555-1005',
      departmentId: deptCS._id,
      laboralDependency: 'Contrato',
      salarialCategory: 'C',
      emergencyName: 'Helen Baker',
      emergencyMobile: '+1-555-9005',
      address: '654 Cedar Lane, Springfield',
      subjectSpecialization: 'Web Development & Cloud Computing',
      experienceYears: 5,
      status: 'active',
      birthdate: new Date('1990-01-18'),
      bio: 'Full-stack developer with expertise in modern web technologies.',
    },
  ]);
  console.log('✔ Teachers seeded (5)');

  // ── 4. Students (5) ─────────────────────────────────────────────────────
  const [s1, s2, s3, s4, s5] = await Student.insertMany([
    {
      userId: studentUser._id,
      img: 'assets/images/user/user1.jpg',
      name: 'Emily Davis',
      email: 'emily.davis@student.school.org',
      dni: '200001111',
      gender: 'Female',
      residenceZone: 'URBANA',
      birthdate: new Date('2002-05-12'),
      address: '10 Student Hall, Springfield',
      parentGuardianName: 'Michael Davis',
      parentGuardianMobile: '+1-555-2101',
      fatherName: 'Michael Davis',
      fatherMobile: '+1-555-2101',
      motherName: 'Susan Davis',
      motherMobile: '+1-555-2201',
      status: 'active',
    },
    {
      img: 'assets/images/user/user1.jpg',
      name: 'Carlos Rivera',
      email: 'carlos.rivera@student.school.org',
      dni: '200002222',
      gender: 'Male',
      residenceZone: 'URBANA',
      birthdate: new Date('2001-11-23'),
      address: '22 Dorm Building B, Springfield',
      parentGuardianName: 'Ana Rivera',
      parentGuardianMobile: '+1-555-2102',
      fatherName: 'Jorge Rivera',
      fatherMobile: '+1-555-2102',
      motherName: 'Ana Rivera',
      motherMobile: '+1-555-2202',
      status: 'active',
    },
    {
      img: 'assets/images/user/user1.jpg',
      name: 'Sophie Turner',
      email: 'sophie.turner@student.school.org',
      dni: '200003333',
      gender: 'Female',
      residenceZone: 'RURAL',
      birthdate: new Date('2000-03-08'),
      address: '5 Campus Residences, Springfield',
      parentGuardianName: 'John Turner',
      parentGuardianMobile: '+1-555-2103',
      fatherName: 'John Turner',
      fatherMobile: '+1-555-2103',
      motherName: 'Claire Turner',
      motherMobile: '+1-555-2203',
      status: 'active',
    },
    {
      img: 'assets/images/user/user1.jpg',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@student.school.org',
      dni: '200004444',
      gender: 'Male',
      residenceZone: 'FUERA DEL CANTÓN',
      birthdate: new Date('2002-09-17'),
      address: '33 Off-campus Apt, Springfield',
      parentGuardianName: 'Fatima Hassan',
      parentGuardianMobile: '+1-555-2104',
      fatherName: 'Omar Hassan',
      fatherMobile: '+1-555-2104',
      motherName: 'Fatima Hassan',
      motherMobile: '+1-555-2204',
      status: 'active',
    },
    {
      img: 'assets/images/user/user1.jpg',
      name: 'Priya Patel',
      email: 'priya.patel@student.school.org',
      dni: '200005555',
      gender: 'Female',
      residenceZone: 'URBANA',
      birthdate: new Date('2001-06-25'),
      address: '7 Residence Hall C, Springfield',
      parentGuardianName: 'Raj Patel',
      parentGuardianMobile: '+1-555-2105',
      fatherName: 'Raj Patel',
      fatherMobile: '+1-555-2105',
      motherName: 'Priti Patel',
      motherMobile: '+1-555-2205',
      status: 'active',
    },
  ]);
  console.log('✔ Students seeded (5)');

  // ── 5. Courses (5) ──────────────────────────────────────────────────────
  const [c1, c2, c3, c4, c5] = await Course.insertMany([
    {
      courseCode: 'CS101',
      courseName: 'Introduction to Programming',
      description: 'Fundamentals of programming using Python. Variables, control flow, functions, and OOP.',
      departmentId: deptCS._id,
      credits: 3,
      durationWeeks: 16,
      isElective: false,
      status: 'active',
    },
    {
      courseCode: 'CS201',
      courseName: 'Data Structures & Algorithms',
      description: 'Arrays, linked lists, trees, graphs, sorting, and searching algorithms.',
      departmentId: deptCS._id,
      credits: 4,
      durationWeeks: 16,
      isElective: false,
      status: 'active',
    },
    {
      courseCode: 'MATH101',
      courseName: 'Calculus I',
      description: 'Limits, derivatives, integrals, and their applications.',
      departmentId: deptMath._id,
      credits: 4,
      durationWeeks: 16,
      isElective: false,
      status: 'active',
    },
    {
      courseCode: 'PHY101',
      courseName: 'Classical Mechanics',
      description: 'Newtonian mechanics, kinematics, dynamics, energy, and momentum.',
      departmentId: deptPhysics._id,
      credits: 3,
      durationWeeks: 16,
      isElective: false,
      status: 'active',
    },
    {
      courseCode: 'CS305',
      courseName: 'Cloud Computing',
      description: 'AWS, Azure, GCP fundamentals. Containerization with Docker and Kubernetes.',
      departmentId: deptCS._id,
      credits: 3,
      durationWeeks: 12,
      isElective: true,
      status: 'active',
    },
  ]);
  console.log('✔ Courses seeded (5)');

  // ── 6. Class Sections (5) ────────────────────────────────────────────────
  const [cs1, cs2, cs3, cs4, cs5] = await ClassSection.insertMany([
    {
      className: 'CS101 - Section A',
      classCode: 'CS101-A-F25',
      courseId: c1._id,
      teacherId: t1._id,
      startDate: new Date('2025-08-25'),
      endDate: new Date('2025-12-15'),
      roomNumber: 'Tech-101',
      schedule: 'Mon/Wed/Fri 09:00-10:00',
      semester: 'Fall 2025',
      academicYear: '2025-2026',
      classCapacity: 35,
      status: 'active',
      classType: 'lecture',
    },
    {
      className: 'CS201 - Section A',
      classCode: 'CS201-A-F25',
      courseId: c2._id,
      teacherId: t1._id,
      startDate: new Date('2025-08-25'),
      endDate: new Date('2025-12-15'),
      roomNumber: 'Tech-201',
      schedule: 'Tue/Thu 10:00-11:30',
      semester: 'Fall 2025',
      academicYear: '2025-2026',
      classCapacity: 30,
      status: 'active',
      classType: 'lecture',
    },
    {
      className: 'MATH101 - Section A',
      classCode: 'MATH101-A-F25',
      courseId: c3._id,
      teacherId: t2._id,
      startDate: new Date('2025-08-25'),
      endDate: new Date('2025-12-15'),
      roomNumber: 'Math-105',
      schedule: 'Mon/Wed/Fri 11:00-12:00',
      semester: 'Fall 2025',
      academicYear: '2025-2026',
      classCapacity: 40,
      status: 'active',
      classType: 'lecture',
    },
    {
      className: 'PHY101 - Section A',
      classCode: 'PHY101-A-F25',
      courseId: c4._id,
      teacherId: t3._id,
      startDate: new Date('2025-08-25'),
      endDate: new Date('2025-12-15'),
      roomNumber: 'Science-301',
      schedule: 'Tue/Thu 13:00-14:30',
      semester: 'Fall 2025',
      academicYear: '2025-2026',
      classCapacity: 30,
      status: 'active',
      classType: 'lab',
    },
    {
      className: 'CS305 - Section A',
      classCode: 'CS305-A-F25',
      courseId: c5._id,
      teacherId: t5._id,
      startDate: new Date('2025-08-25'),
      endDate: new Date('2025-12-15'),
      roomNumber: 'Tech-Lab-2',
      schedule: 'Wed/Fri 14:00-15:30',
      semester: 'Fall 2025',
      academicYear: '2025-2026',
      classCapacity: 25,
      status: 'active',
      classType: 'online',
    },
  ]);
  console.log('✔ Class Sections seeded (5)');

  // ── 7. Enrollments (5) ──────────────────────────────────────────────────
  await Enrollment.insertMany([
    {
      studentId: s1._id,
      classSectionId: cs1._id,
      courseId: c1._id,
      teacherId: t1._id,
      academicYear: '2025-2026',
      semester: 'Fall 2025',
      enrolledAt: new Date('2025-08-20'),
      grade: 'A',
      gradePoints: 4.0,
      status: 'enrolled',
      notes: '',
    },
    {
      studentId: s2._id,
      classSectionId: cs1._id,
      courseId: c1._id,
      teacherId: t1._id,
      academicYear: '2025-2026',
      semester: 'Fall 2025',
      enrolledAt: new Date('2025-08-20'),
      grade: null,
      gradePoints: null,
      status: 'enrolled',
      notes: '',
    },
    {
      studentId: s3._id,
      classSectionId: cs3._id,
      courseId: c3._id,
      teacherId: t2._id,
      academicYear: '2025-2026',
      semester: 'Fall 2025',
      enrolledAt: new Date('2025-08-21'),
      grade: 'A+',
      gradePoints: 4.0,
      status: 'enrolled',
      notes: 'Exceptional performance.',
    },
    {
      studentId: s4._id,
      classSectionId: cs4._id,
      courseId: c4._id,
      teacherId: t3._id,
      academicYear: '2025-2026',
      semester: 'Fall 2025',
      enrolledAt: new Date('2025-08-21'),
      grade: null,
      gradePoints: null,
      status: 'enrolled',
      notes: '',
    },
    {
      studentId: s5._id,
      classSectionId: cs5._id,
      courseId: c5._id,
      teacherId: t5._id,
      academicYear: '2025-2026',
      semester: 'Fall 2025',
      enrolledAt: new Date('2025-08-22'),
      grade: 'B+',
      gradePoints: 3.3,
      status: 'enrolled',
      notes: '',
    },
  ]);
  console.log('✔ Enrollments seeded (5)');

  // ─── Summary ────────────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  SEED COMPLETE — Test credentials:');
  console.log('═══════════════════════════════════════════════════════');
  console.log('  SUPERADMIN  →  superadmin / superadmin@123');
  console.log('  ADMIN       →  admin      / admin@123');
  console.log('  TEACHER     →  teacher    / teacher@123');
  console.log('  STUDENT     →  student    / student@123');
  console.log('═══════════════════════════════════════════════════════\n');

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  mongoose.disconnect();
  process.exit(1);
});
