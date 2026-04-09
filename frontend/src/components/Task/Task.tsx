import { TaskType } from "@/types/task.type";
import { UserType } from "@/types/user.type";
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Checkbox, Button, Space } from "antd";
import { useState } from "react";

type TaskProps = {
    task: TaskType;
    selectedUser: UserType;
    onCheck: (task: TaskType) => void;
    onEdit: (task: TaskType) => void;
    onDelete: (task: TaskType) => void;
    onTaskClick: (task: TaskType) => void;
}

export const Task = ({ task, selectedUser, onCheck, onEdit, onDelete, onTaskClick } : TaskProps) => {

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

    const isCreator = () => {
        return task.user && task.user._id == selectedUser._id;
    }

    return (
        <div key={task._id} className={`task ${task.done ? "completed" : ""}`}>
            {
                editing ? 
                    <Space>
                        <Checkbox onChange={() => onCheck(task)} checked={task.done} />
                        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="task-title"/>
                        <Button icon={<CheckOutlined />} onClick={edit} />
                        <Button icon={<CloseOutlined />} danger onClick={cancel} />
                    </Space>
                :
                    <Space style={{verticalAlign: "center"}}>
                        <Checkbox onChange={() => onCheck(task)} checked={task.done} />
                        <div onClick={() => onTaskClick(task)} >{task.done ? <s>{task.name}</s> : task.name}</div>
                        {isCreator() && <Button icon={<EditOutlined />} onClick={() => setEditing(true)} />}
                        {isCreator() && <Button icon={<DeleteOutlined />} danger onClick={() => onDelete(task)} />}
                    </Space>
                
            }
            
        </div>
    )
}