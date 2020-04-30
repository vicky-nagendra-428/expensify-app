import { setTextFilter, setEndDate, setStartDate, sortByDate, sortByAmount } from '../../actions/filters';
import moment from 'moment';

test('set filter text', () => {
    const result = setTextFilter('text');
    expect(result).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'text'
    })
})

test('set filter text with default value', () => {
    const result = setTextFilter();
    expect(result).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})

test('sortByAmount', () => {
    const result = sortByAmount();
    expect(result).toEqual({
        type: 'SORT_BY_AMOUNT',
        sortBy: 'amount'
    })
})

test('sort by date', () => {
    const result = sortByDate();
    expect(result).toEqual({
        type: 'SORT_BY_DATE',
        sortBy: 'date'
    })
})

test('set start date', () => {
    const result = setStartDate(moment(0));
    expect(result).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
})

test('set end date', () => {
    const result = setEndDate(moment(0));
    expect(result).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
})