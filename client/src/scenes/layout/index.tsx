import React, {useState} from 'react';
import {Box, useMediaQuery} from "@mui/material";
import {Outlet} from 'react-router-dom';
import Navbar from "../../components/Navbar";
import Sidebar from '../../components/Sidebar';
import {useGetUserQuery} from "../../state/api";
import {useSelector} from "react-redux";


const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const userId = useSelector((state: any) => state.global.userId);
    const {data} = useGetUserQuery(userId);

    return (
        <div className='w-full h-full block md:flex'>
            <Sidebar user={data||{}} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
            <div className='w-full h-full flex-1'>
                <Navbar user={data||{}} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;