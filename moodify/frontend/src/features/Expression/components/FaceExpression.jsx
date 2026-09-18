import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import "../css/button.scss";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);
  const lastMoodRef = useRef(null);
  const isDetectingRef = useRef(false);
  const [expression, setExpression] = useState("Detecting...");
  const [isDetecting, setIsDetecting] = useState(false);

  const scheduleDetection = () => {
    if (isDetectingRef.current) {
      animationRef.current = requestAnimationFrame(detect);
    }
  };

  const detect = (timestamp) => {
    if (!landmarkerRef.current || !videoRef.current) {
      scheduleDetection();
      return;
    }

    const results = landmarkerRef.current.detectForVideo(
      videoRef.current,
      timestamp,
    );

    if (results.faceBlendshapes?.length > 0) {
      const blendshapes = results.faceBlendshapes[0].categories;
      const getScore = (name) =>
        blendshapes.find((b) => b.categoryName === name)?.score || 0;

      const smileLeft = getScore("mouthSmileLeft");
      const smileRight = getScore("mouthSmileRight");
      const jawOpen = getScore("jawOpen");
      const browUp = getScore("browInnerUp");
      const frownLeft = getScore("mouthFrownLeft");
      const frownRight = getScore("mouthFrownRight");

      let currentExpression = "neutral";
      if (smileLeft > 0.5 && smileRight > 0.5) {
        currentExpression = "happy";
      } else if (jawOpen > 0.3 && browUp > 0.3) {
        currentExpression = "surprised";
      } else if (frownLeft > 0.3 && frownRight > 0.3) {
        currentExpression = "sad";
      }

      setExpression(currentExpression);

      if (currentExpression !== "neutral") {
        lastMoodRef.current = currentExpression;
        onClick(currentExpression);
        isDetectingRef.current = false;
        setIsDetecting(false);
        animationRef.current = null;
        return currentExpression;
      }

      lastMoodRef.current = null;
      scheduleDetection();
      return currentExpression;
    }

    scheduleDetection();
  };

  // Initialize camera + model
  useEffect(() => {
    let stream;
    const init = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
        );
        landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1,
        });

        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      } catch (error) {
        console.error("Face Landmarker initialization failed:", error);
      }
    };
    init();

    return () => {
      isDetectingRef.current = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (landmarkerRef.current) landmarkerRef.current.close();
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // Toggle detection loop
  const handleToggleDetection = () => {
    if (isDetecting) {
      isDetectingRef.current = false;
      setIsDetecting(false);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    } else {
      isDetectingRef.current = true;
      setIsDetecting(true);
      scheduleDetection();
    }
  };

  function handleClick() {
    handleToggleDetection();
  }

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        style={{
          width: "600px",
          height: "400px",
          borderRadius: "12px",
          backgroundColor: "black",
        }}
        playsInline
        muted
      />
      <h2>{expression}</h2>
      <button onClick={handleClick}>
        {isDetecting ? "Detecting..." : "Detect"}
      </button>
    </div>
  );
}
