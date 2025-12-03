const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attachment = sequelize.define('Attachment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  originalName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Supabase Storage 경로'
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Supabase Storage 공개 URL'
  },
  fileSize: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  TaskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tasks',
      key: 'id'
    }
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'attachments',
  timestamps: true,
  indexes: [
    // 작업별 첨부파일 조회
    {
      name: 'idx_attachments_task',
      fields: ['TaskId']
    },
    // 사용자별 첨부파일 조회
    {
      name: 'idx_attachments_user',
      fields: ['UserId']
    },
    // 파일명 검색
    {
      name: 'idx_attachments_filename',
      fields: ['filename']
    }
  ]
});

module.exports = Attachment;

