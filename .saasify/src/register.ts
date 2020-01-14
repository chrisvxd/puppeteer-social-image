import { db } from './config';

/**
 * Generate an image with an existing or custom template and save to S3.
 *
 * @param template - Name of a prebuilt template.
 * @param body - Handlebars template to render in the body for a custom template.
 * @param styles - CSS to use for a custom template. Passed to the head.
 *
 * @return Image as `image/jpeg`
 */
export default async function register(
  template: string,
  body: string,
  styles: string
): Promise<{
  template: string;
  body: string;
  styles: string;
}> {
  const docRef = db.collection('templates').doc(template);

  // Don't fail if template exists, to allow saasify to execute example every time
  try {
    await docRef.set({
      body,
      styles
    });
  } catch {}

  return {
    template,
    body,
    styles
  };
}
