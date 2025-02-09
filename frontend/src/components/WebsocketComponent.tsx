"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
const WebcamComponent = () => {
  const SEND_TIMER = 6000;
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [handImage, setHandImage] = useState(null);
  const wsRef = useRef(null);

  useEffect(() => {
    // Set up WebSocket connection
    wsRef.current = new WebSocket("ws://localhost:8000/ws");

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.hand_image) {
        setHandImage(data.hand_image);
      } else if (data.error) {
        // console.error(data.error);
        setHandImage(null);
      }
    };

    // Access the user's camera
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        // console.error("Error accessing the camera: ", err);
        setHandImage(null);
      });

    // Set up interval to capture and send images
    const interval = setInterval(() => {
      captureAndSendImage();
    }, SEND_TIMER);

    return () => {
      clearInterval(interval);
      if (wsRef.current) wsRef.current.close();
    };
  }, []);
  // base 64
  const captureAndSendImage = () => {
    if (videoRef.current && canvasRef.current && wsRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, 640, 480);
      const imageData = canvasRef.current.toDataURL("image/jpeg", 0.8);
      const base64Image = imageData.split(",")[1];

      wsRef.current.send(JSON.stringify({ image: base64Image }));
    }
  };

  return (
    <div className="border-4 border-black w-[300px] h-[300px]">
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas
        className="border-4 border-black"
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      />
      {handImage && (
        <Image
          className="border-4 border-black"
          width={500}
          height={500}
          src={`data:image/png;base64,${handImage}`}
          alt="Processed hand"
        />
      )}
    </div>
  );
};

export default WebcamComponent;
