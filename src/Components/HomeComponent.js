import React, { useState } from 'react';
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
        setRows(currentRows < maxRows ? currentRows : maxRows)
    };

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


