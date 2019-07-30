import inputDialog from '../compenents/inputDialog';
import createUserMutation from '../queries/createUserMutation.graphql';

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
    return await session.graphQLClient.request(createUserMutation, variables);
  } catch (error) {
    console.error(error);
    return null;
  }
}
