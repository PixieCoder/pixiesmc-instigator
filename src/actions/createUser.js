import inputDialog from '../compenents/inputDialog';

const createUserMutation = `
    mutation createUserMutation($idToken: String!, $username: String!) {
        createUser(
            authProvider: { auth0: { idToken: $idToken } }
            username: $username
        ) {
            id
            role
            username
            orgs {
              id
              name
              title
            }
        }
    }
`;

export default async function createUser(session) {
  const dialogResult = await inputDialog({
    type: 'modal',
    inputs: [
      {
        label: 'Please input desired username',
        type: 'text',
        required: true,
      },
    ],
  });

  const username = dialogResult[0];
  const variables = {idToken: session.authentication.idToken, username};

  try {
    return session.graphQLClient.request(createUserMutation, variables);
  } catch (error) {
    console.error(error);
    return null;
  }
}
