/** Dữ liệu note */
export interface Note {
  /** ID bản ghi dạng UUID */
  id?: string

  /** ID contact bản ghi dạng UUID */
  contact_id?: string

  /** Nội dung note */
  content?: string

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

  /** Thời gian tạo record */
  createdAt?: Date

  /** Thời gian cập nhật record */
  updatedAt?: Date

  /** Reaction */
  reaction?: number

  /** Hiển thị thông tin */
  show_editor?: boolean

  /** Gắn cờ có phải là dạng nested hay không */
  is_nested?: boolean

  /** ID note cha */
  parent_id?: string

  /** Đánh dấu là template */
  is_template?: boolean

  /** Mở rộng comment */
  expand_cmt?: boolean

  /** Trạng thái là khách hàng comment */
  is_customer?: boolean

  /** id cuộc gọi thoại */
  call_id?: string

  // * các dữ liệu api không trả về
  /** cờ check có đang mở input để thêm phản hồi không */
  is_add_reply?: boolean
  /** dữ liệu input nhập để thêm phản hồi */
  note?: string
  /** danh sách các phản hồi của ghi chú */
  replies?: Note[]
}