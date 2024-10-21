import React, { useEffect } from 'react';
import useAdminStore from '../../stores/useAdminStore';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';

const ItemList = () => {
    const { itemList, fetchItemList, loading, error, removeItem } = useAdminStore();

    useEffect(() => {
        fetchItemList(); // 페이지 로드 시 상품 목록 조회
    }, [fetchItemList]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>오류 발생: {error}</p>;
    if (!itemList || itemList.length === 0) return <p>등록된 아이템이 없습니다.</p>;

    return (
        <div className="container mx-auto">
            {/* <div className="text-2xl font-semibold mb-4 text-left">상품 목록</div> */}

            {/* 상품 등록 버튼 */}
            <div className="flex justify-between items-center mb-4">
                <div></div>
                <RoundedButton style={{ padding: '6px 14px', fontSize: '12px' }} onClick={() => console.log('상품 등록')}>
                    상품 등록
                </RoundedButton>
            </div>

            {/* 상품 목록 테이블 */}
            <table className="w-full table-fixed border-t border-gray-300 text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="p-2 text-center font-medium w-1/12">번호</th>
                        <th className="p-2 text-center font-medium w-2/12">카테고리</th>
                        <th className="p-2 text-center font-medium w-2/12">가격</th>
                        <th className="p-2 text-center font-medium w-3/12">상품명</th>
                        <th className="p-2 text-center font-medium w-2/12">이미지</th>
                        <th className="p-2 text-center font-medium w-1/12">수량</th>
                        <th className="p-2 text-center font-medium w-1/12">상태</th>
                        <th className="p-2 text-center font-medium w-1/12">삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {itemList.map((item) => (
                        <tr key={item.itemId} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="p-2 text-center">{item.itemId}</td>
                            <td className="p-2 text-center">{item.itemCategory}</td>
                            <td className="p-2 text-center">{item.itemPrice}</td>
                            <td className="p-2 text-center">{item.itemName}</td>
                            <td className="p-2 text-center">{'{images}'}</td>
                            <td className="p-2 text-center">{item.itemCount}</td>
                            <td className="p-2 text-center">{item.itemStatus}</td>
                            <td className="p-2 text-center">
                                <RoundedCancelButton style={{ padding: '6px 14px', fontSize: '12px' }} onClick={() => removeItem(item.itemId)}>
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
