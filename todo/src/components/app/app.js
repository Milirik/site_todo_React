import React, { Component } from 'react';

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddItem from "../add-item";

import './app.css'

export default class App extends Component{
    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make awesome app'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'all'
    };

    createTodoItem(label){
        return{
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData })=>{
            const idx = todoData.findIndex((el) => el.id === id);

            const newArr = [ ...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

            return{
                todoData: newArr
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({todoData})=>{
            const newArr = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newArr
            };
        });
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }


    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return{
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return{
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    }

    search(items, term){
        if (term.length === 0){
            return items;
        }

        return (items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        }));
    }

    onSearchChange = (term) => {
        this.setState({term})
    }

    filter(items, filter){
        console.log(filter)
        let newArr;
        if(filter === "active"){
            newArr = items.filter((el) => !el.done)
        }else if(filter === "done"){
            newArr = items.filter((el) => el.done)
        }
        else {
            newArr = items
        }
        return newArr
    }

    onFilter = (word) => {
        this.setState(() => {
            return{ filter: word};
        });
    }



    render() {
        const { todoData, term, filter } = this.state;

        const chosenItems = this.filter(todoData, filter)

        const visibleItems = this.search(chosenItems, term);



        const doneCount = todoData
            .filter((el) => el.done).length;

        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={doneCount} done={todoCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter onFilter = {(word) => this.onFilter(word)}/>
                </div>
                <TodoList
                    todos={visibleItems}
                    onDeleted={(id) => this.deleteItem(id)}
                    onToggleImportant = { this.onToggleImportant }
                    onToggleDone = { this.onToggleDone }
                />
                <AddItem onUpdate={this.addItem}/>
            </div>
        );
    }
}

