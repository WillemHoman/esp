import Big from 'big.js'
import { Line } from '../Cart'

export interface Refund extends Line {
  /**
   * Total amount refunded, in major units (e.g. dollars).
   */
  amount: Big

  /**
   * ID or IDs of the sale items for which the refund was issued, if any.
   */
  saleItemIDs: number[]
}
