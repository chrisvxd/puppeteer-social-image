import { resolveBaseParams, resolveParams } from ".";
const handlebars = require("handlebars");

export default ({ body, styles, templateParams, size }) =>
  handlebars.compile(
    `
<html>
  <head>
    {{#unless testMode}}
      {{#if googleFont}}
        <link href="https://fonts.googleapis.com/css?family={{googleFont}}:400,500,600,700,800,900&display=swap" rel="stylesheet">
      {{/if}}
    {{/unless}}

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
