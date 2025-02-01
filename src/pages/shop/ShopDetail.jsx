import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemDetail } from '../../api/adminAPI'; // 상품 상세 조회 함수
import { BsCart3 } from "react-icons/bs"; // 아이콘 사용
import RoundedButton from '../../components/button/RoundedButton'; // 버튼 컴포넌트
import useShopStore from '../../stores/useShopStore'; // useShopStore 가져오기
import ItemBuyCard from '../../components/shop/ItemBuyCard';


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
    
    
    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;
    if (!itemDetail) return <p>상품 정보를 찾을 수 없습니다.</p>;

    return (
        <div className="container mx-auto p-10">
            {/* 전체적으로 가운데 정렬 */}
            <div className="flex justify-center items-center">
                <div className="flex flex-col lg:flex-row items-center gap-6 w-full max-w-5xl">
                    {/* 상품 이미지 */}
                    <div className="flex justify-center flex-1 max-w-sm">
                        {itemDetail.images && itemDetail.images.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {itemDetail.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.uploadImgUrl || image}
                                        alt={`상품 이미지 ${index + 1}`}
                                        className="w-full h-auto rounded shadow"
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">이미지가 없습니다.</p>
                        )}
                    </div>

                    {/* 상품 정보 */}
                    <div className="flex-1 flex flex-col items-center text-center lg:text-left">
                        <h1 className="text-3xl font-bold mb-4">{itemDetail.itemName}</h1>
                        <p className="text-xl mb-2">가격: {Number(itemDetail.itemPrice).toLocaleString()}원</p>
                        <p className="mb-2">설명: {itemDetail.itemDetails}</p>
                        <p className="mb-2">카테고리: {itemDetail.itemCategory}</p>
                        <p className="mb-2">수량: {itemDetail.itemCount}</p>
                        <p className="mb-2">상태: {itemDetail.itemStatus}</p>
                        <ItemBuyCard itemDetail={itemDetail} itemId={itemId}/>
                        <RoundedButton onClick={() => navigate('/shop')} className="bg-blue-500 hover:bg-blue-700 text-white">
                            목록으로 돌아가기
                        </RoundedButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopDetail;