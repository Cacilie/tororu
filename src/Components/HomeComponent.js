import React, { useState, useEffect } from 'react';
import './HomeComponent.css'

export default function Home() {

    const [value, setValue] = useState('');
    const [rows, setRows] = useState(5);
    const [minRows, setMinRows] = useState(5);
    const [maxRows, setMaxRows] = useState(100000);


    function handleChange(event) {
        const textareaLineHeight = 24;

        const previousRows = event.target.rows;
        event.target.rows = minRows; // reset number of rows in textarea 

        const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }

        if (currentRows >= maxRows) {
            event.target.rows = maxRows;
            event.target.scrollTop = event.target.scrollHeight;
        }

        setValue(event.target.value)
        localStorage.setItem("@tororu/value", event.target.value)
        setRows(currentRows < maxRows ? currentRows : maxRows)
        localStorage.setItem("@tororu/rows", currentRows < maxRows ? currentRows : maxRows)
        
    };
    useEffect( () => {
        let tororu_value = localStorage.getItem("@tororu/value")
        let tororu_rows = localStorage.getItem("@tororu/rows")
        setValue(tororu_value)
        setRows(tororu_rows)

    } , [])

    return (
            <textarea
                rows={rows}
                value={value}
                placeholder={'Start writting you next story...'}
                className={'textarea'}
                onChange={handleChange}
            />
    );
}


