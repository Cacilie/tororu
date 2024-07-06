import React, { useState, useEffect } from 'react';
import './HomeComponent.css'
import { Drawer, IconButton, Icon, List } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import styled from '@emotion/styled'
import { Collection, Item } from 'japidb';

const storiesApi = new Collection('Stories', 'id');
const currentStoryId = new Item('currentStoryId', 0);

function countWords(str) {
    var matches = str.match(/[\w\d\’\'-]+/gi);
    return matches ? matches.length : 0;
}

export default function Home() {
    const [show, setShow] = useState(false)
    const [value, setValue] = useState('');
    const [rows, setRows] = useState(5);
    const [stories, setStories] = useState([])
    const [words, setWords] = useState(0)
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

        if (currentStoryId.get() === 0) {
            const id = Math.floor(Date.now() / 1000)

            storiesApi.save({
                "id": id,
                "story": event.target.value,
                "rows": finalRows
            });

            currentStoryId.save(id)
        } else {
            storiesApi.save({
                "id": currentStoryId.get(),
                "story": event.target.value,
                "rows": finalRows
            })
        }

        setValue(event.target.value)
        setRows(finalRows)
        setStories(storiesApi.find())
        setWords(countWords(event.target.value))


    };

    useEffect(() => {

        //this code snippet is to save work from previous versions
        let tororu_value = localStorage.getItem("@tororu/value")
        let tororu_rows = localStorage.getItem("@tororu/rows")
        if (tororu_value) {
            const id = Math.floor(Date.now() / 1000)
            storiesApi.save({
                "id": id,
                "story": tororu_value,
                "rows": tororu_rows
            })

            currentStoryId.save(id)
            localStorage.removeItem("@tororu/value")
            localStorage.removeItem("@tororu/rows")
        }
        // end of code snippet

        let displayStory = storiesApi.get(currentStoryId.get())

        setValue(displayStory ? displayStory.story : '')
        setRows(displayStory ? displayStory.rows : 5)
        setWords(displayStory ? countWords(displayStory.story) : 0)

        setStories(storiesApi.find())
    }, [])

    const setCurrentStory = (id) => {
        currentStoryId.save(id);
        let displayStory = storiesApi.get(currentStoryId.get())
        let story = displayStory ? displayStory.story : ''
        setValue(story)
        setWords(countWords(story))
        let rows = displayStory ? displayStory.rows : 5
        setRows(rows)
        setStories(storiesApi.find())
        if (window.matchMedia("(max-width: 700px)").matches) {
            setShow(false)
        }
    }

    const removeStory = (id) => {
        if (id === currentStoryId.get()) startNewStory()
        storiesApi.remove(id)
        setStories(storiesApi.find())
    }

    const startNewStory = () => {
        currentStoryId.save(0);
        setValue('')
        setRows(5)
        setWords(0)
        if (window.matchMedia("(max-width: 700px)").matches) {
            setShow(false)
        }
    }

    const MenuToolbar = styled('ButtonToolbar')`
      position: absolute;
      margin-right: 30px;
      margin-top: 10px;
      right: 0;
    `

    return (
        <div>
            <Menu show={show} setShow={setShow} setCurrentStory={setCurrentStory} stories={stories} startNewStory={startNewStory} removeStory={removeStory} />
            <MenuToolbar>
                <IconButton icon={<Icon icon="align-justify" className={'menuIcons'} />} appearance={'link'} onClick={() => setShow(true)} />
            </MenuToolbar>
            <span id="wordCounter">Words - {words}</span>
            
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


function Menu({ show, setShow, setCurrentStory, stories, startNewStory, removeStory }) {
    return (
        <div>
            <Drawer
                size={'md'}
                show={show}
                onHide={() => setShow(false)}
                backdrop={false}
                placement="bottom"
            >
                <Drawer.Header>
                    <Drawer.Title>トロール (Tororu v1.5.0)</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <List bordered>
                        {stories.map((story, index) => {
                            return (
                                <List.Item key={story.id} index={index} >
                                    {story.story.slice(0, 35)}
                                    <IconButton icon={<Icon icon="right" className={'menuIcons'} />} onClick={() => setCurrentStory(story.id)} appearance="subtle" />
                                    <IconButton icon={<Icon icon="trash" className={'menuIcons'} />} onClick={() => removeStory(story.id)} appearance="subtle" />
                                </List.Item>
                            )
                        })}
                    </List>
                </Drawer.Body>
                <Drawer.Footer>
                    <IconButton icon={<Icon icon="plus" className={'menuIcons'} />} appearance={'link'} onClick={() => startNewStory()} />

                </Drawer.Footer>
            </Drawer>
        </div>
    )
}