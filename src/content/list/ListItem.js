import React from 'react'

export default class ListItem extends React.Component {
    render () {
        return(
            <button type="button" className="list-group-item">
            <div className="row">
              <div class="col-sm-8">
                <h4>Top label</h4>
                <p>10 boxes at 20 bags</p>
              </div>
              <div class="col-sm-3 text-right">
                <h4>
                  99.99
                  <small class="text-muted">EUR</small>
                </h4>
                <p class="available">Available</p>
              </div>
              <div className="col-sm-1">
                <span className="glyphicon glyphicon-chevron-right pull-right" aria-hidden="true" />
              </div>
            </div>
          </button>
        )
    }
}