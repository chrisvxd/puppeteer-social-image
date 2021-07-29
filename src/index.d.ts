declare module "puppeteer-social-image" {
  import puppeteer from "puppeteer";

  interface Options {
    /**
     * Name of a prebuilt template. One of: `basic`, `article`, `fiftyfifty`
     * @default "basic"
     */
    template?: string;
    /**
     * Params to be passed to the template. If using prebuilt templates, see below for APIs.
     */
    templateParams: TemplateOptionsBasic | TemplateOptionsArticle | TemplateOptionsFiftyfifty;
    /**
     * Handlebars template to render in the body for a custom template. Populated with templateParams.
     */
    templateBody?: string;
    /**
     * CSS to use for a custom template. Passed to the head.
     */
    templateStyles?: string;
    /**
     * Define multiple custom templates
     */
    customTemplates?: {
      /**
       * Name for the customTemplate
       */
      [key: string]: {
        /**
         * Handlebars template to render in the body for this custom template.Populated with templateParams.
         */
        templateBody: string;
        /**
         * CSS to use for this custom template.Passed to the head
         */
        templateStyles: string;
      };
    };
    /**
     * Path to write image
     */
    output?: string;
    /**
     * Type of the output image. Overwritten by output path extension. One of: `jpeg`, `png`
     * @default "jpeg"
     */
    type?: string;
    /**
     * JPEG image quality
     * @default 90
     */
    jpegQuality?: number;
    /**
     * Preset size for the image. One of: `facebook`, `twitter`, `ig-landscape`, `ig-portrait`, 
     * `ig-square`, `ig-story`, `WIDTHxHEIGHT` (any width, height pairing)
     * @default "twitter"
     */
    size?: string;
    /**
     * Browser Instance of puppeteer's Browser to use instead of the internal version. 
     * Useful for serverless functions, which may require chrome-aws-lambda. 
     * This browser instance will not be automatically closed.
     * Hint: Use `await` when initializing the `Browser` instance.
     */
    browser?: puppeteer.Browser;
    /**
     * Render the image with a chrome, as it would look on Twitter
     * @default false
     */
    preview?: boolean;
  }

  interface TemplateOptions {
    /**
     * Title text for the image
     */
    title: string;
    /**
     * URL to a logo to render above the text
     */
    logo?: string;
    /**
     * URL for the background image
     */
    imageUrl?: string;
    /**
     * Unsplash ID for the background image
     */
    unsplashId?: string;
    /**
     * Unsplash keywords to use for the background image
     */
    unsplashKeywords?: string;
    /**
     * Name for Google font to load
     */
    googleFont?: string;
    /**
     * Font family
     * @default "Lato', 'Helvetica Neue', sans-serif"
     */
    fontFamily?: string;
    /**
     * Watermark text to render at the bottom of the image.
     */
    watermark?: string;
  }

  interface TemplateOptionsBasic extends TemplateOptions {
    /**
     * Anchor point for the background image. Valid options are `C`, `N`, `NE`, `E`, `SE`, `S`, `SW`, `W` or `NW`.
     * @default "C"
     */
    backgroundImageAnchor?: string;
    /**
     * Add a dark overlay on top of the background image
     * @default true
     */
    backgroundImageOverlay?: boolean;
    /**
     * CSS background prop. Prefer imageUrl if using image.
     */
    background?: string;
    /**
     * Color for the title
     * @default "white"
     */
    color?: string;
    /**
     * Font size
     * @default "128px"
     */
    fontSize?: string;
  }

  interface TemplateOptionsArticle extends TemplateOptions {
    /**
     * Subtitle text
     */
    subtitle?: string;
    /**
     * Eyebrow text, rendered above the title, like a date
     */
    eyebrow?: string;
    /**
     * Anchor point for the background image. Valid options are `C`, `N`, `NE`, `E`, `SE`, `S`, `SW`, `W` or `NW`.
     * @default "C"
     */
    backgroundImageAnchor?: string;
    /**
     * Add a dark overlay on top of the background image
     * @default true
     */
    backgroundImageOverlay?: boolean;
    /**
     * CSS background prop. Prefer imageUrl if using image.
     */
    background?: string;
    /**
     * Color for the title
     * @default "white"
     */
    color?: string;
  }

  interface TemplateOptionsFiftyfifty extends TemplateOptions {
    /**
     * Subtitle text
     */
    subtitle?: string;
    /**
     * Footer text
     */
    footer: string;
    /**
     * Style of split between content and image. On of: `straight`, `diagonal`, `diagonal-reverse`
     * @default "straight"
     */
    split?: string;
  }

  /**
   * Generates a social image and stores it.
   * @param opts Options for social image creation
   */
  function renderSocialImage(opts: Options): Promise<Buffer>;
  export = renderSocialImage;
}
