import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import "../css/Expression.css";

const Expression = () => {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  const [expression, setExpression] = useState("Expression...");

  useEffect(() => {
    initializeMediaPipe();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  async function initializeMediaPipe() {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
    );

    const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "/models/face_landmarker.task",
      },

      runningMode: "VIDEO",

      numFaces: 1,

      outputFaceBlendshapes: true,

      outputFacialTransformationMatrixes: true,
    });

    faceLandmarkerRef.current = faceLandmarker;

    await startCamera();
  }

  async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    videoRef.current.srcObject = stream;

    await videoRef.current.play();

    // detectFace();
  }

  function detectFace() {
    const video = videoRef.current;
    const faceLandmarker = faceLandmarkerRef.current;

    if (!video || !faceLandmarker) {
      requestAnimationFrame(detectFace);
      return;
    }

    if (video.readyState >= 2) {
      const now = performance.now();

      const result = faceLandmarker.detectForVideo(video, now);

      processFaceResult(result);
    }

    requestAnimationFrame(detectFace);
  }

  function processFaceResult(result) {
    if (!result.faceBlendshapes || result.faceBlendshapes.length === 0) {
      setExpression("No face detected");
      return;
    }

    const blendshapes = result.faceBlendshapes[0].categories;

    const get = (name) =>
      blendshapes.find((item) => item.categoryName === name)?.score ?? 0;

    const smileLeft = get("mouthSmileLeft");
    const smileRight = get("mouthSmileRight");

    const jawOpen = get("jawOpen");
    const browInnerUp = get("browInnerUp");

    const browDownLeft = get("browDownLeft");
    const browDownRight = get("browDownRight");

    const mouthFrownLeft = get("mouthFrownLeft");
    const mouthFrownRight = get("mouthFrownRight");

    // 😮 SURPRISED
    if (jawOpen > 0.5 && browInnerUp > 0.4) {
      setExpression("😮 Surprised");
      return;
    }

    // 😠 ANGRY
    if (browDownLeft > 0.5 && browDownRight > 0.5) {
      setExpression("😠 Angry");
      return;
    }

    // 😊 HAPPY
    if (smileLeft > 0.6 && smileRight > 0.6) {
      setExpression("😊 Happy");
      return;
    }

    // 😢 SAD
    if (mouthFrownLeft > 0.4 && mouthFrownRight > 0.4 && browInnerUp > 0.3) {
      setExpression("😢 Sad");
      return;
    }

    // 😐 NEUTRAL
    setExpression("😐 Neutral");
  }

  return (
    <div className="app">
      <h1>Face Expression Detector</h1>

      <video ref={videoRef} autoPlay playsInline muted />

      <h2>{expression}</h2>
      <button className="detect" onClick={detectFace}>
        Detect
      </button>
    </div>
  );
};

export default Expression;
