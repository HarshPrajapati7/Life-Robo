"use client";
/* eslint-disable react-hooks/refs */

import React, {
  Children,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  customClass?: string;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`card ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
  />
));
Card.displayName = "Card";

type Slot = {
  x: number;
  y: number;
  z: number;
  zIndex: number;
};

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLDivElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

type CardSwapProps = {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: "elastic" | "power";
  children: React.ReactNode;
};

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}: CardSwapProps) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const order = useRef<number[]>([]);

  if (refs.current.length !== childArr.length) {
    refs.current = childArr.map((_, index) => refs.current[index] ?? React.createRef<HTMLDivElement>());
    order.current = Array.from({ length: childArr.length }, (_, i) => i);
  }
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const total = refs.current.length;
    refs.current.forEach((ref, i) => {
      if (ref.current) placeNow(ref.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs.current[front]?.current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, { y: "+=500", duration: config.durDrop, ease: config.ease });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs.current[idx]?.current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.current.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(
        refs.current.length - 1,
        cardDistance,
        verticalDistance,
        refs.current.length
      );
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return"
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = setInterval(swap, delay);

    if (!pauseOnHover) {
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }

    const node = container.current;
    if (!node) return;

    const pause = () => {
      tlRef.current?.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    const resume = () => {
      tlRef.current?.play();
      intervalRef.current = setInterval(swap, delay);
    };

    node.addEventListener("mouseenter", pause);
    node.addEventListener("mouseleave", resume);

    return () => {
      node.removeEventListener("mouseenter", pause);
      node.removeEventListener("mouseleave", resume);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [
    cardDistance,
    delay,
    easing,
    pauseOnHover,
    skewAmount,
    verticalDistance,
    config.durDrop,
    config.promoteOverlap,
    config.durMove,
    config.returnDelay,
    config.durReturn,
    config.ease,
    childArr.length,
  ]);

  const rendered = childArr.map((child, i) => {
    if (!isValidElement(child)) return child;

    const typedChild = child as React.ReactElement<CardProps>;
    const originalProps = typedChild.props;

    return (
      <Card
        key={i}
        ref={refs.current[i]}
        customClass={originalProps.customClass}
        className={originalProps.className}
        style={{ width, height, ...(originalProps.style ?? {}) }}
        onClick={(e) => {
          originalProps.onClick?.(e);
          onCardClick?.(i);
        }}
      >
        {typedChild.props.children}
      </Card>
    );
  });

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
