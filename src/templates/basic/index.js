import { baseTemplate } from "../base";
import basicTemplate from "./template.hbs";
import ImageCss from "./ImageCss.js";

const buildStyles = ({
  background = "black",
  backgroundImageUrl,
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
  background: ${backgroundImageUrl ? "transparent" : background};
  position: relative;
  width: 100%;
  height: 100%;
  z-index: -2;
}

.Inner {
  align-items: center;
  background: ${backgroundImageUrl ? "transparent" : background};
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
      ...templateParams
    }),
    height: size.height,
    styles: buildStyles(templateParams),
    width: size.width
  });
