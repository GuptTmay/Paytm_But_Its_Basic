import PropTypes from 'prop-types';


export const SubHeading = ({ heading, moreClass }) => {
    return (
        <div className={`text-gray-700 font-medium ${moreClass}`}>
            { heading }
        </div>
    )
}

SubHeading.propTypes = {
    heading: PropTypes.object.isRequired,
    moreClass: PropTypes.string
}

SubHeading.defaultTypes = {
    moreClass: ""
}