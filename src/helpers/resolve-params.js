import { buildUnsplashUrl } from ".";

export default ({
  templateParams: { unsplashId, unsplashKeywords, googleFont, ...params },
  size,
  imageSize = size
}) => {
  let imageUrl = params.imageUrl;

  if (unsplashId) {
    imageUrl = buildUnsplashUrl({ unsplashId, size: imageSize });
  } else if (unsplashKeywords) {
    imageUrl = buildUnsplashUrl({ unsplashKeywords, size: imageSize });
  }

  return {
    fontFamily: `"${googleFont}", Arial`,
    ...params,
    backgroundImageOverlay:
      typeof params.gradient !== "undefined" ? params.gradient : true,
    imageUrl,
    includeWatermark: params.watermarkUrl || params.watermark || false
  };
};
