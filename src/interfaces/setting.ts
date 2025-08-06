/** Dữ liệu setting đơn hàng */
export interface Setting {
  /** ID bản ghi */
  id?: string

  /** Dạng dữ liệu */
  type?: string

  /** Key setting */
  key?: string

  /** Giá trị setting */
  value?: SettingData

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
}

/** Dữ liệu setting đơn hàng */
export interface SettingHistory {
  /** ID bản ghi */
  id?: string

  /** Dạng dữ liệu */
  type?: string

  /** Giá trị setting */
  value?: SettingData

  old_value?: SettingData

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
}

/** Dữ liệu thiết lập */
export interface SettingData {
  /** Gửi thông báo */
  send_telegram_notification?: boolean

  /** Trigger api facebook */
  trigger_capi?: boolean

  /** Danh sách trạng thái online */
  online_status?: ActionStep[][]

  /** Danh sách trạng thái offline */
  offline_status?: ActionStep[][]

  /** Chu kỳ kinh doanh của doanh nghiệp */
  business_period?: {
    month: {
      start_date: number
      end_date: number
    }
    year: {
      start_time: Date
      end_time: Date
    }
  }

  /** Nhân viên online */
  online_staff?: StaffInfo[]

  /** Nhân viên offline */
  offline_staff?: StaffInfo[]

  /** Nhân viên bán hàng */
  saler?: StaffInfo

  /** thêm nhanh sản phẩm */
  quick_add_product?: boolean

  /** ẩn hiện option phương thức nhận hàng */
  method_receipt?: boolean

  /** nhập thông tin khách hàng */
  require_contact?: boolean
}

/** Dữ liệu trong từng step */
export interface ActionStep {
  /** Tiêu đề của trạng thái */
  title?: string
  /** Hành động sẽ thực hiện */
  action?: string
  /** Màu nền nút bấm */
  bg_color?: string
  /** Màu chữ */
  text_color?: string
  /** Trạng thái active */
  is_active?: boolean
  /** phòng ban */
  department_id?: string
  /** nhân sự */
  employee_id?: string
  /** chức năng */
  function_key?: string
}

/** Dữ liệu nhân viên */
export interface StaffInfo {
  active: boolean
  /** Tiêu đề */
  title: string
  /** ID doanh nghiệp */
  business_id: string
  /** ID chi nhánh */
  branch_id: string
  /** ID phòng ban */
  department_id: string
  /** ID đội nhóm */
  team_id: string
  /** ID nhân viên */
  employee_id: string
  /** ID user */
  user_id: string
  /** Thu nhập p3 */
  salary_p3?: number
  /** Thu nhập p4 */
  salary_p4?: number
}

/** Dữ liệu thông báo */
export interface TrackingTemplate {
  /** Trạng thái hoạt động */
  active?: boolean
  /** Tên sự kiện */
  event?: string
  /** Nguồn đơn hàng */
  source?: string
  /** Nội dung thông báo */
  content?: string
  /** Danh sách hình ảnh */
  images?: string[]
  /** Đơn vị vận chuyển */
  shipping_platform?: string
}

/** địa chỉ cửa hàng */
export interface StoreAddress {
  /** tên cửa hàng */
  name?: string;
  /** Địa chỉ cửa hàng */
  address?: string;
  /** Trạng thái hoạt động của địa chỉ */
  is_active?: boolean;
}

/** giao diện của selling page */
interface TemplatePage {
  /** Giá trị của template trang */
  value?: string;
  /** Trạng thái hoạt động của template */
  is_active?: boolean;
}

/** Phương thức nhận hàng */
interface MethodReceipt {
  /** Phương thức nhận hàng */
  value?: string;
  /** Trạng thái hoạt động của phương thức */
  is_active?: boolean;
}

/** Thông báo khuyến mại */
interface NotificationPromotion {
  /** tiêu đề khuyến mại */
  title?: string;
  /** Mô tả khuyến mại */
  description?: string;
  /** link ảnh */
  image?: string;
  /** Trạng thái hoạt động của thông báo */
  is_active?: boolean;
}

/** dữ liệu thiết lập của selling page */
export interface ISellingPageSetting {
  /** Trạng thái hoạt động chung */
  is_active?: boolean;
  /** link ảnh */
  image?: string;
  /** Thông tin về template trang */
  template_page?: TemplatePage;
  /** Thông báo khuyến mại */
  notification_promotion?: NotificationPromotion;
  /** Thông tin về phương thức nhận hàng */
  method_receipt?: MethodReceipt;
  /** Thông tin về danh sách địa chỉ cửa hàng */
  store_addresses?: {
    /** Danh sách địa chỉ cửa hàng */
    value?: StoreAddress[];
    /** Trạng thái hoạt động của danh sách địa chỉ */
    is_active?: boolean;
  };
  /** bảo trì */
  maintain?: {
    /** Thông báo bảo trì */
    notification?: string;
    /** Trạng thái hoạt động bảo trì */
    is_active?: boolean;
  }
}


/** dữ liệu chức năng */
export interface IFunction {
  /** tên của chức năng */
  name: string
  /** Giá trị của chức năng */
  value: string
}