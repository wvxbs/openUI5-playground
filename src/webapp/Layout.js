import React from 'react'
import Content from './view/Content'
import Navbar from './view/layout/Navbar';

export default class Layout extends React.Component {
    render () {
        return (
            <div>
                <nav>
                    <Navbar />
                </nav>
                <div className="container">
                    <Content />
                </div>
            </div>
        )
    }
}