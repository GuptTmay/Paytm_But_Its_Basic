import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputBar } from '../ui/InputBar';
import { SubHeading } from '../ui/SubHeading';
import { ButtonComp } from '../ui/ButtonComp';
import { MainHeading } from '../ui/MainHeading';
import { ButtonWarning } from '../ui/ButtonWarning';
import { useCookies } from 'react-cookie';
import { useSetRecoilState } from 'recoil';
import { AlertAtom } from '../../store/atoms/atoms';
import { AlertComp } from '../ui/AlertComp';

export const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [, setCookie] = useCookies(['jwtToken']); 
    const setAlert = useSetRecoilState(AlertAtom);

    const onClickHandler = async () => {
        const bodyData = {
            username: email, // Why assigned email to username? Cuz i made a mistake at the backend so just bear with it
            password: password
        }

        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", bodyData);
            setCookie('jwtToken', response.data.token);
            setAlert(<AlertComp type='success'>{response.data.message}</AlertComp>);
            navigate("/dashboard");
        } catch (error) {
            setAlert(<AlertComp type='error'>{error.response.data.message}</AlertComp>);
        }
    }

    return <>
        <div className="h-screen bg-gray-700 flex justify-center items-center">
            <div className="box-border min-h-96 w-1/4 bg-white rounded-xl flex flex-col text-center p-5">
                <MainHeading heading="Sign In"></MainHeading>
                <SubHeading moreClass="mt-3" heading={<p>Enter your credentials to access your<br />account</p>} />
                <InputBar label="Email" placeholder="johndoe@example.com" setState={setEmail} />
                <InputBar label="Password" setState={setPassword}></InputBar>
                <ButtonComp moreClass='m-2' label="Sign In" onClick={onClickHandler}/>
                <ButtonWarning label="Don&apos;t have an account?" moreClass="m-2" to="/signup" buttonText="Sign Up" />
            </div>
        </div>
    </>
} 