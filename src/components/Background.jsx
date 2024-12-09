import { useEffect, useState, useRef } from "react";
import "../styles/Background.css";

function Circle({ sequentialDelay, onFadeOut }) {
  const circleRef = useRef(null);

  function getRandomPosition() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };
  }

  function getRandomSize() {
    if (Math.random() > 0.5) {
      return 500;
    } else {
      return 900;
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

  if (randomSize === 500) {
    color = "rgba(20, 151, 151, 0.5)";
  }

  useEffect(() => {
    let moveId;
    let x = 0;
    let y = 0;

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
  }, [randomMovement.moveX, randomMovement.moveY]);

  return (
    <div
      className="circle"
      ref={circleRef}
      style={{
        borderColor: color,
        left: `${randomPos.x}px`,
        top: `${randomPos.y}px`,
        width: `${randomSize}px`,
        height: `${randomSize}px`,
        animationDelay: `0s, ${10 + sequentialDelay + 2}s`,
        "--x": "0px",
        "--y": "0px",
      }}
      onAnimationEnd={onFadeOut}
    ></div>
  );
}

function Background() {
  const [circles, setCircles] = useState([]);

  const circleCount = 5;
  const sequentialDelay = 1;

  useEffect(() => {
    if (circles.length === 0) {
      createCircles();
    }
  }, [circles]);

  function createCircles() {
    const newCircles = Array.from({ length: circleCount }, (_, i) => ({
      id: i,
      moveId: null,
    }));

    setCircles(newCircles);
  }

  function handleCircleFadeOut(index) {
    if (index === circles.length - 1) {
      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];

        if (circle.moveId) {
          cancelAnimationFrame(circles[i].moveId);
        }
      }

      setCircles([]);
    }
  }

  return (
    <>
      <div className="background-effect">
        {circles.map((circle, index) => {
          return (
            <Circle
              key={circle.id}
              sequentialDelay={sequentialDelay * index}
              onFadeOut={() => handleCircleFadeOut(index)}
            />
          );
        })}
      </div>
    </>
  );
}

export default Background;