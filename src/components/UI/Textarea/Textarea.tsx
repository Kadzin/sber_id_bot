import React, {FC, useEffect, useState} from 'react'
import './Textarea.css'
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    DraftHandleValue,
    ContentState,
    RawDraftContentState, convertFromHTML
} from 'draft-js'
import 'draft-js/dist/Draft.css'
import Button from "../Button/Button";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import AddLink2Text from "./AddLink2Text/AddLink2Text";

interface TextareaProps {
    onChange: any,
    width?: string,
    initContent?: string
    saveChanges?: any
}

const Textarea:FC<TextareaProps> = (props) => {

    const [initalText, setInitalText] = useState(props.initContent)

    const [saveButton, setSaveButton] = useState(false)
    const [isChangesSaved, setIsChangesSaved] = useState(false)

    const [formatedText, setFormatedText] = useState('')
    const [editorState, setEditorState] = useState(
        () => {
            if(initalText) {
                setSaveButton(true)
                const initialContent = initalText.replace(/\n/g, "<br />");
                const HTML2DraftJS = convertFromHTML(initialContent)
                return EditorState.createWithContent(ContentState.createFromBlockArray(HTML2DraftJS.contentBlocks, HTML2DraftJS.entityMap))
            } else {
                return EditorState.createEmpty()
            }
        },
    )

    const sendChangesBack = () => {
        setIsChangesSaved(true)
    }
    useEffect(() => {
        if(isChangesSaved) {
            props.saveChanges(isChangesSaved)
            setInitalText(formatedText)
            setIsChangesSaved(false)
        }
    }, [isChangesSaved])

    useEffect(() => {
        props.onChange(formatedText)
        if(initalText) {
            if(formatedText.trim() != initalText.trim()) {
                setSaveButton(false)
            } else {
                setSaveButton(true)
            }
        }
    }, [formatedText, initalText])

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

    const [addLinkValue, setAddLinkValue] = useState('')

    return (
        <>
            <div className="ta_message" style={{ width: props.width }}>
                <div className="textarea_buttons">
                    <FormatBoldIcon onClick={onBoldClick} sx={{cursor: 'pointer'}} />
                    <FormatItalicIcon onClick={onItalicClick} sx={{cursor: 'pointer'}} />
                    <FormatUnderlinedIcon onClick={onUnderlineClick} sx={{cursor: 'pointer'}} />
                    <AddLink2Text returnLinkFunc={setAddLinkValue} />
                    {/*<button onClick={onBoldClick}><b>B</b></button>*/}
                    {/*<button onClick={onItalicClick}><em>I</em></button>*/}
                    {/*<button onClick={onUnderlineClick}><u>U</u></button>*/}
                    {/*<button onClick={onPlainClick}>Row</button>*/}
                </div>
                {initalText && <Button
                    disabled={saveButton}
                    theme='button_theme_green'
                    value='Save changes'
                    style={{
                        position: 'absolute',
                        bottom: '16px',
                        right: '16px',
                        padding: '0 16px',
                        cursor: 'pointer',
                        zIndex: '2'
                    }}
                    onClick={sendChangesBack}
                />}
                <Editor
                    editorState={editorState}
                    onChange={textContent}
                    handleKeyCommand={handleKeyCommand}
                    placeholder='Сообщение'
                />
            </div>
        </>
    )
}

export default Textarea;