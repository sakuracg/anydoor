/**
 * 路由回调，提高性能
 */
const fs = require('fs'); //文件模块
const path = require('path'); //路径
const Handlebars = require('handlebars'); //模板接口
const promisify = require('util').promisify; //异步模块
const stat = promisify(fs.stat); //提供文件信息
const readdir = promisify(fs.readdir); //读取目录内容（文件名）
const mime = require('./mime');
const compress = require('./compress');
const range = require('./range');
const isFresh = require('./cache');

const tplPath = path.join(__dirname, '../template/dir.tpl');

const source = fs.readFileSync(tplPath); //同步方法，因为只执行一次，返回的是buffer
const template = Handlebars.compile(source.toString()); //接收的是字符串

module.exports = async function(req, res, filePath, config) {
    try {
        //console.error(path.join(__dirname, '../src/images/title.ico'));
        //console.error(path.dirname(filePath));
        const stats = await stat(filePath); //处理文件，stats是fs.Stat对象提供文件信息
        if (stats.isFile()) {
            const contentType = mime(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);

            //如果缓存还新鲜，则不用更新内容（不给服务器发出请求）
            if (isFresh(stats, req, res)) {
                res.statusCode = 304;
                res.end();
                return;
            }

            let rs;
            //检查有没有设置取某个范围字节的文件内容
            const { code, start, end } = range(stats.size, req, res);
            if (code === 200) { //没有
                rs = fs.createReadStream(filePath);
            } else { //有
                rs = fs.createReadStream(filePath, { start, end });
            }

            if (filePath.match(config.compress)) {
                rs = compress(rs, req, res);
            }
            rs.pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const dir = path.relative(config.root, filePath);
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files: files.map(file => {
                    return {
                        file,
                        //icon: mime(file).icon
                        icon: mime(file)
                    }
                })
            }
            res.end(template(data));
            // fs.readdir(filePath, (err, files) => { //files是返回一个文件名数组
            // });
        }
    } catch (ex) {
        console.error(ex);
        //设置状态码
        res.statusCode = 404;
        //设置文件头
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directory or file\n ${ex}`);
    }
}