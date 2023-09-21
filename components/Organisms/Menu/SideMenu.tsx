import React from 'react';
import HomeMenu from '@/components/Molecules/SideBar/HomeMenu';
import LibraryMenu from '@/components/Molecules/SideBar/LibraryMenu';

const SideMenu = () => {
    return (
        <div>
            <HomeMenu />
            <LibraryMenu/>
        </div>
    );
};

export default SideMenu;