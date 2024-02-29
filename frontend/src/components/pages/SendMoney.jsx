import axios from "axios";
import { useState } from 'react';
import { InputBar } from '../ui/InputBar';
import { useCookies } from 'react-cookie'; 
import { useNavigate } from 'react-router-dom';
import { AlertComp } from '../ui/AlertComp';
import { useSetRecoilState } from 'recoil';
import { AlertAtom } from '../../store/atoms/atoms';

export const SendMoney = () => {
    const [amount, setAmount] = useState(0);
    const [cookies] = useCookies(["jwtToken"]);
    const navigate = useNavigate();
    const params = new URLSearchParams(document.location.search);
    const setAlert = useSetRecoilState(AlertAtom);


    const headers = {
        Authorization: `Bearer ${cookies.jwtToken}`
    };

    const handleOnClick = () => {
        const requestBody = {
            to: params.get("id"),
            amount: parseInt(amount)
        }
        axios.post("http://localhost:3000/api/v1/account/transfer", requestBody, { headers })
        .then(response => {
            console.log(response.data.message);
            setAlert(<AlertComp type='success'>{response.data.message}</AlertComp>);
            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);
        })
        .catch(error => {
            setAlert(<AlertComp type='error'>{error.response.data.message}</AlertComp>);
        })
        
    }

    return <>
        <div className="h-screen bg-[#f3f4f6] flex justify-center items-center">
            <div className="box-border min-h w-[30%] rounded-md bg-white shadow-xl p-8">
                <div className='flex justify-center text-3xl font-semibold'>
                    Send Money
                </div>
                <div className="flex justify-start pt-12 flex-row space-x-3">
                    <div className="box-border h-12 w-12 bg-[#22c55e] rounded-full flex justify-center items-center">
                        <span className="font-medium text-white text-2xl">A</span>
                    </div>
                    <div className='flex justify-center items-center text-2xl font-semibold'>
                        { params.get("fullName") }
                    </div>
                </div>
                <div>
                    <InputBar label="Amount (in Rs)" placeholder="Enter Amount" setState={setAmount} isNumber={true}/>
                </div>
                <div className='mt-4 mb-2'>
                    <button type="button" onClick={handleOnClick} className='p-2 w-full bg-[#21c55d] rounded-md text-white font-medium hover:text-black hover:bg-white hover:outline hover:outline-1'>Initiate Transfer</button>
                </div>
            </div>  
        </div>
    </>
} 