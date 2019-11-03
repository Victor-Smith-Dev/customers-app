import React, {Component} from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import HomeContainer from './containers/HomeContainer';
import CustomersContainer from './containers/CustomersContainer';
import CutomerContainer from './containers/CutomerContainer';

class App extends Component {

  renderHome = () => <HomeContainer/>;
  
  renderCustomerContainer = (dni_v ) => <CutomerContainer dni={dni_v}/>;

  renderCustomerListContainer = () => <CustomersContainer/>;

  renderCustomerNewContainer = () => <h1>Constomer New Container</h1>;

  render () {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={this.renderHome}/>
          <Route exact path="/customers" component={this.renderCustomerListContainer}/>
          <Switch>
            <Route path="/customers/new" component={this.renderCustomerNewContainer}/>
            <Route path="/customers/:dni" render = { props => this.renderCustomerContainer(props.match.params.dni)}/>   
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
