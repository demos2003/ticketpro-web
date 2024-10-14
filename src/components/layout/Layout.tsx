import Header from "../header/Header"
import Sidebar from "../sidebar/Sidebar"
import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';


interface LayoutProps {
    children?: ReactNode; // Make children optional since it's coming from Outlet
}


const Layout: React.FC<LayoutProps> = () => {

    return (
        <div className="h-screen flex-row flex">
            <Sidebar />
            <div className="w-[85%] min-h-screen flex flex-col ">
                <Header />
                <main className="flex-grow bg-gray-100 overflow-y-auto relative no-scrollbar">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout