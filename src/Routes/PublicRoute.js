import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router';


export const PublicRoute = () => {
    const userId = localStorage.getItem('_id');
    if(userId){
        return(<Navigate to='/p/userPropertyList'></Navigate>)
        
    }else{
        return(<Outlet/>)
    }}