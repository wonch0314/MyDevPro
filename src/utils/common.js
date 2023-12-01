import { CONSTANT } from '@/utils/constant'
import * as $utils from '@/utils/utils'
import * as $stringUtils from '@/utils/stringUtils'

/**
 * Token 저장
 * @param auth accessToken 값
 * @param refresh refreshToken 값
 * @returns
 */
export const setLoginToken = (access, refresh) => {
  localStorage.setItem(CONSTANT.AUTH_TOKEN_NAME, access)
  localStorage.setItem(CONSTANT.REFRESH_TOKEN_NAME, refresh)
}

/**
 * 유저 정보 저장
 * @param userId 유저 ID 값
 * @param userNm 유저 이름 값
 * @returns
 */
export const setLoginUser = (userId, userNm) => {
  localStorage.setItem(CONSTANT.LOGIN_YN_NAME, userId)
  localStorage.setItem('Temporary', userNm) // 임시, TODO. user 정보 저장 위치 변경
}

/**
 * 로그인 유효시간 저장
 * @param setTime 로그인 유효시간 값
 * @returns
 */
export const setLoginExprTime = (setTime) => {
  const expiresIn = +setTime * 1000
  const expirationDate = new Date().getTime() + expiresIn
  localStorage.setItem(CONSTANT.TOKEN_EXPIRATION_NAME, expirationDate)
}

/**
 * 로그인 정보 삭제
 */
export const removeLogin = () => {
  localStorage.removeItem(CONSTANT.LOGIN_YN_NAME)
  localStorage.removeItem(CONSTANT.AUTH_TOKEN_NAME)
  localStorage.removeItem(CONSTANT.REFRESH_TOKEN_NAME)
  localStorage.removeItem(CONSTANT.TOKEN_EXPIRATION_NAME)
  localStorage.removeItem('Temporary')
}

/**
 * 로그인 여부 확인
 * @param
 * @returns 로그인 상태일 시 true 리턴
 */
export const isLogin = () => {
  const loginId = localStorage.getItem(CONSTANT.LOGIN_YN_NAME)
  const accessToken = localStorage.getItem(CONSTANT.AUTH_TOKEN_NAME)
  const te = localStorage.getItem('te')

  if ($utils.isEmpty(loginId) | $utils.isEmpty(accessToken) | $utils.isEmpty(te)) {
    return false
  } else {
    return true
  }
}

/**
 * api List 파일에서 API URL 가져오기
 * @param {string} apiName src/axios 에 저장된 API명
 * @returns API URL
 */
export const getApiUrl = async (apiName) => {
  const filePath = apiName.split('.')[0]
  const fileNm = `${apiName.split('.')[1]}ApiUrl`
  const apiListFile = await import(`@/axios/${filePath}/${fileNm}.js`)

  if (apiListFile && $stringUtils.toConstantCase(fileNm)) {
    const apiList = $stringUtils.toConstantCase(fileNm)
    const apiListPath = apiName.trim().split('.').splice(1)

    return apiListPath.reduce((acc, cur) => {
      if (typeof acc === 'string') {
        return apiListFile[apiList][acc][cur]
      } else {
        return acc[cur]
      }
    })
  } else {
    return `API URL을 찾을 수 없음 (@/axios/om/${fileNm}.js)`
  }
}
