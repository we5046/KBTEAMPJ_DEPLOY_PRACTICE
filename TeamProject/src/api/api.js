/**
 * @fileoverview API 기본 설정 및 공통 axios 인스턴스
 * @description json-server와의 통신을 위한 기본 axios 설정을 제공합니다.
 * Vite 프록시를 통해 /api 경로를 json-server로 라우팅합니다.
 */

import axios from 'axios';

/**
 * 기본 API 클라이언트 인스턴스
 * - baseURL: '/api' (Vite 프록시를 통해 localhost:3001로 라우팅)
 * - 모든 API 요청의 기본 설정을 포함
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

export default api;
