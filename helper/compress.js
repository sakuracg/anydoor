/**
 * compress实现文件压缩
 */

const { createGzip, createDeflate } = require('zlib'); //导入压缩文件接口

module.exports = (rs, req, res) => { //readStream流
    const acceptEncoding = req.headers['accept-encoding'];
    //console.error(!acceptEncoding);
    if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
        //console.error(1);
        return rs; //如果acceptEncoding不存在的话直接返回
    } else if (acceptEncoding.match(/\bgzip\b/)) {
        //console.log(22);
        res.setHeader('Content-Encoding', 'gzip');
        return rs.pipe(createGzip()); //有gzip压缩格式就先采用
    } else if (acceptEncoding.match(/\bdeflate\b/)) {
        //console.error(3);
        res.setHeader('Content-Encoding', 'deflate');
        return rs.pipe(createDeflate());
    }
}