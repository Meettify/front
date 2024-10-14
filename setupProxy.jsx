const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.VITE_APP_API_BASE_URL || 'https://meettify.store',  // HTTPS URL
            changeOrigin: true,  // 프록시에서 출처를 변경
            secure: false,  // self-signed 인증서가 있는 경우 false로 설정
        })
    );
};
