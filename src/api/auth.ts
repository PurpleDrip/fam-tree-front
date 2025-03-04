import axiosInstance from "@/services/axios"

export const loginUser=async(username:string,password:string)=>{
    return axiosInstance.post("/auth/login",{username,password})
}

export const registerUser = async (userData: {
    username: string;
    password: string;
    gender: string;
    dob: string;
    treeID?: string;
  }) => {
    return axiosInstance.post("/auth/register", userData);
  };

  export const checkForCookies = async () => {
    return axiosInstance.get("/auth/session");
  };
  
  export const logoutUser = async () => {
    return axiosInstance.post("/auth/logout");
  };