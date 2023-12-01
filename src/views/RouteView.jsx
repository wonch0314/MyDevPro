import React, { useRef } from 'react'

export default function RouteView() {
  // const router = useRouter()
  // const menuStore = useMenuStore()
  // const $common = inject('$common')
  // const $utils = inject('$utils')
  // const $stringUtils = inject('$stringUtils')
  // const $axios = inject('$axios')

  // 메뉴 접근 권한 보유 여부
  //   const routerAut = useRef()
  // const getRouterAut = async () => {
  //   try {
  //     let request = { urlAdr: router.currentRoute.value.fullPath }
  //     const res = await $axios.get(await $common.getApiUrl('bs.com.menu.getMenuId'), {
  //       params: request
  //     })

  //     // 메뉴에 대한 접근 권한이 있는 경우 / guide 페이지 이동일 경우
  //     if (
  //       (res.data.data && res.data.data.menuId && res.data.data.menuId !== '') ||
  //       menuStore.toMenuListGetter.meta.authCheck !== true
  //     ) {
  //       routerAut.value = true
  //     } else {
  //       routerAut.value = false
  //       $utils.onAlert('해당 메뉴에 대한 접근 권한이 없습니다.')
  //       router.push('/')
  //     }
  //   } catch (err) {
  //     console.log('RouterView err:::', err.response.data.message)
  //   }
  // }

  // const onClickGetComponent = () => {
  //   let routerParam = router.currentRoute.value.params

  //   // 이동하려는 메뉴에 대한 접근 권한 보유 여부 조회
  //   getRouterAut()

  //   if (routerAut.value === true) {
  //     // SamplePage 이동
  //     if (routerParam.sample !== undefined && routerParam.sample !== '') {
  //       if (Object.keys(routerParam).length == 2) {
  //         return markRaw(
  //           defineAsyncComponent(() =>
  //             import(`@/views/${routerParam.sample}/${$stringUtils.pascalize(routerParam.dept1)}.vue`)
  //           )
  //         )
  //       } else if (Object.keys(routerParam).length == 3) {
  //         return markRaw(
  //           defineAsyncComponent(() =>
  //             import(
  //               `@/views/${routerParam.sample}/${routerParam.dept1}/${$stringUtils.pascalize(
  //                 routerParam.dept2
  //               )}.vue`
  //             )
  //           )
  //         )
  //       } else if (Object.keys(routerParam).length == 4) {
  //         return markRaw(
  //           defineAsyncComponent(() =>
  //             import(
  //               `@/views/${routerParam.sample}/${routerParam.dept1}/${
  //                 routerParam.dept2
  //               }/${$stringUtils.pascalize(routerParam.dept3)}.vue`
  //             )
  //           )
  //         )
  //       } else if (Object.keys(routerParam).length == 5) {
  //         return markRaw(
  //           defineAsyncComponent(() =>
  //             import(
  //               `@/views/${routerParam.sample}/${routerParam.dept1}/${routerParam.dept2}/${
  //                 routerParam.dept3
  //               }/${$stringUtils.pascalize(routerParam.dept4)}.vue`
  //             )
  //           )
  //         )
  //       }
  //     } else {
  //       // om 이동
  //       if (Object.keys(routerParam).length == 2) {
  //         return markRaw(
  //           defineAsyncComponent(() =>
  //             import(`@/views/${routerParam.dept1}/${$stringUtils.pascalize(routerParam.dept2)}.vue`)
  //           )
  //         )
  //       } else if (Object.keys(routerParam).length == 3) {
  //         return markRaw(
  //           defineAsyncComponent(() =>
  //             import(
  //               `@/views/${routerParam.dept1}/${routerParam.dept2}/${$stringUtils.pascalize(
  //                 routerParam.dept3
  //               )}.vue`
  //             )
  //           )
  //         )
  //       } else if (Object.keys(routerParam).length == 4) {
  //         return markRaw(
  //           defineAsyncComponent(() =>
  //             import(
  //               `@/views/${routerParam.dept1}/${routerParam.dept2}/${
  //                 routerParam.dept3
  //               }/${$stringUtils.pascalize(routerParam.dept4)}.vue`
  //             )
  //           )
  //         )
  //       }
  //     }
  //   }
  // }

  return <div>RouteView</div>
}
