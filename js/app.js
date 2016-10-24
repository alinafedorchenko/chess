class Board extends React.Component {
    constructor() {
        super();
        this.state = {n: 5};
        this.result = [];
        this.listQueen = [];
        this.onInputChanged = this.onInputChanged.bind(this);
        this.board = new Array(this.state.n).fill(new Array(this.state.n).fill(0));
    }

    onInputChanged(newSize) {
        this.setState({ n: newSize});
        this.listQueen = [];
        this.board = new Array(parseInt(newSize)).fill(new Array(parseInt(newSize)).fill(0));
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
                this.result = this.listQueen.map(function(num) {
                    return num;
                });
                break;
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
        let n = this.state.n,
            rows = [];
        if (n < 20) {
            this.do_task();
            let queens = this.result;
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
        }

        return (
            <div id="app">
                <Input callbackParent={this.onInputChanged}/>
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

class Input extends React.Component {
    constructor() {
        super();
        this.state = {value: 5};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.callbackParent(event.target.value);
    }

    render() {
        return (
            <div>
                <input
                    type="number"
                    value={this.state.value}
                    onChange={this.handleChange}
                    min="4"
                    max="19"
                />
            </div>
        )
    }
}


class App extends React.Component {
    render() {
        return (
            <div id="app">
                <Board />
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
