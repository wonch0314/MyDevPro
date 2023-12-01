import { ElMessage, ElMessageBox } from 'element-plus'
/**
 * Element-Plus MessageBox(Confirm)
 * @see https://element-plus.org/en-US/component/message-box.html#confirm
 * @param {string} message 표기하려는 메세지 내용
 * @param {string} title 메세지 박스의 제목
 * @param {string} confirm 메세지 박스의 버튼명 (확인)
 * @param {string} cancel 메세지 박스의 버튼명 (취소)
 * @param {string} type 메세지 박스의 타입
 * @returns Element-Plus MessageBox(Confirm)
 */
export const onMessageConfirm = (
  message,
  title = '',
  confirm = '확인',
  cancel = '취소',
  type = ''
) => {
  const options = {
    title: title,
    confirmButtonText: confirm,
    cancelButtonText: cancel,
    /** @type {'success' | 'warning' | 'info' | 'error'} */
    type: type
  }
  return ElMessageBox.confirm(message, options)
}

/**
 * Element-Plus MessageBox(Alert)
 * @see https://element-plus.org/en-US/component/message-box.html#alert
 * @param {string} message 표기하려는 메세지 내용
 * @param {string} confirm 메세지 박스의 버튼명 (확인)
 * @param {string} title 메세지 박스의 제목
 * @param {string} type 메세지 박스의 타입
 * @returns Element-Plus MessageBox(Alert)
 */
export const onAlert = (message, confirm = '확인', title = '', type = '') => {
  const options = {
    confirmButtonText: confirm,
    /** @type {'success' | 'warning' | 'info' | 'error'} */
    type: type
  }
  return ElMessageBox.alert(message, title, options)
}

/**
 * Element-Plus Message
 * @see https://element-plus.org/en-US/component/message.html
 * @param {string} message 표기하려는 메세지 내용
 * @param {string} type 메세지의 타입
 * @returns Element-Plus Message
 */
export const onMessage = (message, type = '') => {
  return ElMessage({ type, message })
}

import { useComStore } from '@/stores/comStore'
/**
 * 공통코드 - SelectBox
 * @param {string} cdGpID 공통코드 코드그룹ID
 * @param {boolean} isSearch '전체' 항목 필요 여부
 * @param {string} option 'ID-NM' : 값(코드ID) 라벨(코드명), 'ID-ID' : 값(코드ID) 라벨(코드ID)
 * @returns 컴포넌트에서 사용하는 SelectBox에 필요한 데이터
 */
export const selBoxCodeList = async (cdGpID, isSearch = false, option = 'ID-NM') => {
  try {
    const comStore = useComStore()
    const res = await comStore.selectCdGroup(cdGpID)
    const codeList = res.data.data.codes.map((v) => {
      return { label: option === 'ID-ID' ? v.cdId : v.cdNm, value: v.cdId }
    })
    if (isSearch) codeList.unshift({ label: '전체' })
    return codeList
  } catch (err) {
    return []
  }
}

/**
 * 공통코드 - cellRenderer
 * @param {string} cdGpId 공통코드 코드그룹ID
 * @returns Ag-Grid에서 사용하는 cellRenderer에 사용하는 데이터
 */
export const cellCodeList = async (cdGpId) => {
  try {
    const comStore = useComStore()
    const res = await comStore.selectCdGroup(cdGpId)
    const codeList = {}
    res.data.data.codes.map((v) => {
      codeList[v.cdId.toString()] = v.cdNm
    })
    return codeList
  } catch (err) {
    return {}
  }
}

/**
 * 데이터 값 확인
 * @param value
 * @returns 값이 없을 시 true, 있을 시 false 리턴
 */
export const isEmpty = (value) => {
  const obj = String(value)

  if (
    obj == null ||
    obj == undefined ||
    obj == 'null' ||
    obj == 'undefined' ||
    obj == '' ||
    obj == 'NaN'
  ) {
    return true
  } else {
    return false
  }
}
