const errorMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = "An error has occured";
    ctx.app.emit("error", err, ctx);
  }
};

module.exports = errorMiddleware;
