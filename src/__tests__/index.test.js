import fs from "fs";
import tempy from "tempy";
import renderSocialImage from "../index";

const snapshotConfig = {
  failureThreshold: 0.05,
  failureThresholdType: "percent",
  dumpDiffToConsole: true
};

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

      expect(testImage).toMatchImageSnapshot(snapshotConfig);
    });

    describe("basic Template", () => {
      it("must accept imageUrl param", async () => {
        await renderSocialImage({
          templateParams: {
            title: "Hello, twitter! @chrisvxd",
            imageUrl:
              "https://images.unsplash.com/photo-1557996199-8d219159a1d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=30"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
      });

      it("must accept unsplashId param", async () => {
        await renderSocialImage({
          templateParams: {
            title: "Hello, twitter! @chrisvxd",
            unsplashId: "2S4FDh3AtGw"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
      });

      // Can't test keywords because it uses a random image each time
      // it("must accept unsplashKeywords param", async () => {
      //   await renderSocialImage({
      //     templateParams: {
      //       title: "Hello, twitter! @chrisvxd",
      //       unsplashKeywords: "mountains"
      //     },
      //     output: tempPath
      //   });

      //   const testImage = fs.readFileSync(tempPath);

      //   expect(testImage).toMatchImageSnapshot(snapshotConfig);
      // });

      it("must accept background param", async () => {
        await renderSocialImage({
          templateParams: {
            title: "Hello, twitter! @chrisvxd",
            background: "blue"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
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

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
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

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
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

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
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

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
      });

      it("must accept watermarkUrl param", async () => {
        await renderSocialImage({
          templateParams: {
            title: "Hello, twitter! @chrisvxd",
            watermarkUrl: "EXAMPLE.COM"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
      });

      it("must accept watermarkText param", async () => {
        await renderSocialImage({
          templateParams: {
            title: "Hello, twitter! @chrisvxd",
            watermark: "EXAMPLE.COM"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
      });
    });

    describe("article Template", () => {
      it("must accept expected params", async () => {
        await renderSocialImage({
          template: "article",
          templateParams: {
            eyebrow: "27 AUGUST / REMOTE",
            title: "What not to do when remote working",
            unsplashId: "2S4FDh3AtGw"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
      });

      it("must accept subtitle", async () => {
        await renderSocialImage({
          template: "article",
          templateParams: {
            eyebrow: "27 AUGUST / REMOTE",
            title: "What not to do when remote working",
            subtitle: "A simple guide on what to avoid when working at home."
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
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
          font-family: "Lato", "Helvetica Neue", sans-serif;
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

      expect(testImage).toMatchImageSnapshot(snapshotConfig);
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
          font-family: "Lato", "Helvetica Neue", sans-serif;
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

      expect(testImage).toMatchImageSnapshot(snapshotConfig);
    });
  });
});
