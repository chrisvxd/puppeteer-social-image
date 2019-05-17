import fs from "fs";
import tempy from "tempy";
import renderSocialImage from "../index";

describe("puppeteer-social-image", () => {
  describe("renderSocialImage", () => {
    let tempPath;

    beforeEach(() => {
      tempPath = tempy.file({ extension: "png" });
    });

    it("must generate an image as expected", async () => {
      await renderSocialImage({
        templateParams: {
          title: "Hello, twitter! @chrisvxd"
        },
        output: tempPath,
        size: "facebook"
      });

      const testImage = fs.readFileSync(tempPath);

      expect(testImage).toMatchImageSnapshot();
    });

    describe("basicTemplate", () => {
      it("must accept backgroundImageUrl param", async () => {
        await renderSocialImage({
          templateParams: {
            title: "Hello, twitter! @chrisvxd",
            backgroundImageUrl:
              "https://images.unsplash.com/photo-1557996199-8d219159a1d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=30"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot();
      });

      it("must accept color param", async () => {
        await renderSocialImage({
          templateParams: {
            title: "Hello, twitter! @chrisvxd",
            color: "hotpink"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot();
      });

      it("must accept fontFamily param", async () => {
        await renderSocialImage({
          templateParams: {
            title: "Hello, twitter! @chrisvxd",
            fontFamily: '"Times New Roman"'
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot();
      });

      it("must accept fontSize param", async () => {
        await renderSocialImage({
          templateParams: {
            title: "Hello, twitter! @chrisvxd",
            fontSize: "64px"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot();
      });

      it("must accept fontWeight param", async () => {
        await renderSocialImage({
          templateParams: {
            title: "Hello, twitter! @chrisvxd",
            fontWeight: "400"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot();
      });
    });

    it("must generate an image with a custom template", async () => {
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

      await renderSocialImage({
        templateBody: body,
        templateStyles: styles,
        templateParams: {
          name: "@chrisvxd"
        },
        output: tempPath
      });

      const testImage = fs.readFileSync(tempPath);

      expect(testImage).toMatchImageSnapshot();
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

      await renderSocialImage({
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
          name: "chrisvxd"
        },
        output: tempPath
      });

      const testImage = fs.readFileSync(tempPath);

      expect(testImage).toMatchImageSnapshot();
    });
  });
});
