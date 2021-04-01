import React, { useState, useEffect } from 'react';
import './HomeComponent.css'
import { Drawer, ButtonToolbar, Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';


export default function Home() {

    const [value, setValue] = useState('');
    const [rows, setRows] = useState(5);
    const maxRows = 1000;


    function handleChange(event) {
        const textareaLineHeight = 24;

        const previousRows = event.target.rows;

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
        setRows(rows > currentRows ? rows : currentRows < maxRows ? currentRows  : maxRows)
        localStorage.setItem("@tororu/rows", rows > currentRows ? rows : currentRows < maxRows ? currentRows  : maxRows)

    };
    useEffect(() => {
        let tororu_value = localStorage.getItem("@tororu/value")
        let tororu_rows = localStorage.getItem("@tororu/rows")
        setValue(tororu_value)
        setRows(tororu_rows)

    }, [])

    return (
        <div>
            <Menu />
            <textarea
                rows={rows}
                value={value}
                placeholder={'Write!'}
                className={'textarea'}
                onChange={handleChange}
            />
            
        </div>

    );
}


function Menu() {

    const [show, setShow] = useState(false)


    return (
        <div>
            <Drawer
                size={'xs'}
                show={show}
                onHide={() => setShow(false)}
            >
                <Drawer.Header>
                    <Drawer.Title>Drawer Title</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                </Drawer.Body>
                <Drawer.Footer>
                    <Button onClick={() => setShow(false)} appearance="primary">Confirm</Button>
                    <Button onClick={() => setShow(false)} appearance="subtle">Cancel</Button>
                </Drawer.Footer>
            </Drawer>
        </div>
    )
}