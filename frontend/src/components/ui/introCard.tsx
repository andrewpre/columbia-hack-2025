"use client"
import React, { useState,useEffect,useRef } from 'react';

interface IntroCardProps {
  name: string | undefined;
  images: string[];
  increaseIndex: () => void;
}

const IntroCard: React.FC<IntroCardProps> = ({ name = "", images, increaseIndex,togglePopup }) => {
  const [index, setIndex] = useState<number>(0);

  const handleIncreaseIndex = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIndex((prev) => (prev + 1));
  };

  const videoRef = useRef(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam: ", error);
      }
    };

    startWebcam();

    // Clean up the webcam stream when the component is unmounted
    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
    };
  }, [index]);
  return (
    <div className="flex flex-col items-center justify-center  rounded-lg text-white h-full w-full">
      {index === 0 && (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-black">Letters: A B C</h2>
          <div className="flex space-x-4 mb-4">
            {images.map((image, idx) => (
              <img key={idx} src={image} alt={`Letter ${String.fromCharCode(65 + idx)}`} className="w-32 h-32 object-cover rounded-lg" />
            ))}
          </div>
          <button
            onClick={handleIncreaseIndex}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Start
          </button>
        </div>
      )}


            {index === 1 && (
        <div className="w-full">
          <div className="flex justify-between items-center mb-4" style={{width:"calc(50% + 4.5ch)",marginLeft:"auto"}}>
            <h2 className="text-2xl font-bold text-black">Letter: A</h2>
            <img src={images[index - 1]} alt="Current letter" className="w-24 h-24 object-cover rounded-lg" />
          </div>
          <div style={{display:"flex"}}>
          <div className="flex flex-col items-center mb-4" style={{ width: 'fit-content',alignSelf: "center" }}>
            {/* Vertical Stepper */}
            <div className="flex flex-col items-start space-y-4">
            {['A', 'B', 'C'].map((letter, stepIndex) => (
  <div key={letter} className="circle-container">
    {/* Vertical line connecting the circles */}
    {stepIndex !== 0 && (
      <div
        className={`line ${stepIndex <= index - 1 ? 'active' : ''}`}
      />
    )}
    {/* Circle with the letter inside */}
    <div
      className={`circle ${stepIndex <= index - 1 ? 'bg-green-500' : 'bg-gray-500'}`}
    >
      <span className="text-lg text-white">{letter}</span>
    </div>
  </div>
))}

            </div>
          </div>

          <div className="flex justify-center items-center mb-4" style={{    alignSelf: "center",
    alignItems: "center",
    marginRight: "auto",width:"95%"}}
    >
            {/* Webcam View Placeholder */}
            <div className=" bg-gray-700 rounded-lg flex items-center justify-center text-gray-400" style={{width:"fit-content", height:'auto'}}>
            <video
        ref={videoRef}
        autoPlay
        muted
        style={{ width: "100%", height: "100%" }}
      ></video>

            </div>
          </div>
</div>
          <div className="flex justify-between display-button-width">
            <button
              onClick={() => togglePopup()}
              className="bg-red-500 text-white px-6 py-1 rounded hover:bg-red-700 transition-all"
            >
              Close
            </button>
            <button
              onClick={handleIncreaseIndex}
              className="bg-blue-500 text-white px-6 py-1 rounded hover:bg-blue-600 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}



{index === 2 && (
        <div className="w-full">
          <div className="flex justify-between items-center mb-4" style={{width:"calc(50% + 4.5ch)",marginLeft:"auto"}}>
            <h2 className="text-2xl font-bold text-black">Letter: B</h2>
            <img src={images[index - 1]} alt="Current letter" className="w-24 h-24 object-cover rounded-lg" />
          </div>
          <div style={{display:"flex"}}>
          <div className="flex flex-col items-center mb-4" style={{ width: 'fit-content',alignSelf: "center" }}>
            {/* Vertical Stepper */}
            <div className="flex flex-col items-start space-y-4">
            {['A', 'B', 'C'].map((letter, stepIndex) => (
  <div key={letter} className="circle-container">
    {/* Vertical line connecting the circles */}
    {stepIndex !== 0 && (
      <div
        className={`line ${stepIndex === index - 1 ? 'active' : ''}`}
      />
    )}
    {/* Circle with the letter inside */}
    <div
      className={`circle ${stepIndex <= index - 1 ? 'bg-green-500' : 'bg-gray-500'}`}
    >
      <span className="text-lg text-white">{letter}</span>
    </div>
  </div>
))}

            </div>
          </div>

          <div className="flex justify-center items-center mb-4" style={{    alignSelf: "center",
    alignItems: "center",
    marginRight: "auto",width:"95%"}}
    >
            {/* Webcam View Placeholder */}
            <div className=" bg-gray-700 rounded-lg flex items-center justify-center text-gray-400" style={{width:"fit-content", height:'auto'}}>
            <video
        ref={videoRef}
        autoPlay
        muted
        style={{ width: "100%", height: "100%" }}
      ></video>

            </div>
          </div>
</div>
          <div className="flex justify-between display-button-width">
            <button
              onClick={() => togglePopup()}
              className="bg-red-500 text-white px-6 py-1 rounded hover:bg-red-700 transition-all"
            >
              Close
            </button>
            <button
              onClick={handleIncreaseIndex}
              className="bg-blue-500 text-white px-6 py-1 rounded hover:bg-blue-600 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}

      
{index === 3 && (
        <div className="w-full">
          <div className="flex justify-between items-center mb-4" style={{width:"calc(50% + 4.5ch)",marginLeft:"auto"}}>
            <h2 className="text-2xl font-bold text-black">Letter: C</h2>
            <img src={images[index - 1]} alt="Current letter" className="w-24 h-24 object-cover rounded-lg" />
          </div>
          <div style={{display:"flex"}}>
          <div className="flex flex-col items-center mb-4" style={{ width: 'fit-content',alignSelf: "center" }}>
            {/* Vertical Stepper */}
            <div className="flex flex-col items-start space-y-4">
            {['A', 'B', 'C'].map((letter, stepIndex) => (
  <div key={letter} className="circle-container">
    {/* Vertical line connecting the circles */}
    {stepIndex !== 0 && (
      <div
        className={`line ${stepIndex <= index - 1 ? 'active' : ''}`}
      />
    )}
    {/* Circle with the letter inside */}
    <div
      className={`circle ${stepIndex <= index - 1 ? 'bg-green-500' : 'bg-gray-500'}`}
    >
      <span className="text-lg text-white">{letter}</span>
    </div>
  </div>
))}

            </div>
          </div>

          <div className="flex justify-center items-center mb-4" style={{    alignSelf: "center",
    alignItems: "center",
    marginRight: "auto",width:"95%"}}
    >
            {/* Webcam View Placeholder */}
            <div className=" bg-gray-700 rounded-lg flex items-center justify-center text-gray-400" style={{width:"fit-content", height:'auto'}}>
            <video
        ref={videoRef}
        autoPlay
        muted
        style={{ width: "100%", height: "100%" }}
      ></video>

            </div>
          </div>
</div>
          <div className="flex justify-between" style={{width:"fit-content", margin:'auto'}}>
            <button
              onClick={() => togglePopup()}
              className="bg-red-500 text-white px-6 py-1 rounded hover:bg-red-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroCard;

