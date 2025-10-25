import React from 'react';
import './styles/site-task.css';
import TodoList from "./components/TodoList";

export function SiteTask() {
     return (
         <div className="min-h-screen bg-gray-100 flex justify-center items-start">
             <TodoList/>
         </div>
     );
}

export default SiteTask;
