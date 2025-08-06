/** Danh sách action sẽ thực hiện ở mỗi trạng thái */
export const ACTION_STATUS = [
    {
        name: 'None',
        value: 'NONE',
        hiddend: true,
    },
    {
        name: 'New Order',
        value: 'DRART_ORDER',
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