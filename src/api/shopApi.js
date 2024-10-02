// shop api
// import { fetchShop } from '../api/shopApi';

import axios from 'axios';

const fetchShop = async (id) => {
    try {
        // 엔드포인트 경로에 맞게 수정
        const response = await axios.get(`/shop/${id}`);
        console.log('Shop Data:', response.data);
    } catch (error) {
        console.error('Error fetching Shop:', error);
    }
};  