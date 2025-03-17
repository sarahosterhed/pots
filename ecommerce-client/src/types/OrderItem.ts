export type OrderItem = {
  id: number | null
  product_id: number
  product_name: string
  quantity: number
  unit_price: number
}

export type OrderItemUpdate = Pick<OrderItem, "quantity">;