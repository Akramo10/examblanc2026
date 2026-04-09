import { UserType } from "@/types/user.type";
import { Alert, Select } from "antd"
import axios from "axios";
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import { CreateUser } from "../CreateUser/CreateUser";

type LoginProps = {
    onSelectUser: Dispatch<SetStateAction<UserType | undefined>>
}

export const Login = ({ onSelectUser } : LoginProps) => {

    const [users, setUsers] = useState<UserType[]>([]);
    const [createVisible, setCreateVisible] = useState<boolean>(false);

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

    const addUser = async (name: string, firstname: string) => {
        const user = {
            name: name,
            firstname: firstname
        }
        const { data } = await axios.post("http://localhost:5000/users", user);
        setUsers([...users, data]);
        onSelectUser(data);
        setCreateVisible(false);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <Select
               // @ts-ignore
                showSearch={{ optionFilterProp: 'label', onSearch }}
                placeholder="Selectionnez votre compte"
                onChange={onChange}
                options={getUsersOptions()}
            />
            <div style={{fontSize: '12px'}}>Aucun utilisateur ne correspond ? <a href="#" onClick={() => setCreateVisible(true)}>Créez le votre</a>.</div>
            {createVisible && <CreateUser onCreate={addUser} />}
        </div>
    )
}