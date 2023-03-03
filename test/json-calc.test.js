const JSONCalc = require("../src/json-calc")

test('can deal with single object as well as with array', () => {
    expect(new JSONCalc().calc({ a: 3 })).toStrictEqual({ sum: { a: 3 } })
    expect(new JSONCalc().calc([{ a: 3 }])).toStrictEqual({ sum: { a: 3 } })
})

test('can calc all numbers', () => {
    const input = [
        {
            "foo": 1,
            "bar": 2
        },
        {
            "foo": 5,
            "bar": "blub",
            "baz": 10
        },
        {
            "foo": 8,
            "bar": 123
        }
    ]

    expect(new JSONCalc().calc(input)).toStrictEqual({
        sum: {
            foo: 14,
            bar: 125,
            baz: 10
        }
    })
})

test('can calc all numbers if key appears in all objects (allOrNothing)', () => {
    const input = [
        {
            "foo": 1,
            "bar": 2
        },
        {
            "foo": 5,
            "bar": "blub",
            "baz": 10
        },
        {
            "foo": 8,
            "bar": 123
        }
    ]

    expect(new JSONCalc().calc(input, { allOrNothing: true })).toStrictEqual({
        sum: {
            foo: 14
        }
    })
})

test('counts nothing if there are no numbers', () => {
    const input = [
        {
            "foo": "a",
            "bar": "a"
        },
        {
            "foo": "a",
            "bar": "blub",
            "baz": "b"
        },
        {
            "foo": "x",
            "bar": "z"
        }
    ]

    expect(new JSONCalc().calc(input)).toStrictEqual({
        sum: {}
    })
})

test('works with missing key in first object', () => {
    const input = [
        {
            "bar": 2
        },
        {
            "foo": 5,
            "bar": 1,
        },
        {
            "foo": 8,
            "bar": 123
        }
    ]

    expect(new JSONCalc().calc(input, { allOrNothing: true})).toStrictEqual({
        sum: {
            bar: 126,
        }
    })
})
