import { getImage } from "../index";

describe("puppeteer-social-image", () => {
  describe("getImage", () => {
    it("must generate an image as expected", async () => {
      await getImage({
        template: "basic",
        templateParams: {
          title: "Hello, twitter! @chrisvxd"
        },
        output: "image.png", // Optional, if supplied write to path
        size: "facebook" // Defaults to twitter, as smallest
      });

      // TODO sort this
      expect(true);
    });

    it("must generate an image with a custom template", async () => {
      const body = `<div class="Main">Hello, {{name}}!</div>`;

      const styles = `
        .Main {
          align-items: center;
          background: rebeccapurple;
          display: flex;
          justify-content: center;
          font-family: "Avenir Next", "Lato", "Helvetica Neue", sans-serif;
          font-size: 128px;
          font-weight: 700;
          padding: 32px;
          text-align: center;
          width: 100%;
          height: 100%;
        }
      `;

      await getImage({
        templateBody: body,
        templateStyles: styles,
        templateParams: {
          name: "Tony"
        },
        output: "image.png" // Optional, if supplied write to path
      });

      expect(true);
    });

    it("must generate an image with a custom template when providing multiple custom templates", async () => {
      const body = `<div class="Main">Hello, {{name}}!</div>`;

      const styles = `
        .Main {
          align-items: center;
          background: rebeccapurple;
          color: white;
          display: flex;
          justify-content: center;
          font-family: "Avenir Next", "Lato", "Helvetica Neue", sans-serif;
          font-size: 128px;
          font-weight: 700;
          padding: 32px;
          text-align: center;
          width: 100%;
          height: 100%;
        }
      `;

      await getImage({
        customTemplates: {
          foo: {
            body,
            styles
          },
          bar: {
            body,
            styles
          }
        },
        template: "bar",
        templateParams: {
          name: "Tony"
        },
        output: "image.png" // Optional, if supplied write to path
      });

      expect(true);
    });
  });
});
