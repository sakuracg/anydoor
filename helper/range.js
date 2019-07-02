/***
 * 取到文件的范围字符
 */

module.exports = (titleSize, req, res) => {
    const range = req.headers['range']; //取到网页头的range
    if (!range) { //如果不存在range
        return { code: 200 };
    }
    const sizes = range.match(/bytes=(\d*)-(\d*)/); //匹配到了
    const end = sizes[2] || titleSize - 1;
    const start = sizes[1] || titleSize - end;
    if (start > end || start < 0 || end > titleSize) {
        return { code: 200 };
    }

    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Range', `bytes ${start}-${end}/${titleSize}`)
    res.setHeader('Content-Length', end - start);
    return {
        code: 206,
        start: parseInt(start),
        end: parseInt(end)
    }
}