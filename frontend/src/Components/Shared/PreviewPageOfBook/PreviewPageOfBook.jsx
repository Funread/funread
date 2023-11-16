import React from "react";
import PropTypes from "prop-types";
import "./PreviewPageOfBook.sass";

function PreviewPageOfBook(props) {
  return <div className="preview-page">{props.pageTemplate}</div>;
}

PreviewPageOfBook.propTypes = {};

export default PreviewPageOfBook;
