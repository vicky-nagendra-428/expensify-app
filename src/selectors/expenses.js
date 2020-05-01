import moment from 'moment';

export default (expenses, {text, sortBy, startDate, endDate}) => {

    return expenses.filter( (expense) => {

        const createdAtMoment = moment(expense.createdAt);
        const startDt = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
        const endDt = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
        const textMatch = expense.description.toLowerCase().includes(text)

        return startDt && endDt && textMatch
    }
        ).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        } else {
            return 0;
        }
    })
};