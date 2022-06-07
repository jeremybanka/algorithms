import { Percolator } from "./percolate"

describe(`Percolator`, () => {
  it(`creates 102 sites`, () => {
    const myPercolator = new Percolator(10)
    console.log(myPercolator.sites)
    expect(myPercolator.sites.length).toBe(102)
    expect(myPercolator.sites[6]).toBe(100)
  })
  it(`opens a site`, () => {
    const myPercolator = new Percolator(5)
    myPercolator.open({ row: 0, col: 0 })
    console.log(myPercolator.sites)
    console.log(myPercolator.siteOpenStates)
    expect(myPercolator.siteOpenStates[0]).toBe(true)
  })
  // it(`should`)
})
