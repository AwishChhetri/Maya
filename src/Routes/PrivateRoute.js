import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router';



export const PrivateRoute = () => {
    const userId = localStorage.getItem('token');
   

    // useEffect(() => {
    //     if (!userId) {
    //         toast.warning("Warning: User Not Found !", {
    //             position: toast.POSITION.TOP_LEFT,
    //         });
    //     }
    // }, [userId]);

    return (
        userId ? <Outlet /> : <Navigate to='/' />
    );
};