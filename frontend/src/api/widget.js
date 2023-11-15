import { axiosAuth } from './axiosInstances'

export async function newWidgetItem(page, widget, type, value) {
  return axiosAuth().post('widget/widget/insertWidgetItem/', {
    page: page,
    widget: widget,
    type: type,
    value: value,
  })
}

export async function listedWidgetItems() {
  return axiosAuth().get('widget/widget/listallWidgetItems/')
}
