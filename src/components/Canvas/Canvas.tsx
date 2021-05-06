import { SxProp, ThemeUIStyleObject } from "@theme-ui/core";
import { useCallback, useEffect, useRef, useState } from "react";

export interface CanvasProps extends SxProp {
  draw(ctx: CanvasRenderingContext2D, frameCount?: number): void;
  animate?: boolean;
  size: {
    x: number;
    y: number;
  };
  sx: ThemeUIStyleObject;
}

const Canvas: React.FC<CanvasProps> = ({
  draw,
  size,
  animate = false,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState(size);
  const optimizeTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // TODO: Change to webGL
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx === null) {
      alert(
        "Unable to initialize WebGL. Your browser or machine may not support it."
      );
      return;
    }

    if (ctx) {
      let frameCount = 0;
      let animationFrameId: number;
      const render = () => {
        frameCount++;
        draw(ctx, frameCount);
        if (animate) {
          animationFrameId = window.requestAnimationFrame(render);
        }
      };
      render();
      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }
  }, [draw, animate]);

  const adjustCanvasSize = useCallback(() => {
    if (optimizeTimeout.current) {
      clearTimeout(optimizeTimeout.current);
    }
    optimizeTimeout.current = setTimeout(() => {
      if (canvasRef.current) {
        setCanvasSize({
          x: canvasRef.current.parentElement?.clientWidth || 0,
          y: canvasRef.current.parentElement?.clientHeight || 0,
        });
      }
    }, 100);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", adjustCanvasSize);
    return () => {
      window.removeEventListener("resize", adjustCanvasSize);
    };
  }, [adjustCanvasSize]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.x}
      height={canvasSize.y}
      {...props}
    />
  );
};

export default Canvas;
