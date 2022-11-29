import axios from "axios";

export const createBook = () => {
 
  const bookCreator = async(title, portrait) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "books/new-book/",
      data: {
        title: title, 
        portrait: portrait,
        createdby: 1,
        updatedby: 1,
        sharedbook: 0,
        state: 1,
      },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('Libro creado');
      console.log(data.data.title);
    }

  } catch (error) {
      console.log(error)
      console.log('Se ha ingresado un dato erroneo, vuelve a intentarlo');
  }
  };

  return {
    bookCreator,
  };
};
