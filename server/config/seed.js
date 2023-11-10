const db = require("./connection");
const { User, Course, Project, Subject } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("User", "users");
  await cleanDB("Course", "courses");
  await cleanDB("Project", "projects");
  await cleanDB("Subject", "subjects");

  const subjects = await Subject.insertMany([
    {
      name: "Computer Science",
      description: "The study of computers and computational systems.",
    },
    {
      name: "Foreign Language",
      description: "The study of languages that are not native to the speaker.",
    },
    {
      name: "Art",
      description:
        "The expression or application of human creative skill and imagination.",
    },
    {
      name: "Professional Development",
      description:
        "The development of skills and knowledge for career advancement.",
    },
    {
      name: "Data Science",
      description:
        "The study of data and how it can be used to solve problems.",
    },
  ]);

  console.log("Subjects seeded");

  const courses = await Course.insertMany([
    {
      name: "Introduction to Computer Science",
      description: "An introduction to the field of computer science.",
      subjects: [subjects[0]._id],
    },
    {
      name: "Full-Stack Web Development",
      description: "A full-stack web development course.",
      subjects: [subjects[0]._id],
    },
    {
      name: "Spanish 101",
      description: "An introductory course to the Spanish language.",
      subjects: [subjects[1]._id],
    },
    {
      name: "French 101",
      description: "An introductory course to the French language.",
      subjects: [subjects[1]._id],
    },
    {
      name: "Drawing for Beginners",
      description: "A course that introduces the basics of drawing.",
      subjects: [subjects[2]._id],
    },
    {
      name: "Professional Communication",
      description:
        "A course on effective communication in a professional setting.",
      subjects: [subjects[3]._id],
    },
    {
      name: "Introduction to Data Analysis",
      description: "A course that introduces the basics of data analysis.",
      subjects: [subjects[4]._id],
    },
  ]);

  console.log("Courses seeded");

  await User.create({
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@testmail.com",
    password: "password12345",
    profile: {
      biography: "I am a full-stack web developer.",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "React",
      ],
      subjects: [subjects[0]._id, subjects[1]._id],
    },
  });

  await User.create({
    first_name: "Jane",
    last_name: "Doe",
    email: "jane.doe@testmail.com",
    password: "password12345",
    profile: {
      biography: "I am an artist.",
      skills: ["Drawing", "Painting", "Sculpting"],
      subjects: [subjects[2]._id, subjects[3]._id],
    },
  });

  console.log("Users seeded");

  process.exit();
});
