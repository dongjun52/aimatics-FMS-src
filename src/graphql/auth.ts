import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const LOGIN_QUERY: DocumentNode = gql`
  mutation GetUser($email: String!, $password: String!) {
    gqlLogin(email: $email, password: $password) {
      status
      success
      message
      data {
        accountsId
        corporationName
        assignedTask
        corporationPhone
        department
        description
        partnersId
        partnersName
        email
        authCode
        name
        phone
        termAgreeYn
        loginFailCnt
        loginToken
        partnerses {
          partnersId
          partnersName
          serviceYn
        }
        profileUrl
        lastLoginAt
        locale
      }
    }
  }
`;

export const USER_BY_TOKEN_QUERY: DocumentNode = gql`
  query GetUserByToken($loginToken: String!) {
    findByLoginToken(loginToken: $loginToken) {
      status
      message
      success
      data {
        accountsId
        corporationName
        assignedTask
        corporationPhone
        department
        description
        partnersId
        partnersName
        email
        authCode
        name
        phone
        termAgreeYn
        loginFailCnt
        loginToken
        partnerses {
          partnersId
          partnersName
          serviceYn
        }
        profileUrl
        lastLoginAt
        locale
      }
    }
  }
`;

export const SEARCH_ID_QUERY: DocumentNode = gql`
  query FindID($name: String!, $phone: String!) {
    searchEmailId(name: $name, phone: $phone) {
      status
      message
      success
      data {
        email
      }
    }
  }
`;

export const SEARCH_PW_MUTATION: DocumentNode = gql`
  mutation FindPW($email: String!) {
    searchPassword(email: $email) {
      status
      success
      message
    }
  }
`;

export const TERMS_AGREE_MUTATION: DocumentNode = gql`
  mutation Registration($imf: String!) {
    termAgreeCheck(imf: $imf) {
      result
      message
    }
  }
`;
