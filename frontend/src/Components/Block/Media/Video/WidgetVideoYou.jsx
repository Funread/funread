import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./WidgetVideoYou.css";

function WidgetVideoYou() {
  const inputRef = React.useRef();
  const [youtubeVideo, setYoutubeVideo] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");

  const handleYoutubeChange = (e) => {
    setYoutubeVideo(e.target.value);
  };

  const handleYoutubeSubmit = (e) => {
    e.preventDefault();
    setYoutubeURL(youtubeVideo);
  };
  return (
    <div>
      <form className="custum-form-group form" onSubmit={handleYoutubeSubmit}>
        <input
          type="text"
          ref={inputRef}
          className="form-control "
          placeholder="Enter YouTube URL"
          required
          onChange={handleYoutubeChange}
        />
        <button type="submit" className="btn btn-primary btn-md mt-2">
          Upload
        </button>
        <div className="youtube-box mx-auto mt-2 mb-2">
          <ReactPlayer
            url={youtubeURL}
            className="video"
            controls
          ></ReactPlayer>
        </div>
      </form>
      <div className="VideoInput_footer mt-3">
        {youtubeURL || "Nothing selectd"}
      </div>
    </div>
  );
}

export default WidgetVideoYou;
