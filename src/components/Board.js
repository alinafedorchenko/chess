import React, { Component } from 'react'

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.result = [];
        this.listQueen = [];
        this.board = new Array(props.size).fill(new Array(props.size).fill(0));
    }

    componentWillReceiveProps = (nextProps) =>{
        if (this.props.clear_result) {
            this.result = [];
        }
        this.listQueen = [];
        this.board = new Array(parseInt(nextProps.size)).fill(new Array(parseInt(nextProps.size)).fill(0));
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

        for(var j = 0; j < this.props.size; j++) {
            if (this.allow(i, j)) {
                this.board[i][j] = 1;
                this.listQueen.push({i: i, j: j});
                if (i === this.props.size-1) {
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
        let n = this.props.size,
            rows = [];
        if (n < 11) {
            let queens = this.result[this.props.result];
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
            <div>
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
