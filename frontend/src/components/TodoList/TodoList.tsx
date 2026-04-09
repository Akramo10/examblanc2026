import { useState } from "react"
import { UserType } from "@/types/user.type";
import { Tasks } from "../Tasks/Tasks"
import { Login } from "../Login/Login";
import { Button } from "antd";
import { UserSwitchOutlined } from "@ant-design/icons";

export const TodoList = () => {

    const [selectedUser, setSelectedUser] = useState<UserType>();

    return (
        <>
            {selectedUser ?
                <>
                    <div>
                        <b>Utilisateur sélectionné : </b> 
                        {selectedUser.name + ' ' + selectedUser.firstname} 
                        <Button type="primary" icon={<UserSwitchOutlined />} onClick={() => setSelectedUser(undefined)} style={{float: 'right'}} />
                    </div>
                    <br />
                    <hr />
                    <br />
                    <Tasks selectedUser={selectedUser} />
                </>
            :
                <Login onSelectUser={setSelectedUser} />
            }
        </>
    )
}