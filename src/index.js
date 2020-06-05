import "@babel/polyfill";
import path from "path";
import templates from "./templates";
import { compileTemplate } from "./helpers";
import compilePreview from "./helpers/compile-preview";

const sizeMap = {
  facebook: { width: 1200, height: 630 },
  twitter: { width: 1200, height: 630 },
  "ig-landscape": { width: 1080, height: 608 },
  "ig-square": { width: 1080, height: 1080 },
  "ig-portrait": { width: 1080, height: 1350 },
  "ig-story": { width: 1080, height: 1920 },
  pinterest: { width: 1000, height: 1500 }
};

let testMode = false;

export const setTestMode = val => {
  testMode = val;
};

/**
 * Renders the given HTML as an image via Puppeteer.
 */
export default async ({
  jpegQuality = 90,
  output = "",
  type: userType = "jpeg",
  size = "twitter",
  template = "basic",
  templateParams = {},
  templateBody,
  templateStyles = "",
  customTemplates = {},
  browser: userBrowser,
  preview = false,
  compileArgs = {}
}) => {
  // Resolve preferences
  let _size = sizeMap[size];

  if (!_size) {
    if (size.indexOf("x") === -1) {
      throw new Error("Size is invalid");
    }

    const sizeSplit = size.split("x");
    _size = { width: parseInt(sizeSplit[0]), height: parseInt(sizeSplit[1]) };
  }

  const { width, height } = _size;
  const customTemplate = customTemplates[template];
  const createTemplate = template && templates[template];
  const ext = path
    .extname(output)
    .slice(1)
    .toLowerCase();
  const type = output
    ? ext === "jpg" || ext === "jpeg"
      ? "jpeg"
      : "png"
    : userType;

  let browser = userBrowser;

  if (!userBrowser) {
    let puppeteer;

    try {
      puppeteer = require("puppeteer");
    } catch (err) {
      throw new Error(
        "Puppeteer was not installed. Either install puppeteer@^2.0.0 as a peer dependency, or provide the `browser` arg"
      );
    }

    browser = await puppeteer.launch({
      headless: true
    });
  }

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

  const { html, body, styles } = usingCustomTemplate
    ? compileTemplate({
        body: customBody,
        styles: customStyles,
        templateParams,
        size: _size,
        compileArgs: { testMode, ...compileArgs }
      })
    : createTemplate({
        templateParams,
        size: _size,
        compileArgs: { testMode, ...compileArgs }
      });

  let screenshot;

  const validPreviewSizes = ["facebook", "twitter"];

  if (!preview || validPreviewSizes.indexOf(size) === -1) {
    // Wait for fonts to load (via networkidle)
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Get root of page
    const pageFrame = page.mainFrame();
    const rootHandle = await pageFrame.$("body");

    // Take screenshot
    screenshot = await rootHandle.screenshot({
      path: output,
      omitBackground: true,
      type,
      quality: type === "jpeg" ? jpegQuality : undefined
    });
  } else {
    await page.setViewport({
      // Just needs to be larger than preview, so we can deal with any environmental rendering nuances and crop cleanly
      width: 1250,
      height: 1250
    });

    const previewHtml = compilePreview({ body, styles, compileArgs });
    await page.setContent(previewHtml, { waitUntil: "networkidle0" });

    // Get root of page
    const pageFrame = page.mainFrame();
    const rootHandle = await pageFrame.$("body > *");

    // Take screenshot
    screenshot = await rootHandle.screenshot({
      path: output,
      omitBackground: true,
      type,
      quality: type === "jpeg" ? jpegQuality : undefined
    });
  }

  if (!userBrowser) {
    browser.close();
  } else {
    page.close();
  }

  return screenshot;
};
