export type Coordinates = { row: number; col: number }

export class Percolator {
  public sideLength: number
  public sites: number[] = []
  public siteSizes: number[] = []
  public siteOpenStates: boolean[] = []

  public constructor(sideLength: number) {
    const totalSites = sideLength * sideLength
    this.sideLength = sideLength
    const inFirstRow = (idx: number) => idx < sideLength
    const inLastRow = (idx: number) =>
      idx < totalSites && idx >= this.sideLength * (this.sideLength - 1)
    this.sites = Array(totalSites + 2)
      .fill(0)
      .map((_, index) =>
        inFirstRow(index)
          ? totalSites
          : inLastRow(index)
          ? totalSites + 1
          : index,
      )
    this.siteOpenStates = Array(totalSites + 2).fill(false)
    this.siteSizes = this.sites.map(
      (site) => this.sites.filter((s) => s === site).length,
    )
  }

  public getIdx({ row, col }: Coordinates): number {
    if (row < 0 || row >= this.sideLength) {
      throw new RangeError(`row ${row} is out of bounds`)
    }
    if (col < 0 || col >= this.sideLength) {
      throw new RangeError(`col ${col} is out of bounds`)
    }
    return row * this.sideLength + col
  }

  public getCoordinates(idx: number): Coordinates {
    if (idx < 0 || idx >= this.sites.length) {
      throw new RangeError(`idx ${idx} is out of bounds`)
    }
    return {
      row: Math.floor(idx / this.sideLength),
      col: idx % this.sideLength,
    }
  }

  public findRoot = (idx: number): number => {
    while (idx !== this.sites[idx]) {
      this.sites[idx] = this.sites[this.sites[idx]]
      idx = this.sites[idx]
    }
    return idx
  }

  public union(a: number, b: number): void {
    const aRoot = this.findRoot(a)
    const bRoot = this.findRoot(b)
    if (aRoot === bRoot) return
    if (this.siteSizes[aRoot] < this.siteSizes[bRoot]) {
      this.sites[aRoot] = bRoot
      this.siteSizes[bRoot] += this.siteSizes[aRoot]
    } else {
      this.sites[bRoot] = aRoot
      this.siteSizes[aRoot] += this.siteSizes[bRoot]
    }
  }

  public open({ row, col }: Coordinates): void {
    const idx = this.getIdx({ row, col })
    this.siteOpenStates[idx] = true
    const neighbors = this.getNeighbors(idx)
    neighbors.forEach((neighbor) => {
      if (this.isOpen(neighbor)) {
        this.union(idx, this.getIdx(neighbor))
      }
    })
  }

  public isOpen({ row, col }: Coordinates): boolean {
    const idx = this.getIdx({ row, col })
    return this.siteOpenStates[idx]
  }

  public getNeighbors = (idx: number): Coordinates[] => {
    const { row, col } = this.getCoordinates(idx)
    const neighbors = [
      { row: row - 1, col: col },
      { row: row + 1, col: col },
      { row: row, col: col - 1 },
      { row: row, col: col + 1 },
    ]
    return neighbors.filter(
      ({ row, col }) =>
        row >= 0 && row < this.sideLength && col >= 0 && col < this.sideLength,
    )
  }

  public findHowManyOpenSites(): number {
    return this.siteOpenStates.filter((site) => site).length
  }

  public isFull({ row, col }: Coordinates): boolean {
    const idx = this.getIdx({ row, col })
    return this.findRoot(idx) === this.sites[this.sites.length - 2]
  }
}
