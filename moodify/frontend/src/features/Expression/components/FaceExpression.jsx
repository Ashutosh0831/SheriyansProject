import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import "../css/button.scss"

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);
  const [expression, setExpression] = useState("Detecting...");
  const [isDetecting, setIsDetecting] = useState(false);

  const detect = () => {
    if (!landmarkerRef.current || !videoRef.current) return;

    const results = landmarkerRef.current.detectForVideo(
      videoRef.current,
      performance.now()
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

      let currentExpression = "Neutral 😐";
      if (smileLeft > 0.5 && smileRight > 0.5) {
        currentExpression = "happy";
      } else if (jawOpen > 0.3 && browUp > 0.3) {
        currentExpression = "surprised";
      } else if (frownLeft > 0.3 && frownRight > 0.3) {
        currentExpression = "sad";
      }

      setExpression(currentExpression);

      if (currentExpression !== "Neutral 😐") {
        onClick(currentExpression);
      }

      return currentExpression;
    }

    if (isDetecting) {
      animationRef.current = requestAnimationFrame(detect);
    }
  };

  // Initialize camera + model
  useEffect(() => {
    let stream;
    const init = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
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
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (landmarkerRef.current) landmarkerRef.current.close();
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // Toggle detection loop
  const handleToggleDetection = () => {
    if (isDetecting) {
      setIsDetecting(false);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    } else {
      setIsDetecting(true);
      detect();
    }
  };

  async function handleClick(){
    const mood = handleToggleDetection()
    onClick({mood})
  }

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        style={{ width: "600px", height: "400px", borderRadius: "12px", backgroundColor: "black"}}
        playsInline
        muted
      />
      <h2>{expression}</h2>
      <button onClick={handleClick}>
        Detect
      </button>
    </div>
  );
}
