import React, { useRef, useState, useEffect, useCallback } from "react";
import getStroke from "perfect-freehand";
import { CanvasHeader } from "./CanvasHeader";
import { CanvasToolbar } from "./CanvasToolbar";

import "./Canvas.css";

type Point = [x: number, y: number, pressure: number];

const PEN_OPTIONS = {
  pencil: { size: 4, thinning: 0.6, smoothing: 0.5, streamline: 0.5 },
  fineliner: { size: 2, thinning: 0, smoothing: 0.8, streamline: 0.8 },
  marker: { size: 14, thinning: 0.3, smoothing: 0.5, streamline: 0.3 },
};

type PenType = keyof typeof PEN_OPTIONS;

function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return "";
  const d = stroke.reduce((acc, [x, y], i, arr) => {
    const [nx, ny] = arr[(i + 1) % arr.length];
    return acc + `${x},${y} ${(x + nx) / 2},${(y + ny) / 2} `;
  }, `M ${stroke[0][0]},${stroke[0][1]} Q `);
  return d + "Z";
}

export function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pen, setPen] = useState<PenType>("pencil");
  const [color, setColor] = useState("#5a4636");
  const currentStroke = useRef<Point[]>([]);
  const previousStroke = useRef<Point[][]>([]);
  const isDrawing = useRef(false);

  const getPos = (e: PointerEvent, canvas: HTMLCanvasElement) => {
    const canvasRect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - canvasRect.left,
      y: e.clientY - canvasRect.top,
      pressure: e.pressure || 0.5,
    };
  };

  const drawStroke = useCallback(
    (points: Point[]) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const stroke = getStroke(points, PEN_OPTIONS[pen]);
      const path = new Path2D(getSvgPathFromStroke(stroke));

      ctx.save();
      ctx.filter = "url(#pencil-grain)";
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.85;
      ctx.fill(path);
      ctx.restore();
    },
    [pen, color],
  );

  useEffect(() => {
    console.log("use effect running");
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onPointerDown = (e: PointerEvent) => {
      console.log("pointer clicked");
      isDrawing.current = true;
      canvas.setPointerCapture(e.pointerId);
      const { x, y, pressure } = getPos(e, canvas);
      currentStroke.current.push([x, y, pressure]);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDrawing.current) return;
      const { x, y, pressure } = getPos(e, canvas);
      currentStroke.current.push([x, y, pressure]);
      drawStroke(currentStroke.current);
    };

    const onPointerUp = () => {
      isDrawing.current = false;
      previousStroke.current.push(currentStroke.current);
      currentStroke.current = [];
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
    };
  }, [drawStroke]);

  const clear = () => {
    currentStroke.current = [];
    canvasRef.current?.getContext("2d")?.clearRect(0, 0, 800, 600);
  };

  const undo = () => {
    if (!previousStroke.current) return;
    canvasRef.current?.getContext("2d")?.clearRect(0, 0, 800, 600);
    console.log(previousStroke.current.pop());
    previousStroke.current.forEach((stroke) => drawStroke(stroke));
  };

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="pencil-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feDisplacementMap in="SourceGraphic" scale="3" />
          </filter>
        </defs>
      </svg>
      <div className="canvas-wrapper">
        <CanvasHeader></CanvasHeader>
        <canvas ref={canvasRef} width={800} height={600} className="canvas" />
        <CanvasToolbar></CanvasToolbar>
      </div>
    </>
  );
}
