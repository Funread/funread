import axios from "axios";

const moment = require("moment");

//CREATE--------------------------------------------------------------------------------------------------------------

export const InsertBook = async(title,category,portrait,createdby,updatedby,state,sharedBook) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/books/new-book/",
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
      console.log('Book(s):');

      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('List query error');
  }

  

  };

  //List publish--------------------------------------------------------------------------------------------------------------


export const ListPublishBook = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/books/list-published/",
    });

  
    if (data.status === 200 ) {
      console.log('Publish Book(s):');
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
      console.log('Not Publish Book(s):');
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
      console.log('Private Book(s):');
      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('List query error');
  }

  

  };

  //search--------------------------------------------------------------------------------------------------------------


export const SearchBook = async(search) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/books/search/",
      data: {
        title: search
      }
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


export const EditBook = async(title, new_title, portrait, category, createdby, updatedby, state) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/books/change/",
      data: {
        title: title,
        new_title:new_title,
        portrait:portrait,
        category:category ,
        createdby:createdby,
        updatedby:updatedby,
        state:state
    
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The Book was successfully updated');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Error');
  }
  };

//change to private(DELETE)--------------------------------------------------------------------------------------------------------------

  export const BookToPrivate = async(title) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/books/modify-state-private/",
      data: {
        title: title

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


  //change to publish--------------------------------------------------------------------------------------------------------------

  export const BookToPublish = async(title) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/books/modify-state-publish/",
      data: {
        title:title

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



