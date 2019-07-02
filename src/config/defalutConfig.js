module.exports = {
    root: process.cwd(),
    hostname: '127.0.0.1',
    port: '9257',
    compress: /\.(html|js|css|md)/,
    cache: { //缓存相关的头
        maxAge: 600,
        expires: true, //缓存保存的时间
        cacheControl: true, //返回相对时间
        lastModified: true, //上次响应时间
        etag: true //是否改变，改变换标志
    }
}