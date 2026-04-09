import { useState } from "react"
import { UserType } from "@/types/user.type";
import { Tasks } from "../Tasks/Tasks"
import { Login } from "../Login/Login";
import { Button } from "antd";
import { UserSwitchOutlined } from "@ant-design/icons";
import { useFullName } from "@/hooks/useFullName";

export const TodoList = () => {

    const [selectedUser, setSelectedUser] = useState<UserType>();

    const fullName = useFullName(selectedUser);

    return (
        <>
            <h1>TODO-LIST</h1>
            <br />
            {selectedUser ?
                <>
                    <div>
                        <b>Utilisateur sélectionné : </b> 
                        {fullName} 
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