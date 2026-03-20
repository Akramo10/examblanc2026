import { Task } from "@/types/task.type";
import { Checkbox, CheckboxOptionType, CheckboxProps, Form } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export const Tasks = () => {

    const [tasks, setTasks] = useState<Task[]>();
    const [tasksOptions, setTasksOptions] = useState<CheckboxOptionType[]>();

    useEffect(() => {
        const fetchTasks = async () => {
            const { data } = await axios.get(`http://localhost:5000/tasks`);
            setTasks(data);
            setTasksOptions(data.map((task: any) => (
                {
                    label: task.name,
                    value: task._id
                }
            )));
        };
        fetchTasks();
        
    }, []);

    return (
        <>
            <h1>TODO-LIST</h1>
            <h3>Liste des tâches à réaliser</h3>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {
                    tasks?.map((task) => (
                        <Checkbox key={task._id}>{task.name}</Checkbox>
                    ))
                }
            </div>
            
        </>
        
    )
}