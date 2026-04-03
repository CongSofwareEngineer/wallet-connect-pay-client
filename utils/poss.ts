import { POSS_CONFIG } from '@/config/poss'
export type ChainType = 'ethereum' | 'base' | 'optimism' | 'polygon' | 'arbitrum'
class PossUtils {
  static chainType: ChainType = 'base'
  static getMerchantIdByChain(chainType: ChainType) {
    switch (chainType) {
      case 'ethereum':
        return POSS_CONFIG.MERCHANT_ID_ETHEREUM
      case 'base':
        return POSS_CONFIG.MERCHANT_ID_BASE
      case 'optimism':
        return POSS_CONFIG.MERCHANT_ID_OPTIMISM
      case 'polygon':
        return POSS_CONFIG.MERCHANT_ID_POLYGON
      case 'arbitrum':
        return POSS_CONFIG.MERCHANT_ID_ARBITRUM
      default:
        return POSS_CONFIG.MERCHANT_ID_BASE
    }
  }
}

export default PossUtils
