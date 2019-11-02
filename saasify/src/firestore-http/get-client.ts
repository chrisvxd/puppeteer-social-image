import { ServiceAccount } from './types';

/**
 * Get an authorised REST firestore client
 *
 * @return An authorised firestore client
 */
export default (serviceAccount: ServiceAccount) => {
  const { client_email, private_key } = serviceAccount;

  const { JWT } = require('google-auth-library');

  const client = new JWT(client_email, null, private_key, [
    'https://www.googleapis.com/auth/datastore'
  ]);

  return client;
};
