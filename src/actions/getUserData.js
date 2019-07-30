import userQuery from '../queries/userQuery.graphql';

export default function getUserData(session) {
  const variables = {auth0UserId: session.authentication.idTokenPayload.sub};
  return session.graphQLClient.request(userQuery, variables);
}
