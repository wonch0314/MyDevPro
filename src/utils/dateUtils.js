import dayjs from 'dayjs'

/**
 * 날짜 포맷팅 함수
 * @param {string} propsDate 날짜(yyyy-MM-dd hh:mm:ss)
 * @returns 날짜(yyyy-MM-dd)
 */
export const dateToString = (propsDate) => {
  let date = propsDate.slice(0, 10)
  return date
}

/**
 * 날짜 포맷팅 함수
 * @param {string} propsDate 날짜(yyyy-MM-dd or yyyy-MM-ddThh:mm:ss.SSS)
 * @returns 날짜(yyyy-MM-dd hh:mm:ss)
 */
export const stringToDate = (propsDate) => {
  if (propsDate.length == 10) {
    let date = propsDate + ' 00:00:00'
    return date
  } else {
    return dayjs(propsDate).format('YYYY-MM-DD HH:mm:ss')
  }
}

/**
 * 현재 시점을 기준으로 입력한 기간만큼의 전, 후 날짜 가져오기
 * @example
 * getDateFormat(0, 1)
 * // returns 한 달 뒤 날짜
 * @example
 * getDateFormat(0, 0, -1)
 * // returns 하루 전 날짜
 * @param {number} addYear 더하거나 빼고 싶은 년도
 * @param {number} addMonth 더하거나 빼고 싶은 월
 * @param {number} addDay 더하거나 빼고 싶은 일
 * @returns 현재 시점을 기준으로 입력한 기간만큼을 더하거나 뺀 날짜
 */
export const getDateFormat = (addYear = 0, addMonth = 0, addDay = 0) => {
  const currentDate = new Date()
  const getDate = new Date(currentDate)

  if ((addYear !== 0) & (typeof addYear === 'number'))
    getDate.setFullYear(currentDate.getFullYear() + addYear)
  if ((addMonth !== 0) & (typeof addMonth === 'number'))
    getDate.setMonth(currentDate.getMonth() + addMonth)
  if ((addDay !== 0) & (typeof addDay === 'number')) getDate.setDate(currentDate.getDate() + addDay)

  const year = getDate.getFullYear()
  const month = (getDate.getMonth() + 1).toString().padStart(2, '0')
  const day = getDate.getDate().toString().padStart(2, '0')
  const hours = getDate.getHours().toString().padStart(2, '0')
  const minutes = getDate.getMinutes().toString().padStart(2, '0')
  const seconds = getDate.getSeconds().toString().padStart(2, '0')

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  return formattedDateTime
}
