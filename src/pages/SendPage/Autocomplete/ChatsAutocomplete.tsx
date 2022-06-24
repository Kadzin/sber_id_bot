import React, {FC} from 'react';
import {Autocomplete, TextField} from "@mui/material";

interface СAprops {
    callback: any,
    options: {
        id: string,
        label: string
    }[]
}

const ChatsAutocomplete:FC<СAprops> = (props) => {
    return (
        <Autocomplete
            multiple
            options={props.options}
            renderInput={(params) => <TextField
                {...params}
                variant="standard"
                label={'Выберете чат'}
            />}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            onChange={(e, value) => props.callback(value, 'chat')}
            sx={{
                width: '50%',
                margin: '0 0 25px 0'
            }}

        />
    );
};

export default ChatsAutocomplete;