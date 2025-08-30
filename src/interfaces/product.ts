/** tỷ lệ hoa hồng */
export interface ICommissionRate {
  /** id phòng ban */
  department_id?: string

  /** tiền hoa hồng */
  commission?: number

  /** loại tiền là tiền hay phần trăm */
  commission_type?: 'percentage' | 'money'

  /** mức hoa hồng tối đa */
  max_commission?: number

  /** id của nhân viên được chỉ định */
  employee_id?: string
}

/**
 * Dữ liệu sản phẩm
 */
export interface Product {
  /** Id bản ghi hệ thống */
  id?: string

  /** Mã danh mục */
  category_id?: string

  /** Mã sản phẩm tạo random */
  product_id?: string

  /** Mã nhà cung cấp */
  vendor_id?: string

  /** Tên sản phẩm */
  name?: string

  /** Tên tìm kiếm */
  search_name?: string

  /** Mô tả sản phẩm */
  description?: string

  /** Ảnh sản phẩm */
  images?: string[]

  /** Loại sản phẩm */
  type?: string

  /** Trạng thái sản phẩm */
  status?: string

  /** Thuộc tính tùy biến */
  custom_fields?: {
    /** Xuất xứ */
    origin?: string

    /** Nguồn gốc */
    source?: string

    /** Loại */
    type?: string

    /** Mùa */
    season?: string

    /** Trạng thái phân bổ doanh thu */
    revenue_allocation?: boolean

    /** Hình thức phân bổ doanh thu */
    allocation_form?: string

    /** Giá trị giảm dần */
    value_gradually_decreases?: number

    /** Đơn vị phân bổ */
    allocation_unit?: string

    /** Trạng thái phân bổ hoa hồng theo % */
    commission_allocation?: boolean

    /** Các phòng ban được phân bổ hoa hồng theo %  */
    departments_allocated_commissions?: ICommissionRate[]

    /** Tính % hoa hồng cho marketing */
    calculate_commission_for_marketing?: boolean

    /** Trạng thái thuộc tính tùy biến*/
    is_customization_propertie?: boolean

    /** index trước đó của danh mục đang chọn */
    pre_index_category?: string

    /** index của danh mục đang chọn */
    current_index_category?: string
  }
  /** thẻ */
  labels?: number[]

  /** Giá nhập */
  cost?: number

  /** Giá bán */
  price?: number

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

  /** Số lượng */
  quantity?: number

  /** Số lượng hàng tồn */
  inventory_quantity?: number

  /** Số lượng hàng có thể bán */
  stock_quantity?: number

  /** Số lượng đã bán */
  sold_quantity?: number

  /** Số lượng bị hỏng */
  damaged_quantity?: number

  /** VAT */
  vat?: number

  /** Phí dịch vụ */
  service_fee?: number

  /** Barcode */
  barcode?: string

  /** Max số lượng tồn kho */
  max_inventory_quantity?: number

  /** Min số lượng tồn kho */
  min_inventory_quantity?: number

  /** Vị trí thứ tự sắp xếp */
  position_index?: number

  /**
   * Ghi chú nội bộ
   * */
  internal_note?: string

  /**
   * Khối lượng sản phẩm
   * */
  weight?: number

  /**
   * Chiều dài
   * */
  length?: number

  /**
   * Chiều rộng
   * */
  width?: number

  /**
   * Chiều cao
   * */
  height?: number

  /**
   * Giá bán sỉ
   * */
  wholesale_price?: number

  /**
   * Cho phép bán hàng khi hết số lượng
   * */
  sold_when_quantity_runs_out?: boolean

  /** danh sánh nhóm thuộc tính */
  addon_groups?: number[]

  /** mẫu mã */
  product_variants?: Product[]

  /** id mẫu mã */
  variant_id?: string

  /** tên mẫu mã */
  variant_name?: string

  /** trạng thái */
  is_active?: boolean

  /** giá nhập cuối */
  final_cost?: number

  /**Màu sắc*/
  color?:string 
  
  /****/ 
  size?:string

  /** bật tắt mẫu mã */
  variant_options?: boolean

  /** id sản phẩm cha */
  parent_id?: string

  // * thuộc tính API không trả về
  departments_allocated_commissions_obj?: { [key: string]: ICommissionRate }
}

/** điều kiện sắp xếp */
export interface ISortProducts {
  /** sắp xếp thep thời gian tạo */
  createdAt?: 'asc' | 'desc'

  /** sắp xếp theo giá */
  price?: 'asc' | 'desc'

  /** sắp xếp theo số tồn kho */
  inventory_quantity?: 'asc' | 'desc'

  /** sắp xếp theo tên sản phẩm*/
  search_name?: 'asc' | 'desc'
}

/** điều kiện lọc */
export interface IFilterProducts {
  /** lọc theo loại sản phẩm */
  type?: string

  /** lọc theo loại tồn kho */
  inventory_type?: TInvetoryType

  /** lọc theo trạng thái của sản phẩm */
  status_list?: string[]
}
/** các loại tồn kho */
export type TInvetoryType =
  | 'in_stock'
  | 'out_stock'
  | 'over_max_inventory_quantity'
  | 'under_min_inventory_quantity'

/** dữ liệu thống kê tổng */
export interface IStatisticProduct {
  /** tổng sản phẩm */
  total_products?: number
  /** tổng sản phẩm đang kinh doanh */
  active_products?: number
  /** tổng sản có thể bán */
  stock_quantity?: number
  /** tổng giá bán */
  total_price?: number
  /** tổng giá bán đang kinh doanh */
  total_cost?: number
  /** tổng tồn */
  total_inventory_quantity?: number
}

/** kiểm dữ liệu của các tab */
export type TTabProduct =
  | 'PRODUCT'
  | 'CATEGORY'
  | 'SETTING'
  | 'COMMISSION_RATE'
  | 'SUPPLIER'
  | 'ASYNC_THIRD_PARTY'
  | 'TAG'
  | 'ADDON'


/** Dữ liệu danh mục */
export interface Category {

    /** Id bản ghi hệ thống */
    id?: string;

    /** Mã danh mục tạo random */
    category_id?: string;

    /** Tên danh mục */
    name?: string;

    /** Tên tìm kiếm */
    search_name?: string;

    /** Mô tả danh mục */
    description?: string;

    /** ID danh mục cha */
    parent_id?: string | null;

    /** Trạng thái có phải danh mục cha hay không */
    is_parent?: boolean;

    /** Trạng thái danh mục */
    status?: string;

    /** Icon */
    icon?: string | null;

    /** ảnh bìa */
    cover_photo?: string | null;
    
    /** đường dẫn */
    path?:string

    /** Dạng danh mục */
    type?: string;

    /** Sắp xếp */
    sort_index?: number;

    /** ID doanh nghiệp */
    business_id?: string;

    /** ID chi nhánh */
    branch_id?: string;

    /** ID Phòng ban */
    department_id?: string;

    /** ID đội nhóm (dữ liệu này lúc có lúc không) */
    team_id?: string;

    /** ID nhân viên */
    employee_id?: string;

    /** ID user */
    user_id?: string;

    /** Thời gian tạo record */
    createdAt?: Date;

    /** Thời gian cập nhật record */
    updatedAt?: Date;

    /** Tổng số sản phẩm */
    total_products?: number;
}


/** dữ liệu thẻ */
export interface Label {
  /** ID duy nhất của nhãn */
  id?: string;
  /** ID của nhãn */
  label_id?: number;
  /** Loại nhãn (ví dụ: CUSTOM) */
  label_type?: string;
  /** Mã trạng thái (có thể null) */
  status_code?: string | null;
  /** Nhóm nhãn (ví dụ: PRODUCT) */
  label_group?: string;
  /** Tiêu đề của nhãn */
  title?: string;
  /** Màu chữ của nhãn */
  text_color?: string;
  /** Màu nền của nhãn */
  bg_color?: string;
  /** ID của ứng dụng liên quan */
  app_id?: string;
  /** ID doanh nghiệp */
  business_id?: string;
  /** ID chi nhánh */
  branch_id?: string;
  /** ID phòng ban */
  department_id?: string;
  /** ID nhóm (có thể null) */
  team_id?: string | null;
  /** ID nhân viên */
  employee_id?: string;
  /** ID người dùng */
  user_id?: string;
  /** Trạng thái lưu trữ của nhãn */
  is_archived?: boolean;
  /** Ngày tạo nhãn */
  createdAt?: string;
  /** Ngày cập nhật nhãn */
  updatedAt?: string;
}