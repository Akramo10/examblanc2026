import { TaskType } from "@/types/task.type";
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Checkbox, Button } from "antd";
import { useState } from "react";

type TaskProps = {
    task: TaskType;
    onCheck: (task: TaskType) => void;
    onEdit: (task: TaskType) => void;
    onDelete: (task: TaskType) => void;
}

export const Task = ({ task, onCheck, onEdit, onDelete } : TaskProps) => {

    const [editing, setEditing] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(task.name);

    const edit = () => {
        task.name = newName;
        onEdit(task);
        setEditing(false);
    }

    const cancel = () => {
        setNewName(task.name);
        setEditing(false);
    }

    return (
        <div key={task._id} style={{display: 'flex', flexDirection: 'row'}}>
            {
                editing ? 
                    <>
                        <Checkbox onChange={() => onCheck(task)} checked={task.done}>{<input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />}</Checkbox>
                        <Button icon={<CheckOutlined />} onClick={edit} />
                        <Button icon={<CloseOutlined />} danger onClick={cancel} />
                    </>
                :
                    <>
                        <Checkbox onChange={() => onCheck(task)} checked={task.done}>{task.done ? <s>{task.name}</s> : task.name}</Checkbox>
                        <Button icon={<EditOutlined />} onClick={() => setEditing(true)} />
                        <Button icon={<DeleteOutlined />} danger onClick={() => onDelete(task)} />
                    </>
                
            }
            
        </div>
    )
}