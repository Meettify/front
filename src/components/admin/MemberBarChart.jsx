import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const MemberBarChart = ({ chartData }) => {
    const sortedData = [...chartData].reverse(); // 데이터 역순으로 정렬
    return(
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sortedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="date" 
                    type="category"  // 날짜를 카테고리로 처리
                    tick={{ fontSize: 12 }}
                    textAnchor="middle" // 날짜 레이블 위치
                />
                <YAxis />
                <Tooltip />
                <Bar 
                    dataKey="count"   // count를 기준으로 차트에 표시
                    fill="#82ca9d"    // 막대 색상 변경
                    barSize={18}      // 막대 크기
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default MemberBarChart;
