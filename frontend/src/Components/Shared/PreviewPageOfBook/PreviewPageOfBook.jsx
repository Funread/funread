import React from 'react'
import PropTypes from 'prop-types'
import "./PreviewPageOfBook.css";

function PreviewPageOfBook(props) { 
  return (
    <div className='preview-page'>
        <h1>{props.pageNumber}</h1> 
    </div>
  )
}

PreviewPageOfBook.propTypes = {}

export default PreviewPageOfBook
