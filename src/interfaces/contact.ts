import type { LocationDetail } from "./location"

/** Lưu dữ liệu contact */
export interface Contact {
  /** ID bản ghi dạng UUID */
  id?: string

  /** ID định danh khách hàng */
  identifier_id?: string

  /** id được hash ra từ avatar */
  hash_id?: string

  /** Tên gọi */
  first_name?: string

  /** Tên họ */
  last_name?: string

  /** Ảnh đại diện */
  avatar?: string

  /** Gợi ý số điện thoại */
  suggest_phone?: string

  /** Danh sách sdt */
  phones?: string[]

  /** Gợi ý email */
  suggest_email?: string

  /** Danh sách email */
  emails?: string[]

  /** Gợi ý psid */
  suggest_psid?: string

  /** Danh sách psid */
  psids?: string[]

  /** Gợi ý page_id */
  suggest_page_id?: string

  /** Danh sách page_id */
  page_ids?: string[]

  /** Danh sách label_id */
  label_ids?: string[]

  /** Danh sách địa chỉ */
  addresses?: any[]

  /** Giới tính */
  gender?: string

  /** Sinh nhật */
  birthday?: Date | string

  /** Tên công ty */
  company?: string

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

  /** Danh sách SDT đã được xác thực */
  verified_phones?: string[]

  /** Danh sách email đã được xác thực */
  verified_emails?: string[]

  /** Danh sách nhân viên đã được assign vào */
  assigned_employees?: string[]

  /** Thời gian tạo record */
  createdAt?: Date

  /** Thời gian cập nhật record */
  updatedAt?: Date

  /** Thời gian tạo Note cuối cùng */
  last_time_note?: Date

  /** Thông tin người đọc note */
  unread?: {
    [user_id: string]: {
      is_read: boolean
      last_time_read: Date
    }
  }

  /** Tên gợi nhớ theo user */
  alias_names?: {
    [user_id: string]: {
      display_name: string
      search_name: string
    }
  }

  /** Dữ liệu gim trên contact */
  pin_content?: string

  /** Trạng thái tính thu nhập cho marketing */
  marketing_income?: boolean

  /** Dữ liệu tên để tìm kiếm */
  search_name?: string

  /** Gợi ý fb_user_id */
  suggest_fb_user_id?: string

  /** Danh sách fb_user_id */
  fb_user_ids?: string[]

  /** Gợi ý chatbox client id */
  suggest_chatbox_client_id?: string

  /** Danh sách chatbox client ids */
  chatbox_client_ids?: string[]

  /** Trạng thái khách hàng */
  stage?: CustomerStage

  /** Gắn nhãn ưu tiên */
  priority_level_labels?: any[] // Kiểu chưa rõ, dùng any[]

  /** Thời gian lần cuối liên hệ */
  last_contacted?: Date

  /** Thời gian phản hồi khách hàng (unix timestamp) */
  customer_response_time?: number

  /** Tổng số đơn hàng */
  total_orders?: number

  /** Tổng doanh thu */
  total_revenue?: number

  /** Tổng tiền còn phải thu */
  total_unpaid?: number

  /** Tổng tiền phải hoàn lại */
  total_refund?: number

  /** Tổng số ticket */
  total_tickets?: number

  /** Ghi chú nội bộ */
  internal_note?: string

  /** Nguồn khách hàng */
  customer_source?: string

  /** Đánh giá của khách hàng */
  customer_rating?: keyof typeof CustomerRating

  /** Trạng thái khách hàng */
  customer_status?: keyof typeof CustomerStatus

  /** Danh sách công ty */
  companies?: any[] // Kiểu chưa rõ, dùng any[]

  /** Trạng thái kết bạn Zalo */
  add_zalo_friend?: boolean

  /** Quan hệ với bảng cache query */
  cache_query?: any[] // Kiểu chưa rõ, dùng any[]

  /** Lịch sử sử dụng mã khuyến mãi */
  promotion_usage_histories?: any[] // Kiểu chưa rõ, dùng any[]

  /** Điểm tích lũy */
  loyalty_points?: number

  /** Lịch sử tích điểm */
  loyalty_points_histories?: any[] // Kiểu chưa rõ, dùng any[]

  /** Danh sách mã khuyến mãi gán cho khách hàng */
  promotions?: any[] // Kiểu chưa rõ, dùng any[]

  /**
   * nguồn của liên hệ
   * TODO: lấy dữ liệu từ anh Mạnh bổ sung sau
   */

  /** Danh sách nguồn contact */
  contact_sources?: ContactSource[]

  /** Danh sách số điện thoại */
  contact_phones?: ContactPhone[]

  /** Danh sách email */
  contact_emails?: ContactEmail[]

  /** Danh sách địa chỉ */
  contact_address?: ContactAddress[]
}

export enum CustomerStage {
  /** Đang xử lý */
  IN_PROGRESS = 'IN_PROGRESS',
  /** Đăng ký */
  REGISTERED = 'REGISTERED',
  /** Tiềm năng */
  PROSPECT = 'PROSPECT',
  /** Đã mua hàng */
  PURCHASED = 'PURCHASED',
  /** Trung thành */
  LOYAL = 'LOYAL',
}

export enum CustomerRating {
  /** Rất không hài lòng */
  VERY_DISSATISFIED = 'VERY_DISSATISFIED',
  /** Không hài lòng */
  DISSATISFIED = 'DISSATISFIED',
  /** Bình thường */
  NEUTRAL = 'NEUTRAL',
  /** Hài lòng */
  SATISFIED = 'SATISFIED',
  /** Rất hài lòng */
  VERY_SATISFIED = 'VERY_SATISFIED',
}

export enum CustomerStatus {
  /** Mở */
  OPEN = 'OPEN',
  /** Đang xử lý */
  PENDING = 'PENDING',
  /** Đã giải quyết */
  RESOLVED = 'RESOLVED',
  /** Đã đóng */
  CLOSED = 'CLOSED',
}

/** dữ liệu nguồn của liên hệ */
export interface ContactSource {
    /** ID nội bộ của bản ghi */
    id?: string,
    /** ID của liên hệ (contact) gốc */
    contact_id?: string,
    /** Nguồn liên hệ, ví dụ?: 'ZALO_PERSONAL' */
    source?: string,
    /** Tên trang hoặc tên người dùng Zalo */
    page_name?: string,
    /** ID trang Zalo liên hệ */
    page_id?: string,
    /** ID khách hàng hệ thống */
    client_id?: string,
    /** Link hồ sơ người dùng (có thể null) */
    link_profile?: string | null,
    /** ID doanh nghiệp liên kết */
    business_id?: string,
    /** ID chi nhánh thuộc doanh nghiệp */
    branch_id?: string,
    /** ID phòng ban của nhân viên xử lý */
    department_id?: string,
    /** ID nhóm phụ trách (có thể null) */
    team_id?: string | null,
    /** ID nhân viên phụ trách */
    employee_id?: string,
    /** ID người dùng tạo hoặc sở hữu bản ghi */
    user_id?: string,
    /** Thời điểm tạo bản ghi (ISO 8601) */
    createdAt?: string,
    /** Thời điểm cập nhật bản ghi gần nhất (ISO 8601) */
    updatedAt?: string
}

/** dữ liệu số điện thoại của liên hệ */
export interface ContactPhone {
    /** ID duy nhất của bản ghi (UUID) */
    id?: string,
    /** Số điện thoại (đã được che hoặc mã hóa) */
    phone_number?: string,
    /** ID liên hệ gốc */
    contact_id?: string,
    /** ID doanh nghiệp liên kết */
    business_id?: string,
    /** ID chi nhánh đang quản lý liên hệ */
    branch_id?: string,
    /** ID phòng ban phụ trách */
    department_id?: string,
    /** ID nhóm phụ trách (có thể null) */
    team_id?: string | null,
    /** ID nhân viên phụ trách */
    employee_id?: string,
    /** ID người dùng tạo hoặc đang sở hữu bản ghi */
    user_id?: string,
    /** Trạng thái lưu trữ: true nếu đã lưu trữ (archived), false nếu còn hoạt động */
    archived?: boolean,
    /** Thời điểm tạo bản ghi (ISO 8601) */
    createdAt?: string,
    /** Thời điểm cập nhật bản ghi gần nhất (ISO 8601) */
    updatedAt?: string,
    /** Chuỗi hash bảo mật của số điện thoại */
    hash_phone?: string
}

/** dữ liệu email của hiện hệ */
export interface ContactEmail {
    /** ID duy nhất của bản ghi email (UUID) */
    id?: string,
    /** Địa chỉ email liên hệ (có thể đã được ẩn) */
    email?: string,
    /** ID liên hệ gốc liên kết với email */
    contact_id?: string,
    /** ID doanh nghiệp sở hữu email */
    business_id?: string,
    /** ID chi nhánh đang quản lý email */
    branch_id?: string,
    /** ID phòng ban phụ trách email */
    department_id?: string,
    /** ID nhóm phụ trách (có thể null) */
    team_id?: string | null,
    /** ID nhân viên phụ trách email */
    employee_id?: string,
    /** ID người dùng tạo hoặc sở hữu bản ghi email */
    user_id?: string,
    /** Trạng thái lưu trữ: true nếu đã lưu trữ, false nếu đang hoạt động */
    archived?: boolean,
    /** Thời điểm tạo bản ghi email (ISO 8601) */
    createdAt?: string,
    /** Thời điểm cập nhật bản ghi email gần nhất (ISO 8601) */
    updatedAt?: string
}

/** dữ liệu địa chỉ của liên hệ */
export interface ContactAddress {
    /** ID duy nhất của bản ghi địa chỉ (UUID) */
    id?: string,
    /** Số điện thoại liên hệ (có thể được ẩn) */
    phone_number?: string,
    /** Địa chỉ rút gọn người dùng nhập (có thể không đầy đủ) */
    address?: string,
    /** Địa chỉ đầy đủ bao gồm phường/xã, quận/huyện, tỉnh/thành */
    full_address?: string,
    /** Thông tin vị trí địa lý được chuẩn hóa */
    locations?: LocationDetail,
    /** ID liên hệ gốc liên kết với địa chỉ */
    contact_id?: string,
    /** ID doanh nghiệp sở hữu địa chỉ */
    business_id?: string,
    /** ID chi nhánh đang quản lý địa chỉ */
    branch_id?: string,
    /** ID phòng ban phụ trách địa chỉ */
    department_id?: string,
    /** ID nhóm phụ trách (có thể null) */
    team_id?: string | null,
    /** ID nhân viên phụ trách địa chỉ */
    employee_id?: string,
    /** ID người dùng tạo hoặc sở hữu bản ghi địa chỉ */
    user_id?: string,
    /** Trạng thái lưu trữ: true nếu đã lưu trữ, false nếu đang hoạt động */
    archived?: boolean,
    /** Thời điểm tạo bản ghi địa chỉ (ISO 8601) */
    createdAt?: string,
    /** Thời điểm cập nhật bản ghi địa chỉ gần nhất (ISO 8601) */
    updatedAt?: string
}

/** Thông tin nhãn */
export interface LabelContact {
    /** Id bản ghi */
    id?: string
    /** Id nhãn */
    label_id?: string
    /** Màu nhãn */
    bg_color?: string
    /** Id page */
    fb_page_id?: string
    /** Màu chữ */
    text_color?: string
    /** Tên nhãn */
    title?: string
    /** Thời gian update */
    updatedAt?: string
    /** Time tạo */
    createdAt?: string
}

/** Thông tin nhãn */
// export interface Label {
//     /** Id bản ghi */
//     id?: string
//     /** Id nhãn */
//     label_id?: string
//     /** Màu nhãn */
//     bg_color?: string
//     /** Id page */
//     fb_page_id?: string
//     /** Màu chữ */
//     text_color?: string
//     /** Tên nhãn */
//     title?: string
//     /** Thời gian update */
//     updatedAt?: string
//     /** Time tạo */
//     createdAt?: string
// }