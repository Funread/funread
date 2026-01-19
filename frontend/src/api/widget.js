import { axiosAuth } from './axiosInstances'

export async function newWidgetItem(page, widget, type, value, elementorder) {

  return axiosAuth().post('widget/insertWidgetItem/', {
    pageid: page,
    widgetid: widget,
    type: type,
    value: value,
    elementorder: elementorder,
  })
}

export async function updateWidgetItem(widgetitemid, pageid, widgetid, type, value, elementorder) {
  return axiosAuth().put('widget/updateWidgetitem/', {
    widgetitemid,
    pageid,
    widgetid,
    type,
    value,
    elementorder,
  });
}

export async function listedWidgets() {
  return axiosAuth().get('widget/listallWidgets/')
}

export async function listedWidgetItems() {
  return axiosAuth().get('widget/listallWidgetItems/')
}
