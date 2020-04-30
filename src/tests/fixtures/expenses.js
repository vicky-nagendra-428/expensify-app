import moment from 'moment';

export default ([
    {
        id: 1,
        description: 'Gum',
        note: '',
        amount: 120,
        createdAt: 0
    },
    {
        id: 2,
        description: 'Water bill',
        note: '',
        amount: 100,
        createdAt: moment(0).subtract(4, 'days').valueOf()
    },
    {
        id: 3,
        description: 'Food bill',
        note: '',
        amount: 200,
        createdAt: moment(0).add(4, 'days').valueOf()
    }
]);