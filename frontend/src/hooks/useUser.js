import axios from "axios";

const moment = require("moment");

//CREATE --------------------------------------------------------------------------------------------------------------

export const InsertUser = async(email,name,lastname,password,createat,actived) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://localhost:8000/users/new-user/",
      data: {
        email: email,
        name: name,
        lastname:lastname,
        password:password,
        createat:createat,
        actived:actived
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The User was entered correctly');
    
    }

  } catch (error) {
      console.log(error)
      console.log('It is possible that the User already exists, you must enter another');
  }
  };
//LOGIN --------------------------------------------------------------------------------------------------------------

export const LoginUser = async(username,password) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://localhost:8000/users/login/",
      data: {
        username: username,
        password: password
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('successful login');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Error');
  }
  };


//List all--------------------------------------------------------------------------------------------------------------


export const ListAllUser = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://localhost:8000/users/list/",
    });

  
    if (data.status === 200 ) {


      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('List query error');
  }

  

  };

  //List active--------------------------------------------------------------------------------------------------------------


export const ListActiveUser = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://localhost:8000/users/list-active/",
    });

  
    if (data.status === 200 ) {


      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('List query error');
  }

  

  };

  //List deactive--------------------------------------------------------------------------------------------------------------


export const ListDeactiveUser = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://localhost:8000/users/list-deactive/?=",
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


export const SearchUser = async(search) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://localhost:8000/users/search/",
      data: {
        email:search
      }
    });

  
    if (data.status === 200 ) {

      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('This User does not exist');
  }

  

  };
//UPDATE--------------------------------------------------------------------------------------------------------------


export const EditUser = async(email, new_email, name, lastname, password) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://localhost:8000/users/change/",
      data: {
        email: email,
        new_email: new_email,
        name: name,
        lastname: lastname,
        password:password
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The User was successfully updated');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Error');
  }
  };


  //Activate--------------------------------------------------------------------------------------------------------------


export const ActivateUser = async(email,password) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://localhost:8000/users/activate_user/",
      data: {
        email:email,
        password:password
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The Tag was successfully updated');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Error');
  }
  };


  //Password--------------------------------------------------------------------------------------------------------------


export const UserPassword = async(email, password) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://localhost:8000/users/password/",
      data: {
        email:email,
        password:password
          
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The User was successfully updated');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Error');
  }
  };


    //DELETE--------------------------------------------------------------------------------------------------------------


export const DeleteUser = async(email) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://localhost:8000/users/delete_user/",
      data: {
        email:email
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The User was successfully updated');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Error');
  }
  };

  
