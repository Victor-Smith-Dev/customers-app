import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import AppFrame from '../components/AppFrame';
import { getCustomerByDni } from '../selectors/customers';
import CustomerEdit from '../components/CustomerEdit';
import CustomerData from '../components/CustomerData';
import { fetchCustomers } from '../actions/fetchCustomers';
import { updateCustomer } from '../actions/updateCustomer';

class CutomerContainer extends Component {

    componentDidMount() {
        if (!this.props.customer) {
            this.props.fetchCustomers();
        }
    }

    handleSubmit = values => {
        console.log(JSON.stringify(values));
        const { id } = values;
        return this.props.updateCustomer(id, values);
    };

    handleOnBack = () => {
        this.props.history.goBack();
    };

    handleSubmitSuccess = () => {
        this.props.history.goBack();
    }

    renderBody = () => (
        <Route 
            path="/customers/:dni/edit"
            children={
                ({ match }) => {
                    const CustomerControl = match ? CustomerEdit : CustomerData;
                    if (this.props.customers){
                        return <CustomerControl {...this.props.customers} 
                        onSubmit={this.handleSubmit}
                        onSubmitSuccess={this.handleSubmitSuccess}
                        onBack={this.handleOnBack}/> 
                    }
                    return null;
                }
            }
        />
    );

    //<p>Datos del cliente "{this.props.customers.name}"</p>

    render() {
        return (
            <div>
                <AppFrame 
                    header={`Cliente ${this.props.dni}`} 
                    body={this.renderBody()}
                />
            </div>
        );
    }
}

CutomerContainer.propTypes = {
    dni : PropTypes.string.isRequired,
    customers : PropTypes.object,
    fetchCustomers : PropTypes.func.isRequired,
    updateCustomer : PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    customers :  getCustomerByDni(state, props)
});



export default withRouter(
    connect(mapStateToProps, { 
        fetchCustomers, 
        updateCustomer 
    })(CutomerContainer)
);