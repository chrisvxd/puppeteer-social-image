import buildBase from "../base";

const buildStyles = ({
  backgroundImageUrl = "https://images.unsplash.com/photo-1557787108-f84b241bf836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
} = {}) => `
.Main {
  align-items: center;
  background-image: url("${backgroundImageUrl}");
  background-size: cover;
  display: flex;
  justify-content: center;
  font-family: "Avenir Next", "Lato", "Helvetica Neue", sans-serif;
  font-size: 128px;
  font-weight: 700;
  padding: 32px;
  text-align: center;
  width: 100%;
  height: 100%;
}
`;

export default ({ size, title }) =>
  buildBase({
    body: `<div class="Main">${title}</div>`,
    size,
    styles: buildStyles()
  });
