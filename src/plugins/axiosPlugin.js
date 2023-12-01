import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import useLoginStore from '../stores/loginStore'
import { create } from 'zustand'

const { setAxiosRequest } = useLoginStore.getState()

// Axios Instance 생성
const axiosInstance = await (async () => {
  // Client 고유 ID 입력
  if (localStorage.getItem('devpro-client-id') === undefined) {
    localStorage.setItem('devpro-client-id', uuidv4().replaceAll('-', ''))
  }
  const RtEnv = await axios.get('/static/RtEnv.json')

  // baseURL (서버 주소 입력)
  const baseURL = (() => {
    for (const item of RtEnv.data) {
      if (item.Env === import.meta.env.MODE) {
        return item.ApiBaseUrl
      }
    }
  })()

  const config = {
    baseURL,
    timeout: 180000, // CJ 프레시웨이 코드에는 포함되어 있어서 넣었는데 어떻게 해야할지 모르겠음
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'devpro-client-id': localStorage.getItem('devpro-client-id')
    }
  }

  return axios.create(config)
})()

const exceptUrls = [
  '/api/om/user-mgt/reissue',
  '/api/om/user-mgt/logout',
  '/api/module/captcha/text',
  '/api/om/menu-mgt/menus' // baseHeader
]

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(config)
    // 자동 로그아웃을 위한 axios request 타이머
    if (exceptUrls.includes(config.url)) return config
    setAxiosRequest(config)
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.result === 'FAIL') {
      // status: 200 & result: FAIL

      return Promise.reject(response)
    } else {
      // status: 200 & result: not FAIL
      return response
    }
  },
  (error) => {
    // error 코드 추가 필요
    return Promise.reject(error)
  }
)

// store에 입력하여 사용
const useAxiosPlugin = create((set) => ({
  axiosInstance
}))

export default useAxiosPlugin
