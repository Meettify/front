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
            'Content-Type': 'application/json;charset=UTF-8', // request data type
            Accept: 'application/json', // response data type
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
        const response = await request.get({
            url :`${import.meta.env.VITE_APP_API_BASE_URL}/token`,
            refreshToken,
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
            console.log(`Error occurred: ${error}`);

            // 401 Unauthorized 처리: 토큰 만료
            if (error.response?.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
                originalRequest._retry = true; // 무한 루프 방지
                const token = await refreshAccessToken(localStorage.getItem('refreshToken')); // 새로운 엑세스 토큰 요청

                if (token) {
                    sessionStorage.setItem('accessToken', token);
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;

                    // 요청을 다시 시도
                    return getInstance().request(originalRequest);
                } else {
                    console.error('Token could not be refreshed'); // 토큰 갱신 실패 로그
                }
            } else {
                console.error('Error response:', error.response); // 기타 오류 로그
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