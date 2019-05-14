import "@babel/polyfill";
import path from "path";
import puppeteer from "puppeteer";
import templates from "./templates";
import tempy from "tempy";

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
export const getImage = async ({
  jpegQuality = 90,
  output,
  size = "twitter",
  template = "basic",
  templateParams
}) => {
  // Resolve preferences
  const _size = sizeMap[size];
  const { width, height } = _size;
  const buildTemplate = templates[template];
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

  // Build template and set to puppeteer
  const html = buildTemplate({ ...templateParams, size: _size });
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
