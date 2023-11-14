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
      skills
    }
  }
`;

export const EDIT_USER = gql`
  mutation addProfile($name: String!) {
    addProfile(name: $name) {
      _id
      name
      skills
    }
  }
`;

export const EDIT_SUBJECT = gql`
  mutation addProfile($name: String!) {
    addProfile(name: $name) {
      _id
      name
      skills
    }
  }
`;

export const EDIT_COURSE = gql`
  mutation addProfile($name: String!) {
    addProfile(name: $name) {
      _id
      name
      skills
    }
  }
`;

export const EDIT_PROJECT = gql`
  mutation addProfile($name: String!) {
    addProfile(name: $name) {
      _id
      name
      skills
    }
  }
`;

export const REMOVE_COURSE = gql`
  mutation addProfile($name: String!) {
    addProfile(name: $name) {
      _id
      name
      skills
    }
  }
`;

export const REMOVE_PROJECT = gql`
  mutation addProfile($name: String!) {
    addProfile(name: $name) {
      _id
      name
      skills
    }
  }
`;
