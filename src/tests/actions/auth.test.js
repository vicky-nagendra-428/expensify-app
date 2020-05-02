import { login, logout, startLogin, startLogout } from '../../actions/auth';

test('login', () => {
    const result = login('uid');
    expect(result).toEqual({
        type: 'LOGIN',
        uid: 'uid'
    })
})

test('logout', () => {
    const result = logout();
    expect(result).toEqual({
        type: 'LOGOUT'
    })
})