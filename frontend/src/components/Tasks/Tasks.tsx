import axios from "axios";
import { useEffect, useState } from "react";
import { TaskDetailsType, TaskType } from "@/types/task.type";
import { AddTask } from "../AddTask/AddTask";
import { Filters } from "../Filters/Filters";
import { Task } from "../Task/Task";
import { TaskDetails } from "../TaskDetails/TaskDetails";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export const Tasks = () => {

    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);
    const [activeFilter, setActiveFilter] = useState<boolean>();
    const [selectedTask, setSelectedTask] = useState<TaskDetailsType>();

    useEffect(() => {
        const fetchTasks = async () => {
            const { data } = await axios.get(`http://localhost:5000/tasks`);
            setTasks(data);
        };
        fetchTasks();
        
    }, []);

    useEffect(() => {
        filter();
    }, [activeFilter, tasks])

    const checkUncheck = async (task: TaskType) => {
        task.done = !task.done;
        updateTask(task);
    }    

    const createTask = async (name: string) => {
        const { data } = await axios.post(`http://localhost:5000/tasks/`, {name});
        setTasks([...tasks, data]);
    }

    const updateTask = async (task: TaskType) => {
        const { data } = await axios.put(`http://localhost:5000/tasks/${task._id}`, task);
        const tasksUpdated = tasks?.map((t) => {
            if(t._id === task._id) return data
            return t;
        });
        setTasks(tasksUpdated);
    }

    const deleteTask = async (task: TaskType) => {
        await axios.delete(`http://localhost:5000/tasks/${task._id}`);
        setTasks(tasks?.filter((t) => t._id !== task._id));
    }

    const onSelectFilter = (done?: boolean) => {
        setActiveFilter(done);
        setSelectedTask(undefined);
    }

    const filter = () => {
        setFilteredTasks(activeFilter !== undefined ? tasks.filter((t) => t.done === activeFilter) : tasks)
    }  

    const showDetails = async (task: TaskType) => {
        const { data } = await axios.get(`http://localhost:5000/tasks/${task._id}`);
        setSelectedTask(data);
    }   

    return (
        <>
            <h1>TODO-LIST</h1>
            <br />
            <h4>Liste des tâches à réaliser</h4>
            <br />
            <AddTask onAdd={createTask} />
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {
                    filteredTasks?.map((task) => (
                        <Task key={task._id} task={task} onCheck={checkUncheck} onEdit={updateTask} onDelete={deleteTask} onTaskClick={showDetails} />
                    ))
                }
            </div>
            <Filters onFilter={onSelectFilter} />

            
            {
                selectedTask ? (
                    <>
                        <hr /> 
                        <TaskDetails task={selectedTask} setSelectedTask={setSelectedTask} />
                    </>
                ) : <></>
            }
            
        </>
        
    )
}