// Important for useMutation: We bring in gql from the @apollo/client library to allow us to parse mutations (and queries) as template literals
import { gql } from "@apollo/client";

// Important for useMutation: Each mutation we'd like to be able to perform gets exported out of our mutations.js utility
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user:{
            _id
            email
            password
            first_name
            last_name
            biography
            skills
            links
            subjects {
                name
            }
            courses {
                name
            }
            projects {
                name
            }
        }
  }
`;

export const ADD_USER = gql`
  mutation addUser($first_name: String!, $last_name:String!, $email: String! $password: String!) {
    addSkill(first_name: $first_name, last_name:$last_name, email: $email, password: $password) {
        token
        user:{
            _id
            email
            password
            first_name
            last_name
            biography
            skills
            links
            subjects {
                name
            }
            courses {
                name
            }
            projects {
                name
            }
        }
    }
  }
`;

export const ADD_COURSE = gql`
  mutation addCourse($name: String!, $description: String!, $startDate: String, $endDate: String, $subject: ID!) {
    addProfile(name: $name, description: $description, startDate: $startDate, endDate: $endDate, subject: $subject) {
      _id
      name
      description
      startDate
      endDate
      isCompleted
      subject {
        name
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($name: String!, $description: String!, $startDate: String, $endDate: String, $isCompleted: Boolean, $course: ID!, $user: ID!) {
    addProfile(name: $name, description: $description!, startDate: $startDate, endDate: $endDate, isCompleted: $isCompleted, course: $course, user: $user) {
      _id
      name
      description
      startDate
      endDate
      isCompleted
      course{
        id
      }
      user{
        id
      }
    }
  }
`;

export const ADD_COURSE_TO_USER = gql`
  mutation addCourseToUser($userId: ID!, $courseId: ID!) {
    addCourseToUser(userId: $userId, userId: $courseId {
      _id
      courses{
        _id
        name
        description
      }
    }
  }
`;

export const REMOVE_COURSE_FROM_USER = gql`
  mutation removeCourseFromUser($userId: ID!, $courseId: ID!) {
    removeCourseFromUser(userId: $userId, courseId: $courseId) {
      _id
        courses{
          _id
          name
          description
        }
    }
  }
`;

export const ADD_SUBJECT_TO_USER = gql`
mutation addSubjectToUser($userId: ID!, $subjectId: ID!){
  addSubjectToUser(userId: $userId, subjectId: $subjectId) {
    _id
    email
    subjects {
      _id
      name
    }
  }
}
`;

export const REMOVE_SUBJECT_FROM_USER = gql`
  mutation RemoveCourseFromUser($userId: ID!, $subjectId: ID!) {
    removeCourseFromUser(userId: $userId, subjectId: $subjectId) {  
      _id
      subjects {
        _id
        name
      }
    }
  }
`;

export const EDIT_COURSE = gql`
  mutation EditCourse($courseId: ID!, $name: String!, $description: String!, $startDate: String, $endDate: String, $isCompleted: Boolean, $subject: ID!) {
    editCourse(courseId: $courseId, name: $name, description: $description, startDate: $startDate, endDate: $endDate, isCompleted: $isCompleted, subject: $subject) {
      _id
      name
      description
      startDate
      endDate
      isCompleted
      subject {
        name
      }
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation EditProfile($userId: ID!, $first_name: String, $last_name: String, $biography: String, $skills: [String], $links: [String]) {
    editProfile(userId: $userId, first_name: $first_name, last_name: $last_name, biography: $biography, skills: $skills, links: $links) {
      _id
      first_name
      last_name
      biography
      skills
      links
    }
  }
`;

export const REMOVE_COURSE = gql`
mutation removeCourse($courseId: ID!) {
  removeCourse(courseId: $courseId) {
    _id
  }
}
`;

export const REMOVE_PROJECT = gql`
mutation removeProject($projectId: ID!)
  removeProject(projectId: $projectId) {
    _id
  }
}
`;
