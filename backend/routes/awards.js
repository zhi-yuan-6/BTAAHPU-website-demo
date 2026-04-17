const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 获取所有获奖情况
router.get('/', async (req, res) => {
  try {
    const { competition_id, year } = req.query;
    let query = 'SELECT a.*, c.name as competition_name FROM awards a JOIN competitions c ON a.competition_id = c.id';
    let params = [];
    let whereClause = [];
    
    if (competition_id) {
      whereClause.push('a.competition_id = ?');
      params.push(competition_id);
    }
    
    if (year) {
      whereClause.push('a.year = ?');
      params.push(year);
    }
    
    if (whereClause.length > 0) {
      query += ' WHERE ' + whereClause.join(' AND ');
    }
    
    query += ' ORDER BY a.year DESC';
    
    const [rows] = await db.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error('获取获奖列表失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 获取单个获奖情况
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      'SELECT a.*, c.name as competition_name FROM awards a JOIN competitions c ON a.competition_id = c.id WHERE a.id = ?',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: '获奖信息不存在' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('获取获奖信息失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 添加获奖情况
router.post('/', async (req, res) => {
  try {
    const { competition_id, year, award_level, project_name, description, team_members, prize } = req.body;
    const [result] = await db.query(
      'INSERT INTO awards (competition_id, year, award_level, project_name, description, team_members, prize) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [competition_id, year, award_level, project_name, description, team_members, prize]
    );
    res.status(201).json({ id: result.insertId, message: '获奖信息添加成功' });
  } catch (error) {
    console.error('添加获奖信息失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 更新获奖情况
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { competition_id, year, award_level, project_name, description, team_members, prize } = req.body;
    const [result] = await db.query(
      'UPDATE awards SET competition_id = ?, year = ?, award_level = ?, project_name = ?, description = ?, team_members = ?, prize = ? WHERE id = ?',
      [competition_id, year, award_level, project_name, description, team_members, prize, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '获奖信息不存在' });
    }
    res.status(200).json({ message: '获奖信息更新成功' });
  } catch (error) {
    console.error('更新获奖信息失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 删除获奖情况
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM awards WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '获奖信息不存在' });
    }
    res.status(200).json({ message: '获奖信息删除成功' });
  } catch (error) {
    console.error('删除获奖信息失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;