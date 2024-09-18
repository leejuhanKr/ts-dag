/* eslint-disable no-underscore-dangle */
/* eslint-disable max-classes-per-file */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DAGNode<T extends DAGNode<any>> {
  upstreamList: Set<T> = new Set();

  downstreamList: Set<T> = new Set();

  dag: DAG<T> | null = null;

  constructor() {
    this.dag = null;
  }

  getRoots() {
    return [...this.downstreamList].filter((node) => node.downstreamList.size === 0);
  }

  getLeaves() {
    return [...this.upstreamList].filter((node) => node.upstreamList.size === 0);
  }

  setUpstream(nodeOrNodeList: T | T[]) {
    this.setRelatives(nodeOrNodeList, false);
  }

  setDownstream(nodeOrNodeList: T | T[]) {
    this.setRelatives(nodeOrNodeList, true);
  }

  getDirectRelatives(isUpstream: boolean = false) {
    return isUpstream ? this.upstreamList : this.downstreamList;
  }

  private setRelatives(nodeOrNodeList: T | T[], isUpstream: boolean = false) {
    const nodeList = Array.isArray(nodeOrNodeList) ? nodeOrNodeList : [nodeOrNodeList];
    nodeList.forEach((node) => {
      if (isUpstream) {
        DAGNode.setRelative(node, this);
      } else {
        DAGNode.setRelative(this, node);
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static setRelative(fromNode: DAGNode<any>, toNode: DAGNode<any>) {
    if (DAGNode.wouldCreateCycle(fromNode, toNode)) {
      throw new Error('이 엣지를 추가하면 순환이 생성됩니다');
    }
    fromNode.upstreamList.add(toNode);
    toNode.downstreamList.add(fromNode);
  }

  private static wouldCreateCycle<U extends DAGNode<U>>(from: U, to: U): boolean {
    if (from === to) return true;
    const visited = new Set<U>();
    const stack: U[] = [to];

    while (stack.length > 0) {
      const current = stack.pop()!;
      if (current === from) return true;
      if (!visited.has(current)) {
        visited.add(current);
        stack.push(...current.upstreamList);
      }
    }

    return false;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DAG<T extends DAGNode<any>> {
  private readonly _nodeList: Map<string, T> = new Map();

  addNode(nodeId: string, Node: T) {
    if (this._nodeList.has(nodeId) && this._nodeList.get(nodeId) !== Node) {
      throw new Error(`Task with ID ${nodeId} already exists in this DAG`);
    }
    this._nodeList.set(nodeId, Node);
    this.getNode(nodeId)!.dag = this;
  }

  getNode(nodeId: string) {
    return this._nodeList.get(nodeId);
  }

  get nodeList() {
    return [...this._nodeList.values()];
  }

  get rootNodeList() {
    return this.nodeList.filter((node) => node.upstreamList.size === 0);
  }

  get leafNodeList() {
    return this.nodeList.filter((node) => node.downstreamList.size === 0);
  }
}
