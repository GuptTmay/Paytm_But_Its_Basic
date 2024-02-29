import PropTypes from 'prop-types';
import { ButtonComp } from '../ButtonComp';
import { createSearchParams, useNavigate } from 'react-router-dom';

export const UserSendMoneyBar = ({ userInfo }) => {
    const navigate = useNavigate();

    const handleOnClick = (id) => {
        navigate({
            pathname: "/send",
            search: createSearchParams({
                id: id,
                fullName: userInfo.firstName + " " + userInfo.lastName
            }).toString()
        });
    }

    return (
        <div className='flex p-3'>
            <div className="flex items-center font-medium">
                <div className="text-xl box-border h-10 w-10 rounded-full flex justify-center bg-gray-300 items-center">
                    { userInfo.firstName[0].toUpperCase() }
                </div>
                <div className='ms-3'>
                    { userInfo.firstName + " " + userInfo.lastName }
                </div>
            </div>

            <div className='ms-auto'>
                <ButtonComp label='Send Money' onClick={() => { handleOnClick(userInfo._id) }} buttonClass="text-sm px-7" />
            </div>
        </div>
    )
}

UserSendMoneyBar.propTypes = {
    userInfo: PropTypes.object.isRequired,
}