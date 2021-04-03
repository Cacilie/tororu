import React, { useState, useEffect } from 'react';
import './HomeComponent.css'
import { Drawer, IconButton, Icon } from 'rsuite';
import 'rsuite/dist/styles/rsuite-dark.css';
import styled from '@emotion/styled'
import { Collection, Item } from 'japidb';

const stories = new Collection('Stories', 'id');
const currentStoryId = new Item('currentStoryId', 0);

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

        const finalRows = rows > currentRows ? rows : currentRows < maxRows ? currentRows : maxRows

        if(currentStoryId.get() === 0){
            const id = Math.floor(Date.now() / 1000)

            stories.save({
                "id" : id,
                "story" : event.target.value,
                "rows" : finalRows
            });

            currentStoryId.save(id)
        }else {
            stories.save({
                "id": currentStoryId.get(),
                "story": event.target.value,
                "rows": finalRows
            })
        }
     
        setValue(event.target.value)
        setRows(finalRows)

    };
    useEffect(() => {
        

        let tororu_value = localStorage.getItem("@tororu/value")
        let tororu_rows = localStorage.getItem("@tororu/rows")

        //this code snippet is to save work from previous versions
        if(tororu_value){
            const id = Math.floor(Date.now() / 1000)
            stories.save({
                "id" : id,
                "story" : tororu_value,
                "rows" : tororu_rows
            })

            currentStoryId.save(id)
            localStorage.removeItem("@tororu/value")
            localStorage.removeItem("@tororu/rows")
        }
        // end of code snippet

        let firstStory = stories.find({
            "id" : currentStoryId.get()
        })
        if(firstStory.length > 0 ) firstStory = firstStory[0]        

        setValue(firstStory.story)
        setRows(firstStory.rows)
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