import { POSS_CONFIG } from '@/config/poss'
export type ChainType = 'ethereum' | 'base' | 'optimism' | 'polygon' | 'arbitrum'
class PossUtils {
  private static chainType: ChainType = 'base'
  static getMerchantIdByChain() {
    switch (PossUtils.chainType) {
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

  static setChainType(chain: ChainType) {
    PossUtils.chainType = chain
  }
}

export default PossUtils
