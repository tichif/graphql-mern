import { gql } from '@apollo/client';

export const GET_CLIENTS = gql`
  query getCLients {
    clients {
      id
      name
      phone
      email
    }
  }
`;
