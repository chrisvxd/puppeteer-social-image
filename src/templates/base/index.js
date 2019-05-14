// import styles from "./styles.css";

export default ({ body, head = "", styles = "", size }) => {
  const { width, height } = size;

  return `
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
            ${width ? "width: " + width + "px;" : ""}
            ${height ? "height: " + height + "px;" : ""}
          }

          ${styles}
        </style>
        ${head}
      </head>
      <body>
        ${body}
      </body>
    </html>
  `;
};
