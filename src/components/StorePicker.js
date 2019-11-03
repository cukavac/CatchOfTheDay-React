import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    // handleClick() {
    //     alert("Hejjjjjj!");
    // }

    // constructor() {
    //     super();
    //     this.goToStore = this.goToStore.bind(this);
    // }

    myInput = React.createRef();

    // goToStore(event)
    // now it`s a property on a component, just like myInput above
    goToStore = (event) => {
        // 1. Stop the form from submitting
        event.preventDefault();
        // 2. Get the text from that input
        const storeName = this.myInput.current.value;
        // 3. Change the page to /store/whatever-they-entered
        this.props.history.push(`/store/${storeName}`);
    }

    render() {
        return (
            <React.Fragment>
                {/* <p>Hello! new</p> */}
                <form className="store-selector" onSubmit={this.goToStore}>
                    {/* my comment */}
                    <h2>Please Enter a Store</h2>

                    {/* <button onClick={this.handleClick}>Click me!</button> */}

                    <input type="text" ref={this.myInput} required placeholder="Store Name" defaultValue={getFunName()} />
                    <button type="submit">Visit Store -></button>
                </form> 
            </React.Fragment>
        )
    }
}

export default StorePicker;