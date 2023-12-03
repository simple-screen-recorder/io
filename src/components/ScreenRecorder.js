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
    <div className="flex flex-col items-center justify-center h-screen">
      <video ref={videoRef} className="w-full max-w-screen-lg" controls />
      {!recording ? (
        <button
          onClick={startRecording}
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Start Recording
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="mt-4 px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
        >
          Stop Recording
        </button>
      )}
    </div>
  );
};

export default ScreenRecorder;
