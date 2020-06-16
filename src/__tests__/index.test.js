import fs from "fs";
import tempy from "tempy";
import renderSocialImage, { setTestMode } from "../index";
import puppeteer from "puppeteer";
import FileType from "file-type";

const snapshotConfig = {
  failureThreshold: 0.025,
  failureThresholdType: "percent",
  dumpDiffToConsole: true
};

// Disable external fonts when testing
setTestMode(true);

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

    it("must use the correct default content type", async () => {
      const data = await renderSocialImage({
        templateParams: {
          title: "Hello, twitter! @chrisvxd"
        },
        size: "facebook"
      });

      const { mime } = await FileType.fromBuffer(data);

      expect(mime).toEqual("image/jpeg");
    });

    it("must use the correct content type when specified", async () => {
      const data = await renderSocialImage({
        templateParams: {
          title: "Hello, twitter! @chrisvxd"
        },
        size: "facebook",
        type: "png"
      });

      const { mime } = await FileType.fromBuffer(data);

      expect(mime).toEqual("image/png");
    });

    it("must infer the content from the path, even when type is specified", async () => {
      const data = await renderSocialImage({
        output: tempPath,
        templateParams: {
          title: "Hello, twitter! @chrisvxd"
        },
        size: "facebook",
        type: "jpeg"
      });

      const { mime } = await FileType.fromBuffer(data);

      expect(mime).toEqual("image/png");
    });

    it("must generate an image with a custom size", async () => {
      await renderSocialImage({
        templateParams: {
          title: "Hello, twitter! @chrisvxd"
        },
        output: tempPath,
        size: "512x512"
      });

      const testImage = fs.readFileSync(tempPath);

      expect(testImage).toMatchImageSnapshot(snapshotConfig);
    });

    it("must accept a custom browser instance", async () => {
      const browser = await puppeteer.launch();

      const spy = jest.spyOn(browser, "newPage");

      await renderSocialImage({
        templateParams: {
          title: "Hello, twitter! @chrisvxd"
        },
        output: tempPath,
        size: "facebook",
        browser
      });

      const testImage = fs.readFileSync(tempPath);

      expect(spy).toHaveBeenCalled();

      expect(testImage).toMatchImageSnapshot(snapshotConfig);

      await browser.close();
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

      // it("must accept googleFont param", async () => {
      //   await renderSocialImage({
      //     templateParams: {
      //       title: "Hello, twitter! @chrisvxd",
      //       googleFont: "Sigmar One"
      //     },
      //     output: tempPath,
      //     compileArgs: {
      //       testMode: false
      //     }
      //   });

      //   const testImage = fs.readFileSync(tempPath);

      //   expect(testImage).toMatchImageSnapshot(snapshotConfig);
      // });

      it("must pass all params to custom templates", async () => {
        // These params were previously suppressed, causing confusion when creating custom templates
        const body = `<div style="background: white; font-family: Sigmar One; font-size: 48px;">
      <p>Name: {{ name }}</p>
      <p>googleFont: {{googleFont}}</p>
      <p>fontFamily: {{fontFamily}}</p>
      <p>unsplashId: {{unsplashId}}</p>
      <p>unsplashKeywords: {{unsplashKeywords}}</p>
      <p>size: {{size.width}}x{{size.height}}</p>
    </div>`;

        const styles = "";

        await renderSocialImage({
          templateParams: {
            name: "@chrisvxd",
            googleFont: "Sigmar One",
            unsplashKeywords: "cat"
          },
          templateBody: body,
          templateStyles: styles,
          output: tempPath,
          compileArgs: {
            testMode: true // We don't actually need to render googleFont
          }
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
      });

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

      it("must accept logo param", async () => {
        await renderSocialImage({
          templateParams: {
            title: "Hello, twitter! @chrisvxd",
            logo: "https://i.imgur.com/L5ujMCQ.png"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
      });

      it("must accept watermark param", async () => {
        await renderSocialImage({
          templateParams: {
            title: "Hello, twitter! @chrisvxd",
            watermark: "example.com"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
      });

      it("must accept logo and watermark param", async () => {
        await renderSocialImage({
          templateParams: {
            title: "Hello, twitter! @chrisvxd",
            watermark: "example.com",
            logo: "https://i.imgur.com/L5ujMCQ.png"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
      });

      it("must generate as a preview image as expected", async () => {
        await renderSocialImage({
          templateParams: {
            title: "Hello, twitter! @chrisvxd"
          },
          output: tempPath,
          size: "facebook",
          preview: true
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
      });

      it("must not generate as a preview image when using an invalid preview size", async () => {
        await renderSocialImage({
          templateParams: {
            title: "Hello, twitter! @chrisvxd"
          },
          output: tempPath,
          size: "ig-story",
          preview: true
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
            unsplashId: "2S4FDh3AtGw",
            watermark: "example.com",
            logo: "https://i.imgur.com/L5ujMCQ.png"
          },
          size: "facebook",

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

      it("must generate as a preview image as expected", async () => {
        await renderSocialImage({
          template: "article",
          templateParams: {
            eyebrow: "27 AUGUST / REMOTE",
            title: "What not to do when remote working",
            unsplashId: "2S4FDh3AtGw"
          },
          output: tempPath,
          size: "facebook",
          preview: true
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
      });
    });

    describe("fiftyfifty Template", () => {
      it("must accept expected params", async () => {
        await renderSocialImage({
          template: "fiftyfifty",
          templateParams: {
            title: "What not to do when remote working",
            unsplashId: "2S4FDh3AtGw"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
      });

      it("must accept split=diagonal param", async () => {
        await renderSocialImage({
          template: "fiftyfifty",
          templateParams: {
            title: "What not to do when remote working",
            split: "diagonal",
            unsplashId: "2S4FDh3AtGw"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
      });

      it("must accept split=diagonal-reverse param", async () => {
        await renderSocialImage({
          template: "fiftyfifty",
          templateParams: {
            title: "What not to do when remote working",
            split: "diagonal-reverse",
            unsplashId: "2S4FDh3AtGw"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
      });

      it("must prefer watermark to footer", async () => {
        await renderSocialImage({
          template: "fiftyfifty",
          templateParams: {
            title: "What not to do when remote working",
            footer: "Test Footer",
            watermark: "Test Watermark",
            unsplashId: "2S4FDh3AtGw"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
      });

      it("must accept optional params", async () => {
        await renderSocialImage({
          template: "fiftyfifty",
          templateParams: {
            title: "What not to do when remote working",
            subtitle: "A simple guide on what to avoid when working at home.",
            footer: "Test Footer",
            logo:
              "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0nMjA5NicgaGVpZ2h0PSc0NDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz48cmVjdCBmaWxsPScjRkZFNjAwJyB3aWR0aD0nNDQwJyBoZWlnaHQ9JzQ0MCcgcng9JzUyJy8+PGcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoODYgMTQyKSc+PHBhdGggZD0nTTE3Ni4xMzkgOTcuMTVsLTE2LjA5MSA1Mi45MDNTMTU4Ljg2NCAxNTUgMTUzLjY1NSAxNTVoLTE5Ljg4N2MtNi4xNTUgMC03LjU3Ni01LjQxOC03LjU3Ni01LjQxOGwtMjMuNjc1LTc1LjE0NC0yMy42NzUgNzUuMTQ0Uzc3LjQyMiAxNTUgNzEuMjY2IDE1NUg1MC40M2MtNS4yMDggMC02LjM5Mi00Ljk0Ny02LjM5Mi00Ljk0N0wuMjQgNi44MzFDLS40NyA0LjAwNS4yNCAwIDQuNTAyIDBoMjYuMDQzYzcuMTAzIDAgOC41MjMgNC43MTEgOS40NyA3LjUzOGwyMy40MzkgODAuMDkxTDg2LjE4IDcuNTM4Qzg3LjEyOCA0LjI0IDg4Ljc4NSAwIDk0LjIzMSAwaDE2LjU3MmM1LjIwOSAwIDYuODY2IDQuMjQgNy44MTMgNy41MzhsMjIuOTY1IDgwLjA5MSAyMy40MzgtODAuMDkxYy42Mi0yLjQ2NyAxLjk2Mi02LjM3IDcuMDE1LTcuMzIzLjY1LS4xNDIgMS40LS4yMTUgMi4yNjUtLjIxNWg0Ny40NDlDMjU4LjAyIDAgMjc3IDE5LjcyNCAyNzcgNDguNjhjMCAyOS4xNjUtMTkuNDAxIDQ4LjQ3LTU1LjQ2MyA0OC40N0gxNzYuMTR6bTQ0LjcyLTMwLjY0NWMxNS4zNzIgMCAyMi4wNzMtOC40MzEgMjIuMDczLTE4LjIzNSAwLTEwLjE5Ny02LjctMTguNDMyLTIyLjA3Mi0xOC40MzJoLTIzLjQ0M2wtMTEuMTcyIDM2LjY2N2gzNC42MTV6JyBmaWxsLW9wYWNpdHk9Jy44NycgZmlsbD0nIzAwMCcvPjxjaXJjbGUgZmlsbD0nIzIxMUQwMCcgY3g9JzI2MycgY3k9JzE0MScgcj0nMTQnLz48L2c+PHRleHQgZm9udC1mYW1pbHk9J0F2ZW5pck5leHQtRGVtaUJvbGQsIEF2ZW5pciBOZXh0JyBmb250LXNpemU9JzIxMCcgZm9udC13ZWlnaHQ9JzUwMCcgbGV0dGVyLXNwYWNpbmc9JzE3LjIxMycgZmlsbD0nIzIxMUQwMCc+PHRzcGFuIHg9JzU2MCcgeT0nMjk3Jz5XRUxMUEFJRC5JTzwvdHNwYW4+PC90ZXh0PjwvZz48L3N2Zz4=",
            unsplashId: "2S4FDh3AtGw"
          },
          output: tempPath
        });

        const testImage = fs.readFileSync(tempPath);

        expect(testImage).toMatchImageSnapshot(snapshotConfig);
      });

      it("must generate as a preview image as expected", async () => {
        await renderSocialImage({
          template: "fiftyfifty",
          templateParams: {
            title: "What not to do when remote working",
            unsplashId: "2S4FDh3AtGw"
          },
          output: tempPath,
          size: "facebook",
          preview: true
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
          font-family: Arial;
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
          font-family: Arial;
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
