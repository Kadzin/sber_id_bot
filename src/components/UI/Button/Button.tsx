import './Button.css';
import {CSSProperties, FC} from "react";

interface ButtonProps {
    callBackData?: string;
    onClick?: any;
    disabled: boolean;
    align: string;
    theme: string;
    value: string;
    style?: CSSProperties
}

const Button:FC<ButtonProps> = (props) => {

    const callBackData = props.callBackData
    const callBack = props.onClick

    const disabled = {
        disabled: false,
        background: ''
    }
    if(props.disabled === true) {
        disabled.disabled = true
        disabled.background = 'disabled'
    }

    const buttonAlign = props.align
    const buttonStyle = props.theme + ' button ' + buttonAlign + ' ' + disabled.background;

    if(props.callBackData) {
        return (
            <button style={props.style} className={buttonStyle} onClick={(e) => callBack(callBackData)} disabled={disabled.disabled}>{props.value}</button>
        );
    }

    return (
        <button style={props.style} className={buttonStyle} onClick={callBack} disabled={disabled.disabled}>{props.value}</button>
    );
};

export default Button;