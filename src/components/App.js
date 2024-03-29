import React, { Component } from 'react'
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

export class App extends Component {
    state = {
        fishes: {},
        order: {}
    };

    // some lifecycle events (3 for now)
    componentDidMount() {
        const {params} = this.props.match;
        // first reinstate localstorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)})
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    };

    // keep changes of order in local storage
    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    };

    // To prevent memory leak, this is needed after componentDidMount:
    componentWillUnmount(){
        base.removeBinding(this.ref);
    };


    addFish = fish => {
        // To update you need to:
        // 1. Take a copy of the existing state
        const fishes = {...this.state.fishes};
        // 2. Add new fish to the fishes
        fishes[`fish${Date.now()}`] = fish;  // Date.now is used for fish id
        // 3. Set the new fishes object to state
        this.setState({
            fishes: fishes  // one is const from line 15, one is key from state object from line 8
        });
        // shorter:   this.setState({ fishes });
    };

    updateFish = (key, updatedFish) => {
        // 1. Take a copy of the current state
        const fishes = {...this.state.fishes};
        // 2. Update that state
        fishes[key] = updatedFish;
        // 3. Set that to state
        this.setState({fishes});
    };

    deleteFish = (key) => {
        // 1. Take a copy of state
        const fishes = {...this.state.fishes};
        // 2. Update the state
        fishes[key] = null;
        // 3. set that to state
        this.setState({fishes});
    };

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    addToOrder = (key) => {
        // 1. take a copy of state
        const order = {...this.state.order};
        // 2. Either add to the order, or update the number in our order
        order[key] = order[key] + 1 || 1;
        // 3. Call setState to update our state object
        this.setState({ order });
    };

    removeFromOrder = (key) => {
        // 1. take a copy of state
        const order = {...this.state.order};
        // 2. Remove from order
        delete order[key];
        // 3. Call setState to update our state object
        this.setState({ order });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    {/* <Header age={50} cool={true} /> */}
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {/* <Fish /> */}
                        {/* looping through all keys in an Object */}
                        { Object.keys(this.state.fishes).map(key => (
                            <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
                        ))}
                    </ul>
                </div>
                {/* <Order {...this.state} /> */}
                <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
                <Inventory 
                    addFish={this.addFish} 
                    updateFish={this.updateFish} 
                    deleteFish={this.deleteFish} 
                    loadSampleFishes={this.loadSampleFishes} 
                    fishes={this.state.fishes} 
                />
            </div>
        )
    }
}

export default App
