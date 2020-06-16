import { buildUnsplashUrl } from ".";

export default ({ templateParams, size, imageSize = size }) => {
  const { unsplashId, unsplashKeywords, googleFont } = templateParams;

  let imageUrl = templateParams.imageUrl;

  if (unsplashId) {
    imageUrl = buildUnsplashUrl({ unsplashId, size: imageSize });
  } else if (unsplashKeywords) {
    imageUrl = buildUnsplashUrl({ unsplashKeywords, size: imageSize });
  }

  return {
    fontFamily: `"${googleFont}", Arial`,
    size,
    ...templateParams,
    backgroundImageOverlay:
      typeof templateParams.gradient !== "undefined"
        ? templateParams.gradient
        : true,
    imageUrl,
    includeWatermark:
      templateParams.watermarkUrl || templateParams.watermark || false
  };
};
