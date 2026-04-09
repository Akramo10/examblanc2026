import axios from "axios";
import { useEffect, useState } from "react";
import { TaskDetailsType, TaskType } from "@/types/task.type";
import { AddTask } from "../AddTask/AddTask";
import { Filters } from "../Filters/Filters";
import { Task } from "../Task/Task";
import { TaskDetails } from "../TaskDetails/TaskDetails";
import { UserType } from "@/types/user.type";

type TasksProps = {
    selectedUser: UserType;
}

export const Tasks = ({ selectedUser } : TasksProps) => {

    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>();
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
        const { data } = await axios.post(`http://localhost:5000/tasks/`, {name, user: selectedUser});
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

    const onSelectFilter = (done: string) => {
        setActiveFilter(done);
        setSelectedTask(undefined);
    }

    const filter = () => {
        let filteredTasks = tasks;
        if(activeFilter === 'done') filteredTasks = tasks.filter((t) => t.done);
        if(activeFilter === 'todo') filteredTasks = tasks.filter((t) => !t.done);
        if(activeFilter === 'mine') filteredTasks = tasks.filter((t) => t.user?._id === selectedUser._id);
        setFilteredTasks(filteredTasks);
    }  

    const showDetails = async (task: TaskType) => {
        const { data } = await axios.get(`http://localhost:5000/tasks/${task._id}`);
        setSelectedTask(data);
    }   

    return (
        <>
            <h4>Liste des tâches à réaliser</h4>
            <br />
            <AddTask onAdd={createTask} />
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {filteredTasks.length === 0 && <div>Aucune tâche à afficher</div>}
                {
                    filteredTasks?.map((task) => (
                        <Task key={task._id} task={task} selectedUser={selectedUser} onCheck={checkUncheck} onEdit={updateTask} onDelete={deleteTask} onTaskClick={showDetails} />
                    ))
                }
            </div>
            <br />
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