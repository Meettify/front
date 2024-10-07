import React from "react";
import { useAuth } from '../../../hooks/useAuth';

const InfoForm = () => {
    const { memberId } = useAuth();

    return (
        <div>
           <div>Your member ID is: {memberId}</div>
        </div>
    )

}

export default InfoForm;