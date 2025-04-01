import { axiosAuth } from './axiosInstances'

export const list_options_by_idwidgetitem = async (widgetitemid) => {
  console.log('Llamando a API con widgetitemid:', widgetitemid);
  const response = await fetch(`/Options/list_options_by_idwidgetitem/${widgetitemid}`);
  return response.json();
};




