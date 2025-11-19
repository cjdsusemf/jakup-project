const Attachment = require('../models/Attachment');
const Task = require('../models/Task');
const User = require('../models/User');
const path = require('path');
const fs = require('fs').promises;

// 첨부파일 업로드
exports.uploadAttachment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    // 작업이 존재하는지 확인
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: '작업을 찾을 수 없습니다.' });
    }

    // 파일이 업로드되었는지 확인
    if (!req.file) {
      return res.status(400).json({ message: '파일이 업로드되지 않았습니다.' });
    }

    const attachment = await Attachment.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      TaskId: taskId,
      UserId: userId
    });

    // 생성된 첨부파일과 업로더 정보 함께 반환
    const attachmentWithUser = await Attachment.findByPk(attachment.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'name', 'role']
        }
      ]
    });

    res.status(201).json(attachmentWithUser);
  } catch (error) {
    console.error('첨부파일 업로드 오류:', error);
    res.status(500).json({ message: '첨부파일 업로드에 실패했습니다.' });
  }
};

// 작업의 첨부파일 목록 조회
exports.getAttachmentsByTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const attachments = await Attachment.findAll({
      where: { TaskId: taskId },
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'name', 'role']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(attachments);
  } catch (error) {
    console.error('첨부파일 조회 오류:', error);
    res.status(500).json({ message: '첨부파일 조회에 실패했습니다.' });
  }
};

// 첨부파일 삭제
exports.deleteAttachment = async (req, res) => {
  try {
    const { taskId, attachmentId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const attachment = await Attachment.findOne({
      where: {
        id: attachmentId,
        TaskId: taskId
      }
    });

    if (!attachment) {
      return res.status(404).json({ message: '첨부파일을 찾을 수 없습니다.' });
    }

    // 본인이 업로드한 파일이거나 관리자인 경우만 삭제 가능
    if (attachment.UserId !== userId && userRole !== 'admin') {
      return res.status(403).json({ message: '첨부파일을 삭제할 권한이 없습니다.' });
    }

    // 실제 파일 삭제
    try {
      await fs.unlink(attachment.filePath);
    } catch (fileError) {
      console.error('파일 삭제 오류:', fileError);
      // 파일이 이미 없어도 DB 레코드는 삭제
    }

    await attachment.destroy();
    res.json({ message: '첨부파일이 삭제되었습니다.' });
  } catch (error) {
    console.error('첨부파일 삭제 오류:', error);
    res.status(500).json({ message: '첨부파일 삭제에 실패했습니다.' });
  }
};

// 첨부파일 다운로드
exports.downloadAttachment = async (req, res) => {
  try {
    const { taskId, attachmentId } = req.params;

    const attachment = await Attachment.findOne({
      where: {
        id: attachmentId,
        TaskId: taskId
      }
    });

    if (!attachment) {
      return res.status(404).json({ message: '첨부파일을 찾을 수 없습니다.' });
    }

    // 파일 다운로드
    res.download(attachment.filePath, attachment.originalName);
  } catch (error) {
    console.error('첨부파일 다운로드 오류:', error);
    res.status(500).json({ message: '첨부파일 다운로드에 실패했습니다.' });
  }
};

