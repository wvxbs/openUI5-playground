import React from 'react'

export default class TableItem extends React.Component {
    render () {
        return (	
                    <button type="button" className="list-group-item" id="product-list">
                        <div className="columns">
                            <div className="column">
                                <h4>{this.props.row.ProductName}</h4>
                                <p> {this.props.row.QuantityPerUnit}</p>
                            </div>
                            <div className="column">
                                <h4>
                                    {this.props.row.UnitPrice}
                                    <small className="text-muted"> EUR</small>
                                </h4>
                                <p>{this.props.row.Discontinued ? "Discontinued" : "Available"}</p>
                            </div>
                            <div className="column">
                                <span className="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true"></span>
                            </div>
                        </div>
                    </button>
            )
        }
}