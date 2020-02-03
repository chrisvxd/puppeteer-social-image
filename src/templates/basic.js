import { compileImageTemplate } from "../helpers";

export default ({
  templateParams: { fontWeight = "800", fontSize = "80px", ...templateParams },
  ...params
}) =>
  compileImageTemplate({
    ...params,
    body: `
      <div
        class="body"
      >
        <div class="logo">
          <div class="logo-inner">
            {{#if logo}}<img src="{{logo}}" />{{/if}}
          </div>
        </div>
        <h1>{{title}}</h1>
        <div class="watermark">
          {{#if includeWatermark}}
          <div
            class="watermark-inner"
          >
            {{watermark}}
          </div>
          {{/if}}
        </div>
      </div>
    `,
    styles: `
      .body {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 48px 152px;
        height: 100%;
      }

      h1 {
        display: flex;
        align-items: center;
        flex-grow: 1;
        font-size: ${fontSize};
        font-weight: ${fontWeight};
        text-align: center;
        margin: 0;
      }

      .logo {
        height: 100px;
        width: 100%;
        margin-bottom: 24px;
        max-width: 150px;
      }
      .logo-inner {
        align-items: center;
        display: flex;
        justify-content: center;
        font-size: 48px;
      }

      .logo-inner img{
        height: 100px;
      }

      .logo-text {
        font-weight: 600;
        margin-left: 24px;
        whitespace: nowrap;
      }
      .watermark {
        margin-top: 40px;
        height: 80px;
        opacity: 0.7;
      }
      .watermark-inner {
        font-size: 32px;
        font-weight: 500;
      }
    `,
    templateParams
  });
