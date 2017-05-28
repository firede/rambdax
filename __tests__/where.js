const R = require("../rambdax")

const delay = () => new Promise(resolve => {
  setTimeout(() => {
    resolve(R.take(5, `${ Math.random() }`))
  }, 333)
})

describe("when", () => {
  it("", async () => {
    const whenWrapper = R.produce({
      foo : async () => {
        const result = await delay()

        return result
      },
      bar : inputArgument => inputArgument === 5,
    })

    const result = await whenWrapper(5)

    expect(
        result.bar
      ).toEqual(true)

    expect(
        typeof result.foo
      ).toEqual("string")
  })
})

describe("intersection", () => {
  it("", () => {
    expect(
        R.intersection([ 1, 3, 5 ], [ 2, 3, 5 ])
      ).toEqual([ 3, 5 ])
  })
})

describe("mergeAll", () => {
  it("", () => {
    expect(
        R.mergeAll([ { foo : 1 }, { bar : 2 }, { baz : 3 } ])
      ).toEqual({
        foo : 1,
        bar : 2,
        baz : 3,
      })
  })
})

describe("memoize", () => {
  it("", () => {
    let count = 0
    const tester = R.memoize(n => {
      count++

      return n + 6
    })
    tester(5)
    tester(5)
    tester(5)

    expect(
        tester(5)
      ).toEqual(11)

    expect(
        count
      ).toEqual(1)

    tester(6)

    expect(
        tester(6)
      ).toEqual(12)

    expect(
        count
      ).toEqual(2)
  })
})

describe("once", () => {
  it("", () => {
    const addOneOnce = R.once(x => x + 1)

    addOneOnce(10)
    expect(
        addOneOnce(40)
      ).toEqual(11)
  })
})

describe("tap", () => {
  it("", () => {
    let a = 1
    const sayX = x => a = x
    expect(
        R.tap(sayX, 100)
      ).toEqual(100)
    expect(
        a
      ).toEqual(100)
  })
})

describe("where", () => {
  it("", () => {
    const pred = R.where({
      a : R.equals("foo"),
      b : R.equals("bar"),
    })
    expect(
        pred({
          a : "foo",
          b : "bar",
          x : 11,
          y : 19,
        })
      ).toEqual(true)
  })

  it("", () => {
    const pred = R.where({
      a : R.equals("foo"),
      b : R.equals("baz"),
    })
    expect(
        pred({
          a : "foo",
          b : "bar",
          x : 11,
          y : 19,
        })
      ).toEqual(false)
  })
})