import { TaskType } from "@/types/task.type";
import { useState } from "react"

type AddTaskProps = {
    onAdd: (newTask: string) => void
}

export const AddTask = ({ onAdd } : AddTaskProps) => {

    const [name, setName] = useState<string>("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            onAdd(name);
            setName("");
        }
    }

    return (
        <form className="add-task">
            <input type="text" placeholder="Nouvelle tâche" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} />
        </form>
    )
}