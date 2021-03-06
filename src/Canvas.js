import React, { Component } from 'react'
import axios from 'axios'
import Card from './Card'
import './Deck.css'
const BASE_URL = 'https://deckofcardsapi.com/api/deck'

class Canvas extends Component {
    constructor(props){
        super(props);
        this.state = {
            deck: '',
            drawn: []
        }
        this.getCard = this.getCard.bind(this);
    }

    async componentDidMount(){
        let response = await axios.get(BASE_URL + '/new/shuffle');
        this.setState({
            deck: response.data,
        });
    }

    async getCard(){
        let deck_id = this.state.deck.deck_id;
        try {
            const CARD_URL = `${BASE_URL}/${deck_id}/draw`;
            let cardRes = await axios.get(CARD_URL);
            if( !cardRes.data.success ){
                throw new Error ('No cards remaining');
            }
            
            console.log(cardRes.data);
            let card = cardRes.data.cards[0];
            this.setState(st => ({
                drawn: [...st.drawn, 
                    {
                    id: card.code,
                    image: card.image,
                    name: `${card.value} OF ${card.suit}`
                    }
                ]
            }))
        } catch(err){
            alert(err);
        }
    }

    render(){
        const card = this.state.drawn.map( c => (
             <Card image={c.image} name={c.name} key={c.id} />
        ))
        return(
            <div className='Deck'>
                <h1 className='Deck-header'>React Cards <i class="far fa-sun rotate"></i></h1>
                <button className='Deck-btn' onClick={this.getCard}>DEAL ME A CARD <i class="fas fa-star"></i></button>
                <div className='Deck-cardarea'>{card}</div>
            </div>
        )
    }
}

export default Canvas;