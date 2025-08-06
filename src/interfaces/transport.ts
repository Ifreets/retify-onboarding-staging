import type { DistrictData, ProvinceData, WardData } from './location'
import type { Order } from './order'

interface Location {
  /** Tên phường */
  ward?: WardData
  /** Địa chỉ */
  address?: string
  /** Tên quận */
  district?: DistrictData
  /** Tên tỉnh/thành phố */
  province?: ProvinceData
}

interface ReceiverLocation extends Location {
  platform_type?: string
}

/** thiết lập dữ liệu giao vận */
interface Config {
  /** Vị trí cửa hàng*/
  location?: Location
  /** Token truy cập */
  access_token?: string
  /** cân nặng tối đa */
  max_weight?: number
  /** khối lượng mỗi sản phẩm */
  product_weight?: number
  /** lựa chọn phụ */
  sub_options?: SubOption[]
  /** Cửa hàng mặc định */
  inventory_id?: string
  /** Dịch vụ mặc định */
  service_id?: string
  /** ghi chú mặc định */
  default_note?: string
  /** thời gian lấy hàng */
  work_shift?: number
  /** thời gian giao hàng */
  delivery_shift?: number
  /** tự động tạo đơn giao vận */
  auto_create_order?: boolean
  /** Người trả phí dịch vụ */
  service_charge_payer?: 'SENDER' | 'RECEIVER'
  /** Chính sách giao hàng */
  delivery_policy?: 'TRY_BEFORE_BUY' | 'INSPECT_NO_TESTING' | 'NO_INSPECT'
}

export interface AccountShipping {
  /** ID */
  id?: string
  /** ID tài khoản */
  account_id?: number
  /** Loại nền tảng */
  platform_type?: string
  /** Tên đăng nhập */
  username?: string
  /** Cấu hình */
  config?: Config
  /** ID doanh nghiệp */
  business_id?: string
  /** ID chi nhánh */
  branch_id?: string
  /** ID phòng ban */
  department_id?: string
  /** ID nhóm */
  team_id?: string | null
  /** ID nhân viên */
  employee_id?: string
  /** ID người dùng */
  user_id?: string
  /** Đã lưu trữ hay chưa */
  is_archived?: boolean
  /** Đang hoạt động hay không */
  is_active?: boolean
  /** Mặc định hay không */
  is_default?: boolean
  /** Ngày tạo */
  createdAt?: string
  /** Ngày cập nhật */
  updatedAt?: string

  // * API không trả về 
  address?: string
}

/** dữ liệu cửa hàng */
export interface Store {
  /** mã id */
  id?: string
  /** tên */
  name?: string
  /** số điện thoại */
  phone?: string
  /** địa chỉ */
  location?: Location
  /** loại nền tảng */
  platform_type?: string
}

/** dữ liệu dịch vụ */
export interface Service {
  id?: string | number
  name?: string
}

/** dữ liệu lựa chọn phụ */
export interface SubOption {
  name?: string
  value?: number
  active?: boolean
}

/** dữ liệu tạo đơn giao vận */
export interface Shipping {
  /** mã tài khoản giao hàng */
  shipping_account_id?: number
  /** mã hàng tồn kho */
  inventory_id?: string 
  /** mã dịch vụ */
  service_id?: string | number
  /** tên người gửi */
  sender_name?: string
  /** số điện thoại người gửi */
  sender_phone?: string
  /** người thanh toán phí dịch vụ */
  service_charge_payer?: string
  /** chính sách giao hàng */
  delivery_policy?: string
  /** tên người nhận */
  receiver_name?: string
  /** số điện thoại người nhận */
  receiver_phone?: string
  /** địa chỉ gửi */
  sender_location?: Location
  /** địa chỉ nhận */
  receiver_location?: ReceiverLocation
  /** địa chỉ đơn hàng */
  order_location?: Location
  /** id đơn hàng */
  order_id?: string
  /** đơn hàng */
  orders_info?: Order
  /** nền tảng giao vận */
  platform_type?: keyof typeof ShippingPlatform
  /** mã giao vận */
  partner_shipping_code?: string
  /** lựa chọn phụ */
  sub_options?: SubOption[]
  /** Ngày hẹn lấy hàng */
  work_date?: Date
  /** Ngày hẹn giao hàng */
  delivery_date?: Date
  /** Ca lấy hàng */
  work_shift?: number
  /** Ca giao hàng */
  delivery_shift?: number
  /** phi giao hàng */
  shipping_fee?: number
  /** tài khoản giao vận */
  shipping_account?: AccountShipping
}

/** dữ liệu ca làm việc */
export interface Shift {
  id?: number
  name?: string
}

export interface Shifts {
  /** danh sách ca lấy hàng */
  work_shifts: Shift[]
  /** danh sách ca giao hàng */
  delivery_shifts: Shift[]
}

// * Các loại nền tảng hỗ trợ giao vận
export enum ShippingPlatform {
  // * BE
  BE='BE',
  // * Giao hàng nhanh
  GHN='GHN',
  // * Giao hàng tiết kiệm
  GHTK= 'GHTK',
  // * XANH SM
  XANH_SM = 'XANH_SM',
  // * AHAMOVE
  AHAMOVE= 'AHAMOVE',
  // * Giao hàng bưu chính viễn thông
  VN_POST= 'VN_POST',
  // * Giao hàng bưu chính viettel
  VIETTEL_POST= 'VIETTEL_POST',
  ""=""
}