const db = require("./connection");
const { User, Course, Project, Subject } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Subject", "subjects");
  await cleanDB("Course", "courses");
  await cleanDB("User", "users");
  await cleanDB("Project", "projects");

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

  console.log("> subjects seeded");

  const courses = await Course.insertMany([
    {
      name: "Introduction to Computer Science",
      description: "An introduction to the field of computer science.",
      subject: [subjects[0]._id],
    },
    {
      name: "Full-Stack Web Development",
      description: "A full-stack web development course.",
      subject: [subjects[0]._id],
    },
    {
      name: "Spanish 101",
      description: "An introductory course to the Spanish language.",
      subject: [subjects[1]._id],
    },
    {
      name: "French 101",
      description: "An introductory course to the French language.",
      subject: [subjects[1]._id],
    },
    {
      name: "Drawing for Beginners",
      description: "A course that introduces the basics of drawing.",
      subject: [subjects[2]._id],
    },
    {
      name: "Professional Communication",
      description:
        "A course on effective communication in a professional setting.",
      subject: [subjects[3]._id],
    },
    {
      name: "Introduction to Data Analysis",
      description: "A course that introduces the basics of data analysis.",
      subject: [subjects[4]._id],
    },
  ]);

  console.log("> courses seeded");

  subjects.map(async (subject) => {
    await Subject.findOneAndUpdate(
      {
        _id: subject._id,
      },
      {
        $push: {
          courses: courses.filter((course) =>
            course.subject.toString().includes(subject._id)
          ),
        },
      }
    );
  });

  console.log("> subjects updated");

  const users = await User.insertMany([
    {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@testmail.com",
      password: "password12345",
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
      courses: [courses[0]._id],
    },
    {
      first_name: "Jane",
      last_name: "Doe",
      email: "jane.doe@testmail.com",
      password: "password12345",
      biography: "I am an artist.",
      skills: ["Drawing", "Painting", "Sculpting"],
      subjects: [subjects[2]._id, subjects[3]._id],
      courses: [courses[4]._id],
    },
  ]);

  console.log("> users seeded");

  const projects = await Project.insertMany([
    {
      name: "Portfolio Website",
      description: "This is a portfolio website.",
      course: courses[0]._id,
      user: users[0]._id,
    },
    {
      name: "Simple Essay",
      description: "This is an essay in Spanish",
      course: courses[2]._id,
      user: users[1]._id,
    },
  ]);
  console.log("> projects seeded");

  await User.findOneAndUpdate(
    {
      _id: users[0]._id,
    },
    {
      $push: {
        projects: projects[0]._id,
      },
    }
  );
  await User.findOneAndUpdate(
    {
      _id: users[1]._id,
    },
    {
      $push: {
        projects: projects[1]._id,
      },
    }
  );

  console.log("> users updated");

  process.exit();
});
