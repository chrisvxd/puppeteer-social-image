export default ({ templateParams, size, compileArgs }) => {
  const {
    fontFamily = templateParams.googleFont
      ? `"${templateParams.googleFont}", Arial`
      : "Arial"
  } = templateParams;

  return {
    googleFont: templateParams.googleFont
      ? templateParams.googleFont.replace(" ", "+")
      : null,
    fontFamily,
    height: size.height,
    width: size.width,
    testMode: compileArgs.testMode
  };
};
