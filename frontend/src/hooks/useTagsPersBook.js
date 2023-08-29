import axios from "axios";

const moment = require("moment");

//CREATE--------------------------------------------------------------------------------------------------------------

export const InsertTagsPersBook = async(tagsid, bookid) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/tagsperbook/TagsPersBook/CreateTagsPerBook",
      data: {
        tagsid:tagsid,
        bookid:bookid
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The TagsPersBook was entered correctly');
    
    }

  } catch (error) {
      console.log(error)
      console.log('It is possible that the TagsPersBook already exists, you must enter another');
  }
  };


//LIST--------------------------------------------------------------------------------------------------------------


export const ListTagsPersBook = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/tagsperbook/TagsPersBook/ListedTagsPersBook",
    });

  
    if (data.status === 200 ) {
   
      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('List query error');
  }

  

  };

//UPDATE--------------------------------------------------------------------------------------------------------------


export const EditTagsPersBook = async(tagsperbookid, tagschange, bookchange) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/tagsperbook/TagsPersBook/ChangeTagsPersBook",
      data: {
        tagsperbookid:tagsperbookid,
        tagschange:tagschange,
        bookchange:bookchange
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The TagsPersBook was successfully updated');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Error');
  }
  };

  //DELETE--------------------------------------------------------------------------------------------------------------

export const DeleteTagsPersBook = async(tagsperbookid) => {

  try {
    

  const data = await axios({
    method: "delete",
    url:"http://127.0.0.1:8000/tagsperbook/TagsPersBook/DeleteTagsPersBook",
    data: {
        tagsperbookid: tagsperbookid
    },
  });


  if (data.status === 200 ) {
    console.log("successfully removed")
  }

} catch (error) {
    console.log(error)
    console.log('This TagsPerBook does not exist');
}



};

