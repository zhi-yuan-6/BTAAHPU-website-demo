const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 数据库连接
const db = require('./config/database');

// 注意：config/database 导出的是 PromisePool（pool.promise()），这里需要用 Promise 方式获取连接
db.getConnection()
  .then((connection) => {
    console.log('数据库连接成功');
    connection.release();
  })
  .catch((err) => {
    console.error('数据库连接失败:', err);
    process.exit(1);
  });

// 路由
const associationRoutes = require('./routes/association');
const memberRoutes = require('./routes/members');
const eventRoutes = require('./routes/events');
const competitionRoutes = require('./routes/competitions');
const awardRoutes = require('./routes/awards');
const friendLinkRoutes = require('./routes/friendLinks');

// 注册路由
app.use('/api/association', associationRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/competitions', competitionRoutes);
app.use('/api/awards', awardRoutes);
app.use('/api/friend-links', friendLinkRoutes);

// 健康检查
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({ message: '路由不存在' });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '服务器内部错误' });
});

// 启动服务器
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

module.exports = app;