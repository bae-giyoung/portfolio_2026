"use client";
import { useRef, useCallback, useEffect } from "react";

const MAX_ROTATION = 6;
const STIFFNESS = 0.12;
const DAMPING = 0.25;

export default function MagneticWrapper({
    children,
    className,
    offsetScale = { x: 50, y: 30 },
    boundingScale = 2,
}: {
    children: React.ReactNode;
    className?: string;
    offsetScale?: number | { x: number; y: number };
    boundingScale?: number | { x: number; y: number };
}) {
    const boundingRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const posRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, rz: 0, vrz: 0 });
    const targetRef = useRef({ x: 0, y: 0, rz: 0 });
    // stale closure 방지: prop 변경을 ref로 동기화
    const offsetScaleRef = useRef(offsetScale);
    offsetScaleRef.current = offsetScale;

    const boundingScaleX = typeof boundingScale === "number" ? boundingScale : (boundingScale.x ?? 2);
    const boundingScaleY = typeof boundingScale === "number" ? boundingScale : (boundingScale.y ?? 2);

    const tick = useCallback(() => {
        const pos = posRef.current;
        const tgt = targetRef.current;

        pos.vx += (tgt.x - pos.x) * STIFFNESS;
        pos.vy += (tgt.y - pos.y) * STIFFNESS;
        pos.vx *= DAMPING;
        pos.vy *= DAMPING;
        pos.x += pos.vx;
        pos.y += pos.vy;

        pos.vrz += (tgt.rz - pos.rz) * STIFFNESS;
        pos.vrz *= DAMPING;
        pos.rz += pos.vrz;

        if (innerRef.current) {
            innerRef.current.style.transform =
                `translate(${pos.x.toFixed(3)}px, ${pos.y.toFixed(3)}px) rotateZ(${pos.rz.toFixed(3)}deg)`;
        }

        const settled =
            Math.abs(pos.vx) < 0.01 &&
            Math.abs(pos.vy) < 0.01 &&
            Math.abs(pos.vrz) < 0.01 &&
            Math.abs(tgt.x - pos.x) < 0.01 &&
            Math.abs(tgt.y - pos.y) < 0.01 &&
            Math.abs(tgt.rz - pos.rz) < 0.01;

        rafRef.current = settled ? null : requestAnimationFrame(tick);
    }, []);

    const startLoop = useCallback(() => {
        if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(tick);
        }
    }, [tick]);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = boundingRef.current?.getBoundingClientRect();
            if (!rect) return;

            const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

            const clampedX = Math.max(-1, Math.min(1, nx));
            const clampedY = Math.max(-1, Math.min(1, ny));

            const scale = offsetScaleRef.current;
            const offsetX = typeof scale === "number" ? scale : scale.x;
            const offsetY = typeof scale === "number" ? scale : scale.y;

            targetRef.current = {
                x: clampedX * offsetX,
                y: clampedY * offsetY,
                rz: clampedX * MAX_ROTATION,
            };
            startLoop();
        },
        [startLoop],
    );

    const handleMouseLeave = useCallback(() => {
        targetRef.current = { x: 0, y: 0, rz: 0 };
        startLoop();
    }, [startLoop]);

    useEffect(() => {
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, []);

    return (
        <div
            id="hero-mousemove-container-box"
            className={`relative ${className ?? ""}`}
        >
            <div
                ref={boundingRef}
                id="hero-mousemove-bounding-box"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: `${boundingScaleX * 100}%`, height: `${boundingScaleY * 100}%` }}
            />
            <div ref={innerRef} style={{ willChange: "transform" }} className="w-full h-full">
                {children}
            </div>
        </div>
    );
}
