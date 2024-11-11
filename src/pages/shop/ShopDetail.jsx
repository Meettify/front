import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemDetail } from '../../api/adminAPI'; // 상품 상세 조회 함수 가져오기
import { BsCart3 } from "react-icons/bs"; // React Icons 가져오기
import RoundedButton from '../../components/button/RoundedButton'; // RoundedButton 가져오기

const ShopDetail = () => {
    const { itemId } = useParams(); // URL에서 itemId 가져오기
    const navigate = useNavigate();
    const [itemDetail, setItemDetail] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

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

    const handleAddToCart = () => {
        console.log(`아이템 ${itemId}을(를) 장바구니에 추가`);
    };

    const handleOrderNow = () => {
        console.log(`아이템 ${itemId}을(를) 주문`);
        navigate('/order'); // 주문 페이지로 이동 (필요에 따라 경로 수정)
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;
    if (!itemDetail) return <p>상품 정보를 찾을 수 없습니다.</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{itemDetail.itemName}</h1>
            <p className="text-xl mb-2">가격: {itemDetail.itemPrice.toLocaleString()}원</p>
            <p className="mb-2">설명: {itemDetail.itemDetails}</p>
            <p className="mb-2">카테고리: {itemDetail.itemCategory}</p>
            <p className="mb-2">수량: {itemDetail.itemCount}</p>
            <p className="mb-2">상태: {itemDetail.itemStatus}</p>

            {/* 이미지 렌더링 */}
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

            {/* 버튼 영역 */}
            <div className="mt-6 flex flex-col items-center">

                <div className="flex gap-5">
                    <RoundedButton onClick={() => navigate('/shop')} className="mb-5 bg-blue-500 hover:bg-blue-700 text-white">
                        목록으로 돌아가기
                    </RoundedButton>
                    <RoundedButton onClick={handleAddToCart} className="flex items-center">
                        {/* <BsCart3 className="mr-2" />  */}
                        장바구니
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
