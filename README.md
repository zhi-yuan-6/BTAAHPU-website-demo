# 安徽工程大学区块链技术协会网站重构方案

## 1. 项目背景

原项目是一个静态HTML网站，所有数据硬编码在HTML文件中，无法动态更新。为了提高网站的可维护性和扩展性，需要进行重构，采用前后端分离的架构，使用数据库存储数据，实现数据的动态加载和管理。

## 2. 技术选型

### 2.1 后端技术栈
- **语言**: Node.js 18+
- **框架**: Express 4.x
- **数据库**: MySQL 8.0
- **ORM**: 原生SQL（轻量级）
- **认证**: 无（后续可扩展）
- **部署**: PM2 + Nginx

### 2.2 前端技术栈
- **框架**: Vue 3
- **构建工具**: Vite
- **状态管理**: Pinia
- **HTTP客户端**: Axios
- **路由**: Vue Router
- **样式**: Tailwind CSS 3
- **图标**: FontAwesome 6
- **部署**: 静态文件部署（Vercel/Netlify/GitHub Pages）

## 3. 架构设计

### 3.1 整体架构
- **前后端分离**: 前端和后端完全分离，通过API接口通信
- **数据流向**: 后端从数据库读取数据，通过API返回给前端，前端通过状态管理存储和管理数据
- **部署方案**: 后端部署在服务器上，前端部署在静态托管平台

### 3.2 数据库设计

#### 3.2.1 协会信息表 (`association`)
- `id`: INT, 主键
- `name`: VARCHAR(255), 协会名称
- `description`: TEXT, 协会描述
- `logo`: VARCHAR(255), 协会Logo
- `motto`: VARCHAR(255), 协会口号
- `create_time`: DATETIME, 创建时间
- `update_time`: DATETIME, 更新时间

#### 3.2.2 成员表 (`members`)
- `id`: INT, 主键
- `name`: VARCHAR(100), 成员姓名
- `position`: VARCHAR(100), 职位
- `department`: VARCHAR(100), 部门
- `description`: TEXT, 成员描述
- `avatar`: VARCHAR(255), 头像
- `role`: ENUM('teacher', 'leader', 'member'), 角色
- `status`: ENUM('active', 'inactive'), 状态
- `create_time`: DATETIME, 创建时间
- `update_time`: DATETIME, 更新时间

#### 3.2.3 活动表 (`events`)
- `id`: INT, 主键
- `title`: VARCHAR(255), 活动标题
- `description`: TEXT, 活动描述
- `event_type`: VARCHAR(100), 活动类型
- `location`: VARCHAR(255), 活动地点
- `start_time`: DATETIME, 开始时间
- `end_time`: DATETIME, 结束时间
- `status`: ENUM('upcoming', 'ongoing', 'completed'), 状态
- `image`: VARCHAR(255), 活动图片
- `link`: VARCHAR(255), 活动链接
- `create_time`: DATETIME, 创建时间
- `update_time`: DATETIME, 更新时间

#### 3.2.4 竞赛表 (`competitions`)
- `id`: INT, 主键
- `name`: VARCHAR(255), 竞赛名称
- `description`: TEXT, 竞赛描述
- `level`: ENUM('national', 'provincial', 'international', 'industry'), 竞赛级别
- `type`: VARCHAR(100), 竞赛类型
- `start_time`: DATETIME, 开始时间
- `end_time`: DATETIME, 结束时间
- `prize_pool`: VARCHAR(100), 奖金池
- `website`: VARCHAR(255), 官方网站
- `status`: ENUM('upcoming', 'ongoing', 'completed'), 状态
- `create_time`: DATETIME, 创建时间
- `update_time`: DATETIME, 更新时间

#### 3.2.5 获奖情况表 (`awards`)
- `id`: INT, 主键
- `competition_id`: INT, 竞赛ID（外键）
- `year`: VARCHAR(4), 获奖年份
- `award_level`: VARCHAR(100), 获奖等级
- `project_name`: VARCHAR(255), 项目名称
- `description`: TEXT, 项目描述
- `team_members`: TEXT, 团队成员
- `prize`: VARCHAR(100), 奖金
- `create_time`: DATETIME, 创建时间
- `update_time`: DATETIME, 更新时间

#### 3.2.6 友情链接表 (`friend_links`)
- `id`: INT, 主键
- `name`: VARCHAR(100), 链接名称
- `url`: VARCHAR(255), 链接地址
- `category`: VARCHAR(100), 分类
- `create_time`: DATETIME, 创建时间
- `update_time`: DATETIME, 更新时间

### 3.3 后端API设计

#### 3.3.1 协会信息API
- `GET /api/association`: 获取协会信息
- `PUT /api/association`: 更新协会信息

#### 3.3.2 成员API
- `GET /api/members`: 获取成员列表（支持role和department筛选）
- `GET /api/members/:id`: 获取单个成员信息
- `POST /api/members`: 添加成员
- `PUT /api/members/:id`: 更新成员信息
- `DELETE /api/members/:id`: 删除成员（软删除）

#### 3.3.3 活动API
- `GET /api/events`: 获取活动列表（支持status和type筛选）
- `GET /api/events/:id`: 获取单个活动信息
- `POST /api/events`: 添加活动
- `PUT /api/events/:id`: 更新活动信息
- `DELETE /api/events/:id`: 删除活动

#### 3.3.4 竞赛API
- `GET /api/competitions`: 获取竞赛列表（支持level和status筛选）
- `GET /api/competitions/:id`: 获取单个竞赛信息
- `POST /api/competitions`: 添加竞赛
- `PUT /api/competitions/:id`: 更新竞赛信息
- `DELETE /api/competitions/:id`: 删除竞赛

#### 3.3.5 获奖情况API
- `GET /api/awards`: 获取获奖情况列表（支持competition_id和year筛选）
- `GET /api/awards/:id`: 获取单个获奖情况信息
- `POST /api/awards`: 添加获奖情况
- `PUT /api/awards/:id`: 更新获奖情况信息
- `DELETE /api/awards/:id`: 删除获奖情况

#### 3.3.6 友情链接API
- `GET /api/friend-links`: 获取友情链接列表（支持category筛选）
- `GET /api/friend-links/:id`: 获取单个友情链接信息
- `POST /api/friend-links`: 添加友情链接
- `PUT /api/friend-links/:id`: 更新友情链接信息
- `DELETE /api/friend-links/:id`: 删除友情链接

### 3.4 前端架构设计

#### 3.4.1 项目结构
```
frontend/
├── public/           # 静态资源
├── src/
│   ├── assets/       # 静态资源
│   ├── components/   # 组件
│   ├── views/        # 页面
│   │   ├── Home.vue
│   │   ├── About.vue
│   │   ├── Team.vue
│   │   ├── Events.vue
│   │   ├── Competitions.vue
│   │   └── Join.vue
│   ├── router/       # 路由
│   ├── stores/       # 状态管理
│   ├── App.vue       # 根组件
│   └── main.js       # 入口文件
├── index.html        # HTML模板
└── vite.config.js    # Vite配置
```

#### 3.4.2 状态管理
- 使用Pinia进行状态管理，包含API调用和数据存储
- 实现数据的初始化、获取、更新等操作
- 处理加载状态和错误信息

#### 3.4.3 页面设计
- **首页**: 展示协会基本信息和招新信息
- **关于协会**: 展示协会详细介绍和特色
- **核心团队**: 展示指导老师和核心成员信息
- **精彩活动**: 展示近期活动信息
- **竞赛信息**: 展示区块链相关竞赛和获奖情况
- **加入我们**: 展示招新信息和联系方式

## 4. 部署方案

### 4.1 后端部署
1. **环境准备**: 安装Node.js 18+、MySQL 8.0
2. **数据库配置**: 创建数据库，执行`database.sql`初始化表结构和数据
3. **后端配置**: 配置`.env`文件，设置数据库连接信息
4. **依赖安装**: 执行`npm install`安装依赖
5. **启动服务**: 执行`npm start`启动服务，或使用PM2进行进程管理
6. **反向代理**: 使用Nginx配置反向代理，将API请求转发到后端服务

### 4.2 前端部署
1. **构建**: 执行`npm run build`构建静态文件
2. **部署**: 将`dist`目录部署到静态托管平台（如Vercel、Netlify、GitHub Pages等）
3. **配置**: 配置域名和CDN（可选）

### 4.3 跨域处理
- 后端使用CORS中间件允许跨域请求
- 前端开发环境使用Vite的代理功能，将API请求代理到后端服务

## 5. 开发流程

### 5.1 后端开发
1. 安装依赖: `cd backend && npm install`
2. 配置环境变量: 创建`.env`文件
3. 启动开发服务器: `npm run dev`
4. 测试API: 使用Postman或其他API测试工具

### 5.2 前端开发
1. 安装依赖: `cd frontend && npm install`
2. 启动开发服务器: `npm run dev`
3. 访问: http://localhost:3000
4. 开发新功能: 修改或添加组件、页面、API调用等

## 6. 扩展性考虑

### 6.1 功能扩展
- **管理后台**: 后续可添加管理后台，实现数据的可视化管理
- **用户认证**: 添加用户认证系统，实现会员登录和权限管理
- **活动报名**: 实现活动报名功能，收集报名信息
- **新闻动态**: 添加新闻动态模块，发布协会最新消息

### 6.2 技术扩展
- **缓存**: 添加Redis缓存，提高API响应速度
- **日志**: 添加日志系统，便于问题排查
- **监控**: 添加监控系统，监控服务状态
- **CI/CD**: 配置CI/CD流程，实现自动化部署

## 7. 总结

本重构方案采用前后端分离的架构，使用Node.js + Express作为后端，Vue 3 + Vite作为前端，MySQL作为数据库，实现了数据的动态管理和加载。通过API接口实现前后端通信，提高了网站的可维护性和扩展性。同时，保留了原有的设计风格和用户体验，确保网站的视觉效果和功能完整性。

该方案不仅解决了原项目数据硬编码的问题，还为后续的功能扩展和技术升级奠定了基础，使网站能够更好地服务于安徽工程大学区块链技术协会的发展。