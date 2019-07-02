const config = require('../src/config/defalutConfig');

function refreshRes(stats, res) {
    const { maxAge, expires, cacheControl, lastModified, etag } = config.cache;
    if (expires) { //response告诉浏览器并设置值
        res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000).toUTCString()));
    }
    if (cacheControl) {
        res.setHeader('Cache-Control', `public,max-age=${maxAge}`);
    }
    if (lastModified) {
        res.setHeader('Last-Modified', stats.mtime.toUTCString());
    }
    if (etag) {
        res.setHeader('ETag', `${stats.size}-${stats.mtime}`);
    }
}
//导出模块
module.exports = function isFresh(stats, req, res) {
    refreshRes(stats, res);
    //从request请求头获取lastModified
    const lastModified = req.headers['if-modified-since'];
    const etag = req.headers['if-none-match'];

    if (!lastModified && !etag) { //两个都为空
        return false;
    } //request中的lastModified与自己在response里设置的不一样，更新
    if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
        return true;
    }
    if (etag && etag !== res.getHeader('ETag')) {
        return true;
    }
}