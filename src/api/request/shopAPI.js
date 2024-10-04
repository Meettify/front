import axios from 'axios';

// 백엔드에 상품 데이터를 전송하는 함수
const createShopItem = async () => {
    const payload = {
        itemName: "Sample Item",
        itemPrice: 1000,
        itemDetails: "This is a sample item",
        itemStatus: "SELL",
        itemCount: 10,
        itemCategory: "SPORTS"
    };

    try {
        // 상품 등록 API 호출
        const response = await axios.get('http://localhost:8080/api/v1/items', {
            params: payload
        });

        // 응답 확인
        console.log('응답 데이터:', response.data);
    } catch (error) {
        console.error('API 호출 오류:', error);
    }
};

// 함수 호출하여 상품 등록 테스트
createShopItem();