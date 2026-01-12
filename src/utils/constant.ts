/** Danh sách action sẽ thực hiện ở mỗi trạng thái */
export const ACTION_STATUS = [
  {
    name: 'None',
    value: 'NONE',
    hiddend: true,
  },
  {
    name: 'New Order',
    value: 'NEW_ORDER',
    hiddend: false,
  },
  {
    name: 'Waiting Item',
    value: 'WAITING_ITEM',
    hiddend: false,
  },
  {
    name: 'Confirm Order',
    value: 'CONFIRM_ORDER',
    hiddend: false,
  },
  {
    name: 'Packing Order',
    value: 'PACKING_ORDER',
    hiddend: false,
  },
  {
    name: 'Confirm Items',
    value: 'CONFIRM_ITEMS',
    hiddend: false,
  },
  {
    name: 'Confirm Buyer',
    value: 'CONFIRM_BUYER',
    hiddend: false,
  },
  {
    name: 'Confirm Payment Method',
    value: 'CONFIRM_METHOD_PAY',
    hiddend: false,
  },
  {
    name: 'Confirm Delivery Address',
    value: 'CONFIRM_DELIVERY_ADDRESS',
    hiddend: false,
  },
  {
    name: 'Delivery Order',
    value: 'DELIVERY_ORDER',
    hiddend: false,
  },
  {
    name: 'Shipping Order',
    value: 'SHIPPING_ORDER',
    hiddend: false,
  },
  {
    name: 'Paid Order',
    value: 'PAID_ORDER',
    hiddend: false,
  },
  {
    name: 'Inventory Export',
    value: 'INVENTORY_EXPORT',
    hiddend: false,
  },
  {
    name: 'Inventory Import',
    value: 'INVENTORY_IMPORT',
    hiddend: false,
  },
  {
    name: 'Order Success',
    value: 'ORDER_SUCESS',
    hiddend: false,
  },
  {
    name: 'Return Order',
    value: 'RETURN_ORDER',
    hiddend: false,
  },
  {
    name: 'Cancel Order',
    value: 'CANCEL_ORDER',
    hiddend: false,
  },
  {
    name: 'Delete Order',
    value: 'DELETE_ORDER',
    hiddend: false,
  },
  {
    name: 'Alert',
    value: 'ALERT',
    hiddend: true,
  },
]

/** danh sách trạng thái sản phẩm */
export const PRODUCT_STATUS = [
  {
    value: 'IN_STOCK',
    name: 'In stock',
  },
  {
    value: 'OUT_OF_STOCK',
    name: 'Out stock',
  },
  {
    value: 'ON_SALE',
    name: 'On sale',
  },
  {
    value: 'NEW_ARRIVALS',
    name: 'New arrivals',
  },
  {
    value: 'ACTIVE',
    name: 'Active',
  },
  {
    value: 'UNACTIVE',
    name: 'Unactive',
  },
]

/** danh sách các loại sắp xếp của sản phẩm */
export const SORT_BY = [
  {
    title: 'Sort by name',
    key: 'search_name',
    asc_title: 'A-Z',
    desc_title: 'Z-A',
  },
  {
    title: 'Sort by price',
    key: 'price',
    asc_title: 'Low to high',
    desc_title: 'High to low',
  },
  {
    title: 'Sort by update time',
    key: 'updatedAt',
    asc_title: 'Update latest',
    desc_title: 'Update oldest',
  },
]

/** danh sách trạng thái đơn hàng để lọc */
export const ORDER_STATUS = [
  {
    value: 'NEW_ORDER',
    name: 'New Order',
  },
  {
    value: 'PAID_ORDER',
    name: 'Paid',
  },
  {
    value: 'WAITING_ITEM',
    name: 'Processing',
  },
  {
    value: 'PACKING_ORDER',
    name: 'Ready',
  },
  {
    value: 'DELIVERY_ORDER',
    name: 'Delivered',
  },
  {
    value: 'CANCEL_ORDER',
    name: 'Cancelled',
  },
]
