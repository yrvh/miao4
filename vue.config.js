module.exports = {
    devServer : {
        proxy : {
            '/api' : {
                target : "http://39.97.33.178/",
                changeOrigin: true,//反向代理的时候是否要改变地址
            }
        }
    }
}