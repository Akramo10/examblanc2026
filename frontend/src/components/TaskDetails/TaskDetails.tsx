import { TaskDetailsType, TaskType } from "@/types/task.type"
import { CheckCircleOutlined, CloseOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { Dispatch, SetStateAction } from "react";

type TaskDetailsProps = {
    task: TaskDetailsType;
    setSelectedTask: Dispatch<SetStateAction<TaskDetailsType | undefined>>;
}

export const TaskDetails = ({ task, setSelectedTask } : TaskDetailsProps) => {
    return (
        <div>
            <div className="detailsHeader">
                <u><h4>{task.name}</h4></u>
                <Button icon={<CloseOutlined />} onClick={() => setSelectedTask(undefined)} />
            </div>
            <div className="detailsContent">
                <div><b>Statut : </b>{task.done ? <Tag color={'success'} icon={<CheckCircleOutlined />}>Terminée</Tag> : <Tag color={'error'} icon={<SyncOutlined />}>A faire</Tag>}</div>
                <div><b>Créée le : </b> {new Date(task.createdAt).toLocaleDateString('fr-FR')}</div>
                <div><b>Par : </b> User</div>
            </div>
        </div>
    )
}