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
                row => new Array(this.props.length).fill(0))
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

    createTable = () => {
        
        let table = []
        let table_header = [<td key="table-hole-header">Hole</td>]
        table_header.push(this.props.players.map((player, index) => {
            return (<td key={'table_header_' + index}>{player}</td>)
        }));
        table.push(<thead key={'table_head'}><tr key={'table_tr_header'}>{table_header}</tr></thead>)
        
        let rows = []
        for(let i = 0; i < this.props.length; i++) {
            let cols = []
            cols.push(<td key={'row_holeNr_' + i} className='td-hold'>{ i + 1 }</td>)
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
        return (
            <Layout>
                <h3 style={{textAlign: 'center'}}>This is a game of {this.props.length} holes</h3>
                <table>
                        {this.createTable()}
                </table>
                <Link href="/">
                <a><FontAwesomeIcon icon="arrow-left" /> Back</a>
                </Link>
                <style jsx global>{`
                table {
                    width: 100%;
                }
                table > * {
                    text-align: center;
                }
                table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }

                th, td {
                    padding: 3px;
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