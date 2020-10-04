import React, { Component } from 'react'

class Card extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <img className="Card" src={this.props.image} alt={this.props.name} />
            </div>
        )
    }
}

export default Card;