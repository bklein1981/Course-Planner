const { Course, Project, Subject, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { userId }) => {
      return await User.findById({_id: userId}).populate('subjects').populate('courses').populate('projects')
    },
    subject: async (parent, { subjectId }) => {
      return await Subject.findById({ _id: subjectId }).populate('courses')
    },
    subjects: async () => {
      return await Subject.find().populate('courses')
    },
    course: async (parent, { courseId }) => {
      return await Course.findById({_id: courseId}).populate('subject')
    },
    courses: async () => {
      return await Course.find().populate('subject')
    },
    project: async (parent, { projectId }) => {
      return await Project.findById({_id: projectId}).populate('course').populate('user')
    },
    projects: async () => {
      return await Project.find().populate('course').populate('user')
    }
  },
  
  Mutation: {
    //login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Email not found")
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Password not found");
      }
      const token = signToken(user)
      return { token, user }
    },
    //addUser
    addUser: async (parent, { email, password, first_name, last_name}) => {
      const newUser = await User.create({email, password, first_name, last_name })
      const token = signToken(newUser)
      return { token, newUser };
    },
    //addCourse
    addCourse: async (parent, { name, description, startDate, endDate, subject }) => {
      try {
        const subjectRef = await Subject.findById(subject);
        
        if (!subjectRef) {
          throw new Error("Subject not found");
        }
  
        const newCourse = await Course.create({
          name,
          description,
          startDate,
          endDate,
          subject: subjectRef._id,
        });
  
        subjectRef.courses.push(newCourse._id);
        await subjectRef.save();
  
        return newCourse;
      } catch (error) {
        throw new Error(`Error adding course: ${error.message}`);
      }
    },
    //addProject
    addProject: async (parent, { name, description, startDate, endDate, isCompleted, course, user }) => {
      try {
        // Check if the course exists
        const courseRef = await Course.findById(course);
        if (!courseRef) {
          throw new Error("Course not found");
        }
  
        // Check if the user exists
        const userRef = await User.findById(user);
        if (!userRef) {
          throw new Error("User not found");
        }
  
        // Create a new project
        const newProject = await Project.create({
          name,
          description,
          startDate,
          endDate,
          isCompleted,
          course: courseRef._id,
          user: userRef._id,
        });
  
        // Update references in the  user
        userRef.projects.push(newProject._id);
  
        // Save changes to the database
        await userRef.save();
  
        return newProject;
      } catch (error) {
        throw new Error(`Error adding project: ${error.message}`);
      }
    },
    //editUser
    editUser: async (parent, {userId, first_name, last_name }) => {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId},
        { first_name, last_name },
        { new: true } 
        )
        return updatedUser
    },
    //editSubject
    editSubject: async (parent, { subjectId, courses, name, description }) => {
      const updatedSubject = await Subject.findByIdAndUpdate(
        { _id: subjectId},
        { name, description},
        { $set: {courses} },
        { new: true}
        )
        return updatedSubject
    },
    //editCourse
    editCourse: async (parent, { courseId, name, description, startDate, endDate, isCompleted, projects }) => {
      const updatedCourse = await Course.findByIdAndUpdate(
        { _id: courseId},
        { name, description, startDate, endDate, isCompleted },
        { $set: {projects} },
        { new: true }
        )
        return updatedCourse
    },
    //editProject
    editProject: async (parent, { projectId, name, description, startDate, endDate, isCompleted }) => {
      const updatedProject = await Project.findByIdAndUpdate(
        { _id: projectId},
        { name, description, startDate, endDate, isCompleted },
        { new: true }
        )
        return updatedProject
    },
    //removeCourse
    removeCourse: async (parent, { courseId }) => {
      const removedCourse = await Course.findByIdAndDelete(courseId)
      return removedCourse
    },
    //removeProject
    removeProject: async (parent, { projectId }) => {
      const removedProject = await Project.findByIdAndDelete(projectId)
      return removedProject
    }
  }
};

module.exports = resolvers;
