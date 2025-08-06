export interface IPromotion {
  /** ID bản ghi dạng UUID */
  id?: number

  /** Tên mã */
  promotion_name?: string
  /** Mã code */
  promotion_code?: string
  /** Mô tả */
  description?: string
  /** Mô tả về mã khi nhập thành công */
  entered_description?: string
  /** Thời gian bắt đầu áp dụng */
  start_time?: Date
  /** Thời gian kết thúc áp dụng */
  end_time?: Date
  /** Số ngày user kích hoạt được sử dụng code */
  user_activation_day?: number
  /** Khoảng tiền được áp dụng từ bao nhiêu */
  amount_from?: number
  /** Khoảng tiền được áp dụng tới bao nhiêu */
  amount_to?: number
  /** Dạng giá trị voucher */
  promotion_type?: PromotionType
  /** Đối tượng áp dụng */
  applicable_type?: PromotionApplicableType
  /** Số giá trị (tiền hoặc phần trăm) */
  promotion_value?: number
  /** Đơn vị tính giá trị (vnd, %, ....) */
  promotion_unit?: string
  /** Giá trị tối đa được giảm/tăng (Chỉ áp dụng với đơn vị 😵 */
  promotion_max_value?: number
  /** Hạn dùng Credit (Ngày) */
  credit_expiry_days?: number | null
  /** Số lần áp dụng mã / 1 khách hàng */
  customer_usage_limit?: number
  /** Tổng số lần sử dụng mã */
  promotion_usage_limit?: number
  /** Chỉ định khách hàng nào được dùng */
  assigned_customer?: string | null
  /** Chỉ định nhân viên nào phân phát mã */
  assigned_employee?: string
  /** Quốc gia nào được sử dụng */
  allowed_country?: string
  /** Domain nào được hoạt động mã */
  domain?: string
  /** Tiền tệ */
  currency?: string
  /** Trạng thái hoạt động */
  active?: boolean
  /** Trạng thái cấp mã cho đối tác */
  partner?: boolean

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

  /** Trạng thái xóa bản ghi */
  is_archived?: boolean

  /** số mã đã dùng */
  used?: number

  customer_info?: {
    first_name?: string
    last_name?: string
  }

  /** Thời gian tạo record */
  createdAt?: Date
  /** Thời gian cập nhật record */
  updatedAt?: Date
}

/** Promotion value type */
export type PromotionType =
  /** Tăng */
  | 'INCREASE'
  /** Giảm */
  | 'DECREASE'

/** Đối tượng promotion áp dụng */
export type PromotionApplicableType =
  /** Đơn hàng */
  | 'ORDER'
  /** Giao hàng */
  | 'DELIVERY'
