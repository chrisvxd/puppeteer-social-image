import buildBase from "../base";

const styles = `
.Main {
  align-items: center;
  background: hotpink;
  display: flex;
  justify-content: center;
  font-weight: 800;
}
`;

export default ({ size, title }) =>
  buildBase({ body: `<div>${title}</div>`, size, styles });
