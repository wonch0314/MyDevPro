<script setup>
import { ref, reactive, watch } from 'vue'

// 상위 컴포넌트로부터 전달받은 데이터
const props = defineProps({
  data: Object,
  isDialogVisible: {
    type: Boolean,
    default: false
  },
  type: String
})

const ruleFormRef = ref()
const ruleForm = reactive({
  dataId: '',
  dataNm: '',
  dataNum: '',
  detail: '',
  detail1: '',
  detai2: '',
  useYn: '',
  date: ['', ''], // 날짜
  data1: '',
  data2: '',
  data3: '',
  data4: '',
  data6: '',
  data7: '',
  modal1: '',
  modal2: '',
  modal3: '',
  modal4: '',
  modal5: '',
  modal6: ''
})

/********** 데이터 세팅 **********/
watch(
  () => props.isDialogVisible,
  // 모달 활성화 감지
  async (newVal) => {
    if (newVal) {
      if (props.type === 'grid') {
        ruleForm.dataId = props.data.data2
        ruleForm.dataNm = props.data.data3
        ruleForm.detail = props.data.data4
        ruleForm.useYn = props.data.data5
        ruleForm.date[0] = props.data.data6
        ruleForm.date[1] = props.data.data7
      } else if (props.type === 'table') {
        ruleForm.data1 = props.data.data1
        ruleForm.data2 = props.data.data2
        ruleForm.data3 = props.data.data3
        ruleForm.data4 = props.data.data4
        ruleForm.data6 = props.data.data6
        ruleForm.data7 = props.data.data7
      } else if (props.type === 'modal') {
        ruleForm.modal1 = props.data.data1
        ruleForm.modal2 = props.data.data2
      }
    }
  }
)

/********** 유효값 체크 **********/
/** trigger 종류
  - change: 필드의 값이 변경될 때마다 유효성 검사 수행
  - blur: 해당 필드에서 포커스가 떠날 때 유효성 검사 수행
*/
const rules = reactive({
  dataId: [{ required: true, message: '데이터ID를 입력해주세요.', trigger: 'change' }],
  dataNm: [
    { required: true, message: '데이터명를 입력해주세요.', trigger: 'change' },
    { min: 5, message: '최소 5자 이상 입력해주세요.', trigger: 'blur' },
    { max: 10, message: '최대 10자 까지 입력 가능합니다.', trigger: 'blur' }
  ],
  dataNum1: [
    { required: true, message: '데이터를 입력해주세요.', trigger: 'change' },
    { type: 'number', message: '숫자로 입력해주세요' }
  ],
  useYn: [{ required: true, message: '사용여부를 입력해주세요.', trigger: 'change' }],
  date: [
    {
      required: true,
      message: '일자를 입력해주세요.',
      trigger: 'change',
      validator(rule, value) {
        return !value || !value[0] || value[0] === '' || !value[1] || value[1] === '' ? false : true
      }
    }
  ],
  data1: [{ required: true, message: '번호를 입력해주세요.', trigger: 'change' }],
  data2: [{ required: true, message: '유형을 입력해주세요.', trigger: 'change' }],
  data3: [{ required: true, message: '제목를 입력해주세요.', trigger: 'change' }],
  modal1: [{ required: true, message: '번호를 입력해주세요.', trigger: 'change' }],
  modal2: [{ required: true, message: '유형을 입력해주세요.', trigger: 'change' }],
  modal3: [{ required: true, message: '내용를 입력해주세요.', trigger: 'change' }],
  modal4: [{ required: true, message: '사용여부를 입력해주세요.', trigger: 'change' }],
  modal5: [
    { required: true, message: '출력순서를 입력해주세요.', trigger: 'change' },
    { type: 'number', message: '숫자로 입력해주세요' }
  ],
  modal6: [{ required: true, message: '유효일자 입력해주세요.', trigger: 'change' }]
})

const emit = defineEmits(['closeModal'])
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      emit('closeModal')
    } else {
      console.log('error submit!', fields)
    }
  })
}

/********** 숫자 INPUT 이벤트 **********/
const handleInput = () => {
  if (ruleForm.dataNum2 === '') return
  // 숫자 외 문자열 제거
  ruleForm.dataNum2 = ruleForm.dataNum2.replace(/[^\d]/g, '')
}
/********** 모달 CLOSE 이벤트 **********/
const onClose = () => {
  // Field 초기화
  ruleFormRef.value.resetFields()
}
</script>
<template>
  <ModalDialog title="그리드 모달" @close="onClose">
    <p class="txt-desc">데이터에 대한 정보를 입력하세요</p>
    <div v-if="props.type == 'grid'" class="form-area">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-position="left">
        <div class="form-items column-2">
          <el-form-item label="데이터ID" prop="dataId">
            <el-input v-model="ruleForm.dataId" placeholder="데이터ID 입력" />
          </el-form-item>
          <el-form-item label="데이터명" prop="dataNm">
            <el-input v-model="ruleForm.dataNm" placeholder="데이터명 입력" />
          </el-form-item>
          <el-form-item label="데이터(숫자)1" prop="dataNum1">
            <el-input
              v-model.number="ruleForm.dataNum1"
              class="w-full"
              placeholder="데이터 입력(숫자 유효성 체크)"
            />
          </el-form-item>
          <el-form-item label="데이터(숫자)2" prop="dataNum2">
            <el-input
              v-model="ruleForm.dataNum2"
              class="w-full"
              placeholder="데이터 입력(숫자만 필터링)"
              @input="handleInput"
            />
          </el-form-item>
          <el-form-item label="설명" prop="detail" class="w-full">
            <el-input v-model="ruleForm.detail" class="w-full" placeholder="설명 입력" />
          </el-form-item>
          <el-form-item label="상세설명" class="w-full">
            <el-input v-model="ruleForm.detail1" class="w-full" placeholder="상세설명1 입력" />
            <el-input v-model="ruleForm.detail2" class="w-full" placeholder="상세설명2 입력" />
          </el-form-item>
          <el-form-item label="사용여부" prop="useYn">
            <el-radio-group v-model="ruleForm.useYn">
              <el-radio label="Y">사용</el-radio>
              <el-radio label="N">미사용</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="유효시작/종료일자" prop="date">
            <form-datepicker v-model="ruleForm.date" type="daterange" />
          </el-form-item>
        </div>
        <div class="btn-area">
          <el-button size="large" @click="$emit('closeModal')">취소</el-button>
          <el-button size="large" type="primary" @click="submitForm(ruleFormRef)">등록</el-button>
        </div>
      </el-form>
    </div>
    <div v-if="props.type == 'table'" class="form-area">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-position="left">
        <div class="form-items column-2">
          <el-form-item label="순번" prop="data1">
            <el-input v-model="ruleForm.data1" placeholder="순번 입력" readonly />
          </el-form-item>
          <el-form-item label="유형" prop="data2">
            <el-input v-model="ruleForm.data2" placeholder="유형 입력" />
          </el-form-item>
          <el-form-item label="제목" prop="data3" class="w-full">
            <el-input v-model="ruleForm.data3" class="w-full" placeholder="제목 입력" />
          </el-form-item>
          <el-form-item label="게시여부" prop="data4" class="w-full">
            <el-radio-group v-model="ruleForm.data4">
              <el-radio label="Y">사용</el-radio>
              <el-radio label="N">미사용</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="등록자">
            <el-input v-model="ruleForm.data6" class="w-full" readonly />
          </el-form-item>
          <el-form-item label="등록일">
            <el-input v-model="ruleForm.data7" class="w-full" readonly />
          </el-form-item>
        </div>
        <div class="btn-area">
          <el-button size="large" @click="$emit('closeModal')">취소</el-button>
          <el-button size="large" type="primary" @click="submitForm(ruleFormRef)">등록</el-button>
        </div>
      </el-form>
    </div>
    <div v-if="props.type == 'modal'" class="form-area">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-position="left">
        <div class="form-items column-2">
          <el-form-item label="번호" prop="modal1">
            <el-input v-model="ruleForm.modal1" placeholder="번호 입력" />
          </el-form-item>
          <el-form-item label="유형" prop="modal2">
            <el-input v-model="ruleForm.modal2" placeholder="유형 입력" />
          </el-form-item>
          <el-form-item label="내용" prop="modal3" class="w-full">
            <el-input v-model="ruleForm.modal3" class="w-full" placeholder="제목 입력" />
          </el-form-item>
          <el-form-item label="사용여부" prop="modal4" class="w-full">
            <el-radio-group v-model="ruleForm.modal4">
              <el-radio label="Y">사용</el-radio>
              <el-radio label="N">미사용</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="출력순서" prop="modal5">
            <el-input v-model.number="ruleForm.modal5" class="w-full" />
          </el-form-item>
          <el-form-item label="유효시작/종료일자" prop="modal6">
            <form-datepicker v-model="ruleForm.modal6" type="daterange" />
          </el-form-item>
        </div>
        <div class="btn-area">
          <el-button size="large" @click="$emit('closeModal')">취소</el-button>
          <el-button size="large" type="primary" @click="submitForm(ruleFormRef)">등록</el-button>
        </div>
      </el-form>
    </div>
  </ModalDialog>
</template>

<style lang="scss" scoped></style>
