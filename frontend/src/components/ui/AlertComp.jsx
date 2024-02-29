
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
export const AlertComp = ({ type="error", children }) => {
    const [alertType, setAlertType] = useState();
    const [helper, setHelper] = useState(false);
    const [svg, setSvg] = useState();

    useEffect(() => {
        switch (type) {
            case "success":
                setAlertType("outline-[#2e7d32] text-[#2e7d32]");
                setSvg(
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    )
                break;
            case "info":
                setAlertType("outline-[#0288d1] text-[#0288d1]");
                setSvg(
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                )
                break;
            case "warning":
                setAlertType("outline-[#ed6c02] text-[#ed6c02]");
                setSvg(
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                )
                break;
            case "error":
                setAlertType("outline-[#d32f2f] text-[#d32f2f]");
                setSvg(
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                )
                break;
            default: 
                setAlertType("outline-black text-black");
        }

        setTimeout(() => {
            setHelper(false);
        }, 15000);
        setHelper(true);
    }, [type, children]);

    return helper ? ( 
        <div className='absolute flex justify-center m-2 left-0 right-0'>
            <div className={`${alertType} bg-white box-border min-w-20 min-h-10 flex outline outline-2 items-start rounded p-3 font-medium px-10`}>
                { svg }
                <div className='ms-3'>{ children }</div>
            </div>
        </div> 
    ) : null;
}

AlertComp.propTypes = {
    type: PropTypes.string,
    children: PropTypes.node,
}

AlertComp.defaultProps = {
    children: <div>Heloo world this is bod news yaya</div>
}
