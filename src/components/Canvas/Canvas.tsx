import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
} from "react";
import type { Ref } from "react";
import getStroke from "perfect-freehand";
import { CanvasHeader } from "./CanvasHeader";
import { CanvasToolbar } from "./CanvasToolbar";
import "./Canvas.css";

export interface CanvasHandle {
  getDataURL: () => string | null;
}

interface CanvasProps {
  ref?: Ref<CanvasHandle>;
}

type Point = [x: number, y: number, pressure: number];

type Stroke = {
  points: Point[];
  pen: PenType;
  color: string;
};

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

export function Canvas({ ref }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pen, setPen] = useState<PenType>("pencil");
  const [color, setColor] = useState("#5a4636");
  const currentStroke = useRef<Point[]>([]);
  const pastStrokes = useRef<Stroke[]>([]);
  const redoStrokes = useRef<Stroke[]>([]);
  const isDrawing = useRef(false);
  const isClear = useRef(false);
  const [canvasWidth, setCanvasWidth] = useState(
    window.innerWidth > 980
      ? Math.min(window.innerWidth - 400, 880)
      : window.innerWidth,
  );
  const [canvasHeight, setCanvasHeight] = useState(
    window.innerWidth < 980 ? window.innerHeight - 180 : 600,
  );
  const activePen = useRef<PenType>(pen);
  const activeColor = useRef<string>(color);

  useImperativeHandle(ref, () => ({
    getDataURL: () => canvasRef.current?.toDataURL("image/png") ?? null,
  }));

  useEffect(() => {
    activePen.current = pen;
  }, [pen]);
  useEffect(() => {
    activeColor.current = color;
  }, [color]);

  // Pen/color captured at the start of each stroke
  const currentStrokePen = useRef<PenType>(pen);
  const currentStrokeColor = useRef<string>(color);

  const getPos = (e: PointerEvent, canvas: HTMLCanvasElement) => {
    const canvasRect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - canvasRect.left,
      y: e.clientY - canvasRect.top,
      pressure: e.pressure || 0.5,
    };
  };

  // Stable — pen and color are explicit parameters, not captured from closure
  const drawStroke = useCallback(
    (points: Point[], strokePen: PenType, strokeColor: string) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (points.length > 0) {
        const stroke = getStroke(points, PEN_OPTIONS[strokePen]);
        const path = new Path2D(getSvgPathFromStroke(stroke));

        ctx.save();

        if (strokePen === "pencil") {
          ctx.filter = "url(#pencil-grain)";
        }

        ctx.fillStyle = strokeColor;
        ctx.globalAlpha = 0.85;
        ctx.fill(path);
      } else {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      }

      ctx.restore();
    },
    [canvasWidth, canvasHeight],
  );

  // Redraw all strokes after a resize (changing canvas w/h clears it)
  useEffect(() => {
    if (!isClear.current) {
      pastStrokes.current.forEach((stroke) =>
        drawStroke(stroke.points, stroke.pen, stroke.color),
      );
    }
  }, [canvasWidth, canvasHeight, drawStroke]);

  useEffect(() => {
    console.log("use effect running");
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onPointerDown = (e: PointerEvent) => {
      if (isClear.current) {
        console.log("was just cleared, add to array");
        isClear.current = false;
        pastStrokes.current.push({
          points: [],
          pen: currentStrokePen.current,
          color: currentStrokeColor.current,
        });
        console.log(pastStrokes);
      }
      console.log("pointer clicked");
      isDrawing.current = true;
      canvas.setPointerCapture(e.pointerId);
      // Snapshot the active pen/color at stroke start
      currentStrokePen.current = activePen.current;
      currentStrokeColor.current = activeColor.current;
      const { x, y, pressure } = getPos(e, canvas);
      currentStroke.current.push([x, y, pressure]);
      redoStrokes.current = [];
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDrawing.current) return;
      const { x, y, pressure } = getPos(e, canvas);
      currentStroke.current.push([x, y, pressure]);
      drawStroke(
        currentStroke.current,
        currentStrokePen.current,
        currentStrokeColor.current,
      );
    };

    const onPointerUp = () => {
      isDrawing.current = false;
      pastStrokes.current.push({
        points: currentStroke.current,
        pen: currentStrokePen.current,
        color: currentStrokeColor.current,
      });
      currentStroke.current = [];
    };

    const resize = () => {
      console.log("window resized");
      const newWidth: number =
        window.innerWidth > 980
          ? Math.min(window.innerWidth - 400, 880)
          : window.innerWidth;
      const newHight: number =
        window.innerWidth < 980 ? window.innerWidth : 600;
      setCanvasWidth(newWidth);
      setCanvasHeight(newHight);
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", resize);
    };
  }, [drawStroke]);

  // clear entire canvas
  const clear = () => {
    isClear.current = true;
    currentStroke.current = [];
    canvasRef.current
      ?.getContext("2d")
      ?.clearRect(0, 0, canvasWidth, canvasHeight);
    redoStrokes.current = [];
  };

  const undo = () => {
    if (!isClear.current) {
      if (!pastStrokes.current.length) return;
      canvasRef.current
        ?.getContext("2d")
        ?.clearRect(0, 0, canvasWidth, canvasHeight);
      const lastStroke = pastStrokes.current.pop();
      if (!lastStroke) return;
      redoStrokes.current.push(lastStroke);
    } else {
      isClear.current = false;
      redoStrokes.current.push({
        points: [],
        pen: currentStrokePen.current,
        color: currentStrokeColor.current,
      });
    }

    console.log(pastStrokes);
    pastStrokes.current.forEach((stroke) =>
      drawStroke(stroke.points, stroke.pen, stroke.color),
    );
  };

  const redo = () => {
    const redoStroke = redoStrokes.current.pop();
    if (!redoStroke) return;
    pastStrokes.current.push(redoStroke);
    drawStroke(redoStroke.points, redoStroke.pen, redoStroke.color);
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
