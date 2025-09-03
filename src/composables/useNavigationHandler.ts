import { $contact } from '@/api'
import { useToast } from '@/composables/useToast'
import { useOnBoardingStore } from '@/stores'

import type { Order } from '@/interfaces'

export function useNavigationHandler() {
  // store
  const onBoardingStore = useOnBoardingStore()

  // composables
  const { notify } = useToast()

  /** chuyển sang màn thông tin khách hàng */
  function toCustomer(customer_id?: string) {
    // nếu không có id khách hàng
    if (!customer_id) {
      notify('ID customer not found!')
      return
    }
    console.log({
      type: 'page.order',
      payload: {
        action: 'navigate',
        target: 'customer',
        customer_id,
      },
    })

    // chuyển sang màn thông tin khách hàng
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'page.order',
        payload: {
          action: 'navigate',
          target: 'customer',
          customer_id,
        },
      }),
    )
  }

  /** chuyển sang trang chat */
  async function toChat(current_page:string,data?: Order['contact_info']) {
    /** dữ liệu chứa id trang và id khách hàng */
    const RES = await getClientIdAndPageId(data)
    /** id trang và id khách hàng */
    const { page_id, client_id } = RES
    // nếu không id trang hoặc id khách hàng
    if (!page_id || !client_id) {
      notify('ID page or client not found!')
      return
    }
    console.log({
      type: current_page,
      payload: {
        action: 'navigate',
        target: 'conversation',
        page_id,
        client_id,
      },
    })

    // chuyển sang trang chat
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: current_page,
        payload: {
          action: 'navigate',
          target: 'conversation',
          page_id,
          client_id,
        },
      }),
    )
  }

  /** lấy id trang và id khách hàng */
  async function getClientIdAndPageId(data?: Order['contact_info']) {
    try {
      /** nguồn của liên hệ */
      const CONTACT_SOURCE = data?.contact_sources
      /** id của ttrang đang chọn */
      const PAGE_ID = onBoardingStore.selected_data.page_id
      // lấy ra liên hệ của trang đang chọn
      const PAGE_CONTACT = CONTACT_SOURCE?.find(
        contact => contact.page_id?.slice(-7) === PAGE_ID?.slice(-7),
      )
      // nếu không có id liên hệ hoặc id nguồn trang thì thôi
      if (!data?.identifier_id || !PAGE_CONTACT?.id || !PAGE_CONTACT) {
        notify('id contact or page_contact not found!')
        return {}
      }

      /** dữ liệu nguồn trang */
      const RES = await $contact.showHiddenData({
        identifier_id: data?.identifier_id,
        action: 'GET_SOURCE',
        object_id: PAGE_CONTACT?.id?.toString(),
      })

      return {
        page_id: RES?.page_id,
        client_id: RES?.client_id,
      }
    } catch (e) {
      notify(e as string)
      return {}
    }
  }

  /** mở điện thoại */
  async function openCallPhone(current_page:string,data?: Order['contact_info']) {
    /** số điện thoại cuối cùng của liên hệ */
    const RES = await getPhone(data)
    // nếu không có số điện thoại thì thôi
    if (!RES) {
      notify('Phone number not found!')
      return
    }
    console.log({
      type: current_page,
      payload: {
        action: 'navigate',
        target: 'phone',
        phone: RES,
      },
    })

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: current_page,
        payload: {
          action: 'navigate',
          target: 'phone',
          phone: RES,
        },
      }),
    )
  }

  /** lấy số điện thoại khách hàng */
  async function getPhone(data?: Order['contact_info']) {
    try {
      /** số điện thoại cuối cùng */
      const LAST_PHONE = data?.contact_phones?.reverse()?.[0]

      // nếu không có id liên hệ hoặc id số điện thoại thì thôi
      if (!data?.identifier_id || !LAST_PHONE?.id || !LAST_PHONE) {
        notify('id contact or phone not found!')
        return
      }

      /** dữ liệu sau khi bỏ che */
      const RES = await $contact.showHiddenData({
        identifier_id: data?.identifier_id,
        action: 'GET_PHONE',
        object_id: LAST_PHONE?.id?.toString(),
      })

      return RES?.phone_number
    } catch (e) {
      notify(e as string)
      return
    }
  }

  return {
    toCustomer,
    toChat,
    openCallPhone,
  }
}
