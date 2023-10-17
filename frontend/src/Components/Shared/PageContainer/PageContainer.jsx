import React, { useEffect, useState } from 'react'
import ContentImage from '../ContentImage/ContentImage'
import Grids from '../Grids/Grids'
import './PageContainer.css'
import axios from 'axios'
import { useLogin } from '../../../hooks/useLogin'

const PageContainer = ({ title, image, width, height, imageAlt, text }) => {
    const [pageInfo, setPageInfo] = useState(0)
    const { axiosAuth } = useLogin()
    
    useEffect(() => {
        const fetchPageInfo = async () => {
          try {
            const axiosRes = await axiosAuth().get('pages/searchPage/2');
            setPageInfo(axiosRes.data.gridid);
          } catch (error) {
            console.error('Error fetching page info:', error);
          }
        };
    
        fetchPageInfo();
      }, [axiosAuth]);



  return (
    <div className='container-fluid'>
    <div className='row'>
        <div className='col'>
            <div className='card shadow mb-4 content_page'>
                <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
                    <h6 className='m-0 font-weight-bold text-primary'>{title}</h6>
                </div>

                <div className='card-body'>
                <Grids gridId={pageInfo}/>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default PageContainer
