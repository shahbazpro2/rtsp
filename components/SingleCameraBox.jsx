import { blinkingTimeout, disableMovementTimeout } from '@/lib/constants';
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
    }, disableMovementTimeout);
    return () => {
      clearTimeout(timeout);
    }
  }, [isDisabledMovement]);

  useEffect(() => {
    let timeout = null;
    if (isBlinking) {
      setStartBlinking(true);
     /*  timeout = setTimeout(() => {
        setStartBlinking(false);
      }, blinkingTimeout); */
    }

    return () => {
      //setStartBlinking(false);
     /*  clearTimeout(timeout); */
    }
  }, [isBlinking]);

  /*   useEffect(() => {
      let interval = null;
      if (!isBlinking) return clearInterval(interval);
      interval = setInterval(() => {
        setBlinkingEffect((prev) => !prev);
      }, blinkingTimeout);
  
      return () => {
        clearInterval(interval);
      }
  
    }, [isBlinking]) */

  const onMovementBlock = (e) => {
    setIsDisabledMovement(true);
  }

  const onClickCamera = (e) => {
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
