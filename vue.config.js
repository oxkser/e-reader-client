/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 16:09:47
 * @LastEditTime: 2019-08-12 16:12:47
 * @LastEditors: Please set LastEditors
 */
"use strict";
const webpackConfig = require("./build");

module.exports = {
  // 工程项目路径
  publicPath: "./",
  configureWebpack: {
    devtool: "source-map",
    ...webpackConfig
  }
};
