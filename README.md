# JobHub 求职管理系统

基于 Vue 3 + Vite 构建的求职管理 SPA，支持岗位投递记录跟踪与数据统计。

## 技术栈

**前端：** Vue 3（Composition API）、Vue Router、Axios、Element Plus、Vite  
**后端：** json-server（模拟 RESTful API）

## 功能

- 用户登录/注册认证、路由守卫（未登录拦截）
- 岗位 CRUD（增删改查）
- 关键词搜索 + 状态筛选
- 后端分页
- 数据统计看板（总投递 / 面试中 / 已录取 / 已拒绝）
- 个人中心（信息编辑 + 退出登录）

## 快速启动

```bash
# 安装依赖
npm install

# 启动前端（默认 http://localhost:5173）
npm run dev

# 另开终端，启动 mock 后端（默认 http://localhost:3001）
npm run mock
```

## 项目结构

```
src/
├── api/            # API 请求封装（axios 实例 + 各模块接口）
├── components/     # 通用组件（JobDialog）
├── layout/         # 页面布局（AppLayout）
├── router/         # 路由配置 + 守卫
├── views/          # 页面（Login / Dashboard / Jobs / Profile）
├── App.vue         # 根组件
└── main.js         # 入口
```

## 账号

- 用户名：`admin`
- 密码：`123456`
