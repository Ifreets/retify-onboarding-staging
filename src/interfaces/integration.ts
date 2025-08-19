/** dữ liệu tích hợp */
export interface Integration {
  /** Mã token truy cập được Square cấp sau khi OAuth (dùng để gọi API) */
  access_token?: string;
  /** Trạng thái kích hoạt của kết nối (true = đang hoạt động) */
  active?: boolean;
  /** Đã bị lưu trữ/ẩn (archive) hay chưa */
  archived?: boolean;
  /** ID chi nhánh (branch) trong hệ thống của bạn */
  branch_id?: string;
  /** ID doanh nghiệp (business) trong hệ thống của bạn */
  business_id?: string;
  /** Thời điểm bản ghi được tạo */
  created_at?: string;
  /** ID phòng ban (nếu có) */
  department_id?: string | null;
  /** ID nhân viên (nếu có) */
  employee_id?: string | null;
  /** ID duy nhất của bản ghi kết nối */
  id?: string;
  /** Đã được cài đặt tích hợp hay chưa */
  installed?: boolean;
  /** Nền tảng tích hợp (ví dụ: "SQUARE") */
  platform?: string;
  /** Token làm mới (dùng để lấy access_token mới khi hết hạn) */
  refresh_token?: string;
  /** Mã cửa hàng trong Square */
  store?: string;
  /** ID của nhóm (team) liên quan (nếu có) */
  team_id?: string | null;
  /** Thời điểm bản ghi được cập nhật lần cuối */
  updated_at?: string;
  /** ID người dùng trong hệ thống của bạn (nếu có) */
  user_id?: string | null;
}