import React, { useEffect, useState } from 'react';

import './app.css';
import Task from './task';

export interface Task {
    content: string,
    isChecked: boolean
};

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const loadedTasks: Task[] = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(loadedTasks);
    }, []);

    const updateTaskList = (newTasks: Task[]) => {
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const createTask = (e) => {
        e.preventDefault();
        const taskContent: string = e.target.elements.task.value;
        if (taskContent.trim() != '') {
            const newTasks: Task[] = [...tasks, {
                content: taskContent,
                isChecked: false
            }];
            updateTaskList(newTasks);
        }
        e.target.elements.task.value = '';
    };

    const taskChecked = (index: number, state: boolean) => {
        const newTasks: Task[] = [...tasks];
        newTasks[index].isChecked = state;
        updateTaskList(newTasks);
    };

    const deleteTask = (index: number) => {
        const newTasks: Task[] = [...tasks];
        newTasks.splice(index, 1);
        updateTaskList(newTasks);
    };

    const clearAllTasks = () => {
        const newTasks = [];
        updateTaskList(newTasks);
    };

    const clearCompleteTasks = () => {
        const newTasks = [];
        tasks.forEach(task => {
            if (!task.isChecked) newTasks.push(task);
        });
        updateTaskList(newTasks);
    };

    return (
        <div className='wrapper'>
            <div className='container'>
                <form onSubmit={createTask} className='newTaskForm'>
                    <input name='task' type='text' placeholder='Add a task...' autoComplete='off' className='newTaskInput' />
                    <button className='newTaskButton mainButton'>Add</button>
                </form>
                <div className='clearButtons'>
                    <button className='mainButton' onClick={clearAllTasks}>Clear All</button>
                    <button className='mainButton' onClick={clearCompleteTasks}>Clear Completed</button>
                </div>
                <div className='taskContainer'> {
                    tasks.map((task: Task, i: number) => {
                        return (
                            <Task
                                key={i}
                                index={i}
                                task={task}
                                functions={{
                                    taskChecked,
                                    deleteTask
                                }} />
                        );
                    })
                } </div>
            </div>
        </div>
    );
};

export default App;