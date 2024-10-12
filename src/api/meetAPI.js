import request from './request';

export const postMeetInsert = async (data, file) => {
    try {
        const formData = new FormData();
        
        // meetData 객체의 각 필드를 FormData에 추가
        formData.append('meetName', data.meetName);
        formData.append('meetDescription', data.meetDescription);
        formData.append('meetMaximum', data.meetMaximum);
        formData.append('meetLocation', data.meetLocation);
        formData.append('category', data.category);

        // 파일을 FormData에 추가
        if (file) {
            console.log("이미지 파일 추가: ", file);
            formData.append('images', file, file.name);
        }

        // API 요청 전송 (request.js를 사용하여 토큰 자동 추가)
        const response = await request.post({
            url: '/meets',  // BASE_URL은 request.js에서 설정됨
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response;
    } catch (error) {
        console.error('소모임 등록 오류:', error.response ? error.response.data : error);
        throw error;
    }
};
