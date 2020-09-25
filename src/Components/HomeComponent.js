import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class Home extends Component {
    render(){
        return (
            <div style={CONTAINER_STYLE}>
                <ReactQuill theme="snow" style={QUILL_STYLE} />
            </div>
        )
    }
}

const CONTAINER_STYLE = {
    heigth: "100vh",
}

const QUILL_STYLE = {
    padding: '4em',
    
}

