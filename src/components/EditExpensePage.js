import React from 'react';
import  { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onUpdate = (expense) => {
        this.props.onSubmit(this.props.expense.id, expense)
        this.props.history.push("/")
    }
    onRemove = () => {
        this.props.onClick({id: this.props.expense.id})
        this.props.history.push("/")
    } 
    render() {
        return (
            <div>
                <h3>Edit expense</h3>
                <ExpenseForm 
                    expense={this.props.expense}
                    onSubmit={this.onUpdate}
                />
                <button
                    onClick={this.onRemove}
                >remove</button>
            </div>
        );
    }
} 

const connectReduxStore = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id
        })
    }
}

const connectDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (id, expense) => {
            dispatch(startEditExpense(id, expense))
        },
        onClick: (id) => {
            dispatch(startRemoveExpense(id))
        }
    }
}

export default connect(connectReduxStore, connectDispatchToProps)(EditExpensePage);