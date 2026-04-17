const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 获取所有活动
router.get('/', async (req, res) => {
  try {
    const { status, type } = req.query;
    let query = 'SELECT * FROM events';
    let params = [];
    let whereClause = [];
    
    if (status) {
      whereClause.push('status = ?');
      params.push(status);
    }
    
    if (type) {
      whereClause.push('event_type = ?');
      params.push(type);
    }
    
    if (whereClause.length > 0) {
      query += ' WHERE ' + whereClause.join(' AND ');
    }
    
    query += ' ORDER BY start_time DESC';
    
    const [rows] = await db.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error('获取活动列表失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 获取单个活动
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: '活动不存在' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('获取活动信息失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 添加活动
router.post('/', async (req, res) => {
  try {
    const { title, description, event_type, location, start_time, end_time, status, image, link } = req.body;
    const [result] = await db.query(
      'INSERT INTO events (title, description, event_type, location, start_time, end_time, status, image, link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, event_type, location, start_time, end_time, status, image, link]
    );
    res.status(201).json({ id: result.insertId, message: '活动添加成功' });
  } catch (error) {
    console.error('添加活动失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 更新活动
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, event_type, location, start_time, end_time, status, image, link } = req.body;
    const [result] = await db.query(
      'UPDATE events SET title = ?, description = ?, event_type = ?, location = ?, start_time = ?, end_time = ?, status = ?, image = ?, link = ? WHERE id = ?',
      [title, description, event_type, location, start_time, end_time, status, image, link, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '活动不存在' });
    }
    res.status(200).json({ message: '活动信息更新成功' });
  } catch (error) {
    console.error('更新活动信息失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 删除活动
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM events WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '活动不存在' });
    }
    res.status(200).json({ message: '活动删除成功' });
  } catch (error) {
    console.error('删除活动失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;