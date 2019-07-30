import Auth0Lock from 'auth0-lock';
import {GraphQLClient} from 'graphql-request';
import {
  graphCoolToken,
  auth0Domain,
  auth0ClientId,
} from '../../settings/secrets.json';

import getUserData from './getUserData';
import createUser from './createUser';

const endpoint = `https://api.graph.cool/simple/v1/${graphCoolToken}`;

export default function createSession(main) {
  const session = { main };
  session._lock = new Auth0Lock(
      auth0ClientId,
      auth0Domain,
      {
        auth: {
          responseType: 'token id_token',
          params: {scope: 'openid'},
        },
      },
  );

  session._lock.on('authenticated', authResult => {
    console.log(`Authenticated!\n`, authResult);
    session.authentication = authResult;
    session.graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${authResult.accessToken}`,
      },
    });
    session._lock.hide();
    getUserData(session).then((userData) => {
      if (userData.User && userData.User.id) {
        console.log(`user data:\n`, userData);
      }
      else {
        createUser(session).then((newUserData) => {
          console.log(`new user:\n`, newUserData);
        });
      }
    });
  });

  session._lock.show();
}
