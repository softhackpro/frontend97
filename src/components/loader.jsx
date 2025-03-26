import React, { useState, useEffect } from "react";

const CircularHorizontalLoader = () => {
  const [angle, setAngle] = useState(0);

  // Animation configuration
  const radius = 30;
  const speed = 5; // Increased from 2 to 5

  useEffect(() => {
    const animationFrame = requestAnimationFrame(function animate() {
      setAngle((prevAngle) => (prevAngle + speed) % 360);
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Calculate ball positions based on angle
  const ball1X = Math.cos((angle * Math.PI) / 180) * radius;
  const ball2X = Math.cos(((angle + 180) * Math.PI) / 180) * radius;

  return (
    <div className="flex m-auto mt-20 flex-col w-fit items-center justify-center bg-white p-6 rounded shadow">
      <div className="relative h-12 w-64 flex items-center justify-center">
        <div
          className="absolute w-6 h-6 rounded-full bg-red-600"
          style={{
            transform: `translateX(${ball1X}px)`,
          }}
        />
        <div
          className="absolute w-6 h-6 rounded-full bg-gray-700"
          style={{
            transform: `translateX(${ball2X}px)`,
          }}
        />
      </div>
      <p className="text-blue-600 font-medium mt-2">Loading...</p>
    </div>
  );
};

export default CircularHorizontalLoader;
