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
        },
        deleteUser: (state, action) => {
            state.userId = 0;
            state.email = "";
            state.name = "";
            state.lastName = "";
            state.userName = "";
            state.roles = null;
            state.jwt = "";
        },
        updateUserSlice: (state, action) => {
            const {name, lastname, username, roles} = action.payload;
            state.name = name;
            state.lastName = lastname;
            state.userName = username;
            state.roles = roles;
        }
    }
})

export const { addUser, deleteUser,updateUserSlice } = userSlice.actions;
export default userSlice.reducer;