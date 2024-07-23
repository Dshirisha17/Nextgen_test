const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

// Create an Express application for 204
const appV1 = express();
const PORT_V1 = 204;

// Serve static files for 204
appV1.use(express.static(path.join(__dirname)));

// Proxy setup for 204
appV1.use('/api', createProxyMiddleware({
  target: 'http://10.10.1.204:5040',
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  secure: false
}));

// Fallback to index.html for SPA for 204
appV1.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

// Start server for 204
appV1.listen(PORT_V1, () => {
  console.log(`Server for 204 is running on http://10.10.1.174:${PORT_V1}`);
});

// Create an Express application for 182
const appV3 = express();
const PORT_V3 = 182;

// Serve static files for 182
appV3.use(express.static(path.join(__dirname)));

// Proxy setup for 182
appV3.use('/api', createProxyMiddleware({
  target: 'http://10.10.1.182:5040',
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  secure: false
}));

// Fallback to index.html for SPA for 182
appV3.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

// Start server for V3
appV3.listen(PORT_V3, () => {
  console.log(`Server for 182 is running on http://10.10.1.174:${PORT_V3}`);
});
