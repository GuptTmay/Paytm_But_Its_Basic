import { AppBar } from '../ui/dashboard/AppBar';
import { BalanceComp } from '../ui/dashboard/BalanceComp';
import { UserComp } from '../ui/dashboard/UserComp';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { AlertComp } from '../ui/AlertComp';
import { AlertAtom } from '../../store/atoms/atoms';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom'; 

export const Dashboard = () => {
    const [userFirstName, setUserFirstName] = useState("");
    const [balance, setBalance] = useState(0);
    const [cookies] = useCookies(['jwtToken']); 
    const navigate = useNavigate();
    const setAlert = useSetRecoilState(AlertAtom);

    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${cookies.jwtToken}`
        };

        axios.get("http://localhost:3000/api/v1/", { headers: headers })
        .then((response) => {
            setUserFirstName(response.data.firstName);
        })
        .catch((error) => {
            console.log("Something went wrong! ", error);
            setAlert(<AlertComp type='error'>{error.response.data.message}</AlertComp>);
            navigate("/sigin");
        })

        axios.get("http://localhost:3000/api/v1/account/balance", { headers: headers })
        .then((response) => {
            setBalance(response.data.balance);
        })
        .catch((error) => {
            console.log("Something went wrong! ", error);
            setAlert(<AlertComp type='error'>{error.response.data.message}</AlertComp>);
            navigate("/sigin");
        })
    }, []);

    return <>
        <div className=''>
            <AppBar firstName={ userFirstName }/>
            <BalanceComp balance={ balance } currency="₹" />
            <UserComp />
        </div>
    </>
} 

