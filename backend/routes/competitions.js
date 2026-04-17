const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 获取所有竞赛
router.get('/', async (req, res) => {
  try {
    const { level, status } = req.query;
    let query = 'SELECT * FROM competitions';
    let params = [];
    let whereClause = [];
    
    if (level) {
      whereClause.push('level = ?');
      params.push(level);
    }
    
    if (status) {
      whereClause.push('status = ?');
      params.push(status);
    }
    
    if (whereClause.length > 0) {
      query += ' WHERE ' + whereClause.join(' AND ');
    }
    
    query += ' ORDER BY start_time DESC';
    
    const [rows] = await db.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error('获取竞赛列表失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 获取单个竞赛
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM competitions WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: '竞赛不存在' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('获取竞赛信息失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 添加竞赛
router.post('/', async (req, res) => {
  try {
    const { name, description, level, type, start_time, end_time, prize_pool, website, status } = req.body;
    const [result] = await db.query(
      'INSERT INTO competitions (name, description, level, type, start_time, end_time, prize_pool, website, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, description, level, type, start_time, end_time, prize_pool, website, status]
    );
    res.status(201).json({ id: result.insertId, message: '竞赛添加成功' });
  } catch (error) {
    console.error('添加竞赛失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 更新竞赛
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, level, type, start_time, end_time, prize_pool, website, status } = req.body;
    const [result] = await db.query(
      'UPDATE competitions SET name = ?, description = ?, level = ?, type = ?, start_time = ?, end_time = ?, prize_pool = ?, website = ?, status = ? WHERE id = ?',
      [name, description, level, type, start_time, end_time, prize_pool, website, status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '竞赛不存在' });
    }
    res.status(200).json({ message: '竞赛信息更新成功' });
  } catch (error) {
    console.error('更新竞赛信息失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 删除竞赛
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM competitions WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '竞赛不存在' });
    }
    res.status(200).json({ message: '竞赛删除成功' });
  } catch (error) {
    console.error('删除竞赛失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;