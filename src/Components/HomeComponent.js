import React, {Component} from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';


export default class Home extends Component {

    state = {
        markdown: ''
    }
    
    updateMarkdown = (editor, data, value) => {
        this.setState({
            markdown: value
        }, _ => console.log(this.state.markdown))

        
    }

    render(){
        return (
            <div style={MainDivStyle}>
                <div style={OutterEditorStyle} >
                <MarkdownEditor
                    onChange={this.updateMarkdown}
                    width='100'
                    height="500"
                /> 
                </div>
               
            </div>
        )
    }
}



const OutterEditorStyle = {
    
}

const MainDivStyle = {
}

