import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useAdminStore from '../../stores/useAdminStore';

const ItemDetail = () => {
    const { itemId } = useParams();
    const { itemDetail, fetchItemDetail, deleteItem } = useAdminStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchItemDetail(itemId);
    }, [itemId, fetchItemDetail]);

    const handleDelete = async () => {
        await deleteItem(itemId);
        alert('상품이 삭제되었습니다.');
        navigate('/admin/items');
    };

    if (!itemDetail) return <div>로딩 중...</div>;

    return (
        <div>
            <h1>{itemDetail.itemName}</h1>
            <p>가격: {itemDetail.itemPrice}원</p>
            <p>설명: {itemDetail.itemDetails}</p>
            <Link to={`/admin/itemEdit/${itemId}`}>
                <button>수정</button>
            </Link>
            <button onClick={handleDelete}>삭제</button>
        </div>
    );
};

export default ItemDetail;
