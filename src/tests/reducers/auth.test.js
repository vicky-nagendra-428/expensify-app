import authReducer from '../../reducers/auth';

test('LOGIN', () => {
    const result = authReducer({}, { type: 'LOGIN', uid: 'UID'});
    expect(result).toEqual({
        uid: 'UID'
    })
})

test('LOGOUT', () => {
    const result = authReducer({uid: 'UID'}, {type: 'LOGOUT'});
    expect(result).toEqual({})
})