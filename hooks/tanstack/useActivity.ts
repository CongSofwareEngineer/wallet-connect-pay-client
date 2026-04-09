import { useQuery } from '@tanstack/react-query'

import PossServices from '@/services/API/poss'

interface ActivityParams {
  sortBy?: string
  sortDir?: string
  limit?: number
  startTs?: string
  endTs?: string
}

export const useActivity = (params: ActivityParams) => {
  return useQuery({
    queryKey: ['activities', params],
    queryFn: () => PossServices.getTransactions(params),
  })
}
