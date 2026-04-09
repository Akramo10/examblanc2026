import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd"
import { useState } from "react";

type CreateUserProps = {
    addUser: (name: string, firstname: string) => void;
    closePanel: () => void;
}

export const CreateUser = ({ addUser, closePanel }: CreateUserProps) => {

    const [name, setName] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");

    const onSubmit = () => {
        addUser(name, firstname);
        setName("");
        setFirstname("");
    }

    const onClose = () => {
        closePanel();
        setName("");
        setFirstname("");
    }

    return (
        <>
            <hr />
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <h4><u>Création d'un nouvel utilisateur</u></h4>
                <Button icon={<CloseOutlined />} onClick={() => onClose()} />
            </div>
            <Form onFinish={onSubmit}>
                <Form.Item>
                    Nom : 
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    Prénom : 
                    <Input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">Créer l'utilisateur et accéder à la liste</Button>
                </Form.Item>
            </Form>
        </>
    )
}