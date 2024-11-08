import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getItemDetail } from '../../api/adminAPI'; // 상품 상세 조회 함수 가져오기
import useAdminStore from '../../stores/useAdminStore'; // 필요한 경우 Zustand 스토어 사용

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

            <div className="mt-6">
                <Link to="/shop">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                        목록으로 돌아가기
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ShopDetail;
