import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const CommBarChart = ({ chartData }) => {
    const sortedData = [...chartData].reverse();
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
                    dataKey="count"
                    fill="#f56856" 
                    barSize={18}      // 막대 크기 줄이기
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default CommBarChart;
