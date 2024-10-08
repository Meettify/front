import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import RoundedButton from '../button/RoundedButton';


const RangeSlider = () => {
    const [range, setRange] = useState([1000, 50000]);

    const handleSliderChange = (newRange) => {
        setRange(newRange);
    };

    const handleButtonClick = () => {
        // 버튼 클릭 시 동작 정의
        alert(`선택된 범위: ${range[0].toLocaleString()} - ${range[1].toLocaleString()}`);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-between mb-2">
                {/* 최소 금액 */}
                <span className="text-sm text-gray-500">최소금액 \ {range[0].toLocaleString()}</span>
                {/* 최대 금액 */}
                <span className="text-sm text-gray-500">최대금액 \ {range[1].toLocaleString()}</span>
            </div>

            {/* Range Slider */}
            <Slider
                range
                min={0}
                max={100000}
                defaultValue={range}
                onChange={handleSliderChange}
                trackStyle={{ backgroundColor: '#007bff', height: 10 }}
                handleStyle={[
                    {
                        backgroundColor: '#007bff',
                        borderColor: '#007bff',
                        opacity: 1, // 투명도 제거
                        height: 24,
                        width: 24,
                        marginTop: -7,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // 그림자 추가
                    },
                    {
                        backgroundColor: '#007bff',
                        borderColor: '#007bff',
                        opacity: 1, // 투명도 제거
                        height: 24,
                        width: 24,
                        marginTop: -7,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // 그림자 추가
                    },
                ]}
                railStyle={{ backgroundColor: '#d1d5db', height: 10 }}
            />

            {/* 버튼을 오른쪽 하단에 정렬 */}
            <div className="w-full flex justify-end mt-4">
                <RoundedButton style={{ padding: '6px 14px', fontSize: '12px' }} onClick={handleButtonClick}>
                    적용하기
                </RoundedButton>
            </div>
        </div>
    );
};

export default RangeSlider;
