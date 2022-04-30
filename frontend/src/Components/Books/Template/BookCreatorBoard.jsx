import React, { useState, useEffect } from 'react';
import "./BookCreatorBoard.css";
import Storybook from "./Storybook";


const BookCreatorBoard = (props) => {

    const [pageNum, setPageNum] = useState(1);
    const [pageList, setPageList] = useState([1]);
    const [current, setCurrent] = useState(1);
    var booktype = "story";
    
    useEffect(() => {
        var tempPN = parseInt(window.sessionStorage.getItem("pageNum"));
        var tempCR = parseInt(window.sessionStorage.getItem("current"));
        if (tempPN > 1) setPageNum(tempPN);
        
        if (tempCR > 1) setCurrent(tempCR);
    },[]);

    useEffect(() =>{
        window.sessionStorage.setItem("pageNum", pageNum);
        var temp = Array(pageNum).fill(null).map((_, i) => i+1);
        setPageList(temp);
        if(current > pageNum) setCurrent(pageNum);
    }, [pageNum]);

    useEffect(() =>{
        window.sessionStorage.setItem("current", current);
    }, [current]);

    const handleAdd = () => {
        setPageNum(pageNum+1);
    }

    const handleDelete = () => {
        if(pageNum-1 < 1) return;
        setPageNum(pageNum-1);
    }

    const handleClick = (e) =>{
        setCurrent(e.target.id);
    }

    return (
        <div className='BookCreatorBoard'>
            <div className="container">
                <div className="pageview">
                    {pageList.map((i) => <div className="page" key={i} onClick={handleClick} id={i}>page {i}</div>)}

                    <div className="addPage">
                        <input type="button" value="add" id='addpagebtn' onClick={handleAdd}/>
                        <input type="button" value="delete" id='addpagebtn' onClick={handleDelete}/>
                    </div>
                </div>
                <div className='board'>
                    <Storybook booktype={booktype} current={current}/>
                </div>
            </div>
            <div>{"page" + current + " total " + pageNum}</div>
            
        </div>
    );

}

export default BookCreatorBoard;