import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
        _id
        email
        first_name
        last_name
        biography
        skills
        links
        subjects {
            _id
            name
            description
            courses {
              _id
            }
        }
        courses {
            _id
            name
            description
            startDate
            endDate
            subject{
              _id
            }
        }
        projects {
            _id
            name
            description
            startDate
            endDate
            course{
              _id
            }
        }
  }
}`;

export const QUERY_SUBJECT = gql`
  query subject($subjectId: ID!) {
    subject(_id: $subjectId) {
      _id
      name
      description
      courses {
        name
        description
      }
    }
  }
`;

export const QUERY_SUBJECTS = gql`
  query subjects {
    subjects {
      _id
      name
    }
  }
`;

export const QUERY_COURSE = gql`
  query course($courseId: ID!) {
    course(_id: $courseId) {
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

export const QUERY_COURSES = gql`
  query courses {
    courses {
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

export const QUERY_PROJECT = gql`
  query project($projectId: ID!) {
    project(_id: $projectId) {
      _id
      name
      description
      startDate
      endDate
      isCompleted
      course {
        _id
      }
      user {
        _id
      }
    }
  }
`;

export const QUERY_PROJECTS = gql`
  query projects{
    projects {
        _id
        name
        description
        startDate
        endDate
        isCompleted
        course {
            _id
        }
        user {
            _id
        }
  }
}
`;
