import gql from 'graphql-tag';
import * as moment from 'moment';

const date = moment.default(new Date()).subtract(1, 'weeks');
const formattedDate = date.format('YYYY-MM-DD');
export const filterRepositories = `created:>${formattedDate} sort:stars-desc`;
export const TRENDING_REPOSITORIES = gql`
  query search($query: String!, $cursor: String) {
    search(first: 10, query: $query, type: REPOSITORY, after: $cursor) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }

      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            owner {
              login
            }
            description
            stargazers {
              totalCount
            }
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;
