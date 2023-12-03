import React, { useState, useRef } from "react";
import RecordRTC from "recordrtc";

const ScreenRecorder = () => {
  const [recording, setRecording] = useState(false);
  const videoRef = useRef(null);
  const recordRTC = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: "screen" },
    });

    recordRTC.current = RecordRTC(stream, {
      type: "video",
    });

    recordRTC.current.startRecording();
    setRecording(true);
  };

  const stopRecording = () => {
    recordRTC.current.stopRecording(() => {
      const blob = recordRTC.current.getBlob();
      videoRef.current.src = URL.createObjectURL(blob);
      setRecording(false);
    });
  };

  return (
    <div>
      <video ref={videoRef} controls />
      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
    </div>
  );
};

export default ScreenRecorder;
