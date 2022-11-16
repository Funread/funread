import axios from "axios";

export const getTemplate = () => {
 
  const getTheTemplate = async(templaterequest) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "pages/template/getTemplate/",
      data: {
        templaterequest: templaterequest, 
      },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('Template encontrado');
      console.log(data.data.template);
    }

  } catch (error) {
      console.log(error)
      console.log('Template no encontrado');
  }
  };

  return {
    getTheTemplate,
  };
};

