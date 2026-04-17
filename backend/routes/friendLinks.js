const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 获取所有友情链接
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM friend_links';
    let params = [];
    
    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY category, id';
    
    const [rows] = await db.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error('获取友情链接列表失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 获取单个友情链接
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM friend_links WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: '友情链接不存在' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('获取友情链接信息失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 添加友情链接
router.post('/', async (req, res) => {
  try {
    const { name, url, category } = req.body;
    const [result] = await db.query(
      'INSERT INTO friend_links (name, url, category) VALUES (?, ?, ?)',
      [name, url, category]
    );
    res.status(201).json({ id: result.insertId, message: '友情链接添加成功' });
  } catch (error) {
    console.error('添加友情链接失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 更新友情链接
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, url, category } = req.body;
    const [result] = await db.query(
      'UPDATE friend_links SET name = ?, url = ?, category = ? WHERE id = ?',
      [name, url, category, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '友情链接不存在' });
    }
    res.status(200).json({ message: '友情链接更新成功' });
  } catch (error) {
    console.error('更新友情链接失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 删除友情链接
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM friend_links WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '友情链接不存在' });
    }
    res.status(200).json({ message: '友情链接删除成功' });
  } catch (error) {
    console.error('删除友情链接失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;