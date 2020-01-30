/* eslint-disable no-console */

import { resolveBaseParams, resolveParams } from ".";
const handlebars = require("handlebars");

export default ({
  body,
  styles,
  templateParams,
  size,
  compileArgs,
  imageSize
}) => {
  const baseParams = resolveBaseParams({
    templateParams,
    size,
    imageSize,
    compileArgs
  });
  const params = resolveParams({
    templateParams,
    size,
    imageSize,
    compileArgs
  });

  const compiledBody = handlebars.compile(body)(params);

  const compiled = handlebars.compile(
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
        {{#if fontFamily}}font-family: {{{fontFamily}}};{{/if}}
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
    ...baseParams,
    body: compiledBody,
    styles
  });

  if (compileArgs.log) {
    console.log(
      "Unresolved Template Params:",
      JSON.stringify(templateParams, null, 2)
    );
    console.log("Base Template Params:", JSON.stringify(baseParams, null, 2));
    console.log("Template Params:", JSON.stringify(params, null, 2));
    console.log("---");
    console.log("Compiled Output:", compiled);
  }

  return {
    html: compiled,
    body: compiledBody,
    styles
  };
};
