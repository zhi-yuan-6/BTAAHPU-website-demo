const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 获取协会信息
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM association LIMIT 1');
    if (rows.length === 0) {
      return res.status(404).json({ message: '协会信息不存在' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('获取协会信息失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 更新协会信息
router.put('/', async (req, res) => {
  try {
    const { name, description, logo, motto } = req.body;
    const [result] = await db.query(
      'UPDATE association SET name = ?, description = ?, logo = ?, motto = ? WHERE id = 1',
      [name, description, logo, motto]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '协会信息不存在' });
    }
    res.status(200).json({ message: '协会信息更新成功' });
  } catch (error) {
    console.error('更新协会信息失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;