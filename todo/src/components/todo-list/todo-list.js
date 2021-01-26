import React from "react";
import TodoListItem from '../todo-list-item/todo-list-item'
import './todo-list.css';

const TodoList = ({todos, onDeleted, onToggleDone, onToggleImportant}) => {
    const items = todos.map((item) =>{

        const {id, ... props} = item;
        return(
            <li key={id} className="list-group-item">
                <TodoListItem
                    {... props}
                    onDeleted={() => onDeleted(id)}
                    onToggleImportant = {() => onToggleImportant(id)}
                    onToggleDone = {() => onToggleDone(id)}
                />
            </li>
        );
    });

    return(
        <ul className="list-group todo-list">
            {items}
        </ul>
    );
};

export default TodoList;