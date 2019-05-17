import { baseTemplate } from "../base";
import basicTemplate from "./template.hbs";

const buildStyles = ({
  backgroundImageUrl = "https://images.unsplash.com/photo-1557787108-f84b241bf836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  color = "black",
  fontFamily = '"Avenir Next", "Lato", "Helvetica Neue", sans-serif',
  fontSize = "128px",
  fontWeight = "700"
} = {}) => `
.Main {
  align-items: center;
  background-image: url("${backgroundImageUrl}");
  background-size: cover;
  color: ${color};
  display: flex;
  justify-content: center;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  font-weight: ${fontWeight};
  padding: 32px;
  text-align: center;
  width: 100%;
  height: 100%;
}
`;

export default ({ size, templateParams }) =>
  baseTemplate({
    body: basicTemplate(templateParams),
    height: size.height,
    styles: buildStyles(templateParams),
    width: size.width
  });
