import axios from 'axios';

// API URL 설정
// 프로덕션: 상대 경로 사용 (Vercel 배포 시)
// 개발: localhost 사용
const getBaseURL = () => {
  // 프로덕션 환경 (vercel.app 도메인)
  if (window.location.hostname.includes('vercel.app')) {
    return '/api';
  }
  // 환경 변수가 설정된 경우
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // 개발 환경 기본값
  return 'http://localhost:3001/api';
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 모든 요청에 JWT 토큰 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 Unauthorized 에러 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
