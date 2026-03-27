import { TaskType } from "@/types/task.type";
import axios from "axios";
import { useEffect, useState } from "react";
import { Task } from "../Task/Task";

export const Tasks = () => {

    const [tasks, setTasks] = useState<TaskType[]>();

    useEffect(() => {
        const fetchTasks = async () => {
            const { data } = await axios.get(`http://localhost:5000/tasks`);
            setTasks(data);
        };
        fetchTasks();
        
    }, []);

    const checkUncheck = async (task: TaskType) => {
        task.done = !task.done;
        updateTask(task);
    }    

    const updateTask = async (task: TaskType) => {
        const { data } = await axios.put(`http://localhost:5000/tasks/${task._id}`, task);
        const tasksUpdated = tasks?.map((t) => {
            if(t._id === task._id) return data
            return t;
        });
        setTasks(tasksUpdated);
    }

    const deleteStudent = async (task: TaskType) => {
        await axios.delete(`http://localhost:5000/tasks/${task._id}`);
        setTasks(tasks?.filter((t) => t._id !== task._id));
    }

    return (
        <>
            <h1>TODO-LIST</h1>
            <h3>Liste des tâches à réaliser</h3>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {
                    tasks?.map((task) => (
                        <Task key={task._id} task={task} onCheck={checkUncheck} onEdit={updateTask} onDelete={deleteStudent} />
                    ))
                }
            </div>
            
        </>
        
    )
}