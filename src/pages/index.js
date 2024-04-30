"use client"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const notify = () => toast.warn(" Input field cannot be blank!");
  const notify2 = () => toast.error("Sorry! your Trial Period has ended");
  const [video, setVideo] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateVideo = async () => {
    if (!prompt) {
      notify()
    }
    else {
      setIsLoading(true);

      try {
        const response = await fetch("/api/video-generator", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });
        if (response.status === 500) {
          notify2()
        }
        const { video } = await response.json();
        setVideo(video);
      } catch (error) {
        console.error("Failed to generate video:", error);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="relative flex flex-col items-center justify-center min-h-screen">
        <div
          className="absolute inset-0 w-full h-full bg-gif-bg bg-cover"
          style={{ zIndex: -1 }}
        ></div>
        <div className="z-10 flex flex-col items-center justify-center relative max-w-screen-md mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center"><i>AI Short video Generator</i></h1>
          <input
            type="text"
            required
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your animation prompt"
            className="px-4 py-2 text-black border border-gray-300 rounded-lg mb-4 w-full md:w-80 text-center"
          />
          <button
            onClick={generateVideo}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full md:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Video"}
          </button>
          {isLoading && (
            <div className="mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
            </div>
          )}
          {video && (
            <div className="mt-4">
              <video controls className="w-full">
                <source src={video} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
      </div>
    </>



  );
}