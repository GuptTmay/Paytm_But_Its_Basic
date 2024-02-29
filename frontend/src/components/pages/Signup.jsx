import axios from 'axios'; 
import { InputBar } from '../ui/InputBar';
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { SubHeading } from '../ui/SubHeading';
import { MainHeading } from '../ui/MainHeading';
import { ButtonComp } from '../ui/ButtonComp';
import { ButtonWarning } from '../ui/ButtonWarning';
import { useCookies } from 'react-cookie'; 
import { AlertComp } from '../ui/AlertComp';
import { useSetRecoilState } from 'recoil';
import { AlertAtom } from '../../store/atoms/atoms';

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, setCookies] = useCookies(["jwtToken"]);
    const navigate = useNavigate();
    const setAlert = useSetRecoilState(AlertAtom);

    const handleOnClick = async () => {
        const bodyData = {
            firstName: firstName,
            lastName: lastName,
            username: email,
            password: password
        }

        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", bodyData);
            setCookies("jwtToken", response.data.token);
            setAlert(<AlertComp type='success'>{response.data.message}</AlertComp>);
            setTimeout(() => {
                navigate("/dashboard");
            }, 700);
        } catch (error) {
            setAlert(<AlertComp type='error'>{error.response.data.message}</AlertComp>);
        }
    }

    return <>
        <div className="h-screen bg-gray-700 flex justify-center items-center font-sans">
            <div className="bg-white flex flex-col text-center box-border min-h-96 w-1/4 rounded-xl p-5">
                <MainHeading heading="Sign Up"></MainHeading>
                <SubHeading moreClass="mt-3" heading={<p>Enter your information to create an <br />account</p>} />
                <InputBar label="First Name" placeholder="John" setState={setFirstName} />
                <InputBar label="Last Name" placeholder="Doe" setState={setLastName} />
                <InputBar label="Email" placeholder="johndoe@example.com" setState={setEmail}/>
                <InputBar label="Password" setState={setPassword}/>
                <ButtonComp moreClass='m-2' label="Sign Up" onClick={handleOnClick}/>
                <ButtonWarning label="Already have an account?" moreClass="m-2" to="/signin" buttonText="Login" />
            </div>
        </div>
    </>
} 

