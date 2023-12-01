/**
 * 수의 자릿점 표시 (천 단위로 숫자 구분)
 * @param {number} input 자릿점을 표시하고 싶은 숫자
 * @returns 입력한 숫자에 첫 단위로 구분 기호(,)를 추가
 */
export const toLocaleString = (input) => {
  let result = input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return result
}
