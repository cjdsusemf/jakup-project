const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  SUPABASE_URL 또는 SUPABASE_KEY가 설정되지 않았습니다.');
  console.warn('파일 업로드 기능을 사용하려면 Supabase 환경 변수를 설정하세요.');
}

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

/**
 * Supabase Storage에 파일 업로드
 * @param {Buffer} fileBuffer - 파일 버퍼
 * @param {string} fileName - 파일명
 * @param {string} mimeType - MIME 타입
 * @returns {Promise<{url: string, path: string}>} 업로드된 파일 정보
 */
async function uploadToSupabase(fileBuffer, fileName, mimeType) {
  if (!supabase) {
    throw new Error('Supabase 클라이언트가 초기화되지 않았습니다.');
  }

  const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'jakup-attachments';
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 15);
  const filePath = `attachments/${timestamp}-${randomStr}-${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, fileBuffer, {
      contentType: mimeType,
      upsert: false
    });

  if (error) {
    console.error('Supabase 업로드 오류:', error);
    throw new Error(`파일 업로드 실패: ${error.message}`);
  }

  // 공개 URL 생성
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return {
    path: filePath,
    url: urlData.publicUrl
  };
}

/**
 * Supabase Storage에서 파일 삭제
 * @param {string} filePath - 삭제할 파일 경로
 */
async function deleteFromSupabase(filePath) {
  if (!supabase) {
    throw new Error('Supabase 클라이언트가 초기화되지 않았습니다.');
  }

  const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'jakup-attachments';

  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);

  if (error) {
    console.error('Supabase 파일 삭제 오류:', error);
    throw new Error(`파일 삭제 실패: ${error.message}`);
  }
}

module.exports = {
  supabase,
  uploadToSupabase,
  deleteFromSupabase
};

