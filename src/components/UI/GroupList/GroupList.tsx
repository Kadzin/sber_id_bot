import React, {FC, useEffect, useState} from 'react';
import "./GroupList.css";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getGroups} from "../../../store/reducers/ActionCreators";
import {groupsAPI} from "../../../services/GroupService";

interface GroupListProps {
    onSelected?: any;
}


const GroupsList:FC<GroupListProps> = (props) => {

    const dispatch = useAppDispatch()
    const {isLoading, data: groups, error} = groupsAPI.useFetchGroupsQuery('')
    const [currentGroup, setCurrentGroup] = useState('')

    useEffect(() => {
        dispatch(getGroups())
    }, [])


    const  setSelected = (e: React.FormEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setCurrentGroup(e.currentTarget.value)
    }

    useEffect(() => {
        props.onSelected(currentGroup)
    }, [currentGroup])


    return (
        <>
            <select className="groupsList" onChange={setSelected} defaultValue={''}>
                <option value="" disabled hidden></option>
                {isLoading && <option value="00000000">Groups are loading</option>}
                {error && <option value="00000000">Server error</option>}
                {groups && groups.map((group) =>
                    <option key={group.id} value={group.id}>
                        {group.name}
                    </option>
                )}
            </select>
        </>
    );
};

export default GroupsList;