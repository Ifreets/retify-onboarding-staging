/** Dữ liệu tỉnh thành */
export interface ProvinceData {
  id?:string,
  name?: string,
  slug?: string,
  type?: string,
  name_with_type?: string,
  code?: string
  is_hidden?: boolean
}

/** Dữ liệu quận huyện */
export interface DistrictData {
  id?:string,
  name?: string,
  type?: string,
  slug?: string,
  name_with_type?: string,
  path?: string,
  path_with_type?: string,
  code?: string,
  parent_code?: string
  is_hidden?: boolean
}

/** Dữ liệu xã phường */
export interface WardData {
  id?:string
  name?: string,
  type?: string,
  slug?: string,
  name_with_type?: string,
  path?: string,
  path_with_type?: string,
  code?: string,
  parent_code?: string
  is_hidden?: boolean
}

export interface StreetData {
  code?: string
  name?: string
}

/** Các dạng type detect */
export type DetectType = 'PROVINCE' | 'DISTRICT' | 'WARD' | 'STREET' | 'HOUSE_NUMBER'

/** Dữ liệu chi tiết */
export interface DetailData {
  id?: string
  code?: string
  type?: DetectType
  name?: string
}

/** Dữ liệu detect */
export interface DetectData {
  formattedAddress: string
  components: DetailData[]
}

/** Danh sách đia chỉ detect */
export interface Addresses {
  address_id: string;
  address_name: string
  engine?:string
  province?: ProvinceData
  district?: DistrictData
  ward?: WardData
  address?: string
}

/** Dữ liệu chi tiết của địa chỉ */
export interface LocationDetail {
  /** Số nhà */
  house_number?: DetailData
  /** Tên đường */
  street? : DetailData
  /** Xã phường */
  ward?: WardData
  /** Quận huyện */
  district?: DistrictData
  /** Tỉnh thành */
  province?: ProvinceData
}

/** địa chỉ gần đây */
export interface IRecentAddress {
  /** địa chỉ */
  address?: string
  /** id chi nhánh */
  branch_id?: string
  /** id doanh nghiệp */
  business_id?: string
  /** id liên hệ */
  contact_id?: string
  /** thời gian tạo */
  createdAt?: string
  /** id phòng ban */
  department_id?: string
  /** id nhân viên */
  employee_id?: string
  /** địa chỉ đầy đủ */
  full_address?: string
  /** id */
  id?: string
  /** địa chỉ */
  locations?: LocationDetail
  /** id đội nhóm */
  team_id?: string
  /** thời gian update */
  updatedAt?: string
  /** id user */
  user_id?: string
}