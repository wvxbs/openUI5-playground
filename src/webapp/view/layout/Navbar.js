import React from 'react'

export default class Navbar extends React.Component {
    render () {
        return (
            <div className="navbar is-white has-shadow" role="navigation">
                <div className="navbar-brand">
                    <div className="navbar-item">
                        <h1 className="title">Test</h1>    
                    </div>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button className="button is-primary"   >Aa</button>
                                <button className="button is-light">Aa</button>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}