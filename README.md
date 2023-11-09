# divination-master-frontend

## 1.项目介绍

项目使用 uniapp-vue3(ts)模式开发，前端 ui 组件库使用[uView-plus](https://uiadmin.net/uview-plus/guide/demo.html)

- node 版本`>=18`
- vscode 工作区配置，查看[配置文件](./.vscode/settings.json)
- 集成 eslint husky commitlint lint-staged stylelint
- 集成 [@uni-helper](https://modyqyw.top/uni-helper/)
- 集成 原子化 css 引擎[unocss](https://unocss.dev/)

## 2.构建说明

运行与构建生产版本可使用以下命令

```
npm run dev:%PLATFORM%
npm run build:%PLATFORM%
```

`%PLATFORM%` 可取值如下：

| 值 | 平台 |
| --- | --- |
| app-plus | app 平台生成打包资源（支持 npm run build:app-plus，可用于持续集成。不支持 run，运行调试仍需在 HBuilderX 中操作） |
| h5 | H5 |
| mp-alipay | 支付宝小程序 |
| mp-baidu | 百度小程序 |
| mp-weixin | 微信小程序 |
| mp-toutiao | 头条小程序 |
| ml-lark | 飞书小程序 |
| mp-qq | qq 小程序 |
| mp-360 | 360 小程序 |
| mp-kuaishuou | 快手小程序 |
| mp-jd | 京东小程序 |
| mp-xhs | 小红书小程序 |
| quickapp-webview | 快应用(webview) |
| quickapp-webview-union | 快应用联盟 |
| quickapp-webview-huawei | 快应用华为 |
