import { getImage } from "../index";

describe("puppeteer-social-image", () => {
  describe("getImage", () => {
    it("must generate an image as expected", () => {
      getImage({
        template: "Pretty",
        templateParams: {
          title: "Hello, world"
        },
        output: "image.png", // Optional, if supplied write to path
        size: "facebook" // Defaults to twitter, as smallest
      });

      expect(true);
    });
  });
});
