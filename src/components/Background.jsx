import { useEffect, useState, useRef } from "react";
import "../styles/Background.css";

// Body overflow will be hidden.

function Circle({ sequentialDelay, onFadeOut }) {
  const smallSize = 350;
  const largeSize = 600;
  const circleRef = useRef(null);

  function getRandomPosition() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const maxDistanceFromCenter = 500;

    return {
      x: centerX + (Math.random() * 2 - 1) * maxDistanceFromCenter,
      y: centerY + (Math.random() * 2 - 1) * maxDistanceFromCenter,
    };
  }

  function getRandomSize() {
    if (Math.random() > 0.5) {
      return smallSize;
    } else {
      return largeSize;
    }
  }

  function getRandomMovement() {
    return {
      moveX: (Math.random() * 2 - 1) * 0.5,
      moveY: (Math.random() * 2 - 1) * 0.5,
    };
  }

  const randomPos = getRandomPosition();
  const randomSize = getRandomSize();
  const randomMovement = getRandomMovement();

  let color = "rgba(0, 150, 255, 0.5)";
  let thickness = "50px";

  if (randomSize === smallSize) {
    color = "rgba(20, 151, 151, 0.5)";
    thickness = "35px";
  }

  useEffect(() => {
    let moveId;
    let x = 0;
    let y = 0;

    function animateCircle() {
      (function move() {
        if (circleRef.current) {
          x += randomMovement.moveX;
          y += randomMovement.moveY;

          circleRef.current.style.setProperty("--x", `${x}px`);
          circleRef.current.style.setProperty("--y", `${y}px`);
        }

        moveId = requestAnimationFrame(move);
      })();

      return () => {
        cancelAnimationFrame(moveId);
      };
    }

    const cleanup = animateCircle();
    return cleanup;
  }, [randomMovement.moveX, randomMovement.moveY]);

  return (
    <div
      className="circle"
      ref={circleRef}
      style={{
        borderColor: color,
        borderWidth: thickness,
        left: `${randomPos.x}px`,
        top: `${randomPos.y}px`,
        width: `${randomSize}px`,
        height: `${randomSize}px`,
        animationDelay: `0s, ${10 + sequentialDelay + 3}s`,
        "--x": "0px",
        "--y": "0px",
      }}
      onAnimationEnd={(e) => {
        if (e.animationName === "fadeOut") {
          onFadeOut();
        }
      }}
    ></div>
  );
}

function Background() {
  const [circles, setCircles] = useState([]);

  const circleCount = 5;
  const sequentialDelay = 1;

  useEffect(() => {
    if (circles.length === 0) {
      const newCircles = Array.from({ length: circleCount }, (_, i) => i);

      setCircles(newCircles);
    }
  }, [circles.length]);

  function handleCircleFadeOut(index) {
    if (index === circles.length - 1) {
      setCircles([]);
    }
  }

  return (
    <div className="background-effect">
      {circles.map((_, index) => {
        return (
          <Circle
            key={index}
            sequentialDelay={sequentialDelay * index}
            onFadeOut={() => handleCircleFadeOut(index)}
          />
        );
      })}
    </div>
  );
}

export default Background;
