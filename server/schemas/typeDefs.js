const typeDefs = `
type User {
  _id: ID! 
  email: String!
  password: String!
  first_name: String!
  last_name: String!
  biography: String
  skills: [String]
  links: [String]
  subjects: [Subject]
  courses: [Course]
  projects: [Project]
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
  subject: Subject!
}

type Project {
  _id: ID!
  name: String!
  description: String!
  startDate: String
  endDate: String
  isCompleted: Boolean
  course: Course!
  user: User!
}

type Auth {
  token: ID!
  user: User
}

type Query {
  user(userId: ID!): User
  subject(subjectId: ID!): Subject
  subjects: [Subject]!
  course(courseId: ID!): Course
  courses: [Course]!
  project(projectId: ID!): Project
  projects: [Project]!
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(first_name: String!, last_name:String!, email: String! password: String!): Auth
  addCourse(name: String!, description: String!, startDate: String, endDate: String, subject: ID!): Course
  addProject(name: String!, description: String!, startDate: String, endDate: String, isCompleted: Boolean, course: ID!, user: ID!): Project
  editUser (userId: ID!, first_name: String!, last_name: String!): User
  editSubject(subjectId: ID!, name: String!, description: String!): Subject
  editCourse(courseId: ID! name: String!, description: String!, startDate: String, endDate: String, isCompleted: Boolean, projects: [ID]): Course
  editProject(projectId: ID!, name: String!, description: String!, startDate: String, endDate: String, isCompleted: Boolean): Project
  removeCourse(courseId: ID!): Course 
  removeProject(projectId: ID!): Project
}
`
;

module.exports = typeDefs;
