import { compileImageTemplate } from "../helpers";

export default ({
  templateParams: { fontWeight = "700", fontSize = "128px", ...templateParams },
  ...params
}) =>
  compileImageTemplate({
    ...params,
    body: `
      <div class="Content">
        {{title}}
      </div>
    `,
    styles: `
      .Content {
        align-items: center;
        display: flex;
        justify-content: center;
        font-size: ${fontSize};
        font-weight: ${fontWeight};
        line-height: 1.2;
        text-align: center;
        padding: 32px;
        width: 100%;
        height: 100%;
      }
    `,
    templateParams
  });
