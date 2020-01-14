import renderSocialImage = require('puppeteer-social-image-lambda');
import { upload } from './utils/s3-helpers';
import { s3Client } from './config';
import reducePairs from './utils/reduce-pairs';

/**
 * Generate an image with an existing or custom template and save to S3. All remaining params get passed to the handlebars template.
 *
 * @param template - Name of the template. Can include
 * - `basic` - a simple template basic template for rendering text on a background image.
 * - any user template - registered by the `register` API.
 * @param body - Handlebars template to render in the body for a custom template.
 * @param styles - CSS to use for a custom template. Passed to the head.
 * @param size - Preset size for the image.
 *
 * @return Image as `image/jpeg`
 */
export default async function generate(
  template?: string,
  body?: string,
  styles?: string,
  size?: 'facebook' | 'twitter',
  ...templateParamsArr
): Promise<{ url: string }> {
  const image = await renderSocialImage({
    template,
    templateBody: body,
    templateStyles: styles,
    size: size || 'facebook',
    templateParams: reducePairs(templateParamsArr)
  });

  return {
    url: await upload(s3Client, image, '.jpg')
  };
}
