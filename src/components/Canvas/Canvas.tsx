import { useRef, useState, useEffect, useCallback } from "react";
import getStroke from "perfect-freehand";
import { CanvasHeader } from "./CanvasHeader";
import { CanvasToolbar } from "./CanvasToolbar";

import "./Canvas.css";

type Point = [x: number, y: number, pressure: number];

const PEN_OPTIONS = {
  pencil: {
    size: 4,
    thinning: 0.6,
    smoothing: 0.5,
    streamline: 0.5,
    simulatePressure: false,
  },
  fineliner: { size: 2, thinning: 0, smoothing: 0.8, streamline: 0.8 },
  marker: { size: 14, thinning: 0.3, smoothing: 0.5, streamline: 0.3 },
  gpen: { size: 2, thinning: 0, smoothing: 0.8, streamline: 0.8 },
  eraser: { size: 14, thinning: 0.3, smoothing: 0.5, streamline: 0.3 },
};

export type PenType = keyof typeof PEN_OPTIONS;

const COLOR_OPTIONS = {
  black: "#5a4636",
  pink: "#ffccd2",
  blue: "#b7c9e2",
  purple: "#e5c9f0",
};

export type ColorType = keyof typeof COLOR_OPTIONS;

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
  const pastStrokes = useRef<Point[][]>([]);
  const redoStrokes = useRef<Point[][]>([]);
  const isDrawing = useRef(false);
  const isClear = useRef(false);
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(600);

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

      if (pen == "pencil") {
        ctx.filter = "url(#pencil-grain)";
      }

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

    const onPointerDown = (e: PointerEvent | TouchEvent) => {
      console.log("pointer clicked");
      isDrawing.current = true;
      canvas.setPointerCapture(e.pointerId);
      const { x, y, pressure } = getPos(e, canvas);
      currentStroke.current.push([x, y, pressure]);
      redoStrokes.current = [];
    };

    const onPointerMove = (e: PointerEvent | TouchEvent) => {
      if (!isDrawing.current) return;
      const { x, y, pressure } = getPos(e, canvas);
      currentStroke.current.push([x, y, pressure]);
      drawStroke(currentStroke.current);
    };

    const onPointerUp = () => {
      isDrawing.current = false;
      pastStrokes.current.push(currentStroke.current);
      currentStroke.current = [];
    };

    const resize = () => {
      console.log("window resized");
      const newWidth: number = Math.min(window.innerWidth - 72, 800);
      const newHight: number = Math.min(window.innerHeight - 72, 600);
      setCanvasWidth(newWidth);
      setCanvasHeight(newHight);
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("touchstart", onPointerDown);
    canvas.addEventListener("touchmove", onPointerMove);
    canvas.addEventListener("touchend", onPointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("touchstart", onPointerDown);
      canvas.removeEventListener("touchmove", onPointerMove);
      canvas.removeEventListener("touchend", onPointerUp);

      window.removeEventListener("resize", resize);
    };
  }, [drawStroke]);

  // clear entire canvas
  const clear = () => {
    isClear.current = true;
    currentStroke.current = [];
    canvasRef.current?.getContext("2d")?.clearRect(0, 0, 800, 600);
    redoStrokes.current = [];
  };

  const undo = () => {
    if (!pastStrokes.current) return;

    if (!isClear.current) {
      canvasRef.current?.getContext("2d")?.clearRect(0, 0, 800, 600);
      const lastStroke: Point[] | undefined = pastStrokes.current.pop();

      if (!lastStroke) return;
      redoStrokes.current.push(lastStroke);
    } else {
      isClear.current = false;
    }

    pastStrokes.current.forEach((stroke) => drawStroke(stroke));
  };

  const redo = () => {
    if (!redoStrokes) return;
    const redoStroke: Point[] | undefined = redoStrokes.current.pop();

    if (!redoStroke) return;
    pastStrokes.current.push(redoStroke);
    drawStroke(redoStroke);
  };

  const onPenChange = (pen: PenType) => {
    setPen(pen);
  };

  const onColorChange = (color: ColorType) => {
    setColor(COLOR_OPTIONS[color]);
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
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="canvas"
        />
        <CanvasToolbar
          onPenChange={onPenChange}
          onColorChange={onColorChange}
          onUndo={undo}
          onRedo={redo}
          onClear={clear}
        />
      </div>
    </>
  );
}
