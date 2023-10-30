import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: 0,
    email: "",
    name: "",
    lastName: "",
    userName: "",
    roles: null,
    jwt:""
};

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser: (state, action) => {
            const {jwt, data, roles} = action.payload;
            state.userId = data.userid;
            state.email = data.email;
            state.name = data.name;
            state.lastName = data.lastname;
            state.userName = data.username;
            state.roles = roles;
            state.jwt = jwt;
        }
        ,
        deleteUser: (state, action) => {
            state.userId = 0;
            state.email = "";
            state.name = "";
            state.lastName = "";
            state.userName = "";
            state.roles = null;
            state.jwt = "";
        }
    }
})

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;