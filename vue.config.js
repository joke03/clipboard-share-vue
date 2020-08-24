const webpack = require("webpack")

module.exports = {
    publicPath: './',
    productionSourceMap: false,
    devServer: {
        //port:8888,
        proxy: {
            //配置开发环境(dev)跨域
            '/m': {
                target: 'http://192.168.43.134:20189',//设置调用的接口域名和端口号 别忘了加http
                changeOrigin: true,
                pathRewrite: {
                    '^/m': '/'//这里理解成用‘/m’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如要调用'http://172.30.116.76:8000/user/add'，直接写‘/api/user/add’即可
                }
            },
        }
    },

}
