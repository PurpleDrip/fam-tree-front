import axiosInstance from "@/services/axios"

export const loginUser=async(data:{treeName:string,password:string})=>{
    return axiosInstance.post("/auth/login",data)
}

export const registerUser = async (userData: {
  treeName:string,
  password:string,
  adminPassword:string,
  owner:string
  }) => {
    return axiosInstance.post("/auth/register", userData);
  };

  export const checkForCookies = async () => {
    return axiosInstance.get("/auth/session");
  };
  
  export const logoutUser = async () => {
    return axiosInstance.post("/auth/logout");
  };