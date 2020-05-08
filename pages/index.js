import React, {PureComponent} from 'react'
import Head from 'next/head'
import Popup from 'reactjs-popup'
import Link from 'next/link'


export default class Home extends PureComponent{

  state = {
    players: [],
    rows: [],
    gameLength: 0,
    displayPlayers: false,
    displayCustomLength: false,
  }

  componentDidMount() {
    this.handleAddRow();
  }

 handleChange = idx => e => {
     const { name, value } = e.target;
     const rows = [...this.state.rows];
     rows[idx] = {
       [name]: value
     };
     this.setState({
       rows
     });
   };
   handleNewRow = idx => e => {
       if(idx + 1 == this.state.rows.length) {
           this.handleAddRow();
       }
   }
   handleAddRow = () => {
     const item = {
       name: ""
     };
     this.setState({
       rows: [...this.state.rows, item]
     });
   };
   handleRemoveRow = () => {
     this.setState({
       rows: this.state.rows.slice(0, -1)
     });
   };
   handlePlayerSave = () => {
     let players = this.state.rows.filter(item => item.name != undefined && item.name != "").map(item => {
         return item.name;   
     });
     this.setState({
       players: players, 
       displayPlayers: true
      });
   };
   handleLengthChange = e => {
    const { value } = e.target;
    this.setState({gameLength: parseInt(value, 10)})
   };
   handleLengthSelect = e => {
    this.setState({gameLength: parseInt(e.target.value, 10)})
   };
  displayCustomLength = () => {
    this.setState({
      displayCustomLength: !this.state.displayCustomLength
    })
   };

  render() {

    let showPlayers = null;
    let showCustomLength = null;
    let showLength = null;
    let showContinuePlay = null;

    if(this.state.displayPlayers) {
      showPlayers = (
        <p style={{textAlign: "center", color: "#0070f3"}}>{this.state.players.length} player(s) selected</p>
      )
    }
    if(this.state.displayCustomLength) {
      showCustomLength = (
        <p>
          <input className="custom-length-input" type="text" onChange={this.handleLengthChange}></input>
        </p>
      )
    }
    if(this.state.gameLength != "") {
      showLength = (
        <p style={{textAlign: "center", color: "#0070f3"}}>You have selected {this.state.gameLength} holes</p>
      )
    }
    if(this.state.gameLength == 0 || this.state.players.length == 0){
      
      showContinuePlay = (<Popup trigger={
        <a className="card">
        <h3 style={{textAlign: "center"}} >Lets go &rarr;</h3>
        </a>} position="center center"
        closeOnDocumentClick>
          <span>Please select number of players and holes before continuing.</span>
    </Popup>)
    }else {
      showContinuePlay = (<Link href={{ pathname: '/game', query: {players: JSON.stringify(this.state.players), length: this.state.gameLength } }}>
        <a className="card">
          <h3 style={{textAlign: "center"}} >Lets go &rarr;</h3>
        </a>
      </Link>)
    }

    return (
      <div className="container">
      <main>
        <h1 className="title">
          Welcome to Fore-Score
        </h1>

        <p className="description">
          Your scorecard for firsbeegolf
        </p>
        
        <p id="desktop-disclaimer">Please visit me on a mobile device for the full experiance.</p>

        <div className="grid">
      <Popup trigger={
          <a className="card" onClick={this.displayAddPlayers}>
            <h3 style={{textAlign: "center"}}>Add players</h3>
            <p>Select who is playing</p>
            {showPlayers}
          </a>
          } contentStyle={{width: "90%"}} modal>
          {close => (
            <div className="modal">
                <a className="close" onClick={close}>
                &times;
                </a>
                <div className="header"> Add players</div>
                <div className="content">
                    <table>
                        <tbody>
                        {this.state.rows.map((item, idx) => (
                            <tr id="addr0" key={idx}>
                            <td>{idx + 1}</td>
                            <td>
                                <input
                                type="text"
                                name="name"
                                value={this.state.rows[idx].name}
                                onChange={this.handleChange(idx)}
                                onFocus={this.handleNewRow(idx)}
                                className="form-control"
                                />
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="actions">
                <button
                    className="button"
                    onClick={() => {
                    this.handlePlayerSave();
                    close();
                    }}>
                    Save
                </button>
                </div>
            </div>
            )}
      </Popup>

      <Popup trigger = {
          <a className="card">
            <h3 style={{textAlign: "center"}}>Length</h3>
            <p>How long is your game?</p>
            {showLength}
          </a> 
          } contentStyle={{width: "90%"}} modal>
            {close => (
              <div className="modal">
                <a className="close" onClick={close}>
                  &times;
                  </a>

                  <div className="header"> Select length</div>
                  <div className="content grid">
                    <div className="card-small">
                      <button className="button" onClick={e => {this.handleLengthSelect(e); close()}} value="9" >9</button>
                      <button className="button" onClick={e => {this.handleLengthSelect(e); close()}} value="12" >12</button>
                      <button className="button" onClick={e => {this.handleLengthSelect(e); close()}} value="18" >18</button>
                    </div>
                    <div  style={{textAlign: "center"}} className="card-big">
                      <button className="button custom-button" onClick={this.displayCustomLength}>custom</button>
                      {showCustomLength}
                    </div>
                  </div>
                  <div className="actions">
                  <button
                      className="button"
                      onClick={close}>
                      Save
                  </button>
                  </div>
              </div>
            )}
          </Popup>
          {showContinuePlay}
        </div>
      </main>

      <footer>
          Made by Jimmy Fagerholm
      </footer>

      <style jsx global>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 2rem;
        }

        .title,
        .description,
        #desktop-disclaimer {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.2rem;
        }
        #desktop-disclaimer {
          display: none;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 3rem;
        }

        .card {
          width: 80%;
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .card-small {
          margin: 0.5rem;
          flex-basis: 45%;
          padding: 1.5rem 0.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
        }
        .card-small button, .card-big button {
          min-width: 50px;
          font-size: 16px;
          background: none;
          border-radius: 15px;
          border: 3px solid #eaeaea;
          margin: 3px 10px;
          padding: 5px;
          text-transform: uppercase;
        }
        .card-big .custom-button{
          padding: 5px 20px;
        }
        .card-small button:hover,
        .card-small button:focus,
        .card-small button:active,
        .card-big button:hover,
        .card-big button:focus,
        .card.big button:active {
          color: #0070f3
          font-size: 1.5rem;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          text-align: center;
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
        @media (min-width: 800px) {
          #desktop-disclaimer {
            color: red;
            display: block;
            line-height: 1.5;
            font-size: 1.5rem;
          }
        }

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
        .modal {
          font-size: 16px;
        }
        .modal > .header {
          width: 100%;
          border-bottom: 1px solid gray;
          font-size: 18px;
          text-align: center;
          padding: 5px;
        }
        .modal > .content {
          width: 100%;
          padding: 10px 5px;
          border-bottom: 1px solid #eaeaea;
          font-size: 14px;
        }
        .modal > .actions {
          width: 100%;
          padding: 10px 5px;
          margin: auto;
          text-align: center;
        }
        .modal > .close {
          cursor: pointer;
          position: absolute;
          display: block;
          padding: 2px 5px;
          line-height: 20px;
          right: -10px;
          top: -10px;
          font-size: 24px;
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid #cfcece;
        
        }
        .modal > .actions > .button {
          font-family: Roboto,Arial,sans-serif;
            color: #000;
            cursor: pointer;
            padding: 0 30px;
            display: inline-block;
            margin: 10px 15px;
            text-transform: uppercase;
            line-height: 2em;
            outline: none;
            position: relative;
            font-size: 14px;
            border: 3px solid #cfcece;
            background-color: #fff;
            border-radius: 15px 15px 15px 15px;
            transition: all .3s;
        }
        table {
          width: 100%;
        }
        
        .tableRow{
          width: 100%;
          border-bottom: solid gray 1px;
        }
        .form-control {
          border: none;
          border-bottom: 1px solid;
          font-size: 1.5rem;
          padding: 0 5px;
          margin: 0 15px;
          width: 90%;
        }

        .custom-length-input {
          width: 80%;
          border: none;
          border-bottom: 1px solid #696969;
          font-size: 2rem;
          text-align: center;
        }

        @media screen and (min-width: 800px) {
          .popup-content {
            width: auto;
          }
        }
      `}</style>
    </div>
  )}
}