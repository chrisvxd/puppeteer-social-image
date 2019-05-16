import "@babel/polyfill";
import path from "path";
import puppeteer from "puppeteer";
import templates, { baseTemplate } from "./templates";
import tempy from "tempy";
import { compile } from "handlebars";

const sizeMap = {
  facebook: { width: 1200, height: 630 },
  twitter: { width: 1200, height: 630 }
};

/**
 * Renders the given HTML as an image via Puppeteer.
 *
 * @name getImage
 * @function
 *
 * @param {object} opts - Configuration options
 *
 * @return {Promise}
 */
export default async ({
  jpegQuality = 90,
  output,
  size = "twitter",
  template = "basic",
  templateParams = {},
  templateBody,
  templateStyles = "",
  customTemplates = {}
}) => {
  // Resolve preferences
  const _size = sizeMap[size];
  const { width, height } = _size;
  const customTemplate = customTemplates[template];
  const buildTemplate = template && templates[template];
  const ext = path
    .extname(output)
    .slice(1)
    .toLowerCase();
  const type = ext === "png" ? "png" : "jpeg";

  // Setup puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width,
    height
  });

  // Using template builders instead of handlebars templates allows
  // us to hide size, body and styles from the user template

  const usingCustomTemplate =
    typeof customTemplate !== "undefined" ||
    typeof templateBody !== "undefined";
  const customBody = (customTemplate && customTemplate.body) || templateBody;
  const customStyles =
    (customTemplate && customTemplate.styles) || templateStyles;

  const html = usingCustomTemplate
    ? baseTemplate({
        body: compile(customBody)(templateParams),
        height: size.height,
        styles: customStyles,
        width: size.width
      })
    : buildTemplate({ templateParams, size: _size });

  await page.setContent(html);

  // Get root of page
  const pageFrame = page.mainFrame();
  const rootHandle = await pageFrame.$("body");

  // Take screenshot
  const tempFile = tempy.file({ extension: "png" });
  await rootHandle.screenshot({
    path: tempFile,
    omitBackground: true,
    type,
    quality: type === "jpeg" ? jpegQuality : undefined
  });

  console.log("Wrote to", tempFile);
};
