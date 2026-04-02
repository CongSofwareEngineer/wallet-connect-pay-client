import { useEffect, useState } from 'react'

const useSizeScreen = () => {
  const [sizeScreen, setSizeScreen] = useState({
    width: 0,
    height: 0,
    isBySizeWidth: false,
    isBySizeHeight: false,
  })

  useEffect(() => {
    const handleResize = () => {
      const ratioScree = window.innerHeight / window.innerWidth

      console.log({ ratioScree })

      setSizeScreen({
        width: window.innerWidth,
        height: window.innerHeight,
        isBySizeWidth: ratioScree >= 2.46403712297,
        isBySizeHeight: ratioScree < 2.46403712297,
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return sizeScreen
}

export default useSizeScreen
