import axios from "axios";
import { AlertComp } from '../AlertComp';
import { ButtonComp } from '../ButtonComp';
import { useSetRecoilState } from "recoil";
import { useState, useEffect, useRef } from 'react';
import { UserSendMoneyBar } from './UserSendMoneyBar';
import { AlertAtom } from '../../../store/atoms/atoms';

export const UserComp = () => {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const intervalId = useRef(null);
    const [page, setPage] = useState(1);
    const [userCount, setCountSize] = useState(1);
    const setAlert = useSetRecoilState(AlertAtom);

    useEffect(() => {
        clearTimeout(intervalId.current);        
        intervalId.current = setTimeout(() => {
            axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${searchText}&pageNum=${page}`)
            .then((response) => {
                setUsers(response.data.user);
                setCountSize(response.data.userCount);
            })
            .catch((error) => {
                console.log("Something went wrong while fetching data!: " + error);
                setAlert(<AlertComp type='error'>{error.response.data.message}</AlertComp>);
            })
        }, 200);
    }, [searchText, page, setAlert]);

    // To reset page number to 1 when search Text changes
    useEffect(() => {
        setPage(1);
    }, [searchText])

    return (
        <div className="px-5">
            <div className="font-bold text-xl">
                Users 
            </div>

            <div className="mt-3">
                <input onChange={(e) => setSearchText(e.target.value)} className="w-full outline outline-0 border border-gray-400 focus:outline-1 rounded p-1" type="text" placeholder="Search Users.." />
            </div>
            <div className='flex flex-col justify-center mt-2'>
                    {users?.map((user) => {
                        return( 
                            <UserSendMoneyBar key={user._id} userInfo={user}/>
                        )
                    })}
            </div>
            <div className="flex justify-center">
                {page > 1 ? <ButtonComp label='Last Page' onClick={() => { setPage((x) => x - 1) }} buttonClass="text-sm px-7" />
                    : <ButtonComp label="..." buttonClass="text-sm px-7"></ButtonComp>}
                <div className="transition duration-300 ease-in-out box-border h-9 w-9 rounded bg-gray-200 outline outline-1 flex justify-center items-center mx-3">
                    { page }
                </div>
                { userCount > page * 10 ? <ButtonComp label='Next Page' onClick={() => { setPage((x) => x + 1) }} buttonClass="text-sm px-7" />
                    : <ButtonComp label="..." buttonClass="text-sm px-7"></ButtonComp>}
            </div>
        </div>
    )
}
