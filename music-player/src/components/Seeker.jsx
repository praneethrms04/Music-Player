import { useRef, useEffect } from "react";

export default function Seeker({ audio, isPlaying }) {
  const canvasRef = useRef(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const lineWidth = 6;
    const progressLineWidth = 6;

    function drawBackground() {
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      ctx.fillRect(0, height / 2 - lineWidth / 2, width, lineWidth);
    }

    function drawProgress() {
      if (!audio) return;
      const progress = audio.currentTime / audio.duration;
      const progressWidth = progress * width;
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(
        0,
        height / 2 - progressLineWidth / 2,
        progressWidth,
        progressLineWidth
      );
    }

    function clearCanvas() {
      ctx.clearRect(0, 0, width, height);
    }

    function draw() {
      clearCanvas();
      drawBackground();
      drawProgress();
    }

    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      draw();
    }

    function handleMouseDown(event) {
      isDraggingRef.current = true;
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const progress = x / canvas.width;
      if (audio) {
        audio.currentTime = progress * audio.duration;
      }
    }

    function handleMouseMove(event) {
      if (isDraggingRef.current) {
        const { offsetX } = event;
        const progress = offsetX / width;
        audio.currentTime = audio.duration * progress;
        draw();
      }
    }

    function handleMouseUp() {
      isDraggingRef.current = false;
    }
    if (isPlaying) {
      animate();
    } else {
      cancelAnimationFrame(animationFrameId);
      draw();
    }

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [audio, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={16}
      style={{cursor: "pointer" }}
    />
  );
}
