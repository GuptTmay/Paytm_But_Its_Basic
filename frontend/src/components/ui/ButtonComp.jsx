import PropTypes from 'prop-types';

export const ButtonComp = ({ label, moreClass, onClick, buttonClass }) => {

    return (
        <div className={ moreClass }>
            <button onClick={onClick} className={`${buttonClass} transition duration-300 ease-in-out font-medium bg-black hover:bg-white text-white hover:text-black hover:outline hover:outline-1 p-2 w-full rounded-md`} type='button'>{ label }</button>
        </div>
    )
}

ButtonComp.propTypes = {
    label: PropTypes.string.isRequired,
    moreClass: PropTypes.string,
    onClick: PropTypes.func,
    buttonClass: PropTypes.string,
}

ButtonComp.defaultTypes = {
    onClick: () => {},
    moreClass: "",
    buttonClass: "",
}