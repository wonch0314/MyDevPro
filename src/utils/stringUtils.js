/**
 * 파스칼 케이스 표기법
 * @param {string} input 파스칼 케이스로 표기하려는 문자
 * @returns 여러 단어로 이루어진 식별자(변수, 함수, 클래스 이름 등)에서 각 단어의 첫 글자를 대문자로 쓰고, 나머지 글자는 소문자로 표기
 */
export const pascalize = (input) => {
  let firstChar = input.charAt(0)
  let otherChar = input.slice(1)

  let result = firstChar.toUpperCase() + otherChar
  return result
}

/**
 * 카멜 케이스 표기법
 * @param {string} input 카멜 케이스로 표기하려는 문자
 * @returns 여러 단어로 이루어진 식별자(변수, 함수, 클래스 이름 등)에서 각 단어의 첫 글자는 소문자로 시작하고, 그 이후 단어의 첫 글자는 대문자로 표기
 */
export const camelize = (str) => {
  return str.replace(/-./g, (x) => x.charAt(1).toUpperCase())
}

/**
 * 문자열을 상수 케이스로 변환하는 함수
 * @example
 * toConstantCase('camelCaseString')
 * // returns 'CAMEL_CASE_STRING'
 * @param {string} str 상수 케이스로 변환하려는 문자
 * @returns 여러 단어로 이루어진 식별자(변수, 함수, 클래스 이름 등)에서 각 단어는 대문자로 표기하고, 단어끼리의 구분은 언더바(_)로 표기
 */
export const toConstantCase = (str) => {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase()
}

/**
 * 파일 확장자 추출
 * @param {string} fileName 확장자가 있는 파일명
 * @returns 파일명에서 확장자를 추출
 */
export const getExtensionOfFilename = (fileName) => {
  let fileLen = fileName.length
  let lastDot = fileName.lastIndexOf('.')
  let fileExt = fileName.substring(lastDot, fileLen).toLowerCase()

  return fileExt
}
