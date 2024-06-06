"use client";

import { ReactNode, useEffect, useRef } from "react";

export default function ScrollableStepSection<T>({
  children,
  steps,
  onStepChange,
  stepHeight = "16rem",
  className,
}: {
  children: ReactNode;
  steps: T[];
  onStepChange: (step: T) => void;
  stepHeight?: string;
  className?: string;
}) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const stepRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    function handleIntersections(entries: IntersectionObserverEntry[]) {
      for (const entry of entries) {
        if (entry.target instanceof HTMLElement) {
          const step = entry.target.dataset.stepIndex!;
          if (entry.isIntersecting) {
            onStepChange(steps[parseInt(step)]);
          }
        }
      }
    }

    const observer = new IntersectionObserver(handleIntersections, {
      threshold: [0.5],
    });

    const values = stepRefs.current;
    for (const ref of values) {
      if (ref) {
        observer.observe(ref);
      }
    }

    return () => {
      for (const ref of values) {
        if (ref) {
          observer.unobserve(ref);
        }
      }
    };
  }, [onStepChange, steps]);
  return (
    <div ref={sectionRef} className={`relative ${className ?? ""}`}>
      <div ref={contentRef} className="sticky top-0">
        {children}
      </div>
      {[...Array(steps.length)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            stepRefs.current[i] = el!;
          }}
          className="p-2"
          style={{ height: stepHeight }}
          data-step-index={i}
        />
      ))}
    </div>
  );
}
