const HOST = {
  LOCAL: ["127.0.0.1", 9000, "http"],
  LOCAL1: ['192.168.43.216', 9000, 'HTTP'],
  LOCAL2: ['localhost',9000, 'HTTP']
};

const config = HOST.LOCAL2;

const createProxyTable = (
  keys = [],
  ip = "127.0.0.1",
  port = "8080",
  protocol = "http"
) => {
  const proxyTable = {};

  keys.map((d, i) => {
    proxyTable[d] = {
      target: protocol + "://" + ip + ":" + port + "/",
      changeOrigin: true
    };
  });

  return proxyTable;
};

const proxy = {
  ...createProxyTable(
    [
      "/api/"
    ],
    ...config
  ),
  "/ws/**": {
    // websocket 反向代理
    target: `ws://${config[0]}:${config[1]}`,
    ws: true,
    secure: false
  }
  // "/arcgis/rest/services/WEBMAP": {
  //   target: "http://192.168.0.175/"
  // }
};

module.exports = {
  ...proxy
}