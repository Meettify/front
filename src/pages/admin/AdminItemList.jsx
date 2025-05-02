// import React, { useEffect } from 'react';
// import useAdminStore from '../../stores/useAdminStore';

// const AdminItemList = () => {
//     const { products, fetchProduct, deleteProduct, loading, error } = useAdminStore();

//     useEffect(() => {
//         fetchProduct(); // 전체 상품 목록을 가져옴
//     }, [fetchProduct]);

//     const handleDelete = async (itemId) => {
//         await deleteProduct(itemId); // 상품 삭제 후 목록 다시 로드
//         fetchProduct(); // 삭제 후 목록 다시 가져옴
//     };

//     if (loading) return <p>로딩 중...</p>;
//     if (error) return <p>오류 발생: {error}</p>;

//     return (
//         <div>
//             <h2>상품 목록</h2>

//             {products && products.length > 0 ? (
//                 <ul>
//                     {products.map((product) => (
//                         <li key={product.itemId}>
//                             <p>{product.itemName || '상품명 없음'}</p> - {product.price || 0}원
//                             <button onClick={() => handleDelete(product.itemId)}>삭제</button>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>등록된 상품이 없습니다.</p> // 상품이 없을 때 메시지 표시
//             )}
//         </div>
//     );
// };

// export default AdminItemList;
