import React from 'react'
import ListItem from './list/ListItem';

export default class List extends React.Component {
    render () {
        return(
            <div className="col-sm-6">
                <h1>List 1</h1>
                <div className="list-group">
                    <ListItem />
                    <ListItem />
                </div>
          </div>
        )
    }
}