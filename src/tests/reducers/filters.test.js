import filterReducer from '../../reducers/filters';
import moment from 'moment';

test('default initialize to setup default state', () => {
    const result = filterReducer(undefined, { type: '@@INIT'});
    expect(result).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('set text filter', () => {
    const state = {
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    }
    const result = filterReducer(state, { type: 'SET_TEXT_FILTER', text: 'bill'})
    expect(result).toEqual({
        text: 'bill',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})