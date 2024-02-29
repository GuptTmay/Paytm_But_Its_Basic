import PropTypes from 'prop-types';
import React from 'react';

export const InputBar = React.memo(function InputBar({label, placeholder, setState, moreClass, isNumber}) {

  return (
  <div className='m-2'>
    <div className="flex justify-start mb-2">
        <label className="font-semibold" htmlFor="inputbar">{label}</label>
    </div>
    <div>   
        <input onChange={(e) => setState(e.target.value)} type={isNumber ? "number" : "text"} className={`transition duration-300 ease-in-out p-2 outline-none w-full border border-gray-300 rounded-md focus:border-black placeholder:text-gray-500 hover:drop-shadow-xl ${moreClass}`} id="inputbar" placeholder={placeholder}/>
    </div>
  </div>
  );
});

InputBar.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  setState: PropTypes.func.isRequired,
  moreClass: PropTypes.string,
  isNumber: PropTypes.bool
};

InputBar.defaultProps = {
  placeholder: '', // Set a default empty string if placeholder is not provided
  moreClass: "",
  isNumber: false
};