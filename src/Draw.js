/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import * as fm from "@mediapipe/face_mesh";
// NEW MODEL
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { bigMouth, elipse, lens } from "./core/drawMesh";

const Draw = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const detect = async (detector) => {
    const estimationConfig = { flipHorizontal: false };
    const faces = await detector.estimateFaces(
      webcamRef.current.video,
      estimationConfig
    );
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    requestAnimationFrame(() => {
      bigMouth(ctx, webcamRef.current.video, faces);
    });
  };

  const runFaceMesh = async () => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
      const detectorConfig = {
        runtime: "mediapipe", // or 'tfjs'
        solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
      };
      const detector = await faceLandmarksDetection.createDetector(
        model,
        detectorConfig
      );
      setInterval(() => {
        detect(detector);
      }, 1);
    }
  };

  return (
    <div className="App">
      <button onClick={() => runFaceMesh()}>On</button>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
};

export default Draw;
