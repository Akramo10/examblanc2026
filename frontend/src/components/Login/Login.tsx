import { UserType } from "@/types/user.type";
import { Select } from "antd"
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type LoginProps = {
    onSelectUser: Dispatch<SetStateAction<UserType | undefined>>
}

export const Login = ({ onSelectUser } : LoginProps) => {

    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await axios.get(`http://localhost:5000/users`);
            setUsers(data);
        };
        fetchUsers();
        
    }, []);

    const getUsersOptions = () => {
        return users.map((u) => (
            {
                label: u.name.concat(' ').concat(u.firstname),
                value: u._id
            }
        ))
    }
    
    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    const onChange = (value: number) => {
        onSelectUser(users.find((u) => u._id === value))
    };

    return (
        <>
            <Select
               // @ts-ignore
                showSearch={{ optionFilterProp: 'label', onSearch }}
                placeholder="Selectionnez votre compte"
                onChange={onChange}
                options={getUsersOptions()}
            />
        </>
    )
}