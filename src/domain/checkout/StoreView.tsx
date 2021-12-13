import React, { FC, useMemo } from 'react'
import { ItemsView } from './productLineItem/ItemsView'
import { makeFormatter } from './currency/MoneyFormatter'
import { PaymentsView } from './payment/PaymentsView'
import { SummaryView } from './SummaryView'
import { Props } from '../../components'
import { FulfilmentsView } from './fulfilment/FulfilmentView'
import classNames from 'classnames'

import { Store } from '../Store'
import {InventoryEntry} from '../inventory/InventoryEntry'

export const StoreView: FC<Props<Store>> = ({aggregate: {projection: store}}) => {
  const {cart, inventory} = store
  const items    = useMemo(() => cart.items(), [cart])
  const payments = useMemo(() => cart.payments(), [cart])
  const shipments = useMemo(() => cart.shipments(), [cart])
  const format   = useMemo(
    () => makeFormatter(cart.currencyCode),
    [cart.currencyCode]
  )

  return <>
    <div className="inventory">
      <label>Inventory</label>
      {inventory.onHand.map(entry => <InventoryItem entry={entry} key={entry.productId}/>)}
    </div>
    <div className="cart-view pt-2">
      <h2>Cart: {cart.currencyCode}</h2>

      <h5>Items</h5>
      {items[0] ? <ItemsView items={items} total = {cart.total()} format={format}/> : <None/>}

      <h5>Fulfilments</h5>
      {shipments[0] ? <FulfilmentsView cart={cart} total={cart.totalShipments()} format={format} /> : <None/>}

      <h5>Payments</h5>
      {payments[0] ? <PaymentsView payments={payments} total={cart.totalPayments()} format={format}/> : <None/>}

      <h5>Summary</h5>
      {cart.lines[0] ? <SummaryView cart={cart} format={format}/> : <None/>}
    </div>
  </>
}

const None: FC = () => <p className="text-muted"><em>None.</em></p>

const InventoryItem: FC<{entry: InventoryEntry}> = ({entry: {quantity, productId}}) => {
  return <span className="inventory-item">
    <span className={classNames('badge', 'item-name', 'bg-secondary')}>
      {productId}
    </span>
    <span className={classNames('badge', 'item-quantity', quantity ? 'text-dark' : 'text-light', quantity ? 'bg-light' : 'bg-danger')}>{quantity}</span>
    {' '}
  </span>
}
