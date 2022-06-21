import React, {FC} from 'react';
import {Autocomplete, TextField} from "@mui/material";

interface GAprops {
    callback: any,
    options: {
        id: string,
        label: string
    }[]
}

const GroupsAutocomplete:FC<GAprops> = (props) => {
    return (
        <Autocomplete
            options={props.options}
            renderInput={(params) => <TextField
                {...params}
                variant="standard"
                label={'Выберете группу'}
            />}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            onChange={(e, value) => props.callback(value, 'group')}
            sx={{
                width: '50%',
                margin: '0 0 25px 0'
            }}

        />
    );
};

export default GroupsAutocomplete;