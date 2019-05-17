import { baseTemplate } from "../base";
import basicTemplate from "./template.hbs";
import ImageCss from "./ImageCss.js";

const buildStyles = ({
  color = "white",
  fontFamily = '"Avenir Next", "Lato", "Helvetica Neue", sans-serif',
  fontSize = "128px",
  fontWeight = "700"
} = {}) => `
.Background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

${ImageCss};

.Main {
  position: relative;
  width: 100%;
  height: 100%;
}

.Inner {
  align-items: center;
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
    body: basicTemplate({
      backgroundImageAnchor: "C",
      backgroundImageOverlay: true,
      backgroundImageUrl:
        "https://images.unsplash.com/photo-1557787108-f84b241bf836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      ...templateParams
    }),
    height: size.height,
    styles: buildStyles(templateParams),
    width: size.width
  });
