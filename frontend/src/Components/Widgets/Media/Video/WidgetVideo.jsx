import React from "react";
import ReactPlayer from "react-player";
import "./WidgetVideo.css";

function WidgetVideo({handlefile}) {
  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
    handlefile(file);
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
        accept=".mp4, .avi, .mkv, .mov, .wmv, .flv"
      />
      {
        <button className="btn btn-primary md mt-2" onClick={handleChoose}>
          Choose...
        </button>
      }
      <div className="youtube-box mx-auto mt-2 mb-2">
        <ReactPlayer url={source} className="video" controls></ReactPlayer>
      </div>
      <div className="VideoInput_footer mt-3">
        {source || "Nothing selectd"}
      </div>
    </div>
  );
}
export default WidgetVideo;
