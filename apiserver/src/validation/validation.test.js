import { validateUsername, validatePassword } from './Account';

test('password should be more than 6',  ()=> {
    const r = validatePassword('aaaaa');
    expect(r).toBe(false);
});

test('should follow the pattern', function () {
    const r1 = validateUsername('ab.c-d_eFG3');
    expect(r1).toBe(true);
    const r2 = validateUsername('abcdefghi@');
    expect(r2).toBe(false);
    const r3 = validateUsername('abcdefghi#');
    expect(r3).toBe(false);
});