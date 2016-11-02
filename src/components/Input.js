import React, { Component } from 'react'

export default class Input extends Component {
    constructor(props) {
        super(props);
    }

    handleSizeChange = (event) => {
        this.props.setSize(event.target.value)
    }

    handleResultChange = (event) => {
        this.props.setResult(event.target.value)
    }

    render() {
        return (
            <div>
                <p>Size:</p>
                <input
                    type="number"
                    defaultValue='5'
                    onChange={this.handleSizeChange}
                    min="4"
                    max="10"
                />
                <p>Solution: </p>
                <input
                    type="number"
                    value={this.props.result}
                    onChange={this.handleResultChange}
                    min="0"
                />
            </div>
        )
    }
}
