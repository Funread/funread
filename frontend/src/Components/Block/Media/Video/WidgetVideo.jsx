import React from "react";
import "./WidgetVideo.css";

function WidgetVideo() {
  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div className="VideoInput mt-3">
      <input
        ref={inputRef}
        className="VideoInput_input "
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4, gif"
      />
      {/* {!source && (
        <button className="btn btn-primary md" onClick={handleChoose}>
          Choose
        </button>
      )}
      {source && (
        <video
          className="VideoInput_video"
          width="100%"
          height="50%"
          controls
          src={source}
        />
      )} */}
      <div className="VideoInput_footer mt-3">
        {source || "Nothing selectd"}
      </div>
    </div>
  );
}
export default WidgetVideo;
