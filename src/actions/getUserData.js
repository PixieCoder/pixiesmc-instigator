const userQuery = `
query userQuery($auth0UserId: String!) {
  User(auth0UserId: $auth0UserId) {
    id
    role
    username
    orgs {
      id
      name
      title
    }
  }
}`;

export default function getUserData(session) {
  try {
    const variables = {auth0UserId: session.authentication.idTokenPayload.sub};
    return session.graphQLClient.request(userQuery, variables);
  } catch (error) {
    console.error(error);
    return null;
  }
}
