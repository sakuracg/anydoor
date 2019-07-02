const http = require('http'); //http模块
const chalk = require('chalk'); //显示模块
const path = require('path');
const conf = require('./config/defalutConfig');
const route = require('../helper/route'); //把模块接口交给route
const openUrl = require('../helper/openUrl');

class Server {

    constructor(config) {
        //console.error(conf); 构造函数里面的this是自己构造实例对象的属性
        this.conf = Object.assign({}, conf, config);
        //console.error(conf);
    }
    start() {
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.conf.root, req.url);
            //异步处理,减少回调，
            route(req, res, filePath, this.conf);
        });
        server.listen(this.conf.port, this.conf.hostname, () => {
            const addr = `http://${this.conf.hostname}:${this.conf.port}`;
            console.info(`Server started at ${chalk.green(addr)}`);
            openUrl(addr);
        });
    }
}
module.exports = Server;