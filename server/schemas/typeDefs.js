const typeDefs = `
type User { 
  email: String!
  password: String!
  first_name: String!
  last_name: String!
  profile: [{
    biography: String
    skills: [String]
    links: [String]
    subjects: [Subject]
  }]
  }]
}

type Subject {
  name: String!
  description: String!
  courses: [Course]
}

type Course {
  name: String!
  description: String!
  startDate: Date
  endDate: Date
  isCompleted: Boolean
}

type Project {
  name: String!
  description: String!
  startDate: Date
  endDate: Date
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
  subjects: [Subject]
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String! password: String!): Auth
  addCourse(name: String!, description: String!, startDate: Date, endDate: Date): Subject
  addProject(name: String!, description: String!, startDate: Date, endDate: Date): Project
  editUser (first_name: String!, last_name: String! profile: ProfileInput): User
  editSubject(courses: [ID]): Subject
  editCourse(name: String!, description: String!, startDate: Date, endDate: Date, isCompleted: Boolean): Course
  editProject(name: String!, description: String!, startDate: Date, endDate: Date, isCompleted: Boolean): Project
  removeCourse(courseId: ID!): Course 
  removeProject(projectId: ID!): Project
}
`
  ;

module.exports = typeDefs;
