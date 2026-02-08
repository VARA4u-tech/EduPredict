import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import Student from "../models/student.model.js";
import connectDB from "../config/db.js";

dotenv.config();

// Student data from spreadsheet
// Password = Roll Number (UPPER CASE)
const students = [
  { rollNumber: "24H71F0001", name: "Rajesh", gender: "Male" },
  { rollNumber: "24H71F0002", name: "Akula Manasa", gender: "Female" },
  { rollNumber: "24H71F0004", name: "Ambati Baby Ramya Sri", gender: "Female" },
  { rollNumber: "24H71F0005", name: "A.Phani Sri Nikhitha", gender: "Female" },
  { rollNumber: "24H71F0006", name: "Annapareddy Nandini", gender: "Female" },
  { rollNumber: "24H71F0007", name: "Anumala Srilakshmi", gender: "Female" },
  { rollNumber: "24H71F0008", name: "Appikatla Surya Kiran", gender: "Male" },
  { rollNumber: "24H71F0009", name: "Bala Krishna Vadugu", gender: "Male" },
  { rollNumber: "24H71F0010", name: "Bathula Nagarjuna", gender: "Male" },
  { rollNumber: "24H71F0011", name: "Battula Lingamallu", gender: "Male" },
  { rollNumber: "24H71F0012", name: "Nithin Kumar Bethapudi", gender: "Male" },
  { rollNumber: "24H71F0013", name: "B.Sowmika", gender: "Female" },
  { rollNumber: "24H71F0014", name: "Challa Sai Rachana", gender: "Female" },
  { rollNumber: "24H71F0015", name: "Chanamala Leelavathi", gender: "Female" },
  {
    rollNumber: "24H71F0020",
    name: "Dhamerla Vijaya Lakshmi",
    gender: "Female",
  },
  { rollNumber: "24H71F0022", name: "Dava Tirumala Manasa", gender: "Female" },
  { rollNumber: "24H71F0024", name: "Devanaboina Swathi", gender: "Female" },
  { rollNumber: "24H71F0025", name: "Dirisala Anusha", gender: "Female" },
  { rollNumber: "24H71F0026", name: "Manasa Dubbaku", gender: "Female" },
  { rollNumber: "24H71F0027", name: "Brahmaiah Dudekula", gender: "Male" },
  { rollNumber: "24H71F0028", name: "Sowjanya Galla", gender: "Female" },
  { rollNumber: "24H71F0030", name: "Gunturu Kavitha", gender: "Female" },
  { rollNumber: "24H71F0031", name: "Guttula Meghana Sri", gender: "Female" },
  {
    rollNumber: "24H71F0032",
    name: "Illendula Jaya Sri Lakshmi",
    gender: "Female",
  },
  { rollNumber: "24H71F0033", name: "Illipilla Vandana", gender: "Female" },
  { rollNumber: "24H71F0035", name: "K. Jayaprakash", gender: "Male" },
  {
    rollNumber: "24H71F0037",
    name: "Kamsani Lakshmiparvthi",
    gender: "Female",
  },
  { rollNumber: "24H71F0039", name: "Kanche Anitha", gender: "Female" },
  { rollNumber: "24H71F0040", name: "Vani Katuri", gender: "Female" },
  { rollNumber: "24H71F0042", name: "Kothagundla Navyasree", gender: "Female" },
  { rollNumber: "24H71F0043", name: "Triveni Kunchapu", gender: "Female" },
  {
    rollNumber: "24H71F0044",
    name: "Kurakula Sridivyajyoti",
    gender: "Female",
  },
  { rollNumber: "24H71F0045", name: "Kuruba Karthik", gender: "Male" },
  { rollNumber: "24H71F0046", name: "Lanka Venkata Ramya", gender: "Female" },
  { rollNumber: "24H71F0047", name: "Machavarapu Lavanya", gender: "Female" },
  { rollNumber: "24H71F0048", name: "Tejavath Maheswari", gender: "Female" },
  { rollNumber: "24H71F0049", name: "Mandala Joharika", gender: "Female" },
  { rollNumber: "24H71F0050", name: "Mohammad Saidabi", gender: "Female" },
  {
    rollNumber: "24H71F0054",
    name: "Siva Sankar Reddy Motakatla",
    gender: "Male",
  },
  { rollNumber: "24H71F0055", name: "Mukku Himabindu", gender: "Female" },
  { rollNumber: "24H71F0056", name: "Muthavarapu Prudhvi", gender: "Female" },
  { rollNumber: "24H71F0058", name: "Muvva Siva Narayana", gender: "Male" },
  { rollNumber: "24H71F0059", name: "Nurukurthi Suvartharaju", gender: "Male" },
  { rollNumber: "24H71F0061", name: "Nakka Sivaji", gender: "Male" },
  { rollNumber: "24H71F0062", name: "Nalamalapu Lokesh Babu", gender: "Male" },
  { rollNumber: "24H71F0064", name: "Onamala Hemalatha", gender: "Female" },
  { rollNumber: "24H71F0065", name: "Ramya Paidi", gender: "Female" },
  { rollNumber: "24H71F0066", name: "Paladugu Chandrasekhar", gender: "Male" },
  { rollNumber: "24H71F0067", name: "Naga Pavani Pamarthi", gender: "Female" },
  { rollNumber: "24H71F0068", name: "Pandi Komal", gender: "Male" },
  {
    rollNumber: "24H71F0069",
    name: "Pappuri Durga Vara Prasad",
    gender: "Male",
  },
  { rollNumber: "24H71F0070", name: "Madhuri Parepalli", gender: "Female" },
  { rollNumber: "24H71F0071", name: "Parimi Moshe", gender: "Male" },
  { rollNumber: "24H71F0072", name: "Anusha Pasam", gender: "Female" },
  { rollNumber: "24H71F0073", name: "Patan Imran Khan", gender: "Male" },
  { rollNumber: "24H71F0074", name: "Pedapudi Madhuri", gender: "Female" },
  { rollNumber: "24H71F0075", name: "Polavarapu Sowmya", gender: "Female" },
  {
    rollNumber: "24H71F0077",
    name: "Prattipati Devi Varaprasad",
    gender: "Male",
  },
  { rollNumber: "24H71F0078", name: "Pushadapu Dileep", gender: "Male" },
  { rollNumber: "24H71F0079", name: "Anitha Rachabanti", gender: "Female" },
  { rollNumber: "24H71F0080", name: "Jayaveer", gender: "Male" },
  {
    rollNumber: "24H71F0081",
    name: "Rayapureddy Maheswara Reddy",
    gender: "Male",
  },
  { rollNumber: "24H71F0082", name: "Reddem Pallavi", gender: "Female" },
  { rollNumber: "24H71F0085", name: "Shaik Abdul Fayaz Ahmad", gender: "Male" },
  { rollNumber: "24H71F0086", name: "Shaik Jasmine", gender: "Female" },
  { rollNumber: "24H71F0088", name: "Shaik Nafisa", gender: "Female" },
  { rollNumber: "24H71F0089", name: "Shaik Rezvana", gender: "Female" },
  { rollNumber: "24H71F0090", name: "Shaik Yasmeen", gender: "Female" },
  { rollNumber: "24H71F0091", name: "Sirigiri Pravalika", gender: "Female" },
  { rollNumber: "24H71F0092", name: "Sivarathri Girish", gender: "Male" },
  { rollNumber: "24H71F0093", name: "Tammisetti Bhavani", gender: "Female" },
  { rollNumber: "24H71F0094", name: "Tangirala Kareeshma", gender: "Female" },
  { rollNumber: "24H71F0095", name: "Tanuri Nagamani", gender: "Female" },
  { rollNumber: "24H71F0097", name: "Thorati Hemanth", gender: "Male" },
  { rollNumber: "24H71F0098", name: "Tungala Dharani", gender: "Female" },
  {
    rollNumber: "24H71F0099",
    name: "Ummanaboina Vijaya Bhargavi",
    gender: "Female",
  },
  { rollNumber: "24H71F00A0", name: "Velpuri Kumari", gender: "Female" },
  { rollNumber: "24H71F00A2", name: "Aruna Vemula", gender: "Female" },
  { rollNumber: "24H71F00A3", name: "Vemula Ganesh", gender: "Male" },
  { rollNumber: "24H71F00A4", name: "Yaragorla Akhil", gender: "Male" },
  { rollNumber: "24H71F00A5", name: "Yaramala Anusha", gender: "Female" },
  {
    rollNumber: "24H71F00A6",
    name: "Kalavakuntla Venkateswarao",
    gender: "Male",
  },
  { rollNumber: "24H71F00A7", name: "Shaik Nazeena", gender: "Female" },
  { rollNumber: "24H71F00A8", name: "Thammavarapu Kalpana", gender: "Female" },
  { rollNumber: "24H71F00A9", name: "Anubothu Aravind", gender: "Male" },
  { rollNumber: "24H71F00B0", name: "chaitanya", gender: "Male" },
];

// Default subjects for all students
const defaultSubjects = [
  {
    name: "Mathematics",
    internalMarks: 0,
    externalMarks: 0,
    predictedScore: 0,
  },
  { name: "Science", internalMarks: 0, externalMarks: 0, predictedScore: 0 },
  { name: "English", internalMarks: 0, externalMarks: 0, predictedScore: 0 },
  {
    name: "Social Studies",
    internalMarks: 0,
    externalMarks: 0,
    predictedScore: 0,
  },
  {
    name: "Computer Science",
    internalMarks: 0,
    externalMarks: 0,
    predictedScore: 0,
  },
];

const seedStudents = async () => {
  try {
    await connectDB();

    // Drop the email index if it exists (to allow null emails for students)
    try {
      await mongoose.connection.collection("users").dropIndex("email_1");
      console.log("Dropped existing email index to allow null emails.\n");
    } catch (e) {
      // Index might not exist, that's fine
      console.log("No email index to drop (this is OK).\n");
    }

    console.log("Seeding students from spreadsheet...\n");

    let created = 0;
    let skipped = 0;

    for (const studentData of students) {
      // Check if student already exists
      const existingUser = await User.findOne({
        rollNumber: studentData.rollNumber,
      });

      if (existingUser) {
        console.log(
          `⏭️  Skipped: ${studentData.rollNumber} - ${studentData.name} (already exists)`,
        );
        skipped++;
        continue;
      }

      // Create user with password = roll number (UPPER CASE)
      const user = await User.create({
        name: studentData.name,
        rollNumber: studentData.rollNumber.toUpperCase(),
        password: studentData.rollNumber.toUpperCase(), // Password = Roll Number
        gender: studentData.gender,
        role: "student",
      });

      // Create student profile with default subjects
      await Student.create({
        user: user._id,
        grade: "1st Year", // Default for these students
        subjects: defaultSubjects,
      });

      console.log(
        `✅ Created: ${studentData.rollNumber} - ${studentData.name} (${studentData.gender})`,
      );
      created++;
    }

    console.log(`\n========================================`);
    console.log(`📊 Summary:`);
    console.log(`   ✅ Created: ${created} students`);
    console.log(`   ⏭️  Skipped: ${skipped} students (already existed)`);
    console.log(`   📝 Total in spreadsheet: ${students.length}`);
    console.log(`========================================`);
    console.log(`\n🔑 Login Instructions:`);
    console.log(`   Roll Number: e.g., 24H71F0002`);
    console.log(`   Password: Same as Roll Number (UPPER CASE)`);
    console.log(`========================================\n`);

    process.exit();
  } catch (error) {
    console.error("Error seeding students:", error);
    process.exit(1);
  }
};

seedStudents();
