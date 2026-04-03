import { TaskDetailsType, TaskType } from "@/types/task.type"

type TaskDetailsProps = {
    task: TaskDetailsType;
}

export const TaskDetails = ({ task } : TaskDetailsProps) => {
    return (
        <>
            <div>{task.name}</div>
            <div> {task.done ? 'Terminée' : 'A faire'}</div>
            <div>{task.createdAt.toString()}</div>
        </>
    )
}