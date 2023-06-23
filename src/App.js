import { Home } from "./pages/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "./pages/signup";
import {Login} from "./pages/login";
import { Verify } from "./pages/verify";
import { LoginEmail } from "./pages/loginEmail";
import { LoginPhone } from "./pages/loginPhone";
import { Navbar2 } from "./components/navbar2";
import  Axios  from "axios";
import { useEffect } from "react";
import ForgotPasswordForm from "./pages/forgotpassword";
import ResetPasswordForm from "./pages/resetpassword";
import { UserProfile } from "./pages/userprofile";
import { useDispatch } from "react-redux";
import { setValue } from "./redux/userSlice";
import { CreateBlog } from "./pages/createblog";
import ChangePasswordForm from "./pages/changepassword";
import ChangeUsernameForm from "./components/changeusername";
import ChangeEmailForm from "./components/changeemail";
import ChangePhoneForm from "./components/changephone";
import { Blog } from "./components/blog";
import { MyBlog } from "./components/myblog";
const router = createBrowserRouter([
  {path : "/", element : <Home/>},
  {path : "/profile", element : <UserProfile/>},
  {path : "/create", element : <CreateBlog/>},
  {path : "/changepass", element : <ChangePasswordForm/>},
  {path : "/changeusername", element : <ChangeUsernameForm/>},
  {path : "/changeemail", element : <ChangeEmailForm/>},
  {path : "/changephone", element : <ChangePhoneForm/>},
  {path : "/blog/:id", element : <Blog/>},
  {path : "/myblog", element : <MyBlog/>},
  
  {path : "/signup", element : <Signup/>},
  {path : "/login", element : <Login/>},
  {path : "/loginphone", element : <LoginPhone/>},
  {path : "/loginemail", element : <LoginEmail/>},
  // https://reactrouter.com/en/main/route/route
  // https://reactrouter.com/en/main/hooks/use-params
  {path : "/verification/:token", element : <Verify/>},
  {path : "/verification-change-email/:token", element : <Verify/>},
  {path: "/forgot", element:<ForgotPasswordForm/>},
  {path: "/reset-password/:token", element:<ResetPasswordForm/>},
  
])

function App() {
  const token = localStorage.getItem("token")
  const headers ={
    "Authorization":`Bearer ${token}`
}
const dispatch = useDispatch()
  const keepLogin = async () => {
    try {
      const response = await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/auth/", {headers})
      dispatch(setValue(response.data));
      console.log(response.data);
      
      
    } catch (error) {
      console.log("tolong");
    }
  }
  useEffect(() => {
    keepLogin()
  }, [])

  return (
    <div className="App">
      <RouterProvider router ={router} />
    </div>
  );
}

export default App;
