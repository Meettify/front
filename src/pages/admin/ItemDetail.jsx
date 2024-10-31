import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useAdminStore from '../../stores/useAdminStore';

const ItemDetail = () => {
    const { itemId } = useParams(); // URL 파라미터에서 itemId 가져오기
    const { itemDetail, fetchItemDetail, loading, error } = useAdminStore(); // 상태와 데이터 가져오기
    const navigate = useNavigate();

    useEffect(() => {
        fetchItemDetail(itemId); // 상품 상세 조회
    }, [itemId, fetchItemDetail]);

    const handleDelete = async () => {
        try {
            await deleteItem(itemId); // 상품 삭제
            alert('상품이 삭제되었습니다.');
            navigate('/admin/itemList'); // 삭제 후 목록으로 이동
        } catch (error) {
            console.error('삭제 중 오류 발생:', error);
        }
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>오류 발생: {error}</p>;
    if (!itemDetail) return <p>상품 정보를 불러올 수 없습니다.</p>; // 예외 처리

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{itemDetail.itemName}</h1>
            <p className="text-xl mb-2">가격: {itemDetail.itemPrice.toLocaleString()}원</p>
            <p className="mb-2">설명: {itemDetail.itemDetails}</p>
            <p className="mb-2">카테고리: {itemDetail.itemCategory}</p>
            <p className="mb-2">수량: {itemDetail.itemCount}</p>
            <p className="mb-2">상태: {itemDetail.itemStatus}</p>

            {/* 이미지 렌더링 */}
            {itemDetail.images.length > 0 ? (
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

            <div className="mt-6 flex gap-4">
                <Link to={`/admin/itemModify/${itemId}`}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                        수정
                    </button>
                </Link>
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                >
                    삭제
                </button>
            </div>
        </div>
    );
};

export default ItemDetail;
