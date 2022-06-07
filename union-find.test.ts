import { QuickUnion } from "./union-find"

describe(`QuickUnion`, () => {
  it(`should pass the improve test`, () => {
    const myUnion = new QuickUnion([0, 0, 0, 0, 0, 0, 7, 8, 8, 8])
    myUnion.union(3, 6)
    expect(myUnion.nodes).toEqual([0, 0, 0, 0, 0, 0, 8, 8, 0, 8])
  })
})
