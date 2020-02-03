import { compileTemplate, resolveParams } from ".";

const buildStyles = ({
  background = "white",
  imageUrl,
  color = background === "white" && !imageUrl ? "black" : "white",
  additionalStyles = ""
} = {}) => `
${additionalStyles}

.Image {
  width: 100%;
  height: 100%;
  background-size: cover;  
  background-repeat: no-repeat;
  background-origin: center;
}

.Main {
  background: ${imageUrl ? "transparent" : background};
  position: relative;
  width: 100%;
  height: 100%;
}

.Inner {
  background: ${imageUrl ? "transparent" : background};
  color: ${color};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
`;

export default ({ body, styles, templateParams, ...params }) =>
  compileTemplate({
    body: `
      <div class="Main">
        {{#if imageUrl}}
          <div class="Image" style="background-image: {{#if backgroundImageOverlay}}linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%), {{/if}}url('{{imageUrl}}');"></div>
        {{/if}}

        <div class="Inner">
          ${body}
        </div>
      </div>
    `,
    styles: buildStyles(
      resolveParams({
        templateParams: {
          ...templateParams,
          additionalStyles: styles
        },
        size: params.size
      })
    ),
    templateParams: { googleFont: "Lato", ...templateParams },
    ...params
  });
