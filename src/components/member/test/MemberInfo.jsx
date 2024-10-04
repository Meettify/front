import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemberInfo = () => {
    const [memberData, setMemberData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/members/4`);
                setMemberData(response.data);
            } catch (error) {
                console.error('Failed to fetch member data:', error.message);
                setError(error.message);
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            <h1>Member Information</h1>
            {error && <p>Error: {error}</p>}
            {memberData ? (
                <div>
                    <p>Email: {memberData.memberEmail}</p>
                    <p>Name: {memberData.memberName}</p>
                    <p>Address: {memberData.memberAddr?.memberAddr}, {memberData.memberAddr?.memberAddrDetail}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MemberInfo;
