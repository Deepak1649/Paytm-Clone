import { useState, useEffect} from "react"
import { jwtDecode } from 'jwt-decode'
import axios from "axios";

export const Appbar = () => {

    const token = localStorage.getItem("token");
    const data = jwtDecode(token);

    const[username,setUsername] = useState("Hello");

    const getname = async () => {
        try {
          const res = await axios.get("http://localhost:3000/api/v1/user/userdetails?userId=" + data.userId);
          // Use setAccbal to update the state
          setUsername(res.data.username);
        } catch (err) {
          console.log(err);
        }
    }

    useEffect(()=>{
        getname();
    },[]);

    return <div className="shadow h-14 flex justify-between">
        <div className="flex justify-normal mt-2 h-full ml-4 font-bold text-2xl italic ">
            <div className=" mr-2 text-blue-900"> Paytm</div>
            <div className=" text-blue-400">App</div>
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                {username}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>
        </div>
    </div>
}