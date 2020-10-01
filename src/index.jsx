import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        view: 'rewards'
      }
  
      this.changeView = this.changeView.bind(this);
    }
  
    changeView(option) {
      this.setState({
        view: option
      });
    }

    getRewards() {
        
    }

    getCategories() {
        
    }
  
    renderView() {

    }

    render() {
      return (
        <div>
          <div className="nav">
            <span className="logo"
              onClick={() => this.changeView('rewards')}>
              Rewards and Categories
            </span>
            <span className={this.state.view === 'rewards'
              ? 'nav-selected'
              : 'nav-unselected'}
              onClick={() => this.changeView('rewards')}>
              Save
            </span>
            <span className="nav-unselected">
              Undo
            </span>
          </div>

        <div className="flex-container">

          <div>
              Rewards
          </div>

 

          <div>
              Categories
          </div>

        </div>
          
  
          <div className="main">
            {this.renderView()}
          </div>
        </div>
      );
    }
  }
  
  ReactDOM.render(<App />, document.getElementById('miles'));