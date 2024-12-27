import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import RoundedButton from '../button/RoundedButton';

const RangeSlider = ({ onPriceChange }) => {
    const [range, setRange] = useState([10, 50000]);

    const handleSliderChange = (newRange) => {
        setRange(newRange);
    };

    const handleButtonClick = () => {
        onPriceChange(range); // "적용하기" 클릭 시 부모로 가격 범위 전달
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-between mb-2">
                <span className="text-sm text-gray-500">최소금액 ₩{range[0].toLocaleString()}</span>
                <span className="text-sm text-gray-500">최대금액 ₩{range[1].toLocaleString()}</span>
            </div>

            <Slider
                range
                min={0}
                max={100000}
                defaultValue={range}
                onChange={handleSliderChange}
                trackStyle={{ backgroundColor: '#007bff', height: 10 }}
                handleStyle={[{ backgroundColor: '#007bff', borderColor: '#007bff', opacity: 1, height: 24, width: 24, marginTop: -7, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }, { backgroundColor: '#007bff', borderColor: '#007bff', opacity: 1, height: 24, width: 24, marginTop: -7, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }]}
                railStyle={{ backgroundColor: '#d1d5db', height: 10 }}
            />

            <div className="w-full flex justify-end mt-4">
                <RoundedButton style={{ padding: '6px 14px', fontSize: '12px' }} onClick={handleButtonClick}>적용하기</RoundedButton>
            </div>
        </div >
    );
};

export default RangeSlider;
