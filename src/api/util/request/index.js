import axios, { HttpStatusCode } from "axios";

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
    axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json;charset=UTF-8', // request data type
            //Accept: 'application/json', // response data type
            //'Access-Control-Allow-Origin': '*', // CORS 설정 해제
            Authorization: 'Bearer ' + (window.sessionStorage.getItem('accessToken')?.replaceAll('"', '') ?? '')
        }
    })
    setInterceptor()
    return axiosInstance
}

// 엑세스 토큰 갱신 함수
const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;
  
    const response = await request.post(`http://3.34.94.116:8080/api/refresh-token${ refreshToken }`);
    return response.data.token;
  };

const setInterceptor = () => {
    getInstance().interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            // 401 에러 처리: Unauthorized (토큰 만료)
            if (error.response.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
                originalRequest._retry = true; // 무한 루프 방지
                const token = await refreshAccessToken(); // 새로운 엑세스 토큰 요청

                if (token) {
                    // 새로 받은 토큰을 세션 스토리지에 저장하고, 다시 요청
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
    return axiosInstance ? axiosInstance : init()
}

const apiRequest = async (config) => {
    return await new Promise((resolve, reject) => {
        getInstance().request(config)
        .then((res) => {
            try {
                resolve(res)
            } catch (error) {
                reject(error || new Error('Request Error'))
            }
        })
        .catch((error) => {
            reject(error)
        })
    })
}

const get = async (payload) => {
    return await apiRequest({...payload, method: METHOD.GET})
}

const post = async (payload) => {
    return await apiRequest({...payload, method: METHOD.POST})
}

const put = async (payload) => {
    return await apiRequest({...payload, method: METHOD.PUT})
}

const patch = async (payload) => {
    return await apiRequest({...payload, method: METHOD.PATCH})
}

const del = async (payload) => {
    return await apiRequest({...payload, method: METHOD.DELETE})
}

init()

const request = {
    get, post, put, patch, del
}

export default request
