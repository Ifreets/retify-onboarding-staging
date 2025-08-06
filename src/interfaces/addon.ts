// Interface cho từng lựa chọn bổ sung (ví dụ: Size S, Size M, Size L)
export interface Addon {
  /** ID của lựa chọn */
  id?: number;
  /** Tên của lựa chọn */
  name?: string;
  /** Giá của lựa chọn (có thể là 0 nếu miễn phí) */
  price?: number;
  /** Trạng thái có sẵn hay không */
  available?: boolean;
  /** Mô tả của lựa chọn (có thể không có) */
  description?: string | null;
  /** số lượng */
  quantity?: number;
}

// Interface cho nhóm lựa chọn (ví dụ: Chọn size)
export interface OptionAddon {
  /** ID của nhóm lựa chọn */
  id?: number;
  /** Tên của nhóm lựa chọn */
  name?: string;
  /** Danh sách các lựa chọn trong nhóm */
  addons?: Addon[];
  /** Có bắt buộc chọn không */
  required?: boolean;
  /** Nhóm lựa chọn có khả dụng không */
  available?: boolean;
  /** Số lượng tối đa có thể chọn */
  max_select?: number;
  /** Loại lựa chọn: RADIO (chọn 1) hoặc CHECKBOX (chọn nhiều) */
  option_type?: "RADIO" | "CHECKBOX" | string;
}
