import React from 'react'
import RedContainer from '../Components/Shared/RightPanel/RightPanel';
import './poc149.css';
import CalendarComponent from '../Components/Shared/CalendarComponent/CalendarComponent';
import NotificationCenter from '../Components/Shared/NotificationCenter/NotificationCenter';
import NotificationCard from '../Components/Shared/NotificationCards/NotificationCards';
import SlideBar from '../Components/Shared/Sidebar/Sidebar';
import Navbar from '../Components/Shared/NavbarStudents/NavbarStudents/NavbarDashboardStudents';
import Carousel from '../Components/Shared/Carousel/Carousel';

const notification = [
  'Notificación 1',
  'Notificación 2',
  'Notificación 3',
];


function POC129() {
  return (

    <div style={{display:'flex'}}>
    <div>
      <SlideBar/>
    </div>
    <div class="col-12">
      <Navbar />
      <div style={{display:'flex', textAlign: 'center', marginLeft:'25px'}}>
        <div class="col-5">
          <Carousel/>
        </div>

        <div class="col-4" style={{display:'flex', textAlign: 'center'}}>
     
            <div className="right-panel" >
              <RedContainer />


              <div className="calendar-and-notifications">
                <div className="calendar">
                  <CalendarComponent />
                </div>
                <div className="notifications">
                  <NotificationCenter />
                </div>

                <div className="NotificationCard">
                <NotificationCard notifications={notification} />
                </div>
              </div>

            </div>

            </div>
        </div>
      </div>
    </div>
    

  );
}

export default POC129;