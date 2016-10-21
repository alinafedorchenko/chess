class Board extends React.Component {
    constructor(props) {
        super(props);
        this.result = [];
    }

    allow(i, j) {
        var result = true;
        this.props.listQueen.forEach(function(queen){
            if (i === queen['i'] || j === queen['j'] ||  Math.abs(i - queen['i']) === Math.abs(j - queen['j'])){
                result =  false;
            }
        });
        return result;
    }

    do_task(i = 0) {
    for(var j = 0; j < this.props.n; j++) {
        if (this.allow(i, j)) {
            this.props.board[i][j] = 1;
            this.props.listQueen.push({i: i, j: j});
            if (i === this.props.n-1) {
                this.result = this.props.listQueen.map(function(num) {
                    return num;
                });
                break;
            } else {
                this.do_task(i+1)
            }
            this.props.board[i][j] = 0;
            let index = this.props.listQueen.indexOf({i: i, j: j});
            this.props.listQueen.splice(index);
        }
      }
    }

    render() {
        this.do_task();
        let rows = [],
            n = this.props.n,
            queens = this.result;
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
        };
        return (
            <div>
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {value: 12, listQueen: []};
        this.handleChange = this.handleChange.bind(this);
        this.board = new Array(this.state.value).fill(new Array(this.state.value).fill(0));
    }

    handleChange(event) {
        this.setState({value: event.target.value, listQueen: []});
    }

    render() {
        return (
            <div id="app">
                <input
                    type="number"
                    value={this.state.value}
                    onChange={this.handleChange}
                    min="4"
                    max="12"
                />
                <p>Enter number from 4 to 12</p>
                <Board n={this.state.value} listQueen={this.state.listQueen} board={this.board}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
