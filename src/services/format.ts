import { format, isToday, isYesterday } from "date-fns"

/** định dạng ngày */
export function formatDate(date: Date): string{
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
