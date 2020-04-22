module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/g6-demo/" : "/",
  chainWebpack: config => {
      config.module.rules.delete('eslint');
  }
};