
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/perfil",
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-MXUYZKDR.js",
      "chunk-AXLDL4WR.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-CXU2SGXN.js",
      "chunk-AXLDL4WR.js"
    ],
    "route": "/perfil"
  },
  {
    "renderMode": 2,
    "redirectTo": "/perfil",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 791, hash: '05294742791d34c2a593d31212732d5af0e8541afb10b225f862f97c7d3c1822', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1000, hash: '43ee9de95bba9d0e96f37f0452487b357347bbc9152854f82e2b73dcb4f8e487', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'perfil/index.html': {size: 300, hash: 'ed2cca819e1e522c5304f869c8d15d3afdb7d0af600d1220b1c64c799bd5f359', text: () => import('./assets-chunks/perfil_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 5500, hash: 'a266e2eb3f99f812add18e4ca662b42d7609533487478d3de20683e292447d46', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'styles-ETRSDROM.css': {size: 179, hash: 'ks1uTvv5jmM', text: () => import('./assets-chunks/styles-ETRSDROM_css.mjs').then(m => m.default)}
  },
};
