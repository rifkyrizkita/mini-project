import{createSlice} from "@reduxjs/toolkit"

const initialValue = {
    value: {
        username:"",
        email:"",
        phone:"",
        imgProfile:null,
        password:"",
    }
}


const userSlice = createSlice({

    name: "user",
    initialState: initialValue,
    reducers:{
        setValue: ((state,action) =>{
            state.value.username = action.payload.username
            state.value.email = action.payload.email
            state.value.phone = action.payload.phone
            state.value.imgProfile = action.payload.imgProfile
            state.value.password = action.payload.password
        })
    }
    }
)

export const {setValue} = userSlice.actions
export default userSlice.reducer