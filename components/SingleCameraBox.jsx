import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const SingleCameraBox = ({ data, isBlinking, boxHeight }) => {
  const [isDisabledMovement, setIsDisabledMovement] = React.useState(false);
  const [startBlinking, setStartBlinking] = React.useState(false);
  const [blinkingEffect, setBlinkingEffect] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    let timeout = setTimeout(() => {
      setIsDisabledMovement(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    }
  }, [isDisabledMovement]);

  useEffect(() => {
    let timeout = null;
    if (isBlinking) {
      setStartBlinking(true);
      timeout = setTimeout(() => {
        setStartBlinking(false);
      }, 5000);
    }

    return () => {
      setStartBlinking(false);
      clearTimeout(timeout);
    }
  }, [isBlinking]);

  useEffect(() => {
    let interval = null;
    if (!isBlinking) return clearInterval(interval);
    interval = setInterval(() => {
      setBlinkingEffect((prev) => !prev);
    }, 5000);

    return () => {
      clearInterval(interval);
    }

  }, [isBlinking])

  const onMovementBlock = (e) => {
    console.log('onMovement')
    setIsDisabledMovement(true);
  }

  const onClickCamera = (e) => {
    console.log('double click');
    router.push(`/events/${data}`);
  }


  return (
    <div
      className={` ${(startBlinking && !isDisabledMovement) ? `${blinkingEffect ? 'blinking-border' : 'border-[#00FF00]'} border-4 border-solid` : ''} cursor-pointer`}
      style={{ height: boxHeight }}
      onClick={onMovementBlock}
      onDoubleClick={onClickCamera}
    >
    </div>
  )
}

export default SingleCameraBox
