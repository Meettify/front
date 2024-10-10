import axios, { HttpStatusCode } from 'axios';

const METHOD = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    PATCH: 'patch',
    DELETE: 'delete'
}

let axiosInstance = null;

// http 통신 default 설정
const init = () => {
    const token = window.sessionStorage.getItem('accessToken')?.replaceAll('"', '') ?? '';

    axiosInstance = axios.create({
        baseURL: import.meta.env.MODE === 'production'
            ? import.meta.env.VITE_APP_API_BASE_URL
            : 'http://localhost:8080/api/v1',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8', // request data type
            Accept: 'application/json', // response data type
            // 'Access-Control-Allow-Origin': '*', // CORS 설정 해제
            Authorization: 'Bearer ' + (window.sessionStorage.getItem('accessToken')?.replaceAll('"', '') ?? '')
        },
    });
    setInterceptor();
    return axiosInstance;
}

// 엑세스 토큰 갱신 함수
const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;

    try {
        const response = await axiosInstance.post(`/refresh-token`, { token: refreshToken });
        return response.data.token;
    } catch (error) {
        console.error('Token refresh failed:', error);
        return null;
    }
};

// 인터셉터 설정
const setInterceptor = () => {
    getInstance().interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            console.log(`error : ${error}`);

            // 401 Unauthorized 처리: 토큰 만료
            if (error.response?.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
                originalRequest._retry = true; // 무한 루프 방지
                const token = await refreshAccessToken(); // 새로운 엑세스 토큰 요청

                if (token) {
                    // 새로운 토큰을 세션 스토리지에 저장하고, 다시 요청
                    sessionStorage.setItem('accessToken', token);
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;

                    // 요청을 다시 시도
                    return getInstance().request(originalRequest);
                }
            }
            return Promise.reject(error);
        }
    );
};

const getInstance = () => {
    return axiosInstance ? axiosInstance : init();
}

// API 요청 함수
const apiRequest = async (config) => {
    return await new Promise((resolve, reject) => {
        getInstance().request(config)
            .then((res) => {
                try {
                    resolve(res);
                } catch (error) {
                    reject(error || new Error('Request Error'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// 각 메서드별 API 호출 함수
const get = async (payload) => {
    return await apiRequest({ ...payload, method: METHOD.GET });
}

const post = async (payload) => {
    return await apiRequest({ ...payload, method: METHOD.POST });
}

const put = async (payload) => {
    return await apiRequest({ ...payload, method: METHOD.PUT });
}

const patch = async (payload) => {
    return await apiRequest({ ...payload, method: METHOD.PATCH });
}

const del = async (payload) => {
    return await apiRequest({ ...payload, method: METHOD.DELETE });
}

// 초기화
init();

// 공통 API 요청 객체
const request = {
    get, post, put, patch, del
}

export default request;