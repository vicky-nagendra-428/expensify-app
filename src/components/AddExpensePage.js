import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.onSubmit(expense);
        this.props.history.push('/');
    }
        
    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm 
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        onSubmit: (expense) => dispatch(startAddExpense(expense))
    }
}

export default connect(undefined, mapDispathToProps)(AddExpensePage);