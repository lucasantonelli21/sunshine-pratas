
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "redirectTo": "/app/produtos",
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2TH6A3EP.js",
      "chunk-5OQVZJ44.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-XHEBXSOG.js",
      "chunk-5OQVZJ44.js"
    ],
    "route": "/perfil"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-6JLKKX35.js",
      "chunk-5OQVZJ44.js"
    ],
    "route": "/app/*"
  },
  {
    "renderMode": 0,
    "redirectTo": "/app/produtos",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1175, hash: '883b12f340f9aca0f22a70b4ee404b4f7221b1d92cc5f554300a9a6c3a0ec82c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1055, hash: '5f1278f2ada747f9a4db958de1e18a8b8d4b3120a1ddb402399fdf68f657695a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 7149, hash: '947967eebe25798e28eb8fbe391b54b35a367518ee50fb6195fa25322f6858e7', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'styles-NTKCKQ7J.css': {size: 519, hash: 'LjJsRAgZqcg', text: () => import('./assets-chunks/styles-NTKCKQ7J_css.mjs').then(m => m.default)}
  },
};
