import * as React from "react";
import { useAuthContext } from '../auth/auth_provider';
import { useState, useEffect } from "react";

function DetailBottomArea(props) {
    const [Status, setStatus] = useState([]);
    const { token } = useAuthContext();
    const { userName } = useAuthContext();


    return (
        <>
            <div className="review_area">
                <div className="review_headers">
                    <h5>User</h5>
                </div>
            </div>
        </>
    ); 
}
    
export default DetailBottomArea;
