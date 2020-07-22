var externalConfig = {
    /**
     * 当前代码所在环境
     * test  测试环境
     * production    生产服务器环境
     */
    env: 'production', //production
    /**
     * 接口域名地址
     *  注意：
     *      分环境配置不同的域名
     *      分具体需求配置不同的域名
     *          举例：http 和 websocket,配置如下
     *          domain :{
     *              httpServer:{
     *
     *              },
     *              websocketServer:{
     *
     *              }
     *          }
     *       配置的域名后面通知补全  “/" ,
     *          举例：http://www.baidu.com/
     *          反例：http://www.baidu.com
     */
    domain: {
        test: "127.0.0.1:3000/",
        production: 'http://td32326975.qicp.vip/'
    },
    /**
     * 网站站点信息
     * 网站的名字，logo等配置在website下面
     */
    website: {
        // logo: "",
        // name: ""
    }
}
