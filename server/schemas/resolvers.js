const { Course, Project, Subject, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { _id }) => {
      return await User.findById(_id).populate('subjects')
    },
    subject: async (parent, { _id }) => {
      return await Subject.findById(_id).populate('courses')
    },
    subjects: async () => {
      return await Subject.find().populate('courses')
    },
    course: async (parent, { _id }) => {
      return await Course.findById(_id).populate('projects')
    },
    courses: async () => {
      return await Course.find().populate('projects')
    },
    project: async (parent, { _id }) => {
      return await Project.findById(_id)
    },
    projects: async () => {
      return await Project.find()
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
      const newUser = await User.create({ username, email, password })
      const token = signToken(newUser)
      return { token, newUser };
    },
    //addCourse
    addCourse: async (parent, { name, description, startDate, endDate }) => {
      const newCourse = await Course.create(
        { name, description, startDate, endDate }
        )
        return newCourse
    },
    //addProject
    addProject: async (parent, { name, description, startDate, endDate }) => {
      const newProject = await Project.create(
        { name, description, startDate, endDate }
        )
        return newProject
    },
    //editUser
    editUser: async (parent, {userId, first_name, last_name, profile }) => {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { first_name, last_name, profile },
        { new: true } 
        )
        return updatedUser
    },
    //editSubject
    editSubject: async (parent, { subjectId, courses }) => {
      const updatedSubject = await Subject.findByIdAndUpdate(
        subjectId,
        { $set: {courses} },
        { new: true}
        )
        return updatedSubject
    },
    //editCourse
    editCourse: async (parent, { courseId, name, description, startDate, endDate, isCompleted, projects }) => {
      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        { name, description, startDate, endDate, isCompleted },
        { $set: {projects} },
        { new: true }
        )
        return updatedCourse
    },
    //editProject
    editProject: async (parent, { projectId, name, description, startDate, endDate, isCompleted }) => {
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
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
