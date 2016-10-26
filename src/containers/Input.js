import React, { Component } from 'react'

export default class Input extends Component {
    constructor() {
        super();
        this.state = {value: 5, res: 0};
    }

    handleSizeChange = (event) => {
        this.setState({value: event.target.value, res: 0});
        this.props.onSizeChanged(event.target.value);
    }

    handleResultChange = (event) => {
        this.setState({res: event.target.value});
        this.props.onResultChanged(event.target.value);
    }

    render() {
        return (
            <div>
                <p>Size:</p>
                <input
                    type="number"
                    value={this.state.value}
                    onChange={this.handleSizeChange}
                    min="4"
                    max="19"
                />
                <p>Solution: </p>
                <input
                    type="number"
                    value={this.state.res}
                    onChange={this.handleResultChange}
                    min="0"
                />
            </div>
        )
    }
}
