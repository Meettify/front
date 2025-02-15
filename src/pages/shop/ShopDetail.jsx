import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemDetail } from '../../api/adminAPI'; // 상품 상세 조회 함수
import { BsCart3 } from "react-icons/bs"; // 아이콘 사용
import RoundedButton from '../../components/button/RoundedButton'; // 버튼 컴포넌트
import useShopStore from '../../stores/useShopStore'; // useShopStore 가져오기
import ItemBuyCard from '../../components/shop/ItemBuyCard';
import "./ShopDetail.css";
import { FaFutbol, FaPlane, FaMusic, FaPalette, FaBook, FaHeartbeat, FaTshirt, FaPaw } from 'react-icons/fa';
import { BsChevronLeft } from "react-icons/bs";


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
        <div className="page-wrap ShopDetail">
            <div className="detail-wrap">
                <RoundedButton onClick={() => navigate('/shop')} className="btn-to-shop">
                    <BsChevronLeft />
                    <span>목록으로 돌아가기</span>
                </RoundedButton>
                <div className="item-area">
                {/* 상품 이미지 */}
                <div className="img-wrap">
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
                            <div>
                                <p className="text-gray-500">이미지가 없습니다.</p>
                            </div>
                        )}
                    </div>

                    {/* 상품 정보 */}
                    <div className="item-info-wrap">
                        <div className='label-area'>
                            <div className="label category">
                                <span className="icon-wrap"><FaMusic /></span>
                                <span className='category-name'>{itemDetail.itemCategory}</span>
                            </div>
                            <p className={`label status ${itemDetail.itemStatus === 'WAIT' ? 'status-wait' : itemDetail.itemStatus === 'SOLD_OUT' ? 'status-sold-out' : ''}`}>
                                {itemDetail.itemStatus}
                            </p>
                        </div>
                        <h1 className="item-name">{itemDetail.itemName}</h1>
                        <p className="discript">{itemDetail.itemDetails}</p>
                        <div className='item-price-area'>
                            <p className="price">{Number(itemDetail.itemPrice).toLocaleString()} 원</p>
                            <p className="inventory-count">남은수량 {itemDetail.itemCount}</p>
                        </div>
                        <ItemBuyCard itemDetail={itemDetail} itemId={itemId}/>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopDetail;