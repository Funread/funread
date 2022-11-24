import axios from "axios";


const moment = require("moment");


export const useInstitute = () => {
 
  const Institute = async() => {

    try {
      

    const data = await axios({
      method: "post",
      url: "Institute/Institute/CreateInstitute",
      data: {
        name:name
      },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('Institute created');
      console.log(data.data.name);
  
    }

  } catch (error) {
      console.log(error)
      console.log('error creating institute');
  }
  };

 
};
