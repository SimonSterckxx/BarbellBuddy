import { User } from "../../domain/model/user";

test('given valid values for user, when creating a user, then the user is created', () => {
    //given
    const username = 'username'
    const password = 'password'
    const role = 'Trainee'
    const age = 20
    const weight = 70
    const height = 170

    //when
    const user = new User({ username, password, role, age, weight, height })

    //then
    expect(user.username).toBe(username)
    expect(user.password).toBe(password)
    expect(user.role).toBe(role)
    expect(user.age).toBe(age)
    expect(user.weight).toBe(weight)
    expect(user.height).toBe(height)
    expect(user.createdAt).toBeDefined()
});

test('given: an existing user, when: creating a user with the same username, then: an error is thrown', () => {
    //given
    const username = 'username'
    const password = 'password'
    const role = 'Trainee'
    const age = 20
    const weight = 70
    const height = 170

    //when
    const user = new User({ username, password, role, age, weight, height })

    //then
    expect(() => new User({ username, password, role, age, weight, height })).toThrowError('Username is required')
})