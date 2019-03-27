import React from 'react'

export default class Content extends React.Component {
    render () {
        return (
            <div>
                <h1 className="title">
                    {testData.ProductName}
                </h1>
            </div>
        )
    }
}

var testData = [
    {
      ProductID: 0,
    	ProductName: "Test Product 1",
    	QuantityPerUnit: "100 units per box",
    	UnitPrice: "49.75",
    	Discontinued: false
    },
    {
      ProductID: 1,
    	ProductName: "Test Product 2",
    	QuantityPerUnit: "20 cases per pallet",
    	UnitPrice: "168.77",
    	Discontinued: false
    },
    {
      ProductID: 2,
    	ProductName: "Test Product 3",
    	QuantityPerUnit: "20 per box, 20 boxes",
    	UnitPrice: "4953.75",
    	Discontinued: false
    },
    {
      ProductID: 3,
    	ProductName: "Test Product 4",
    	QuantityPerUnit: "65 individually wrapped",
    	UnitPrice: "112.50",
    	Discontinued: true
    }
];