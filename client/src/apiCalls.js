import axios from "axios";
// Creating onemore axios object for JWT feature
import jwt_decode from "jwt-decode";
export const axiosJWT = axios.create()


export const loginCall = async(userCredentials, dispatch)=>{
    dispatch({type:"LOGIN_START"});
    try{
        const res = await axios.post("http://127.0.0.1:4400/api/auth/login",userCredentials);
        localStorage.setItem('aToken',res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        dispatch({type:"LOGIN_SUCCESS",payload:res.data.user});
        return true
    }catch (err){
        dispatch({type:"LOGIN_FAILURE",payload:err});
        return false
    }
}


// const RefreshToken = async () => {
//     try {
//         const refreshToken = localStorage.getItem('rToken')
//         const user = JSON.parse(localStorage.getItem("user"))
//         const res = await axios.post("http://localhost:8800/api/auth/refresh/"+user._id, { token: refreshToken });
//         localStorage.setItem('aToken',res.data.accessToken)
//         localStorage.setItem('rToken',res.data.refreshToken)
//         return res.data;
//     } catch (err) {
//       console.log(err);
//     }
//   };

axiosJWT.interceptors.request.use(
    async (config) => {
        // RefreshToken()
      let currentDate = new Date();
      const accessToken = localStorage.getItem('aToken')

      const decodedToken = jwt_decode(accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        // const data = await RefreshToken();
        // config.headers["authorization"] = "Bearer " + data.accessToken;
        console.log("Tokken more then 10000 secs")
      }
      else{
            config.headers["authorization"] = "Bearer " + accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

axiosJWT.interceptors.response.use(
  (response)=>{
    return response
    },(error)=>{
      console.log("The Error from the Backend--",error)
      // localStorage.clear()
    }
)