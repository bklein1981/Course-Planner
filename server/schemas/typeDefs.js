const typeDefs = `
type User {
  _id: ID! 
  email: String!
  password: String!
  first_name: String!
  last_name: String!
  profile: Profile
}

type Profile {
  _id: ID!
  biography: String
  skills: [String]
  links: [String]
  subjects: [Subject]
}

type Subject {
  _id: ID!
  name: String!
  description: String!
  courses: [Course]
}

type Course {
  _id: ID!
  name: String!
  description: String!
  startDate: String
  endDate: String
  isCompleted: Boolean
  projects: [Project]
}

type Project {
  _id: ID!
  name: String!
  description: String!
  startDate: String
  endDate: String
  isCompleted: Boolean
}

type Auth {
  token: ID!
  user: User
}

type Query {
  user(_id: ID!): User
  subject(subjectId: ID!): Subject
  subjects: [Subject]!
  course(courseId: ID!): Course
  courses: [Course]!
  project(projectId: ID!): Project
  projects: [Project]!
}

input ProfileInput {
  biography: String
  skills: [String]
  links: [String]
  subjects: [ID]
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String! password: String!): Auth
  addCourse(name: String!, description: String!, startDate: String, endDate: String): Course
  addProject(name: String!, description: String!, startDate: String, endDate: String): Project
  editUser (first_name: String!, last_name: String!, profile: ProfileInput): User
  editSubject(courses: [ID]): Subject
  editCourse(name: String!, description: String!, startDate: String, endDate: String, isCompleted: Boolean, projects: [ID]): Course
  editProject(name: String!, description: String!, startDate: String, endDate: String, isCompleted: Boolean): Project
  removeCourse(courseId: ID!): Course 
  removeProject(projectId: ID!): Project
}
`
;

module.exports = typeDefs;
