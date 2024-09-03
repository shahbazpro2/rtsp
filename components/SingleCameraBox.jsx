import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const SingleCameraBox = ({ data, isBlinking }) => {
  const [isDisabledMovement, setIsDisabledMovement] = React.useState(false);
  const [startBlinking, setStartBlinking] = React.useState(false);
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
    if (isBlinking) {
      setStartBlinking(true);
      let timeout = setTimeout(() => {
        setStartBlinking(false);
      }, 5000);
      return () => {
        clearTimeout(timeout);
      }
    }
  }, [isBlinking]);

  const onMovementBlock = (e) => {
    console.log('onMovement')
    setIsDisabledMovement(true);
  }

  const onClickCamera = (e) => {
    console.log('double click');
    router.push(`/events/${data}`);
  }


  return (
    <div className={`h-[140px] ${(startBlinking && !isDisabledMovement) ? 'blinking-border' : ''}   cursor-pointer`} onClick={onMovementBlock} onDoubleClick={onClickCamera}>
    </div>
  )
}

export default SingleCameraBox
