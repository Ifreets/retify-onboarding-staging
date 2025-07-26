/**
 *  Hàm tạo domain cho app
 * @param name Tên cơ quan
 * @returns
 */
export function toRenderDomain(name: string): string {
  /**
   * update domain
   */
  const NORMALIZED = removeVietnameseTones(name)
    .toLowerCase()
    .trim()
    /** Loại ký tự đặc biệt ngoại trừ khoảng trắng và dấu gạch ngang */
    .replace(/[^a-z0-9\s-]/g, "")
    /** Đổi khoảng trắng thành dấu gạch ngang */
    .replace(/\s+/g, "-")
    /** Gộp các dấu - liên tiếp thành 1 */
    .replace(/-+/g, "-");

  return `${NORMALIZED}.retify.ai`;
}

/** Hàm loại bỏ dấu tiếng Việt
 * @param str Tên cơ quan
 */
const removeVietnameseTones = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};