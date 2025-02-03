import React, { useContext, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import RoundedButton from '../button/RoundedButton';
import "../button/buttons.css";
import "./RangeSlider.css";
import { PriceRangeContext } from "../../pages/shop/ShopPage";


const RangeSlider = React.memo(() => {
    const {priceRange, updatePriceRange} = useContext(PriceRangeContext);  //현재 적용된 범위
    const [range, setRange] = useState(priceRange);//실시간 값
    

    const handleSliderChange = (newRange) => {
        setRange(newRange);
    };

    const handleButtonClick = () => {
        updatePriceRange(range);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-between mb-2">
                <span className="text-sm text-gray-500">최소금액 ₩{range[0].toLocaleString()}</span>
                <span className="text-sm text-gray-500">최대금액 ₩{range[1].toLocaleString()}</span>
            </div>
            <div className="slider-wrap">
                <Slider
                    range
                    min={10000}         //최소범위
                    max={1000000}       //최대범위
                    defaultValue={range}
                    onChange={handleSliderChange}
                    trackStyle={{ backgroundColor: '#007bff', height: 10 }}
                    handleStyle={[{ backgroundColor: '#007bff', borderColor: '#007bff', opacity: 1, height: 24, width: 24, marginTop: -7, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }, { backgroundColor: '#007bff', borderColor: '#007bff', opacity: 1, height: 24, width: 24, marginTop: -7, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }]}
                    railStyle={{ backgroundColor: '#d1d5db', height: 10 }}
                />
            </div>

            <div className="w-full flex justify-end mt-4">
                <RoundedButton className="btn-line-blue btn-slider-on" onClick={handleButtonClick}>적용하기</RoundedButton>
            </div>
        </div >
    );
});

export default RangeSlider;
