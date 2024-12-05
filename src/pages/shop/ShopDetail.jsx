import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemDetail } from '../../api/adminAPI'; // 상품 상세 조회 함수
import { BsCart3 } from "react-icons/bs"; // 아이콘 사용
import RoundedButton from '../../components/button/RoundedButton'; // 버튼 컴포넌트
import useShopStore from '../../stores/useShopStore'; // useShopStore 가져오기


const ShopDetail = () => {
    const { itemId } = useParams(); // URL에서 itemId 가져오기
    const navigate = useNavigate();
    const [itemDetail, setItemDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart, cartItems } = useShopStore();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const item = await getItemDetail(itemId); // 상품 상세 정보 가져오기
                setItemDetail(item);
            } catch (error) {
                setError('상품 정보를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [itemId]);

    const handleOrderNow = () => {
        if (!itemDetail) {
            alert('상품 정보가 없습니다.');
            return;
        }

        // itemDetail에서 가격과 수량이 존재하는지 확인
        const itemPrice = itemDetail.itemPrice;
        const itemQuantity = itemDetail.itemCount; // 수량은 itemCount로 설정

        if (isNaN(itemPrice) || isNaN(itemQuantity) || itemPrice <= 0 || itemQuantity <= 0) {
            alert('상품 가격 또는 수량 정보가 올바르지 않습니다.');
            return;
        }

        // 단일 상품을 배열로 만들어서 넘기기
        const selectedCartItems = [itemDetail];

        // 결제 금액 계산 (가격 * 수량)
        const totalPrice = itemPrice * itemQuantity; // 단일 상품의 결제 금액 계산

        // 결제 금액이 제대로 계산되었는지 확인
        if (isNaN(totalPrice) || totalPrice <= 0) {
            alert('결제 금액이 계산되지 않았습니다.');
            return;
        }

        // 'order' 페이지로 전달할 때 결제 금액도 함께 넘겨주기
        navigate('/order', {
            state: {
                selectedCartItems,
                totalPrice // 결제 금액 전달
            }
        });
    };


    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;
    if (!itemDetail) return <p>상품 정보를 찾을 수 없습니다.</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{itemDetail.itemName}</h1>
            <p className="text-xl mb-2">가격: {Number(itemDetail.itemPrice).toLocaleString()}원</p>
            <p className="mb-2">설명: {itemDetail.itemDetails}</p>
            <p className="mb-2">카테고리: {itemDetail.itemCategory}</p>
            <p className="mb-2">수량: {itemDetail.itemCount}</p>
            <p className="mb-2">상태: {itemDetail.itemStatus}</p>

            {/* 상품 이미지 */}
            {itemDetail.images && itemDetail.images.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {itemDetail.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`상품 이미지 ${index + 1}`}
                            className="w-full h-auto"
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">이미지가 없습니다.</p>
            )}

            {/* 버튼들 */}
            <div className="mt-6 flex flex-col items-center">
                <div className="flex gap-5">
                    <RoundedButton onClick={() => navigate('/shop')} className="mb-5 bg-blue-500 hover:bg-blue-700 text-white">
                        목록으로 돌아가기
                    </RoundedButton>
                    <RoundedButton onClick={handleOrderNow} className="bg-red-500 hover:bg-red-700 text-white">
                        주문하기
                    </RoundedButton>
                </div>
            </div>
        </div>
    );
};

export default ShopDetail;
