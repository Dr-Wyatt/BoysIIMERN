import React, { Component } from "react";

class Groups extends Component {
    render () {
        return (
            //add some kind of mapping to add a card for every group you're in
            
                <div className="card col m5">
                    <div className="card-header">
                        <h5>Groups I'm In</h5>
                    </div>
                        <div className="card-content">
                        <div className="card-stacked">
                                <div className="section">
                                <h5>Leon</h5>
                                <p>Most likely to use puns</p>
                                <div className="divider"></div>
                                </div>
                                <div className="section">
                                <h5>Leon</h5>
                                <p>Most likely to use puns</p>
                                <div className="divider"></div>
                                </div>
                                <div className="section">
                                <h5>Leon</h5>
                                <p>Most likely to use puns</p>
                                <div className="divider"></div>
                                </div>
                            </div>
                            </div>
                </div>
          
        )
    }
}

export default Groups