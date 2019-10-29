import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AppFrame from '../components/AppFrame';
import CustomersList from '../components/CustomersList';
import CustomersActions from '../components/CustomersActions';

const customers = [
    {
        "dni": "123",
        "name" : "Victor Smith",
        "age" : 37
    },
    {
        "dni": "456",
        "name": "José Smith",
        "age": "35"
    },
    {
        "dni": "789",
        "name": "Jhon Smith",
        "age": "32"       
    }
];

class CustomersContainer extends Component {

    componentDidMount() {
        this.props.fetchCustomers();
    }
    
    handleAddNew = () => {
        this.props.history.push("/customers/new");
    }
    
    renderBody = customers => (
        <div>
            <CustomersList 
                customers={customers}
                urlPath={'customers/'}
            />
            <CustomersActions>
                <button onClick={this.handleAddNew}>Nuevo Cliente</button>
            </CustomersActions>
        </div>
    )

    render() {
        return (
            <div>
                <AppFrame 
                    header={'Listado de Clientes'}
                    body={ this.renderBody(customers) }
                />
            </div>
        );
    }
}

CustomersContainer.propTypes = {
    fetchCustomers : PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    fetchCustomers : () => dispatch(fetchCustomers())
});

export default withRouter(connect(null, mapDispatchToProps)(CustomersContainer));