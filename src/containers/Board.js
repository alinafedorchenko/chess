import React, { Component } from 'react'
import Input from './Input'

export default class Board extends Component {
    constructor() {
        super();
        this.state = {n: 5, res: 0};
        this.result = [];
        this.listQueen = [];
        this.board = new Array(this.state.n).fill(new Array(this.state.n).fill(0));
    }

    onSizeChanged = (newSize) =>{
        this.setState({n: newSize, res: 0});
        this.listQueen = [];
        this.board = new Array(parseInt(newSize)).fill(new Array(parseInt(newSize)).fill(0));
        this.result = [];
    }

    onResultChanged = (newRes) => {
        this.setState({res: newRes});
    }

    allow(i, j) {
        var result = true;
        this.listQueen.forEach(function(queen){
            if (i === queen['i'] || j === queen['j'] ||  Math.abs(i - queen['i']) === Math.abs(j - queen['j'])){
                result =  false;
            }
        });
        return result;
    }

    do_task(i = 0) {

        for(var j = 0; j < this.state.n; j++) {
            if (this.allow(i, j)) {
                this.board[i][j] = 1;
                this.listQueen.push({i: i, j: j});
                if (i === this.state.n-1) {
                    this.result.push(this.listQueen.map(function(num) { return num; }));
                } else {
                    this.do_task(i+1)
                }
                this.board[i][j] = 0;
                let index = this.listQueen.indexOf({i: i, j: j});
                this.listQueen.splice(index);
            }
        }
    }

    render() {
        if (this.result.length == 0) {
            this.do_task();
        }
        let n = this.state.n,
            rows = [];
        if (n < 20) {
            let queens = this.result[this.state.res];
            for (var i=0; i < n; i++){
                let cells = [];
                for (var j=0; j < n; j++) {
                    let queenClass = '';
                    if (queens[i]['i'] === i && queens[i]['j'] === j){
                        queenClass = 'queen';
                    }
                    cells.push(<td key={j} className={queenClass}></td>);
                }
                rows.push(<tr key={i}>{cells}</tr>);
            }
        }

        return (
            <div id="app">
                <Input onSizeChanged={this.onSizeChanged} onResultChanged={this.onResultChanged}/>
                <p>You have {this.result.length} solutions</p>
                <table>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}
