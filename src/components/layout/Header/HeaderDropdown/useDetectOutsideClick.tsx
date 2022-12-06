import { useState, useEffect } from 'react'

export const useDetectOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState)

  useEffect(() => {
    // const onClick = (e) => {
    //   // If the active element exists and is clicked outside of
    //   console.log(el, isActive)
    //   console.log(el.current.contains(e.target))
    //   if (!isActive && el.current !== null && el.current.contains(e.target)) {
    //     console.log(isActive, '1')
    //     setIsActive(isActive)
    //   } else if (isActive && !el.current.contains(e.target)) {
    //     console.log(isActive, '2')
    //     setIsActive(isActive)
    //   }
    // }

    // // If the item is active (ie open) then listen for clicks outside
    // if (isActive) {
    //   window.addEventListener('click', onClick)
    // }
    // // if (!isActive) {
    // //     setIsActive(!isActive)
    // // }

    // return () => {
    //   window.removeEventListener('click', onClick)
    // }
  }, [isActive, el])

  return [isActive, setIsActive]
}
