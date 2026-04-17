const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 获取所有成员
router.get('/', async (req, res) => {
  try {
    const { role, department } = req.query;
    let query = 'SELECT * FROM members WHERE status = ?';
    let params = ['active'];
    
    if (role) {
      query += ' AND role = ?';
      params.push(role);
    }
    
    if (department) {
      query += ' AND department = ?';
      params.push(department);
    }
    
    const [rows] = await db.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error('获取成员列表失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 获取单个成员
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM members WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: '成员不存在' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('获取成员信息失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 添加成员
router.post('/', async (req, res) => {
  try {
    const { name, position, department, description, avatar, role } = req.body;
    const [result] = await db.query(
      'INSERT INTO members (name, position, department, description, avatar, role) VALUES (?, ?, ?, ?, ?, ?)',
      [name, position, department, description, avatar, role]
    );
    res.status(201).json({ id: result.insertId, message: '成员添加成功' });
  } catch (error) {
    console.error('添加成员失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 更新成员
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, department, description, avatar, role, status } = req.body;
    const [result] = await db.query(
      'UPDATE members SET name = ?, position = ?, department = ?, description = ?, avatar = ?, role = ?, status = ? WHERE id = ?',
      [name, position, department, description, avatar, role, status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '成员不存在' });
    }
    res.status(200).json({ message: '成员信息更新成功' });
  } catch (error) {
    console.error('更新成员信息失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 删除成员
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('UPDATE members SET status = ? WHERE id = ?', ['inactive', id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '成员不存在' });
    }
    res.status(200).json({ message: '成员删除成功' });
  } catch (error) {
    console.error('删除成员失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;