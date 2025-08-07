import type { OptionAddon } from './addon'
import type { Contact } from './contact'
import type {
  DistrictData,
  ProvinceData,
  StreetData,
  WardData,
} from './location'
import type { IPromotion } from './promotion'
import type { ActionStep, StaffInfo } from './setting'
import type { Shipping, ShippingPlatform } from './transport'

/** Dữ liệu sản phẩm trong đơn hàng */
export interface OrderProduct {
  /** Id sản phẩm */
  product_id?: string
  /** Tên sản phẩm */
  product_name?: string
  /** Dạng sản phẩm */
  product_type?: string
  /** Danh sách ảnh */
  images?: string[]
  /** ID biến thể */
  variant_id?: string
  /** Giá bán */
  price?: number
  /** Giá nhập */
  cost?: number
  /** Số lượng nhập */
  quantity?: number
  /** Số lượng tồn kho */
  inventory_quantity?: number
  /** Tiền thuế vat */
  vat?: number
  /** Chiết khấu tiền mặt */
  discount?: number
  /** chiết khấu dạng phần trăm */
  discount_percent?: number
  /** loại chiết khấu */
  discount_type?: 'money' | 'percent'
  /** Tổng tiền */
  total_price?: number
  /** Trạng thái phân bổ sản phẩm */
  revenue_allocation?: boolean
  /** Phí dịch vụ */
  service_fee?: number
  /** cân nặng tính tiền */
  weight?: number
  /** chiều dài */
  length?: number
  /** chiều rong */
  width?: number
  /** chiều cao */
  height?: number
  /** dữ liệu addon */
  addons?: OptionAddon[]
  /** tổn tiền addons */
  addons_price?: number

  // * API KHÔNG TRẢ VỀ
  id?: string
}

/** Dữ liệu đơn hàng */
export interface Order {
  /** ID bản ghi đơn hàng */
  id?: string

  /** Mã đơn hàng */
  order_id?: string

  /** Sản phẩm */
  products?: OrderProduct[]

  /** Số lượng sản phẩm */
  quantity?: number

  /** Giá bán */
  price?: number

  /** Giảm giá */
  discount?: number

  /** Tiền thuế phải nộp */
  vat?: number

  total_price?: number

  /** Tổng tiền khách sẽ phải thanh toán */
  total_money?: number

  /** Số tiền khách hàng đã đưa */
  money_paid?: number

  /** Số tiền trả lại khách hàng */
  money_back?: number

  /** Số tiền cần thu về */
  money_proceeds?: number

  /** Số tiền khách hàng chưa thanh toán */
  money_unpaid?: number

  /** Có tính vào công nợ không? */
  save_in_debt?: boolean

  /** Phương thức thanh toán */
  payment_method?: 'CASH' | 'TRANSFER' | 'MOMO' | ''

  /** Nhân viên thu tiền */
  cashier?: string

  /** Ghi chú */
  note?: string

  /** Trạng thái đơn hàng */
  status?: string

  /** Mã khách hàng */
  contact_id?: string

  /** Snap lại thông tin khách hàng */
  contact_info?: Contact

  /** Chi phí khác */
  other_costs?: {
    name: string
    value: number
  }[]

  /** Tổng chi phí khác */
  total_other_costs?: number

  /** Danh sách ảnh */
  images?: string[]

  /** Lịch sử hoạt động */
  action_logs?: {
    employee_id?: string
    status?: string | ActionStep[]
    time?: Date
  }[]

  /** Địa chỉ nhận hàng */
  address?: string

  /** Thông tin vị trí */
  locations?: {
    /** Tỉnh thành */
    province?: ProvinceData
    /** Quận huyện */
    district?: DistrictData
    /** Phường xã */
    ward?: WardData
    /** Dữ liệu tên đường */
    street?: StreetData
    /** Số nhà */
    house_number?: StreetData
  }

  /** trạng thái đã xóa hãy chưa */
  is_archived?: boolean

  /** Trạng thái freeship */
  is_freeship?: boolean

  /** Ghi chú nội bộ */
  internal_note?: string

  /** Ảnh nội bộ */
  internal_images?: string[]

  /** Thời gian tạo đơn tùy chọn */
  created_date?: Date

  /** Kết quả feedback */
  feedback_result?: string

  /** Thuộc tính tùy biến */
  custom_fields?: {
    /** Kênh bán hàng */
    sales_channel?: string
    /** Nguồn gốc đơn hàng */
    source?: string
    /** Id thợ chính làm sản phẩm */
    master?: string
    /** Id thợ phụ làm sản phẩm */
    assistant?: string
    /** Tổng giá các loại sản phẩm */
    products_price?: number
    /** số điện thoại khách */
    last_phone?: string
    /** tên người nhận */
    customer_name?: string
    /** page_id */
    page_id?: string
    /** tên page */
    page_name?: string
    /** giới tính */
    gender?: string
    /** số điện thoại khách đặt */
    customer_phone?: string
    /** email khách hàng đặt */
    customer_email?: string
    /** id fb của khách */
    fb_client_id?: string
  }

  /** Hành trình đơn hàng */
  order_journey?: ActionStep[][]

  /** Nhân viên bán hàng */
  saler?: StaffInfo

  /** Nhân viên tham gia */
  staffs?: StaffInfo[]

  /** Trạng thái xuất kho */
  is_inventory_export?: boolean

  /** ID doanh nghiệp */
  business_id?: string

  /** ID chi nhánh */
  branch_id?: string

  /** ID Phòng ban */
  department_id?: string

  /** ID đội nhóm (dữ liệu này lúc có lúc không) */
  team_id?: string

  /** ID nhân viên */
  employee_id?: string

  /** ID user */
  user_id?: string

  /** Thời gian tạo */
  createdAt?: Date

  /** Thời gian update */
  updatedAt?: Date

  /** ID ví doanh nghiệp */
  business_wallet_id?: string

  /** Tên ngân hàng nhận tiền */
  receiver_bank_name?: string

  /** Tên chủ tài khoản nhận tiền */
  receiver_bank_account_name?: string

  /** Số tài khoản nhận tiền */
  receiver_bank_account_number?: string

  /** Chi nhánh ngân hàng */
  receiver_bank_branch?: string

  /** tiền ship */
  shipping_fee?: number

  /** */
  shipping_order?: Shipping[]

  /** mã đơn vận */
  shipping_code?: string

  /** bước hiện tại trong hành trình */
  last_order_journey?: ActionStep

  /** lịch sử giao vận */
  shipping_histories?: ShippingHistory[]

  /** danh sách các thẻ */
  labels?: number[]

  /** người cập nhật cuối */
  updated_by?: string

  ad_id?: string

  /** giá vốn */
  cost?: number

  /** lợi nhuận */
  profit?: number

  /** id bài viết */
  post_id?: string

  /** người tạo bài viết */
  post_creator?: string

  /** nguồn quảng cáo */
  ad_source?: string

  /** mã ctv */
  affiliate_id?: string

  /** tên ctv */
  affiliate_name?: string

  /** danh mục sản phẩm */
  product_categories?: []

  /** trạng thái khóa của đơn */
  is_locked?: boolean

  /** trạng thái ưu tiên của đơn */
  is_priority?: boolean

  /** link widget nhắc lịch */
  widget_note?: string

  /** trùng số điện thoại */
  is_duplicate?: boolean

  /** mã qr code */
  qr_code?: string

  /** nền tảng thanh toán */
  payment_platform?: string

  /** mã thiết lập thanh toán */
  payment_setting_id?: string

  /** ảnh thanh toán bill */
  billing_images?: string[]

  /** trạng thái thanh toán */
  payment_status?: string

  /** dữ liệu giảm giá */
  promotion_codes?: IPromotion[]

  /** địa chỉ cửa hàng */
  merchant_address?: string

  /** số điểm tích lũy sử dụng */
  loyalty_point?: {
    point?: number
    money?: number
  }

  /** số bàn */
  table_name?: string

  /** nền tảng giao vận */
  shipping_platform?: keyof typeof ShippingPlatform

  /** các option giao vận */
  shipping_options?: Shipping

  /** id số điện thoại của người liên hệ */
  contact_phone_id?: string

  //** api không trả về

  /** action thực hiện thanh toán */
  payment_action?: string

  /** tổng tiền thanh toán thành công */
  total_payment_money?: number

  /** tổng số giao dịch thành công */
  total_successful_transactions?: number

  /** tổng giao dịch không thành công */
  total_failed_transactions?: number

  total_weight?: number
  max_height?: number
  max_length?: number
  max_width?: number

  /** trạng thái của đơn hàng khi cập nhật nhanh */
  quick_update?: {
    type?: string
    message?: string
  }

  /** đánh dấu đơn từ socket trả về chưa được đọc */
  is_socket_unread?: boolean

  /** số điện thoại */
  contact_phone?: string

  /** tên liên hệ */
  contact_name?: string
}

/** trạng thái của lịch sử giao vận */
export type ShippingHistoryStatus =
  /** chờ xác nhận */
  | 'PENDING_CONFIRMATION'
  /** chờ lấy hàng */
  | 'PENDING_PICKUP'
  /** chờ giao hàng */
  | 'PENDING_DELIVERY'
  /** đã giao hàng */
  | 'DELIVERED'
  /** đã hủy */
  | 'CANCELED'
  /** đã trả hàng */
  | 'RETURNED'

/** chính sách kiểm hàng */
export interface IPolicy {
  label?: string
  value?: string
}

/** dữ liệu lịch sử giao vận */
export interface ShippingHistory {
  /** thời gian tạo */
  createdAt?: Date
  /** id */
  id?: string
  /** id đơn hàng */
  order_id?: string
  /** mã giao vận */
  partner_shipping_code?: string
  /** nền tảng giao vận */
  platform_type?: string
  /** id giao vận */
  shipping_id?: string
  /** trạng thái */
  status?: ShippingHistoryStatus
  /** lý do hoàn hàng */
  third_party_reason?: string
  /** trạng thái đơn hàng */
  third_party_status?: string
  /** thời gian cập nhật */
  updatedAt?: Date
}

/** dữ liệu của trang trên facebook */
export interface Page {
  /** tên trang */
  page_name?: string
  /** id trang */
  page_id?: string
  /** id doanh nghiệp */
  external_business_id?: string
  /** ảnh đại diện của trang */
  avatar?: string
  /** trang thái đồng bộ sản phẩm của trang */
  is_sync_facebook_product: boolean
}

/** dữ liệu thẻ của đơn hàng */
export interface Label {
  /** Mã định danh */
  id?: string
  /** Mã định danh nhãn */
  label_id?: number
  /** Loại nhãn */
  label_type?: string
  /** Mã trạng thái */
  status_code?: string | null
  /** Tiêu đề */
  title?: string
  /** Màu chữ */
  text_color?: string
  /** Màu nền */
  bg_color?: string
  /** Mã ứng dụng */
  app_id?: string
  /** Mã doanh nghiệp */
  business_id?: string | null
  /** Mã chi nhánh */
  branch_id?: string | null
  /** Mã phòng ban */
  department_id?: string | null
  /** Mã nhóm */
  team_id?: string | null
  /** Mã nhân viên */
  employee_id?: string | null
  /** Mã người dùng */
  user_id?: string | null
  /** Đã lưu trữ */
  is_archived?: boolean
  /** Ngày tạo */
  createdAt?: string
  /** Ngày cập nhật */
  updatedAt?: string
}

/** dữ liệu báo cáo của khách hàng */
export interface PhoneData {
  /** ID của bản ghi */
  _id?: string
  /** Hash của số điện thoại */
  phone?: string
  /** UID người dùng */
  uid?: string
  /** Thông tin về đơn hàng báo cáo */
  report_order?: {
    [key: string]: {
      /** Số lượng đơn hàng thất bại */
      order_fail?: number
      /** Số lượng đơn hàng thành công */
      order_success?: number
      /** Cảnh báo */
      warning?: number
    }
  }
  /** Danh sách số điện thoại cảnh báo */
  warning_phone?: ReportedData[]
}
interface ReportedData {
  /** UUID của báo cáo */
  id?: string
  /** Lý do báo cáo */
  reason?: string
  /** ID của trang liên quan */
  page_id?: string
  /** ID của cửa hàng (có thể null) */
  shop_id?: string | null
  /** Thời gian cập nhật gần nhất (ISO 8601) */
  updated_at?: string
  /** Thời gian tạo báo cáo (ISO 8601) */
  inserted_at?: string
  /** Thông tin người báo cáo */
  reported_by?: {
    /** ID Facebook của người báo cáo */
    fb_id?: string
    /** Tên Facebook của người báo cáo */
    fb_name?: string
  }
  /** Số điện thoại liên quan */
  phone_number?: string
}

/** Trạng thái actions đơn hàng */
export interface ActionStatus {
  name: any
  value: string
  hiddend: boolean
}

/** quyền cập nhật đơn hàng */
export interface OrderPermission {
  /** Danh sách  */
  [action: string]: {
    /** Có được phép cập nhật sản phẩm ko? */
    update_product: boolean
    /** Có được phép cập nhật */
    update_sales_channel: boolean
    /** Có được phép cập nhật nhân viên chỉ định ko? */
    update_staffs: boolean
    /** Update khách hàng */
    update_contact: boolean
    /** Update địa chỉ */
    update_address: boolean
    /** Cập nhật địa chỉ nhận hàng */
    update_receiver: boolean
    /** Cập nhật ghi chú với khách hàng */
    update_note: boolean
    /** Cập nhật note nội bộ */
    update_internal_note: boolean
    /** Cập nhật thanh toán */
    update_payment: boolean
    /** Cập nhật ship */
    update_shipping: boolean
    /** Cập nhật số tiền */
    update_money: boolean
  }
}

/** loại cập nhật đơn hàng */
export type TypeUpdateOrder =
  | 'update_product'
  | 'update_sales_channel'
  | 'update_staffs'
  | 'update_contact'
  | 'update_address'
  | 'update_receiver'
  | 'update_note'
  | 'update_internal_note'
  | 'update_payment'
  | 'update_shipping'
  | 'update_money'
  | ''
