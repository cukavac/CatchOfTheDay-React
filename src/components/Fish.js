import React, { Component } from 'react'
import { formatPrice } from '../helpers'

export class Fish extends Component {
    // handleClick = () => {
    //     this.props.addToOrder(this.props.index);
    // }

    render() {
        // const image = this.props.details.image;
        // const name = this.props.details.name;
        // shorter
        const {image, name, price, desc, status } = this.props.details;
        const isAvailable = status === 'available';

        return (
            <li className="menu-fish">
                {/* <span role="img" aria-label="fish emoji">🐟</span> */}
                <img src={image} alt={name} />
                <h3 className="fish-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                {/* <button disabled={!isAvailable} onClick={this.handleClick}> */}
                <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>
                    {isAvailable ? 'Add to Order' : 'Sold Out!'}
                </button>
            </li>
        )
    }
}

export default Fish
