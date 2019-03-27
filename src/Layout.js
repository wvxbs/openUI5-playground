import React from 'react'
import Content from 'react'

export default class Layout extends React.Component {
    render () {
        return (
            <div>
                <div className="container">
                    <Content />
                </div>
            </div>
        )
    }
}