const NODES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const findRoot = (node: number): number =>
  node === NODES[node] ? node : findRoot(NODES[node])

export const union = (a: number, b: number): void => {
  const aRoot = findRoot(a)
  const bRoot = findRoot(b)
  NODES[aRoot] = bRoot
}

export const doTheyConnect = (a: number, b: number): boolean =>
  findRoot(a) === findRoot(b)

export class QuickUnion {
  public nodes: number[]

  public nodeSizes: number[]

  public constructor(init: number[] | number) {
    if (Array.isArray(init)) {
      this.nodes = init
      this.nodeSizes = init.map(
        () => this.nodes.filter((n) => n === NODES[n]).length,
      )
    } else {
      this.nodes = new Array(init).map((_, i) => i)
      this.nodeSizes = new Array(init).fill(1)
    }
  }

  public findRoot = (nodeIdx: number): number => {
    while (nodeIdx !== this.nodes[nodeIdx]) {
      this.nodes[nodeIdx] = this.nodes[this.nodes[nodeIdx]]
      nodeIdx = this.nodes[nodeIdx]
    }
    return nodeIdx
  }

  public union(a: number, b: number): void {
    const aRoot = this.findRoot(a)
    const bRoot = this.findRoot(b)
    if (aRoot === bRoot) return
    if (this.nodeSizes[aRoot] < this.nodeSizes[bRoot]) {
      this.nodes[aRoot] = bRoot
      this.nodeSizes[bRoot] += this.nodeSizes[aRoot]
    } else {
      this.nodes[bRoot] = aRoot
      this.nodeSizes[aRoot] += this.nodeSizes[bRoot]
    }
  }

  public doTheyConnect(a: number, b: number): boolean {
    return this.findRoot(a) === this.findRoot(b)
  }
}
