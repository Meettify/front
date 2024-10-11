// ProductDetailPage.js

import { useEffect } from 'react';
import useAdminStore from '../../stores/useAdminStore';
import { useParams } from 'react-router-dom';

const AdminItemDetail = () => {
    const { itemId } = useParams(); // URL에서 itemId를 가져옴
    const { selectedProduct, fetchProduct, loading, error } = useAdminStore();

    useEffect(() => {
        if (itemId) {
            fetchProduct(itemId);  // itemId가 있을 경우 상품 조회 호출
        }
    }, [itemId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {selectedProduct ? (
                <div>
                    <h1>{selectedProduct.itemName}</h1>
                    <p>Price: {selectedProduct.price}</p>
                    <p>{selectedProduct.itemDetail}</p>
                </div>
            ) : (
                <div>상품 정보를 불러오지 못했습니다.</div>
            )}
        </div>
    );
};

export default AdminItemDetail;
