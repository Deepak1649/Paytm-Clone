import { Appbar } from "../components/Appbar"
import { jwtDecode } from 'jwt-decode'
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
import { useState, useEffect} from "react"

export const Dashboard = () => {
    
    const token = localStorage.getItem("token");
    const data = jwtDecode(token);
    
    // Declare state for balance
    const [accbal, setAccbal] = useState(0);

    // Declare getbalance as an asynchronous function
    
    const getbalance = async () => {
        try {
          const res = await axios.get("http://localhost:3000/api/v1/account/balance?userId=" + data.userId);
          // Use setAccbal to update the state
          setAccbal(res.data.balance);
        } catch (err) {
          console.log(err);
        }
    }

    // Use useEffect to call getbalance when the component mounts
    useEffect(() => {
        getbalance();
    }, []);

   
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value = {parseFloat(accbal).toFixed(2)}/>
            <Users />
        </div>
    </div>
}