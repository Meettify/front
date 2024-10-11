import React from 'react';
import { useParams } from 'react-router-dom';
import useCommStore from '../../stores/useCommStore';

const CommDetail = () => {
    const { id } = useParams(); // URL에서 id 값 가져오기
    console.log(id); // id 값 확인
    const { posts } = useCommStore();
    const post = posts.find((post) => post.id === parseInt(id)); // id로 게시글 찾기

    if (!post) {
        return <div>게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="container mx-auto mt-20">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-2">작성자: {post.author}</p>
            <p className="text-gray-600 mb-2">작성일: {post.date}</p>
            <div className="border-t border-gray-300 pt-4">
                <p>{post.content}</p>
            </div>
        </div>
    );
};

export default CommDetail;
