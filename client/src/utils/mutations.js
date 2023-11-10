// // Important for useMutation: We bring in gql from the @apollo/client library to allow us to parse mutations (and queries) as template literals
// import { gql } from '@apollo/client';

// // Important for useMutation: Each mutation we'd like to be able to perform gets exported out of our mutations.js utility
// export const ADD_PROFILE = gql`
//   mutation addProfile($name: String!) {
//     addProfile(name: $name) {
//       _id
//       name
//       skills
//     }
//   }
// `;

// export const ADD_SKILL = gql`
//   mutation addSkill($profileId: ID!, $skill: String!) {
//     addSkill(profileId: $profileId, skill: $skill) {
//       _id
//       name
//       skills
//     }
//   }
// `;
