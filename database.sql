
-- 协会基本信息表
CREATE TABLE IF NOT EXISTS `association` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL COMMENT '协会名称',
  `description` TEXT COMMENT '协会描述',
  `logo` VARCHAR(255) COMMENT '协会Logo',
  `motto` VARCHAR(255) COMMENT '协会口号',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='协会基本信息';

-- 成员表
CREATE TABLE IF NOT EXISTS `members` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL COMMENT '成员姓名',
  `position` VARCHAR(100) COMMENT '职位',
  `department` VARCHAR(100) COMMENT '部门',
  `description` TEXT COMMENT '成员描述',
  `avatar` VARCHAR(255) COMMENT '头像',
  `role` ENUM('teacher', 'leader', 'member') NOT NULL COMMENT '角色：指导老师、管理层、普通成员',
  `status` ENUM('active', 'inactive') DEFAULT 'active' COMMENT '状态',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='协会成员';

-- 活动表
CREATE TABLE IF NOT EXISTS `events` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL COMMENT '活动标题',
  `description` TEXT COMMENT '活动描述',
  `event_type` VARCHAR(100) COMMENT '活动类型：workshop、hackathon、seminar等',
  `location` VARCHAR(255) COMMENT '活动地点',
  `start_time` DATETIME COMMENT '开始时间',
  `end_time` DATETIME COMMENT '结束时间',
  `status` ENUM('upcoming', 'ongoing', 'completed') DEFAULT 'upcoming' COMMENT '状态',
  `image` VARCHAR(255) COMMENT '活动图片',
  `link` VARCHAR(255) COMMENT '活动链接',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='协会活动';

-- 竞赛表
CREATE TABLE IF NOT EXISTS `competitions` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL COMMENT '竞赛名称',
  `description` TEXT COMMENT '竞赛描述',
  `level` ENUM('national', 'provincial', 'international', 'industry') NOT NULL COMMENT '竞赛级别',
  `type` VARCHAR(100) COMMENT '竞赛类型',
  `start_time` DATETIME COMMENT '开始时间',
  `end_time` DATETIME COMMENT '结束时间',
  `prize_pool` VARCHAR(100) COMMENT '奖金池',
  `website` VARCHAR(255) COMMENT '官方网站',
  `status` ENUM('upcoming', 'ongoing', 'completed') DEFAULT 'upcoming' COMMENT '状态',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='竞赛信息';

-- 获奖情况表
CREATE TABLE IF NOT EXISTS `awards` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `competition_id` INT NOT NULL COMMENT '竞赛ID',
  `year` VARCHAR(4) NOT NULL COMMENT '获奖年份',
  `award_level` VARCHAR(100) NOT NULL COMMENT '获奖等级',
  `project_name` VARCHAR(255) NOT NULL COMMENT '项目名称',
  `description` TEXT COMMENT '项目描述',
  `team_members` TEXT COMMENT '团队成员',
  `prize` VARCHAR(100) COMMENT '奖金',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`competition_id`) REFERENCES `competitions`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='获奖情况';

-- 友情链接表
CREATE TABLE IF NOT EXISTS `friend_links` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL COMMENT '链接名称',
  `url` VARCHAR(255) NOT NULL COMMENT '链接地址',
  `category` VARCHAR(100) COMMENT '分类',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='友情链接';

-- 初始化数据
INSERT INTO `association` (`name`, `description`, `motto`) VALUES
('安徽工程大学区块链技术协会', 'AHPU.DAO 成立于安徽工程大学，我们致力于打破区块链技术的学习壁垒。无论你是数理学院的建模达人、还是计信学院的代码大神，亦或是智能院的算法精英，还有来自其他学院对数字经济感兴趣的同学，这里都是你接触前沿科技的起点。', '合作、交流、创新 · 共建区块链和谐社区');

-- 插入示例成员数据
INSERT INTO `members` (`name`, `position`, `department`, `description`, `role`) VALUES
('包老师', '协会指导老师', '计算机与信息学院', '计算机与信息学院，研究方向为分布式系统与密码学。', 'teacher'),
('程同学', '协会会长', '技术部', '全栈开发者，以太坊爱好者，曾获省级区块链大赛二等奖。', 'leader'),
('孙同学', '技术部部长', '技术部', 'Solidity 智能合约开发专家，负责协会内部技术培训。', 'leader'),
('王同学', '外联部部长', '外联部', '负责社团对外联络、赞助洽谈及活动策划。', 'leader'),
('陈同学', '成员', '技术部', '前端开发', 'member'),
('赵同学', '成员', '技术部', 'Rust 开发', 'member'),
('孙同学', '成员', '设计部', 'UI 设计', 'member'),
('周同学', '成员', '运营部', '运营', 'member');

-- 插入示例活动数据
INSERT INTO `events` (`title`, `description`, `event_type`, `location`, `start_time`, `status`, `link`) VALUES
('Solidity 智能合约开发入门', '从零开始编写你的第一个 ERC20 代币，需要自带笔记本电脑。', 'WORKSHOP', '师生活动中心 302', '2024-10-24 14:00:00', 'upcoming', '#'),
('2024 校园 Web3 黑客松', '组队挑战，赢取丰厚奖金与实习 Offer。主题涵盖 DeFi, GameFi 等。', 'HACKATHON', '计算机楼 501', '2024-11-05 09:00:00', 'upcoming', '#'),
('行业前沿研读会', '深度解读以太坊最新升级、零知识证明进展与 Layer2 赛道分析。', 'SEMINAR', '线上 Zoom', '2024-10-18 19:00:00', 'ongoing', '#');

-- 插入示例竞赛数据
INSERT INTO `competitions` (`name`, `description`, `level`, `type`, `start_time`, `end_time`, `prize_pool`, `website`, `status`) VALUES
('全国大学生区块链技术应用大赛', '面向全国高校学生的区块链技术应用创新比赛，涵盖DeFi、NFT、元宇宙等多个赛道。', 'national', '区块链', '2024-10-01', '2024-12-31', '¥500,000', 'https://www.dabc.org.cn/', 'ongoing'),
('安徽省区块链+创新应用大赛', '安徽省教育厅主办，聚焦区块链与实体经济融合的创新应用。', 'provincial', '区块链+', '2024-11-01', '2025-03-31', '¥150,000', 'https://btc.ccf.org.cn/', 'upcoming'),
('Web3 开发者黑客松', '由知名区块链公司赞助，面向全球开发者的Web3应用开发竞赛。', 'industry', 'Web3', '2024-10-15', '2024-11-15', '$50,000', 'https://ethglobal.com/', 'ongoing'),
('CCF区块链竞赛', '中国计算机学会主办的区块链技术创新竞赛，聚焦区块链核心技术与应用。', 'national', '区块链', '2025-03-01', '2025-05-31', '¥300,000', 'https://btc.ccf.org.cn/profile/panel_info', 'upcoming'),
('中国大学生计算机设计大赛', '包含区块链应用设计赛道，面向全国高校学生的计算机设计竞赛。', 'national', '计算机', '2024-04-01', '2024-06-30', '¥200,000', 'http://jsjds.blcu.edu.cn/', 'completed'),
('一带一路暨金砖国家技能大赛', '面向金砖国家的技能发展与技术创新大赛，包含区块链技术应用赛道。', 'international', '技能', '2025-02-01', '2025-04-30', '$100,000', 'http://www.brskills.com/#/index', 'upcoming'),
('中国区块链应用与开发专项赛', '第17届中国区块链应用与开发专项赛，聚焦区块链技术创新与应用。', 'national', '区块链', '2024-08-01', '2024-10-31', '¥250,000', 'https://4c.ibcweddu.com/', 'ongoing'),
('中国区块链奥林匹克竞赛', 'CN-BCOL中国区块链奥林匹克竞赛，国际级区块链技术竞赛。', 'international', '区块链', '2025-01-01', '2025-02-28', '¥400,000', 'https://cn.ibcol.org/', 'upcoming'),
('AETC 区块链安全技术竞赛', 'AETC区块链安全技术与创新应用竞赛，聚焦区块链安全领域。', 'provincial', '区块链', '2024-07-01', '2024-09-30', '¥100,000', 'https://www.atecup.cn/matchHome/100004', 'completed'),
('全国大学生信息安全竞赛', '国家级信息安全竞赛，包含区块链安全赛道，面向全国高校学生。', 'national', '信息安全', '2024-06-01', '2024-08-31', '¥350,000', 'http://www.ciscn.cn/competition/securityCompetition', 'completed');

-- 插入示例获奖数据
INSERT INTO `awards` (`competition_id`, `year`, `award_level`, `project_name`, `description`, `team_members`, `prize`) VALUES
(1, '2023', '二等奖', '基于区块链的校园积分系统', '协会团队凭借"基于区块链的校园积分系统"项目获得二等奖', '程同学、孙同学、王同学', '¥50,000'),
(2, '2024', '三等奖', '区块链+供应链金融', '协会团队的"区块链+供应链金融"项目获得省级三等奖', '陈同学、赵同学、孙同学', '¥10,000');

-- 插入示例友情链接
INSERT INTO `friend_links` (`name`, `url`, `category`) VALUES
('北大区块链协会', 'https://pkublockchain.com/', '高校联盟'),
('上海交大区块链协会', 'https://acm.sjtu.edu.cn/~htftsy/index.html', '高校联盟'),
('浙江大学区块链协会', 'https://docs.zjubca.org/', '高校联盟'),
('安徽省高校区块链联盟', 'https://edc.ah.edu.cn/', '高校联盟'),
('FISCO BCOS', 'https://www.fisco.com.cn/fisco_20.html', '技术平台'),
('Hyperledger Fabric', 'https://doc-fabric.readthedocs.io/en/latest/', '技术平台');