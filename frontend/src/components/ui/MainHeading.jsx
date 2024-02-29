import PropTypes from 'prop-types';

export const MainHeading = ({moreClass, heading}) => {
    return (
        <div className={`text-3xl font-bold ${ moreClass }`}>
            { heading }
        </div>
    )
}

MainHeading.propTypes = {
    moreClass: PropTypes.string,
    heading: PropTypes.string.isRequired
}

MainHeading.defaultTypes = {
    moreClass: ""
}