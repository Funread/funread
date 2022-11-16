import axios from "axios";

const moment = require("moment");


export const getAllTemplates = () => {
 
  const getAllTemplate = async() => {

    const data = await axios({
      method: "get",
      url: "pages/template/listallTemplate/",
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('Templates que hay');
      console.log(data.data);
    }
  };

  return {
    getAllTemplate,
  };
};
