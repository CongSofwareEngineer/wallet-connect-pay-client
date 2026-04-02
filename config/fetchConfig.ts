import axios from 'axios'

import { POSS_CONFIG } from './poss'

import { REQUEST_TYPE } from '@/constants/app'

export type ServerAPIReqType = {
  url?: string
  body?: any
  tokenRefresh?: string
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE'
  timeOut?: number
  isAuth?: boolean
  baseURL?: string
  noRefreshToken?: boolean
}

export type ClientAPITypeParam = ServerAPIReqType

export const fetchData = async (
  param: ClientAPITypeParam
): Promise<{
  data: any
  error?: any
  messages: any
}> => {
  try {
    const config: ClientAPITypeParam = {
      isAuth: true,
      method: REQUEST_TYPE.GET,
      ...param,
    }

    return fetchConfig({ ...config })
  } catch {
    return {
      data: null,
      messages: 'fail',
      error: 'server_error',
    }
  }
}

const fetchConfig = async ({
  url = '',
  body = null,
  tokenRefresh = '',
  method = REQUEST_TYPE.GET,
  timeOut = 70000,
  baseURL,
}: ServerAPIReqType): Promise<{ data: any; error?: any; messages: any }> => {
  const config: any = {
    baseURL: baseURL || process.env.NEXT_PUBLIC_API_APP,
    url,
    // cache: isCache ? 'force-cache' : 'no-store',
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': POSS_CONFIG.API_KEY,
      'x-merchant-id': POSS_CONFIG.MERCHANT_ID,
    },
    signal: AbortSignal.timeout(timeOut),
    // withCredentials: true,
  }

  if (body) {
    if (method !== REQUEST_TYPE.GET) {
      config.data = body
    } else {
      config.params = body
    }
  }

  return await axios
    .request(config)
    .then(async (response) => {
      if (response.status === 200) {
        return {
          data: response?.data,
          messages: 'success',
        }
      }

      return {
        data: null,
        messages: 'fail',
      }
    })
    .catch((error) => {
      return {
        data: null,
        messages: 'fail',
        error,
      }
    })
}

export default fetchConfig
