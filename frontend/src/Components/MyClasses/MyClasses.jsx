import React from "react";
import "./MyClasses.sass"
import ClassesList from '../Shared/ClassesList/ClassesList'

import SidebarBook from '../Shared/SidebarBook/SidebarBook'


const MyClasses = () => {
    return (
        <div className='container-fluid text-center group'>
            <div className='row' style={{ height: 'auto' }}>
                <div className='col-1 p-0'>
                    <SidebarBook />
                </div >
                <div className='col-11 '></div>
                <ClassesList
                // groupId={groupId} 
                // newActivities={newActivities}
                />

            </div>
        </div>
    );
};

export default MyClasses;