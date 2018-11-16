# react-custom-scripts

自定义react-scripts

Fork 自create-react-app react-scripts

v0.1.0同步react-script2.1.1

#### 新增特性

+ 增加环境变量DROP_CONSOLE,控制正式环境打包是否去除console
+ 将src目录文件夹,创建别名'@文件名'，如: http文件，别名@http。(webpack配置resolve.alias)
+ 增加环境变量SERVER_RENDER,控制是否进行服务端渲染，为true时使用服务端渲染，
入口文件为src/server.js,需要安装webpack-node-externals依赖
