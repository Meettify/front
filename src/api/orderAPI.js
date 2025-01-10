import request from './request';
import { getCartItems } from './cartAPI';
import { getMember } from './memberAPI';

const BASE_URL = '/orders';  // 주문 관련 API URL

export const createTempOrder = async (memberId) => {
  try {
    // 1. 회원 정보 가져오기
    const member = await getMember(memberId);
    console.log('회원 정보:', member);  // 회원 정보 출력

    if (!member) {
      throw new Error('회원 정보를 가져올 수 없습니다.');
    }

    const { memberAddr } = member; // memberAddr 객체를 가져오기

    // 2. 주소 정보 검증
    const { memberAddr: address, memberAddrDetail, memberZipCode } = memberAddr;  // memberAddr 객체에서 필요한 속성들 분리
    console.log('회원 주소:', { address, memberAddrDetail, memberZipCode });  // 주소 정보 출력

    if (!address || !memberAddrDetail || !memberZipCode) {
      throw new Error('회원 정보에 유효한 주소가 없습니다.');
    }

    console.log('회원 주소 정보 유효:', address, memberAddrDetail, memberZipCode);

    // 3. 장바구니 상품 정보 가져오기
    const cartItems = await getCartItems();
    console.log('장바구니 상품 조회:', cartItems);

    if (!cartItems || cartItems.length === 0) {
      throw new Error('장바구니에 상품이 없습니다.');
    }

    // 4. 장바구니 항목 매핑
    const orders = cartItems.map((item) => ({
      itemId: item.itemId,
      itemCount: item.itemCount || 1,
      itemName: item.itemName || '상품명 없음',
    }));

    // 5. 요청 데이터 구성
    const requestBody = {
      orders,
      address: {
        memberAddr: address,
        memberAddrDetail,
        memberZipCode,
      },
    };

    console.log('Request body to send:', JSON.stringify(requestBody, null, 2));

    // 6. 임시 주문 생성 요청
    const response = await request.post({
      method: 'POST',  // 요청 메서드 명시
      url: `${BASE_URL}/tempOrder`,  // 요청 URL
      data: requestBody,  // 요청 본문 데이터
      headers: {
        'Content-Type': 'application/json',  // 요청 헤더 설정
      },
    });

    // 응답 데이터 처리
    if (response && response.data) {
      console.log('임시 주문 생성 성공:', response.data);
      return response.data;
    } else {
      console.error('임시 주문 생성 실패:', response);
      throw new Error('임시 주문 생성에 실패했습니다.');
    }
  } catch (error) {
    console.error('임시 주문 생성 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};

// 내 주문 조회
export const getMyOrders = async () => {
  try {
    const response = await request.get({
      url: `${BASE_URL}/my-order`,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('내 주문 조회 오류:', error);
    throw error;
  }
};

// 모든 주문 조회
export const getAllOrders = async () => {
  try {
    const response = await request.get({
      url: `${BASE_URL}`,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('모든 주문 조회 오류:', error);
    throw error;
  }
};

// 내 주문 수 조회
export const getMyOrderCount = async () => {
  try {
    const response = await request.get({
      url: `${BASE_URL}/count-my-order`,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('내 주문 수 조회 오류:', error);
    throw error;
  }
};

// 모든 주문 수 조회
export const getAllOrderCount = async () => {
  try {
    const response = await request.get({
      url: `${BASE_URL}/count-order`,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('모든 주문 수 조회 오류:', error);
    throw error;
  }
};
