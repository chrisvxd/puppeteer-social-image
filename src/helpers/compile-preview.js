/* eslint-disable no-console */

const handlebars = require("handlebars");

export default ({ image, compileArgs }) => {
  const b64 = image.toString("base64");
  const dataUri = "data:image/jpeg;base64," + b64;

  const compiled = handlebars.compile(
    `
<html>
  <head>
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        background: transparent;
        overflow: hidden;
        height: 100%;
      }

      {{{styles}}}
    </style>
  </head>

  <body>
    <div style="background: white; border-radius: 8px; border-width: 1px; border-style: solid; border-color: #CCD6DD; color: black; width: 509px; font-family: sans-serif;">
      <div style="border-top-left-radius: 7px; border-top-right-radius: 7px; width: 100%; height: 266px; overflow: hidden; background-size: cover; background-repeat: no-repeat; background-image: url('{{dataUri}}');">
      </div>
      <div style="border-top-width: 1px; border-top-style: solid; border-top-color: #CCD6DD; padding: 8px;">
        <div style="margin-bottom: 4;">Web page</div>
        <div style="color: rgb(101, 119, 134); margin-bottom: 4px;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
        <div style="color: rgb(101, 119, 134);">example.com</div>
      </div>
    </div>
  </body>

</html>
  `
  )({
    dataUri
  });

  if (compileArgs.log) {
    console.log("Compiled Output:", compiled);
  }

  return compiled;
};
