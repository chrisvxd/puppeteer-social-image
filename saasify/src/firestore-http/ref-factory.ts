import { buildSnapshot, convertToFields } from './helpers';

export default ({ baseUrl, client, collection, document }) => {
  const collectionUrl = `${baseUrl}/${collection}`;
  const resourceUrl = `${baseUrl}/${collection}/${document}`;

  /**
   * Get a document from firestore
   *
   * @param collection ID of the collection
   * @param document ID of the document within the collection
   *
   * @return JSON object
   */
  const get = async (): Promise<any> =>
    buildSnapshot((await client.request({ url: resourceUrl })).data);

  /**
   * Set a document on Firestore
   *
   * @param collection ID of the collection
   * @param document ID of the document within the collection
   * @param values Data for the object
   *
   * @return JSON object
   */
  const set = async (data: object): Promise<object> =>
    client.request({
      url: `${collectionUrl}?documentId=${document}`,
      method: 'POST',
      data: {
        fields: convertToFields(data)
      }
    });

  return { get, set };
};
