import { useState, useEffect } from 'react'

export const useDetectOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState)
  const [variable, setVar] = useState(0)

  // useEffect(() => {
  //   const onClick = (e) => {
  //     // If the active element exists and is clicked outside of
  //     // console.log(el.current, isActive)
  //     console.log(isActive)
  //     // console.log(el.current.contains(e.target))
  //     if (isActive && !el.current.contains(e.target)) {
  //       // console.log(isActive, '1')
  //       setVar(variable + 1)
  //       console.log(variable)
  //       setIsActive(!isActive)
  //     }
  //   }
  //   console.log('ok')
  //   // // If the item is active (ie open) then listen for clicks outside
  //   // if (isActive) {
  //   window.addEventListener('click', onClick)
  //   // }
  //   // // if (!isActive) {
  //   // //     setIsActive(!isActive)
  //   // // }

  //   return () => {
  //     window.removeEventListener('click', onClick)
  //   }
  // }, [el])

  return [isActive, setIsActive]
}
