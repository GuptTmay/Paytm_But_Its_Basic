import React from 'react';
import { PropTypes } from 'prop-types';

export const AppBar = React.memo(function AppBar ({ firstName }) {

    return (
        <div>
            <div className='flex p-3'>
                <div className='font-medium text-2xl flex items-center'>
                    Payment
                </div>
                <div className='ms-auto flex items-center'>
                    <div className='font-medium text-xl flex items-center'>
                        Hello, { firstName }
                    </div>
                    <div className='ms-2 box-border h-10 w-10 bg-gray-300 text-xl flex justify-center items-center rounded-full'>
                        { firstName[0] }
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
});

AppBar.propTypes = {
    firstName: PropTypes.string.isRequired,
}