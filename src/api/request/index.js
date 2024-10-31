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
        baseURL: import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:8080/api/v1',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8', // 기본 request data type
            Accept: 'application/json', // 기본 response data type
            Authorization: 'Bearer ' + token
        },
    });
    setInterceptor();
    return axiosInstance;
    
}

// 엑세스 토큰 갱신 함수
const refreshAccessToken = async (refreshToken) => {
    if (!refreshToken) {
        console.warn('Refresh token not found'); // 리프레시 토큰이 없을 경우 로그
        return null;
    }

    try {
        const response = await axiosInstance.get(`${import.meta.env.VITE_APP_API_BASE_URL}/token`, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        });
        return response.data;
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

            console.log(`ERROR INTERCEPTOR`)
            console.log(`ERROR.CONFIG.URL : ${error.config.url}`)
            console.log(`ERROR.RESPONSE?.STATUS : ${error.response?.status}`)

            // 401 Unauthorized 처리: 토큰 만료
            if (error.response?.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
                originalRequest._retry = true; // 무한 루프 방지
                const token = await refreshAccessToken(localStorage.getItem('refreshToken')); // TokenDTO

                console.log(`토큰재발급 Interceptor`)

                const accessToken = token.accessToken;
                const refreshToken = token.refreshToken;

                if (accessToken && refreshToken) {
                    sessionStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    console.log(`토큰 재발급 및 저장`)

                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                    // 요청을 다시 시도
                    return getInstance().request(originalRequest);
                } else {
                    console.error('Token could not be refreshed');
                }
            } else {
                console.error('Error response:', error.response);
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
                    console.error('Response handling error:', error); // 응답 처리 중 오류 로그
                    reject(error || new Error('Request Error'));
                }
            })
            .catch((error) => {
                console.error('Request failed:', error); // 요청 실패 로그
                reject(error);
            });
    });
};

// 각 메서드별 API 호출 함수
const get = async (payload) => {
    return await apiRequest({ ...payload, method: METHOD.GET });
}

const post = async (payload) => {
    payload.headers = payload.headers || {};
    
    if (payload.data instanceof FormData) {
        payload.headers['Content-Type'] = 'multipart/form-data';
    }

    return await apiRequest({ ...payload, method: METHOD.POST });
}


const put = async (payload) => {
    payload.headers = payload.headers || {};

    // FormData가 포함된 경우 Content-Type을 자동 설정
    if (payload.data instanceof FormData) {
        payload.headers['Content-Type'] = 'multipart/form-data';
    }

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
