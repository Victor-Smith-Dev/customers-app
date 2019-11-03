import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';

class CutomerContainer extends Component {
    render() {
        return (
            <div>
                <AppFrame 
                    header={`Cliente ${this.props.dni}`} 
                    body={<p>Datos del cliente "{this.props.customers.name}"</p>}
                />
            </div>
        );
    }
}

CutomerContainer.propTypes = {
    dni : PropTypes.string.isRequired,
    customers : PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => ({
    customers :  state.customers.find( c => c.dni === props.dni )
});

export default connect(mapStateToProps, null)(CutomerContainer);