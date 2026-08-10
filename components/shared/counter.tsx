"use client"

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export const Counter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null); 
  const isInView = useInView(ref, { once: true });
  
  const isDecimal = value.includes(".");
  const numericValue = parseFloat(value.replace(/,/g, "").replace(/[^\d.]/g, ""));
  const suffix = value.replace(/[0-9.,]/g, "");

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericValue;
      const totalSteps = 60; 
      const increment = end / totalSteps;
      const stepTime = (duration * 1000) / totalSteps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue, duration]);

  return (
    <span ref={ref}>
      {isDecimal 
        ? count.toFixed(1) 
        : Math.floor(count).toLocaleString() 
      }
      {suffix}
    </span>
  );
};