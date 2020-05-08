import React, { PureComponent } from 'react'
import { withRouter } from 'next/router'
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link';

class Game extends PureComponent {

    static async getInitialProps(ctx){
        return {players: JSON.parse(ctx.query.players), length: parseInt(ctx.query.length, 10)}
    }
    
    constructor(props){
        super(props);
        const {pathname, query } = this.props.router
        this.state = {
            score: Array(this.props.players.length).fill(0).map(
                row => new Array(this.props.length).fill(0)),
            spin: false,
        }
    }
    
    handleSubtractScore = (idx, player) => e => {
        this.setState(({ score }) => ({ score: 
            score.map((row, i) => {
                let newRow = row.map((player_score, j) => {
                    if(j === idx && i === player){
                        return player_score - 1;
                    }else{
                        return player_score;
                    }
                })
                return newRow;
            })
        }))
    }

    handleAddScore = (idx, player) => e => {
        
        if ("vibrate" in navigator) {
            navigator.vibrate(100);
        }
        this.setState(({ score }) => ({ score: 
            score.map((row, i) => {
                let newRow = row.map((player_score, j) => {
                    if(j === idx && i === player){
                        return player_score + 1;
                    }else{
                        return player_score;
                    }
                })
                return newRow;
            })
        }))
    }
    handleRefreshScore = () => {
        let score = Array(this.props.players.length).fill(0).map(
            row => new Array(this.props.length).fill(0)); 
        this.setState({
            score: score
        })
    }

    createTable = () => {
        
        let table = []
        let table_header = [<th key="table-hole-header">Hole</th>]
        table_header.push(this.props.players.map((player, index) => {
            return (<th key={'table_header_' + index}>{player}</th>)
        }));
        table.push(<thead key={'table_head'}><tr key={'table_tr_header'}>{table_header}</tr></thead>)
        
        let rows = []
        for(let i = 0; i < this.props.length; i++) {
            let cols = []
            cols.push(<td key={'row_holeNr_' + i} className='sticky-col td-hold'>{ i + 1 }</td>)
            for(let j = 0; j < this.props.players.length; j++) {
                cols.push(<td key={'row_' + i + '_entry_' + j} className="score-entry-row"><div className="score-grid" >
                <a className="td-entry score-button" onClick={this.handleSubtractScore(i, j)}><FontAwesomeIcon icon="minus" /></a>
                <p className="td-entry number">{this.state.score[j][i]}</p>
                <a className="td-entry score-button" onClick={this.handleAddScore(i, j)}><FontAwesomeIcon icon="plus" /></a></div></td>)
            }
            rows.push(<tr key={'table_row_' + i}>{cols}</tr>)
        }

        let totalRow = [<td key={'td_total_text'}>Total</td>]
        for(let j = 0; j < this.props.players.length; j++) {
            totalRow.push(<td className="td-total" key={'td_total_' + j}><p>{this.state.score[j].reduce((a, b) => a + b, 0)}</p></td>)
        }
        
        rows.push(<tr key="row_total">{totalRow}</tr>)
        table.push(<tbody key={'table_body'}>{rows}</tbody>)

        return table;
    }

    render() {
        const spin = this.state.spin
        return (
            <Layout>
                <table>
                        {this.createTable()}
                </table>
                <div style={{textAlign: 'center', padding: '1rem 0'}}>
                    <Link href="/">
                    <a><FontAwesomeIcon icon="arrow-left" /> Back</a>
                    </Link>
                    <p className={spin ? 'spin': ''} onClick={() => {this.setState({spin: true}); this.handleRefreshScore()}} 
                        onAnimationEnd={() => this.setState({ spin: false })} style={{             
                            fontSize: "1.2rem",
                            display: "inline-block",
                            marginLeft: "40px",
                            padding: "10px"}}><FontAwesomeIcon icon="sync-alt"/></p>
                </div>
                <style jsx global>{`
                
                .container {
                    padding: 0;
                    margin: 0;
                }
                table {
                    width: 100%;
                    position: relative;
                    top: 0;
                }
                table > * {
                    text-align: center;
                }
                table, th, td {
                    border-collapse: collapse;
                }
                th {
                    background: white;
                    position: sticky;
                    top: 0;
                    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
                }
                th, td {
                    padding: 3px;
                }
                tbody tr:nth-child(odd){
                    background-color: #7fafff;
                    color: #fff;
                }

                .score-entry-row {
                    padding: 3px;
                }
                .score-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    padding: 0;
                }
                .td-entry, .td-total p {
                    margin: auto;
                    padding: 10px 5px;
                }
                .td-total p, .td-hold{
                    font-weight: bold;
                }
                .score-entry-row {
                    padding: 7px;
                }
                .score-button {
                    border: 2px solid #eaeaea;
                    border-radius: 5px;
                    width: 40px;
                    height: 40px;
                }
                .score-button:active {
                    animation: pulse 0.5s 1 ease-out;
                }
                .spin {
                    color: #0070f3;
                    animation: spin 1s 1 ease-out;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    25% {
                        transform: rotate(90deg);
                        
                    }
                    50% {
                        transform: rotate(180deg);
                    
                    }
                    75% {
                        transform: rotate(270deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                @keyframes pulse {
                    from {
                        box-shadow:  0 0 0 0 rgba(0, 112, 243, 1),
                                    0 0 0 0 rgba(51,51,51,1);
                    }
                    to {
                        box-shadow:  0 0 0 0.45em rgba(0, 112, 243, 1),
                                    0 0 0 0.8em rgba(51,51,51,0);
                    }
                }
                `}</style>
        </Layout>
        )
    }
}
export default withRouter(Game);