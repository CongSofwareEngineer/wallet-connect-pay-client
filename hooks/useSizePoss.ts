import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'

const queryKey = ['poss-size']

const useSizePoss = () => {
  const queryClient = useQueryClient()

  const { data: sizeScreen = { width: 0, height: 0 } } = useQuery({
    queryKey,
    queryFn: () => ({ width: 0, height: 0 }),
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: { width: 0, height: 0 },
  })

  const reSize = useCallback(() => {
    const possCase = document.querySelector('.poss-case')

    if (possCase) {
      const width = possCase.clientWidth
      const height = possCase.clientHeight

      queryClient.setQueryData(queryKey, {
        width,
        height,
      })
    }
  }, [queryClient])

  useEffect(() => {
    reSize()
    window.addEventListener('resize', reSize)

    return () => {
      window.removeEventListener('resize', reSize)
    }
  }, [reSize])

  return { size: sizeScreen, reSize, width: sizeScreen.width, height: sizeScreen.height }
}

export default useSizePoss
