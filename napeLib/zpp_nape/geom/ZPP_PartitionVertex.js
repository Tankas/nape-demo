import ZNPList_ZPP_PartitionVertex from '../util/ZNPList_ZPP_PartitionVertex.js';
export default class ZPP_PartitionVertex {
	constructor() {
		this.node = null;
		this.prev = null;
		this.next = null;
		this.rightchain = false;
		this.helper = null;
		this.type = 0;
		this.diagonals = null;
		this.forced = false;
		this.y = 0.0;
		this.x = 0.0;
		this.mag = 0;
		this.id = 0;
		this.id = ZPP_PartitionVertex.nextId++;
		this.diagonals = new ZNPList_ZPP_PartitionVertex();
	}
	alloc() {
	}
	free() {
		this.helper = null;
	}
	copy() {
		let ret;
		if(ZPP_PartitionVertex.zpp_pool == null) {
			ret = new ZPP_PartitionVertex();
		} else {
			ret = ZPP_PartitionVertex.zpp_pool;
			ZPP_PartitionVertex.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.x = this.x;
		ret.y = this.y;
		ret.forced = this.forced;
		return ret;
	}
	sort() {
		let ux = 0.0;
		let uy = 0.0;
		let vx = 0.0;
		let vy = 0.0;
		ux = this.prev.x - this.x;
		uy = this.prev.y - this.y;
		vx = this.next.x - this.x;
		vy = this.next.y - this.y;
		let ret = vy * ux - vx * uy;
		let vorient = ret > 0 ? -1 : ret == 0 ? 0 : 1;
		let xxlist = this.diagonals;
		if(xxlist.head != null && xxlist.head.next != null) {
			let head = xxlist.head;
			let tail = null;
			let left = null;
			let right = null;
			let nxt = null;
			let listSize = 1;
			let numMerges;
			let leftSize;
			let rightSize;
			while(true) {
				numMerges = 0;
				left = head;
				head = null;
				tail = head;
				while(left != null) {
					++numMerges;
					right = left;
					leftSize = 0;
					rightSize = listSize;
					while(right != null && leftSize < listSize) {
						++leftSize;
						right = right.next;
					}
					while(leftSize > 0 || rightSize > 0 && right != null) {
						if(leftSize == 0) {
							nxt = right;
							right = right.next;
							--rightSize;
						} else if(rightSize == 0 || right == null) {
							nxt = left;
							left = left.next;
							--leftSize;
						} else {
							let tmp;
							if(vorient == 1) {
								ux = left.elt.x - this.x;
								uy = left.elt.y - this.y;
								vx = right.elt.x - this.x;
								vy = right.elt.y - this.y;
								let ret = vy * ux - vx * uy;
								tmp = (ret > 0 ? -1 : ret == 0 ? 0 : 1) == 1;
							} else {
								ux = this.prev.x - this.x;
								uy = this.prev.y - this.y;
								vx = left.elt.x - this.x;
								vy = left.elt.y - this.y;
								let ret = vy * ux - vx * uy;
								let d1 = ret > 0 ? -1 : ret == 0 ? 0 : 1;
								ux = this.prev.x - this.x;
								uy = this.prev.y - this.y;
								vx = right.elt.x - this.x;
								vy = right.elt.y - this.y;
								let ret1 = vy * ux - vx * uy;
								let d2 = ret1 > 0 ? -1 : ret1 == 0 ? 0 : 1;
								if(d1 * d2 == 1 || d1 * d2 == 0 && (d1 == 1 || d2 == 1)) {
									ux = left.elt.x - this.x;
									uy = left.elt.y - this.y;
									vx = right.elt.x - this.x;
									vy = right.elt.y - this.y;
									let ret = vy * ux - vx * uy;
									tmp = (ret > 0 ? -1 : ret == 0 ? 0 : 1) == 1;
								} else if(d1 == -1 || d2 == -1) {
									tmp = d2 == -1;
								} else if(d1 == 0 && d2 == 0) {
									ux = this.x - this.prev.x;
									uy = this.y - this.prev.y;
									vx = left.elt.x - this.x;
									vy = left.elt.y - this.y;
									let d1 = ux * vx + uy * vy;
									vx = right.elt.x - this.x;
									vy = right.elt.y - this.y;
									let d2 = ux * vx + uy * vy;
									tmp = d1 < 0 && d2 > 0 ? true : d2 < 0 && d1 > 0 ? false : true;
								} else {
									tmp = true;
								}
							}
							if(tmp) {
								nxt = left;
								left = left.next;
								--leftSize;
							} else {
								nxt = right;
								right = right.next;
								--rightSize;
							}
						}
						if(tail != null) {
							tail.next = nxt;
						} else {
							head = nxt;
						}
						tail = nxt;
					}
					left = right;
				}
				tail.next = null;
				listSize <<= 1;
				if(!(numMerges > 1)) {
					break;
				}
			}
			xxlist.head = head;
			xxlist.modified = true;
			xxlist.pushmod = true;
		}
	}
	static get(x) {
		let ret;
		if(ZPP_PartitionVertex.zpp_pool == null) {
			ret = new ZPP_PartitionVertex();
		} else {
			ret = ZPP_PartitionVertex.zpp_pool;
			ZPP_PartitionVertex.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.x = x.x;
		ret.y = x.y;
		return ret;
	}
	static rightdistance(edge,vert) {
		let flip = edge.next.y > edge.y;
		let ux = 0.0;
		let uy = 0.0;
		ux = edge.next.x - edge.x;
		uy = edge.next.y - edge.y;
		let vx = 0.0;
		let vy = 0.0;
		vx = vert.x - edge.x;
		vy = vert.y - edge.y;
		return (flip ? -1.0 : 1.0) * (vy * ux - vx * uy);
	}
	static vert_lt(edge,vert) {
		if(vert == edge || vert == edge.next) {
			return true;
		} else if(edge.y == edge.next.y) {
			let x = edge.x;
			let y = edge.next.x;
			return (x < y ? x : y) <= vert.x;
		} else {
			return ZPP_PartitionVertex.rightdistance(edge,vert) <= 0.0;
		}
	}
	static edge_swap(p,q) {
		let t = p.node;
		p.node = q.node;
		q.node = t;
	}
	static edge_lt(p,q) {
		if(p == q && p.next == q.next) {
			return false;
		}
		if(p == q.next) {
			return !ZPP_PartitionVertex.vert_lt(p,q);
		} else if(q == p.next) {
			return ZPP_PartitionVertex.vert_lt(q,p);
		} else if(p.y == p.next.y) {
			if(q.y == q.next.y) {
				let x = p.x;
				let y = p.next.x;
				let x1 = q.x;
				let y1 = q.next.x;
				return (x > y ? x : y) > (x1 > y1 ? x1 : y1);
			} else if(!(ZPP_PartitionVertex.rightdistance(q,p) > 0.0)) {
				return ZPP_PartitionVertex.rightdistance(q,p.next) > 0.0;
			} else {
				return true;
			}
		} else {
			let qRight = ZPP_PartitionVertex.rightdistance(p,q);
			let qNextRight = ZPP_PartitionVertex.rightdistance(p,q.next);
			if(qRight == 0 && qNextRight == 0) {
				let x = p.x;
				let y = p.next.x;
				let x1 = q.x;
				let y1 = q.next.x;
				return (x > y ? x : y) > (x1 > y1 ? x1 : y1);
			}
			if(qRight * qNextRight >= 0) {
				if(!(qRight < 0)) {
					return qNextRight < 0;
				} else {
					return true;
				}
			}
			let pRight = ZPP_PartitionVertex.rightdistance(q,p);
			let pNextRight = ZPP_PartitionVertex.rightdistance(q,p.next);
			if(pRight * pNextRight >= 0) {
				if(!(pRight > 0)) {
					return pNextRight > 0;
				} else {
					return true;
				}
			}
			return false;
		}
	}
}
ZPP_PartitionVertex.nextId = 0;
ZPP_PartitionVertex.zpp_pool = null;
