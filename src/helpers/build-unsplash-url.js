export default ({ unsplashId, unsplashKeywords, size }) => {
  const baseUrl = "https://source.unsplash.com";
  const sizeStr = `${size.width}x${size.height}`;

  if (unsplashId) {
    return `${baseUrl}/${unsplashId}/${sizeStr}`;
  } else if (unsplashKeywords) {
    return `${baseUrl}/${sizeStr}?${unsplashKeywords}`;
  }

  throw new Error("No ID or keywords specified for unsplash URL");
};
