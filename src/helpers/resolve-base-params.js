export default (_, size, compileArgs) => ({
  height: size.height,
  width: size.width,
  testMode: compileArgs.testMode
});
