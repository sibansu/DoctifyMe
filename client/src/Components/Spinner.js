import React, { useState } from 'react'

const Spinner = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    return (
        <div className="d-flex justify-content-center spinner">
            <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    )
}

export default Spinner