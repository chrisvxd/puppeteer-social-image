/**
 * firestore-http
 *
 * Custom client for accessing firestore using their web API. firebase-admin
 * is not compatible with same node engine as puppeteer-lambda, so we can't
 * use it.
 *
 * Google's client follows gaxious https://www.npmjs.com/package/gaxios, but
 * for some reason doesn't document it.
 */

import { ServiceAccount } from './types';
import getClient from './get-client';
import refFactory from './ref-factory';

export default (serviceAccount: ServiceAccount) => {
  const resourceBasePath = `/v1/projects/${serviceAccount.project_id}/databases/(default)/documents`;
  const baseUrl = `https://firestore.googleapis.com${resourceBasePath}`;

  const client = getClient(serviceAccount);

  const collection = (collectionId: string) => ({
    doc: (documentId: string) =>
      refFactory({
        baseUrl,
        client,
        collection: collectionId,
        document: documentId
      })
  });

  return { collection };
};
