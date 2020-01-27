import { buildUnsplashUrl } from ".";

export default ({ unsplashId, unsplashKeywords, ...params }, size) => {
  let imageUrl = params.imageUrl;

  if (unsplashId) {
    imageUrl = buildUnsplashUrl({ unsplashId, size });
  } else if (unsplashKeywords) {
    imageUrl = buildUnsplashUrl({ unsplashKeywords, size });
  }

  return {
    ...params,
    backgroundImageOverlay:
      typeof params.gradient !== "undefined" ? params.gradient : true,
    imageUrl,
    includeWatermark: params.watermarkUrl || params.watermark || false
  };
};
