## 项目介绍

商户加白项目的前端，主要是为了管理商户的白名单，有用户管理、白名单管理、操作日志等功能。项目支持自动加载代码变动，保存后自动刷新页面，支持代码格式化，支持代码检查等功能。

```

## 项目运行方式

```bash

# Node版本：
v20.11.1

# npm版本：
10.2.4

# 安装依赖
npm install

# 开发环境
npm run dev
```

会自动打开 http://localhost:9527 页面

## 打包编译

```bash
# 打测试环境的静态文件
npm run build:stage

# 打生产环境的静态文件
npm run build:prod
```

## 高级使用

```bash
# 预览发布后的效果
npm run preview

# 预览发布环境效果+静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```