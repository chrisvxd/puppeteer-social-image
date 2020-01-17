const handlebars = require("handlebars");

export default handlebars.compile(`
<html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Lato:400,500,600,700,800,900&display=swap" rel="stylesheet">

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
