const handlebars = require("handlebars");

export default handlebars.compile(`
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
        width: {{width}}px;
        height: {{height}}px;
      }

      {{{styles}}}
    </style>

    {{{head}}}
  </head>

  <body>
    {{{body}}}
  </body>

</html>
`);
