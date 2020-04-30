import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: undefined
        }
    }

    // state = {
    //     description: this.props.expense ? this.props.expense.description : '',
    //     note: this.props.expense ? this.props.expense.note : '',
    //     amount: this.props.expense ? (this.props.expense.amount / 100).toString() : '',
    //     createdAt: this.props.expense ? moment(this.props.expense.createdAt) : moment(),
    //     calendarFocused: false,
    //     error: undefined
    // }
    
    onDescriptionChnage = (e) => {
        const description = e.target.value
        this.setState(() => {
            return {
                description
            }
        })
    }
    onNoteChange = (e) => {
        const note = e.target.value
        this.setState(() => {
            return {
                note
            }
        })
    }
    onAmountChange = (e) => {
        const amount = e.target.value
        if(!amount || amount.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState(() => {
                return {
                    amount
                }
            })
        }
    }
    onDateChange = (createdAt) => {
        if(createdAt) {
            this.setState(() => ({ createdAt }))
        }
    }
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    }
    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.description || !this.state.amount) {
            this.setState(() => {
                return {
                    error: 'Please fill all mandatory fields'
                }
            })
        } else {
            this.setState(() => {
                return {
                    error: ''
                }
            })
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    }
    render() {
        return (
            <div>
                <h1>Expense Form</h1>
                <form
                    onSubmit={this.onSubmit}
                >
                    <input 
                        type="text"
                        placeholder="description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChnage}
                    />
                    <input 
                        type="text"
                        placeholder="amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <textarea 
                        placeholder="more notes"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    />
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        id="id1"
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <button
                        type="submit"
                    >Add Expense</button>
                </form>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        )
    }
};