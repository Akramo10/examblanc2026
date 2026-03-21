import { Task } from "@/types/task.type";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox, CheckboxOptionType } from "antd";
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

    const onChange = async (task: Task) => {
        task.done = !task.done;
        const { data } = await axios.put(`http://localhost:5000/tasks/${task._id}`, task);
        const tasksUpdated = tasks?.map((t) => {
            if(t._id === task._id) t.done = data.done
            return t;
        });
        setTasks(tasksUpdated);
    }

    const onDelete = async (task: Task) => {
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
                        <div key={task._id} style={{display: 'flex', flexDirection: 'row'}}>
                            <Checkbox onChange={() => onChange(task)} checked={task.done}>{task.done ? <s>{task.name}</s> : task.name}</Checkbox>
                            <Button icon={<DeleteOutlined />} danger onClick={() => onDelete(task)} />
                        </div>
                        
                    ))
                }
            </div>
            
        </>
        
    )
}