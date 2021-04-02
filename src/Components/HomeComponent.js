import React, { useState, useEffect } from 'react';
import './HomeComponent.css'
import { Drawer, IconButton, Icon } from 'rsuite';
import 'rsuite/dist/styles/rsuite-dark.css';
import styled from '@emotion/styled'
import { Collection } from 'japidb';

export default function Home() {
    const [show, setShow] = useState(false)
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
        setRows(rows > currentRows ? rows : currentRows < maxRows ? currentRows : maxRows)
        localStorage.setItem("@tororu/rows", rows > currentRows ? rows : currentRows < maxRows ? currentRows : maxRows)

    };
    useEffect(() => {
        let tororu_value = localStorage.getItem("@tororu/value")
        let tororu_rows = localStorage.getItem("@tororu/rows")
        setValue(tororu_value)
        setRows(tororu_rows)
    }, [])

    const MenuToolbar = styled('ButtonToolbar')`
      position: absolute;
      margin-right: 30px;
      margin-top: 10px;
      right: 0;
    `



    return (
        <div>
            <Menu show={show} setShow={setShow} />
            <MenuToolbar>
                <IconButton icon={<Icon icon="align-justify" className={'menuIcons'} />}  appearance={'link'} onClick={() => setShow(true)} />
            </MenuToolbar>
            <textarea
                rows={rows}
                defaultValue={value}
                placeholder={'Write!'}
                className={'textarea'}
                onChange={handleChange}
            />

        </div>

    );
}


function Menu({ show, setShow }) {



    return (
        <div>
            <Drawer
                size={'xs'}
                show={show}
                onHide={() => setShow(false)}
                backdrop={false}
            >
                <Drawer.Header>
                    <Drawer.Title>トロール (Tororu)</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                </Drawer.Body>
                <Drawer.Footer>
                <IconButton icon={<Icon icon="plus" className={'menuIcons'} />}  appearance={'link'} onClick={() => setShow(true)} />

                </Drawer.Footer>
            </Drawer>
        </div>
    )
}