import React from 'react';
import ExpensesList  from './ExpenseList';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import numeral from 'numeral';
import getFilteredExpenses from '../selectors/expenses';
import getExpensesSum from '../selectors/expensesSum';

class ExpenseDashboardPage extends React.Component {
    state = {
        focusedInput: null
    }
    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    }
    onFocusChange = (focusedInput) => {
        this.setState(() => {
            return {
                focusedInput
            }
        })
    }
    getExpensesSum = (expenses, filters) => {
        
        const filteredExpenses = getFilteredExpenses(expenses, filters);
        const filteredExpensesSum = getExpensesSum(filteredExpenses);

        return <p>You are viewing {filteredExpenses.length} expenses, sum to {numeral(filteredExpensesSum / 100).format('$0,0.00')}</p>
        
    }
    render() {
        return (
            <div>
                <p>This is expense dashboard page</p>
                {this.getExpensesSum(this.props.expenses, this.props.filters)}
                <input type="text" value={this.props.filters.text}
                    onChange={(e) => {
                        this.props.dispatch(setTextFilter(e.target.value));
                        // dispatch is sent by the connect,
                    }}
                />
                sortBy
                <select
                    value={this.props.filters.sortBy}
                    onChange={(e) => {
                        e.target.value === 'amount' ? this.props.dispatch(sortByAmount()) : this.props.dispatch(sortByDate())
                    }}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker 
                    startDate={this.props.filters.startDate}
                    startDateId="ids1"
                    endDate={this.props.filters.endDate}
                    endDateId="ide1"
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    showClearDates={true}
                />
                <ExpensesList />
            </div>
        );
    } 
}

const connectReactRedux = (state) => {
    return {
        expenses: state.expenses,
        filters: state.filters
    }
};

export default connect(connectReactRedux)(ExpenseDashboardPage);