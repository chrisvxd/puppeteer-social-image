/* eslint-disable no-console */

const handlebars = require("handlebars");

export default ({ body, compileArgs }) => {
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
        font-size: 2.37em; /* Approximately 1200 / 507 (target size) */
      }

      {{{styles}}}
    </style>
  </head>

  <body>
    <div style="background: white; border-radius: 8px; border-width: 1px; border-style: solid; border-color: #CCD6DD; color: black; font-family: Arial;">
      <div style="border-top-left-radius: 16.59px; border-top-right-radius: 16.59px; width: 100%; height: 630px; width: 1200px; overflow: hidden;">
        {{{body}}}
      </div>
      <div style="border-top-width: 1px; border-top-style: solid; border-top-color: #CCD6DD; padding: 18.97px;">
        <div style="margin-bottom: 9.48px;">Web page</div>
        <div style="color: rgb(101, 119, 134); margin-bottom: 9.48px;">
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
    body
  });

  if (compileArgs.log) {
    console.log("Compiled Output:", compiled);
  }

  return compiled;
};
