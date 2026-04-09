import { Button, Form, Input } from "antd"
import { useState } from "react";

type CreateUserProps = {
    onCreate: (name: string, firstname: string) => void;
}

export const CreateUser = ({ onCreate }: CreateUserProps) => {

    const [name, setName] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");

    const onSubmit = () => {
        onCreate(name, firstname);
        setName("");
        setFirstname("");
    }

    return (
        <>
            <hr />
            <h4><u>Création d'un nouvel utilisateur</u></h4>
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