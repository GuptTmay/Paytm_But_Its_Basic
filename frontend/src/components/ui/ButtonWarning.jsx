import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export const ButtonWarning = ({label, to, buttonText, moreClass}) => {
    return (
        <div className={"font-semibold text-sm " + moreClass }>
            <p>{label} <Link className='underline cursor-pointer' to={to} >{ buttonText }</Link></p>
        </div>
    )
}

ButtonWarning.propTypes = {
    label: PropTypes.string,
    to: PropTypes.string,
    buttonText: PropTypes.string,
    moreClass: PropTypes.string,
}

ButtonWarning.defaultTypes = {
    label: "",
    to: "",
    buttonText: "",
    moreClass: ""
}