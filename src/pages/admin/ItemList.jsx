import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminStore from '../../stores/useAdminStore';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';

const ItemList = () => {
    const { itemList, fetchItemList, loading, error, removeItem } = useAdminStore();
    const navigate = useNavigate();

    const goToItemDetail = (itemId) => {
        console.log('Navigating to itemDetail with ID:', itemId); // 디버깅용 로그
        if (!itemId) {
            console.error('Item ID가 없습니다.');
            return;
        }
        navigate(`/admin/itemDetail/${itemId}`);
    };

    useEffect(() => {
        fetchItemList();  // 페이지 로드 시 상품 목록 조회
    }, [fetchItemList]);

    // 상태 변경을 추적하는 useEffect 추가
    useEffect(() => {
        console.log('Rendered itemList in ItemList component:', itemList);
    }, [itemList]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>오류 발생: {error}</p>;
    if (!itemList || itemList.length === 0) return <p>등록된 아이템이 없습니다.</p>;

    return (
        <div className="container mx-auto">
            <table className="w-full table-fixed border-t border-gray-300 text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="p-2 text-center">번호</th>
                        <th className="p-2 text-center">카테고리</th>
                        <th className="p-2 text-center">가격</th>
                        <th className="p-2 text-center">상품명</th>
                        <th className="p-2 text-center">삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {itemList.map((item) => (
                        <tr key={item.itemId} className="hover:bg-gray-100">
                            <td className="p-2 text-center">{item.itemId}</td>
                            <td className="p-2 text-center">{item.itemCategory}</td>
                            <td className="p-2 text-center">{item.itemPrice}</td>
                            <td className="p-2 text-center">
                                <button onClick={() => goToItemDetail(item.itemId)}>
                                    {item.itemName}
                                </button>
                            </td>
                            <td className="p-2 text-center">
                                <RoundedCancelButton onClick={() => removeItem(item.itemId)}>
                                    삭제
                                </RoundedCancelButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemList;
