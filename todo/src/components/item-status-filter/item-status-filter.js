import React, { Component } from 'react'
import './item-status-filter.css'


export default class ItemStatusFilter extends Component {
    state = {
        word: "all"
    }

    onFilter = (word) =>{
        this.setState({ word });
        this.props.onFilter(word);
    }

    render() {
        let classNameAll = "btn "
        let classNameActive = "btn "
        let classNameDone = "btn "
        if(this.state.word === "all"){
            classNameAll += "btn-info"
            classNameActive += "btn-secondary"
            classNameDone += "btn-secondary"
        }
        else if(this.state.word === "active"){
            classNameAll += "btn-secondary"
            classNameActive += "btn-info"
            classNameDone += "btn-secondary"
        }
        else{
            classNameAll += "btn-secondary"
            classNameActive += "btn-secondary"
            classNameDone += "btn-info"
        }


        return (
            <div className="btn-group">
                <button type="button" onClick={() => this.onFilter("all")} className={classNameAll}>All</button>
                <button type="button" onClick={() => this.onFilter("active")} className={classNameActive}>Active</button>
                <button type="button" onClick={() => this.onFilter("done")} className={classNameDone}>Done</button>
            </div>
        );
    }
}
