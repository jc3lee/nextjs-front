import gql from 'graphql-tag'

export const GET_LOGS = gql`
  {
    logs {
      id
      name
      msg
    }
  }
`

export const CREATE_LOG = gql`
mutation CreateLog ($name: String!, $msg: String!) {
  createLog(input: {data: {name: $name, msg: $msg}}) {
    log {
      id
      name
      msg
    }
  }
}
`