import { resolveBaseParams, resolveParams } from ".";
const handlebars = require("handlebars");

export default ({ body, styles, templateParams, size }) =>
  handlebars.compile(
    `
<html>
  <head>
    {{{head}}}

    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        background: transparent;
        overflow: hidden;
        width: {{width}}px;
        height: {{height}}px;
      }

      {{{styles}}}
    </style>
  </head>

  <body>
    {{{body}}}
  </body>

</html>
  `
  )({
    ...resolveBaseParams(templateParams, size),
    body: handlebars.compile(body)(resolveParams(templateParams, size)),
    styles
  });
