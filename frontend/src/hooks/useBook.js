import axios from "axios";

const moment = require("moment");

//CREATE--------------------------------------------------------------------------------------------------------------

export const InsertBook = async(name, grade, teacherAssigned) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/books/new-book",
      data: {
        title:title,
        category:category,
        portrait:portrait,
        createdby:createdby,
        updatedby:updatedby,
        state:state,
        sharedBook:sharedBook
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The Book was entered correctly');
    
    }

  } catch (error) {
      console.log(error)
      console.log('It is possible that the Book already exists, you must enter another');
  }
  };


//List all--------------------------------------------------------------------------------------------------------------


export const ListAllBooks = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/books/list/",
    });

  
    if (data.status === 200 ) {

      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('List query error');
  }

  

  };

  //List not publish--------------------------------------------------------------------------------------------------------------


export const ListPublishBook = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/books/list-published/",
    });

  
    if (data.status === 200 ) {

      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('List query error');
  }

  

  };

  //List not publish--------------------------------------------------------------------------------------------------------------


export const ListNotPublishBook = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/books/list-notPublished",
    });

  
    if (data.status === 200 ) {

      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('List query error');
  }

  

  };

  //List private--------------------------------------------------------------------------------------------------------------


export const ListPrivateBook = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/books/list-private/",
    });

  
    if (data.status === 200 ) {

      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('List query error');
  }

  

  };

  //search--------------------------------------------------------------------------------------------------------------


export const SearchBook = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/books/search/rodolfoelreno",
    });

  
    if (data.status === 200 ) {

      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('This book does not exist');
  }

  

  };
//UPDATE--------------------------------------------------------------------------------------------------------------


export const EditBook = async(classesId,name ,grade, teacherAssigned ) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/books/change/",
      data: {
        classesId : classesId,
        name : name,
        grade:grade,
        teacherAssigned:teacherAssigned

      },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The Class was successfully updated');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Error');
  }
  };

//change to private(DELETE)--------------------------------------------------------------------------------------------------------------

  export const BookToPrivate = async(classesId,name ,grade, teacherAssigned ) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/books/change/",
      data: {
        classesId : classesId,
        name : name,
        grade:grade,
        teacherAssigned:teacherAssigned

      },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The Class was successfully updated');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Error');
  }
  };


  //change to publish(UNDELETE)--------------------------------------------------------------------------------------------------------------

  export const BookToPublish = async(classesId,name ,grade, teacherAssigned ) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/books/change/",
      data: {
        classesId : classesId,
        name : name,
        grade:grade,
        teacherAssigned:teacherAssigned

      },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The Class was successfully updated');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Error');
  }
  };



