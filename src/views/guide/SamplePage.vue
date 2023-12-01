<script setup>
import 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-javascript'
import { ref, reactive, inject } from 'vue'
import SampleDialog from './SampleDialog.vue'
const $utils = inject('$utils')
const $numberUtils = inject('$numberUtils')

// Tab
const tab = reactive({
  activeName: 'first',
  tabName: ['Components', 'utils', 'etc']
})

/**
 * Components tab
 */
// select Box
const form = reactive({
  item1: '',
  item1Option: [
    { label: '전체' },
    { label: '코드ID', value: '1' },
    { label: '코드명', value: '2' }
  ],
  item2: ''
})
const onSubmit = () => {
  console.log('submit!')
}
const onReset = () => {
  console.log('reset!')
}

// ag grid table
const cellRender = reactive({
  useYnRender: { N: '미사용', Y: '사용' }
})
const grid = reactive({
  currentPage: 1,
  pageSize: 10,
  totalElements: 3,
  rowData: [
    {
      data1: '1',
      data2: 'CODE1',
      data3: '코드1',
      data4: '코드1 설명',
      data5: 'Y',
      data6: '2023-01-01',
      data7: '2023-12-31'
    },
    {
      data1: '2',
      data2: 'CODE2',
      data3: '코드2',
      data4: '코드2 설명',
      data5: 'Y',
      data6: '2023-01-01',
      data7: '2023-12-31'
    },
    {
      data1: '2',
      data2: 'CODE3',
      data3: '코드3',
      data4: '코드3 설명',
      data5: 'N',
      data6: '2023-01-01',
      data7: '2023-12-31'
    }
  ],
  gridOptions: {
    rowSelection: 'single',
    onRowClicked: (v) => {
      console.log(v.data)
    }
  },
  columnDefs: [
    {
      headerName: '선택',
      field: 'select',
      checkboxSelection: true,
      headerCheckboxSelection: false,
      suppressSizeToFit: true,
      minWidth: 90,
      maxWidth: 90
    },
    { headerName: '순서', field: 'data1', suppressSizeToFit: true, width: 70 },
    {
      headerName: '데이터ID',
      width: 100,
      field: 'data2',
      cellClass: 'txt-link',
      onCellClicked: (v) => {
        openDialog1(v.data)
      }
    },
    { headerName: '데이터명', field: 'data3', width: 100 },
    { headerName: '설명', width: 300, field: 'data4' },
    {
      headerName: '사용여부',
      field: 'data5',
      width: 100,
      cellRenderer: (param) => {
        return cellRender.useYnRender[param.value]
      }
    },
    { headerName: '유효 시작일', field: 'data6', width: 150 },
    { headerName: '유효 종료일', field: 'data7', width: 150 }
  ]
})
// change page size
const changePageSize = (val) => {
  grid.pageNumber = 0
  grid.pageSize = val
}
// change current page
const changeCurrentPage = (val) => {
  grid.pageNumber = val
}

// grid 상세
const isDialogVisible1 = ref(false)
const selGridData = ref({})
const openDialog1 = (v) => {
  selGridData.value = v
  isDialogVisible1.value = true
}

// el-table
const boardList = reactive({
  tableColumns: [
    { prop: 'data1', label: '순번', width: 80 },
    { prop: 'data2', label: '공지유형', width: 100 },
    { prop: 'data3', label: '제목', align: 'left', cellCustum: true },
    { prop: 'data4', label: '게시여부', width: 100 },
    { prop: 'data5', label: '게시기간', width: 250 },
    { prop: 'data6', label: '등록자', width: 100 },
    { prop: 'data7', label: '등록일시', width: 250 }
  ],
  tableData: [
    {
      data1: 1,
      data2: '시스템공지',
      data3: '[공지] DevPro 공지사항 입니다...',
      data4: 'Y',
      data5: '2023-01-01 ~ 2023-12-31',
      data6: '관리자',
      data7: '2023-01-01 00:00:00'
    },
    {
      data1: 2,
      data2: '컨텐츠공지',
      data3: '[공지] DevPro 공지사항 입니다...',
      data4: 'N',
      data5: '2023-01-01 ~ 2023-12-31',
      data6: '관리자',
      data7: '2023-01-01 00:00:00'
    }
  ]
})

// el-table 상세
const isDialogVisible2 = ref(false)
const selTableData = ref({})
const openDialog2 = (v) => {
  console.log(v)
  selTableData.value = v
  isDialogVisible2.value = true
}

// 모달
const isDialogVisible3 = ref(false)
const openDialog3 = () => {
  isDialogVisible3.value = true
}

// Datepicker
const form2 = reactive({
  date: ['', '']
})

/**
 * utils tab
 */
// message Box
const onMessageConfirm = () => {
  $utils
    .onMessageConfirm('onMessageConfirm 메세지.', '타이틀', '예', '아니요', 'success')
    .then(() => {
      console.log('확인 로직')
    })
    .catch(() => {
      console.log('취소 로직')
    })
}
const onMessage = () => {
  $utils.onMessage('onMessage 메세지.', 'error')
}

const onAlert = () => {
  $utils.onAlert('onAlert 메세지.', '확인함', '타이틀', 'warning').then(() => {
    console.log('확인 로직')
  })
}
</script>

<style scoped>
.custom-code {
  height: auto;
  width: auto;
}
</style>
<template>
  <main class="contents">
    <PageTitle title="Sample Guide Page" />

    <div class="col-12 col-6">
      <!-- 탭 -->
      <el-tabs v-model="tab.activeName" type="card" class="vspace">
        <el-tab-pane :label="tab.tabName[0]" name="first">
          <!-- 검색 -->
          <TitleBar title="SEARCH">
            <el-button v-if="!searchShow" @click="searchShow = true">▼</el-button>
            <el-button v-else type="primary" @click="searchShow = false">▲</el-button>
          </TitleBar>
          <div class="search-area">
            <el-form :model="form" :inline="true">
              <div class="search-items">
                <div class="row">
                  <el-form-item label="구분">
                    <form-select
                      v-model:select-data="form.item1"
                      :option-list="form.item1Option"
                      :placeholder="'구분 선택'"
                    />
                    <el-input v-model="form.item2" placeholder="검색어 입력" />
                  </el-form-item>
                </div>
              </div>
              <div class="search-cta">
                <el-button @click="onReset">초기화</el-button>
                <el-button type="primary" @click="onSubmit">검색</el-button>
              </div>
            </el-form>
          </div>
          <div class="custom-code">
            <pre v-show="searchShow">
              <code class="language-html" data-prismjs-copy="copy">
                {{ codeTemplate('SEARCH1') }}
              </code>
            </pre>
            <pre v-show="searchShow">
              <code class="language-js" data-prismjs-copy="copy">
                {{ codeTemplate('SEARCH2') }}
              </code>
            </pre>
          </div>
          <!-- 검색 -->

          <!-- DataGrid -->
          <TitleBar
            title="DATA GRID"
            :total="`(총 ${$numberUtils.toLocaleString(grid.totalElements)}건)`"
          >
            <el-button v-if="!dataGridShow" @click="dataGridShow = true">▼</el-button>
            <el-button v-else type="primary" @click="dataGridShow = false">▲</el-button>
          </TitleBar>
          <DataGrid
            :columnDefs="grid.columnDefs"
            :rowData="grid.rowData"
            :gridOptions="grid.gridOptions"
            :currentPage="grid.currentPage"
            :pageSize="grid.pageSize"
            :totalElements="grid.totalElements"
            height="xsmall"
            maxHeight="xsmall"
            @changePageSize="changePageSize"
            @changeCurrentPage="changeCurrentPage"
          />
          <SampleDialog
            v-model="isDialogVisible1"
            @closeModal="isDialogVisible1 = false"
            :data="selGridData"
            :isDialogVisible="isDialogVisible1"
            :type="'grid'"
          />
          <div class="custom-code">
            <pre v-show="dataGridShow">
              <code class="language-html" data-prismjs-copy="copy">
                {{ codeTemplate('DATAGRID1') }}
              </code>
            </pre>
            <pre v-show="dataGridShow">
              <code class="language-js" data-prismjs-copy="copy">
                {{ codeTemplate('DATAGRID2') }}
              </code>
            </pre>
          </div>
          <!-- DataGrid -->

          <!-- DataTable -->
          <TitleBar title="DATA TABLE">
            <el-button v-if="!dataTableShow" @click="dataTableShow = true">▼</el-button>
            <el-button v-else type="primary" @click="dataTableShow = false">▲</el-button>
          </TitleBar>
          <DataTable
            :tableColumns="boardList.tableColumns"
            :tableData="boardList.tableData"
            :hideOnSinglePage="true"
          >
            <template #data3="{ scope }">
              <a href="#" class="txt-link" @click.prevent="openDialog2(scope.row)">
                {{ scope.row.data3 }}</a
              >
            </template>
          </DataTable>
          <SampleDialog
            v-model="isDialogVisible2"
            @closeModal="isDialogVisible2 = false"
            :data="selTableData"
            :isDialogVisible="isDialogVisible2"
            :type="'table'"
          />
          <div class="custom-code">
            <pre v-show="dataTableShow">
              <code class="language-html" data-prismjs-copy="copy">
                {{ codeTemplate('DATATABLE1') }}
              </code>
            </pre>
            <pre v-show="dataTableShow">
              <code class="language-js" data-prismjs-copy="copy">
                {{ codeTemplate('DATATABLE2') }}
              </code>
            </pre>
          </div>
          <!-- DataTable-->

          <!-- 모달 -->
          <TitleBar title="MODAL">
            <el-button v-if="!modalShow" @click="modalShow = true">▼</el-button>
            <el-button v-else type="primary" @click="modalShow = false">▲</el-button>
          </TitleBar>
          <el-button type="primary" @click="openDialog3">Dialog</el-button>
          <SampleDialog
            v-model="isDialogVisible3"
            @closeModal="isDialogVisible3 = false"
            :data="{ data1: '1', data2: 'A' }"
            :isDialogVisible="isDialogVisible3"
            :type="'modal'"
          />
          <div class="custom-code">
            <pre v-show="modalShow">
              <code class="language-html" data-prismjs-copy="copy">
                {{ codeTemplate('MODAL1') }}
              </code>
            </pre>
            <pre v-show="modalShow">
              <code class="language-js" data-prismjs-copy="copy">
                {{ codeTemplate('MODAL2') }}
              </code>
            </pre>
          </div>
          <!-- 모달 -->

          <!-- Datepicker -->
          <TitleBar title="DATEPICKER">
            <el-button v-if="!dateShow" @click="dateShow = true">▼</el-button>
            <el-button v-else type="primary" @click="dateShow = false">▲</el-button>
          </TitleBar>
          <div class="form-area" style="width: 600px">
            <el-form label-position="left">
              <div class="form-items">
                <el-form-item label="시작/종료일자">
                  <form-datepicker v-model="form2.date" type="daterange" />
                </el-form-item>
              </div>
            </el-form>
          </div>
          <div class="custom-code">
            <pre v-show="dateShow">
            <code class="language-html" data-prismjs-copy="copy">
              {{ codeTemplate('DATE') }}
            </code>
          </pre>
          </div>
          <!-- Datepicker -->
        </el-tab-pane>
        <el-tab-pane :label="tab.tabName[1]" name="second">
          <!-- utils.js -->
          <TitleBar title="DATE FORMAT">
            <el-button v-if="!utilsDateShow" @click="utilsDateShow = true">▼</el-button>
            <el-button v-else type="primary" @click="utilsDateShow = false">▲</el-button>
          </TitleBar>
          <div class="custom-code">
            <pre v-show="utilsDateShow">
              <code class="language-js" data-prismjs-copy="copy">
                {{ codeTemplate('UTILS_DATE_FORMAT') }}
              </code>
            </pre>
          </div>
          <TitleBar title="NUMBER FORMAT">
            <el-button v-if="!utilsNumShow" @click="utilsNumShow = !utilsNumShow">▼</el-button>
            <el-button v-else type="primary" @click="utilsNumShow = false">▲</el-button>
          </TitleBar>
          <div class="custom-code">
            <pre v-show="utilsNumShow">
              <code class="language-js" data-prismjs-copy="copy">
                {{ codeTemplate('UTILS_NUM_FORMAT') }}
              </code>
            </pre>
          </div>
          <TitleBar title="STRING FORMAT">
            <el-button v-if="!utilsStrShow" @click="utilsStrShow = true">▼</el-button>
            <el-button v-else type="primary" @click="utilsStrShow = false">▲</el-button>
          </TitleBar>
          <div class="custom-code">
            <pre v-show="utilsStrShow">
              <code class="language-js" data-prismjs-copy="copy">
                {{ codeTemplate('UTILS_STR_FORMAT') }}
              </code>
            </pre>
          </div>
          <TitleBar title="FUNCTION">
            <el-button v-if="!utilsFuncShow" @click="utilsFuncShow = true">▼</el-button>
            <el-button v-else type="primary" @click="utilsFuncShow = false">▲</el-button>
          </TitleBar>
          <div class="custom-code">
            <pre v-show="utilsFuncShow">
              <code class="language-js" data-prismjs-copy="copy">
                {{ codeTemplate('UTILS_FUNCTION') }}
              </code>
            </pre>
          </div>
          <TitleBar title="MESSAGE">
            <el-button v-if="!utilsMsgShow" @click="utilsMsgShow = true">▼</el-button>
            <el-button v-else type="primary" @click="utilsMsgShow = false">▲</el-button>
          </TitleBar>
          <el-button plain @click="onMessageConfirm">onMessageConfirm</el-button>
          <el-button type="info" @click="onMessage">onMessage</el-button>
          <el-button type="warning" @click="onAlert">onAlert</el-button>
          <div class="custom-code">
            <pre v-show="utilsMsgShow">
              <code class="language-js" data-prismjs-copy="copy">
                {{ codeTemplate('UTILS_MESSAGE') }}
              </code>
            </pre>
          </div>
          <!-- utils.js -->
        </el-tab-pane>
        <el-tab-pane :label="tab.tabName[2]" name="third"> 기타.. </el-tab-pane>
      </el-tabs>
      <!-- 탭 -->
    </div>
  </main>
</template>
<script>
// 코드 하이라이트 내용
import 'prismjs'
import './prism.js'
import './prism.css'
const _codeTemplate = {
  SEARCH1: `<div class="search-area">
      <el-form :model="form" :inline="true">
        <div class="search-items">
          <div class="row">
            <el-form-item label="구분">
              <form-select
                v-model:select-data="form.item1"
                :option-list="form.item1Option"
                :placeholder="'구분 선택'"
              />
              <el-input v-model="form.item2" placeholder="검색어 입력" />
            </el-form-item>
          </div>
        </div>
        <div class="search-cta">
          <el-button @click="onReset">초기화</el-button>
          <el-button type="primary" @click="onSubmit">검색</el-button>
        </div>
      </el-form>
    </div>`,
  SEARCH2: `// select Box
const form = reactive({
  item1: '',
  item1Option: [
    { label: '전체' },
    { label: '코드ID', value: '1' },
    { label: '코드명', value: '2' }
  ],
  item2: ''
})
const onSubmit = () => {
  console.log('submit!')
}
const onReset = () => {
  console.log('reset!')
}`,
  DATAGRID1: `<DataGrid
  :columnDefs="grid.columnDefs"
  :rowData="grid.rowData"
  :gridOptions="grid.gridOptions"
  :currentPage="grid.currentPage"
  :pageSize="grid.pageSize"
  :totalElements="grid.totalElements"
  height="xsmall"
  maxHeight="xsmall"
  @changePageSize="changePageSize"
  @changeCurrentPage="changeCurrentPage"
/>
<SampleDialog
  v-model="isDialogVisible"
  @closeModal="isDialogVisible = false"
  :data="selGridData"
  :isDialogVisible="isDialogVisible"
/>`,
  DATAGRID2: `// ag grid table
const cellRender = reactive({
  useYnRender: { N: '미사용', Y: '사용' }
})
const grid = reactive({
  currentPage: 1,
  pageSize: 10,
  totalElements: 3,
  rowData: [
    {
      data1: '1',
      data2: 'CODE1',
      data3: '코드1',
      data4: '코드1 설명',
      data5: 'Y',
      data6: '2023-01-01',
      data7: '2023-12-31'
    },
    {
      data1: '2',
      data2: 'CODE2',
      data3: '코드2',
      data4: '코드2 설명',
      data5: 'Y',
      data6: '2023-01-01',
      data7: '2023-12-31'
    },
    {
      data1: '2',
      data2: 'CODE3',
      data3: '코드3',
      data4: '코드3 설명',
      data5: 'N',
      data6: '2023-01-01',
      data7: '2023-12-31'
    }
  ],
  gridOptions: {
    rowSelection: 'single',
    onRowClicked: (v) => {
      console.log(v.data)
    }
  },
  columnDefs: [
    {
      headerName: '선택',
      field: 'select',
      checkboxSelection: true,
      headerCheckboxSelection: false,
      suppressSizeToFit: true,
      minWidth: 90,
      maxWidth: 90
    },
    { headerName: '순서', field: 'data1', suppressSizeToFit: true, width: 70 },
    {
      headerName: '데이터ID',
      width: 100,
      field: 'data2',
      cellClass: 'txt-link',
      onCellClicked: (v) => {
        openDialog1(v.data)
      }
    },
    { headerName: '데이터명', field: 'data3', width: 100 },
    { headerName: '설명', width: 300, field: 'data4' },
    {
      headerName: '사용여부',
      field: 'data5',
      width: 100,
      cellRenderer: (param) => {
        return cellRender.useYnRender[param.value]
      }
    },
    { headerName: '유효 시작일', field: 'data6', width: 150 },
    { headerName: '유효 종료일', field: 'data7', width: 150 }
  ]
})
// change page size
const changePageSize = (val) => {
  grid.pageNumber = 0
  grid.pageSize = val
}
// change current page
const changeCurrentPage = (val) => {
  grid.pageNumber = val
}

// grid 상세
import SampleDialog from './SampleDialog.vue'
const isDialogVisible = ref(false)
const selGridData = ref({})
const openDialog = (v) => {
  selGridData.value = v
  isDialogVisible.value = true
}`,
  DATATABLE1: `<DataTable
    :tableColumns="boardList.tableColumns"
    :tableData="boardList.tableData"
    :hideOnSinglePage="true"
  >
    <template #data3="{ scope }">
      <a href="#" class="txt-link" @click.prevent="openDialog(scope.row)">
        {{ scope.row.data3 }}</a
      >
    </template>
  </DataTable>
  <SampleDialog
    v-model="isDialogVisible"
    @closeModal="isDialogVisible = false"
    :data="selTableData"
    :isDialogVisible="isDialogVisible"
  />`,
  DATATABLE2: `// import
import SampleDialog from './SampleDialog.vue'

// el-table
const boardList = reactive({
  tableColumns: [
    { prop: 'data1', label: '순번', width: 80 },
    { prop: 'data2', label: '공지유형', width: 100 },
    { prop: 'data3', label: '제목', align: 'left', cellCustum: true },
    { prop: 'data4', label: '게시여부', width: 100 },
    { prop: 'data5', label: '게시기간', width: 250 },
    { prop: 'data6', label: '등록자', width: 100 },
    { prop: 'data7', label: '등록일시', width: 250 }
  ],
  tableData: [
    {
      data1: 1,
      data2: '시스템공지',
      data3: '[공지] DevPro 공지사항 입니다...',
      data4: 'Y',
      data5: '2023-01-01 ~ 2023-12-31',
      data6: '관리자',
      data7: '2023-01-01 00:00:00'
    },
    {
      data1: 2,
      data2: '컨텐츠공지',
      data3: '[공지] DevPro 공지사항 입니다...',
      data4: 'N',
      data5: '2023-01-01 ~ 2023-12-31',
      data6: '관리자',
      data7: '2023-01-01 00:00:00'
    }
  ]
})

// el-table 상세
const isDialogVisible = ref(false)
const selTableData = ref({})
const openDialog = (v) => {
  selTableData.value = v
  isDialogVisible.value = true
}`,
  MODAL1: `<!-- 상위 컴포넌트 코드 일부 -->
<el-button type="primary" @click="openDialog">Dialog</el-button>
<SampleDialog 
  v-model="isDialogVisible" 
  @closeModal="isDialogVisible = false"  
  :data="{ data1: '1', data2: 'A' }"
  :isDialogVisible="isDialogVisible"
/>`,
  MODAL2: ` /** 상위 컴포넌트 코드 일부 */
  import SampleDialog from './SampleDialog.vue'
  const isDialogVisible = ref(false)
  const openDialog = () => {
  isDialogVisible.value = true
}

/** 하위 컴포넌트 코드 일부 */
// 상위 컴포넌트로부터 전달받은 데이터
const props = defineProps({
  data: Object,
  isDialogVisible: {
    type: Boolean,
    default: false
  }
})

// 입력 validation
const ruleFormRef = ref()
// 입력 폼
const ruleForm = reactive({
  modal1: '',
  modal2: '',
  modal3: '',
  modal4: '',
  modal5: '',
  modal6: ''
})

// 모달 활성화 감지
watch(
  () => props.isDialogVisible,
  async (newVal) => {
    if (newVal) {
      ruleForm.modal1 = props.data.data1
      ruleForm.modal2 = props.data.data2
    }
  }
)

// 상위 컴포넌트 closeModal 호출
const emit = defineEmits(['closeModal'])
// 유효성 체크
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

// 유효성
/**
 * trigger 종류
 * - change: 필드의 값이 변경될 때마다 유효성 검사 수행
 * - blur: 해당 필드에서 포커스가 떠날 때 유효성 검사 수행
 */
const rules = reactive({
  modal1: [{ required: true, message: '번호를 입력해주세요.', trigger: 'change' }],
  modal2: [{ required: true, message: '유형을 입력해주세요.', trigger: 'change' }],
  modal3: [{ required: true, message: '내용를 입력해주세요.', trigger: 'change' }],
  modal4: [{ required: true, message: '사용여부를 입력해주세요.', trigger: 'change' }],
  modal5: [
    { required: true, message: '출력순서를 입력해주세요.', trigger: 'change' },
    { type: 'number', message: '숫자로 입력해주세요' }
  ],
  modal6: [{ required: true, message: '유효일자 입력해주세요.', trigger: 'change' }]
})`,
  DATE: `const form = reactive({
  date: ['', '']
})
...
<el-form-item label="시작/종료일자" prop="date">
  <form-datepicker v-model="form.date" type="daterange" />
</el-form-item>`,
  UTILS_DATE_FORMAT: `// utils/dateUtils.js
// yyyy-MM-dd hh:mm:ss   →   yyyy-MM-dd
$dateUtils.dateToString(date)

// yyyy-MM-dd               →   yyyy-MM-dd hh:mm:ss
// yyyy-MM-ddThh:mm:ss.SSS  →   yyyy-MM-dd hh:mm:ss
$dateUtils.stringToDate(date)

// 현재 기준 원하는 기간 전, 후 날짜 가져오기
$dateUtils.getDateFormat(1) //      일년 뒤 날짜, 2023년 11월 21일 기준 → 2024-11-21
$dateUtils.getDateFormat(0,1) //    한달 뒤 날짜, 2023년 11월 21일 기준 → 2023-12-21
$dateUtils.getDateFormat(0,0,-1) // 하루 전 날짜, 2023년 11월 21일 기준 → 2023-11-20
`,
  UTILS_NUM_FORMAT: `// utils/numberUtils.js
// 수의 자릿점 표시, 1000 → 1,000
$numberUtils.toLocaleString(Integer)
`,
  UTILS_STR_FORMAT: `// utils/stringUtils.js
// 파스칼 케이스 표기법 ::: 여러 단어로 이루어진 식별자(변수, 함수, 클래스 이름 등)에서 각 단어의 첫 글자를 대문자로 쓰고, 나머지 글자는 소문자로 표기
$stringUtils.pascalize(string)

// 카멜 케이스 표기법 ::: 여러 단어로 이루어진 식별자(변수, 함수, 클래스 이름 등)에서 각 단어의 첫 글자는 소문자로 시작하고, 그 이후 단어의 첫 글자는 대문자로 표기
$stringUtils.camelize(string)

// 문자열을 상수 케이스로 변환, 'camelCaseString'  →  'CAMEL_CASE_STRING'
$stringUtils.toConstantCase(string)

// 파일 확장자 추출
$stringUtils.getExtensionOfFilename(fileName)
`,
  UTILS_FUNCTION: `// utils/utils.js
// 데이터 값 확인, 값이 없을 시 true, 있을 시 false 리턴
  $utils.isEmpty(data)

  /**
 * 공통코드 - SelectBox
 * @param {string} cdGpID 공통코드 코드그룹ID
 * @param {boolean} isSearch '전체' 항목 필요 여부
 * @param {string} option 'ID-NM' : 라벨(코드명) 값(코드ID), 'ID-NM' : 라벨(코드ID) 값(코드ID)
 * @returns 컴포넌트에서 사용하는 SelectBox에 필요한 데이터
 */
await $utils.selBoxCodeList('USE_YN')
await $utils.selBoxCodeList('USE_YN', true)
await $utils.selBoxCodeList('BATCH_GROUP_NAME', true, 'ID-ID')
await $utils.selBoxCodeList('BATCH_GROUP_NAME', false, 'ID-ID')

/**
 * 공통코드 - cellRenderer
 * @param {string} cdGpId 공통코드 코드그룹ID
 * @returns Ag-Grid에서 사용하는 cellRenderer에 사용하는 데이터
 */
await $utils.cellCodeList('USE_YN')
`,
  UTILS_MESSAGE: `// utils/utils.js
// 파라미터 종류 : message(메세지 내용), title(메세지 타이틀), confirm(확인버튼명), cancel(취소버튼명), type(메세지 타입)
// type 종류 : 지정 x, success, warning, info, error

$utils.onMessageConfirm('onMessageConfirm 메세지') // 기본
$utils.onMessageConfirm('onMessageConfirm 메세지', '타이틀', '예', '아니요', 'success').then(() => { // 추가 설정
  console.log('확인 로직')
})
.catch(() => {
  console.log('취소 로직')
})

$utils.onMessage('onMessage 메세지', 'error')

$utils.onAlert('onAlert 메세지', '확인함', '타이틀', 'warning').then(() => {
  console.log('확인 로직')
}`
}
const codeTemplate = (codeName) => {
  return _codeTemplate[codeName]
}
const searchShow = ref(false)
const dataGridShow = ref(false)
const dataTableShow = ref(false)
const modalShow = ref(false)
const dateShow = ref(false)
const utilsDateShow = ref(true)
const utilsNumShow = ref(true)
const utilsStrShow = ref(true)
const utilsFuncShow = ref(true)
const utilsMsgShow = ref(true)
</script>
