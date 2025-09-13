import { format, isToday, isYesterday } from 'date-fns'

/** định dạng ngày */
export function formatDate(date: Date): string {
  /** giá trị của ngày sau khi được format */
  let date_format = ''

  /** nếu là ngày hôm này */
  if (isToday(date)) {
    date_format = 'TODAY'
  }
  /** nếu là ngày hôm qua */
  if (isYesterday(date)) {
    date_format = 'YESTERDAY'
  }

  /** nếu không phải các trường hợp trên thì lấy theo định dạng đã thiết lập */
  if (!date_format) {
    return format(date, 'EEEE dd/MM/yyyy')
  }
  return `${date_format} ${format(date, 'dd/MM/yyyy')}`
}

/** hàm làm tròn giá trị */
export function roundMoney(amount?: number) {
  /** loại tiền tệ */
  const CURRENCY = localStorage.getItem('currency') || 'USD'
  // nếu là việt nam đồng thì làm tròn đến hàng đơn vị
  if (CURRENCY === 'VND') return Math.round(amount || 0)
  // nếu là loại tiền tệ khác
  return amount || 0
}

/**
 * Định dạng một giá trị số thành chuỗi tiền tệ theo loại tiền tệ đã chỉ định.
 *
 * @param amount - Giá trị số cần định dạng thành chuỗi tiền tệ.
 * @returns Chuỗi tiền tệ đã định dạng với các thiết lập vùng lãnh thổ thích hợp.
 *
 * Hàm này sử dụng `Intl.NumberFormat` để định dạng giá trị số theo vùng lãnh thổ
 * tương ứng với loại tiền tệ đã chỉ định. Nó hỗ trợ các loại tiền tệ
 * như Đồng Việt Nam (VND), Yên Nhật (JPY), Đô la Mỹ (USD), Euro (EUR),
 * Bảng Anh (GBP), Nhân dân tệ (CNY) và Won Hàn Quốc (KRW).
 * Nếu loại tiền tệ không được nhận dạng, nó sẽ mặc định là vùng lãnh thổ 'en-US'.
 * Số lượng chữ số phần thập phân tối thiểu được đặt là 0 cho VND, JPY và KRW, và 2 cho các loại khác.
 */
export function formatCurrency(amount?: number): string {
  // if (!amount) return ''

  /** loại tiền tệ */
  const CURRENCY = localStorage.getItem('currency') || 'CAD'

  // Map giữa currency và locale tương ứng
  const CURRENCY_LOCALE_MAP: Record<string, string> = {
    VND: 'vi-VN', // Việt Nam Đồng
    JPY: 'ja-JP', // Yên Nhật
    USD: 'en-US', // Đô la Mỹ
    EUR: 'de-DE', // Euro (Đức)
    GBP: 'en-GB', // Bảng Anh
    CNY: 'zh-CN', // Nhân dân tệ (Trung Quốc)
    KRW: 'ko-KR', // Won Hàn Quốc
    CAD: 'en-CA',
  }

  // Lấy locale phù hợp, nếu không có thì mặc định 'en-US'
  const locale = CURRENCY_LOCALE_MAP?.[CURRENCY] || 'en-US'

  const RESULT = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: ['VND', 'JPY', 'KRW'].includes(CURRENCY) ? 0 : 2,
  }).format(amount || 0)

  return RESULT
}

/**
 * format tiếng việt thành tiếng việt không dấu
 * đổi toàn bộ chữ hoa thành chữ thường
 *
 * vd: Xin chào các bạn  -> xin chao cac ban
 */
export const nonAccentVn = (input: string): string => {
  input = input.toLowerCase()

  input = input.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  input = input.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  input = input.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  input = input.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  input = input.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  input = input.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  input = input.replace(/đ/g, 'd')
  input = input.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '')
  input = input.replace(/\u02C6|\u0306|\u031B/g, '')

  return input
}
