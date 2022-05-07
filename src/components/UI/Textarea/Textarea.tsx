import React, {FC, useEffect, useState} from 'react'
import './Textarea.css'
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    DraftHandleValue,
    ContentState,
    RawDraftContentState
} from 'draft-js'
import 'draft-js/dist/Draft.css'

interface TextareaProps {
    onChange: any
}

const Textarea:FC<TextareaProps> = (props) => {

    const [formatedText, setFormatedText] = useState('')
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    )


    useEffect(() => {
        props.onChange(formatedText)
    }, [formatedText])

    useEffect(() => {
        convertText(convertToRaw(editorState.getCurrentContent()))
    }, [editorState])


    function convertText(textMessage: RawDraftContentState) {

        const convertedText = textMessage.blocks.reduce((prev, current) => {
            const rowString = {
                raw: current.text,
                formatted: current.text.trim() + '\n'
            }
            if (rowString.raw.trim() == '') {
                rowString.formatted = '\n'
                return prev + '\n'
            }
            if (current.inlineStyleRanges.length != 0) {
                rowString.formatted = ''
                for (let i = 0; i <= rowString.raw.length; i++) {
                    const currentLetter = rowString.raw.charAt(i)
                    const addAllTags = current.inlineStyleRanges.reduce((prevString, currentString, index) => {
                        const openOffset = currentString.offset
                        const closeOffset = currentString.offset + currentString.length
                        const styleTag = {
                            open: '',
                            close: ''
                        }
                        switch (currentString.style) {
                            case 'BOLD':
                                styleTag.open = '<b>'
                                styleTag.close = '</b>'
                                break;
                            case 'ITALIC':
                                styleTag.open = '<i>'
                                styleTag.close = '</i>'
                                break;
                            case 'UNDERLINE':
                                styleTag.open = '<u>'
                                styleTag.close = '</u>'
                                break;
                            default:
                                styleTag.open = ''
                                styleTag.close = ''
                                break;
                        }
                        if (i == openOffset) {
                            return prevString + styleTag.open
                        }
                        if (i == closeOffset) {
                            return prevString + styleTag.close
                        }
                        return prevString + ''
                    }, '')
                    rowString.formatted += addAllTags + currentLetter
                }
                rowString.formatted = rowString.formatted.trim()
                rowString.formatted += '\n'
            }
            return prev + rowString.formatted
        }, '')

        setFormatedText(convertedText)
    }

    const textContent = (content: EditorState) => {
        setEditorState(content)
    }

    const handleKeyCommand = (command: string): DraftHandleValue => {
        const newState = RichUtils.handleKeyCommand(
            editorState,
            command
        )
        if (newState) {
            setEditorState(newState)
            return "handled"
        }
        return "not-handled"
    }

    const onUnderlineClick = () => {
        setEditorState(
            RichUtils.toggleInlineStyle(editorState, "UNDERLINE")
        )
    }

    const onBoldClick = () => {
        setEditorState(
            RichUtils.toggleInlineStyle(editorState, "BOLD"));
    }

    const onItalicClick = () => {
        setEditorState(
            RichUtils.toggleInlineStyle(editorState, "ITALIC")
        )
    }

    return (
        <>
            <div className="ta_message">
                <div className="textarea_buttons">
                    <button onClick={onBoldClick}><b>B</b></button>
                    <button onClick={onItalicClick}><em>I</em></button>
                    <button onClick={onUnderlineClick}><u>U</u></button>
                    {/*<button onClick={onPlainClick}>Row</button>*/}
                </div>
                <Editor
                    editorState={editorState}
                    onChange={textContent}
                    handleKeyCommand={handleKeyCommand}
                />
            </div>
        </>
    )
}

export default Textarea;