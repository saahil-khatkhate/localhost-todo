import React from 'react';

import { Task } from './app';

interface TaskProps {
    task: Task,
    index: number,
    functions: {
        taskChecked: (index: number, state: boolean) => void,
        deleteTask: (index: number) => void
    }
};

const Task: React.FC<TaskProps> = ({ task, index, functions }) => {
    const check = () => {
        functions.taskChecked(index, !task.isChecked);
    };

    const deleteTask = () => {
        functions.deleteTask(index);
    };

    return (
        <div className='task'>
            <button className={task.isChecked ? 'checkBox checked' : 'checkBox'} onClick={check}></button>
            <p className='content'>{ task.content }</p>
            <button className='deleteButton' onClick={deleteTask}>
                <i className='fa fa-lg fa-trash'></i>
            </button>
        </div>
    );
};

export default Task;