import React from "react";
import PropTypes from 'prop-types';

export const BalanceComp = React.memo(function BalanceComp({ balance, currency }) {
    return (
        <div className="flex flex-row p-5">
            <div className="font-bold text-xl">
                Your Balance: { currency } { balance }
            </div>
        </div>
    )
})

BalanceComp.propTypes = {
    balance: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
}