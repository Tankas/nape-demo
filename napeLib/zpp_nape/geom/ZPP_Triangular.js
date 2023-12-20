import ZPP_Set_ZPP_PartitionPair from '../util/ZPP_Set_ZPP_PartitionPair.js';
import ZNPList_ZPP_PartitionVertex from '../util/ZNPList_ZPP_PartitionVertex.js';
import ZPP_PartitionPair from './ZPP_PartitionPair.js';
export default class ZPP_Triangular {
	static lt(p,q) {
		if(!(p.y < q.y)) {
			if(p.y == q.y) {
				return p.x < q.x;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	static right_turn(a,b,c) {
		let ux = 0.0;
		let uy = 0.0;
		ux = c.x - b.x;
		uy = c.y - b.y;
		let vx = 0.0;
		let vy = 0.0;
		vx = b.x - a.x;
		vy = b.y - a.y;
		return vy * ux - vx * uy;
	}
	static delaunay(A,B,C,D) {
		let ux = 0.0;
		let uy = 0.0;
		let vx = 0.0;
		let vy = 0.0;
		let tmp;
		let tmp1;
		let tmp2;
		ux = C.x - B.x;
		uy = C.y - B.y;
		vx = B.x - A.x;
		vy = B.y - A.y;
		if(!(vy * ux - vx * uy >= 0)) {
			ux = D.x - C.x;
			uy = D.y - C.y;
			vx = C.x - B.x;
			vy = C.y - B.y;
			tmp2 = vy * ux - vx * uy >= 0;
		} else {
			tmp2 = true;
		}
		if(!tmp2) {
			ux = A.x - D.x;
			uy = A.y - D.y;
			vx = D.x - C.x;
			vy = D.y - C.y;
			tmp1 = vy * ux - vx * uy >= 0;
		} else {
			tmp1 = true;
		}
		if(!tmp1) {
			ux = B.x - A.x;
			uy = B.y - A.y;
			vx = A.x - D.x;
			vy = A.y - D.y;
			tmp = vy * ux - vx * uy >= 0;
		} else {
			tmp = true;
		}
		if(tmp) {
			return true;
		}
		return B.x * (C.y * D.mag - C.mag * D.y) - C.x * (B.y * D.mag - B.mag * D.y) + D.x * (B.y * C.mag - B.mag * C.y) - (A.x * (C.y * D.mag - C.mag * D.y) - C.x * (A.y * D.mag - A.mag * D.y) + D.x * (A.y * C.mag - A.mag * C.y)) + (A.x * (B.y * D.mag - B.mag * D.y) - B.x * (A.y * D.mag - A.mag * D.y) + D.x * (A.y * B.mag - A.mag * B.y)) - (A.x * (B.y * C.mag - B.mag * C.y) - B.x * (A.y * C.mag - A.mag * C.y) + C.x * (A.y * B.mag - A.mag * B.y)) > 0;
	}
	static optimise(P) {
		let F = P.vertices;
		let L = P.vertices;
		if(F != null) {
			let nite = F;
			while(true) {
				let p = nite;
				p.sort();
				p.mag = p.x * p.x + p.y * p.y;
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		if(ZPP_Triangular.edgeSet == null) {
			if(ZPP_Set_ZPP_PartitionPair.zpp_pool == null) {
				ZPP_Triangular.edgeSet = new ZPP_Set_ZPP_PartitionPair();
			} else {
				ZPP_Triangular.edgeSet = ZPP_Set_ZPP_PartitionPair.zpp_pool;
				ZPP_Set_ZPP_PartitionPair.zpp_pool = ZPP_Triangular.edgeSet.next;
				ZPP_Triangular.edgeSet.next = null;
			}
			ZPP_Triangular.edgeSet.lt = ZPP_PartitionPair.edge_lt;
			ZPP_Triangular.edgeSet.swapped = ZPP_PartitionPair.edge_swap;
		}
		let edgeStack;
		if(ZPP_PartitionPair.zpp_pool == null) {
			edgeStack = new ZPP_PartitionPair();
		} else {
			edgeStack = ZPP_PartitionPair.zpp_pool;
			ZPP_PartitionPair.zpp_pool = edgeStack.next;
			edgeStack.next = null;
		}
		let F1 = P.vertices;
		let L1 = P.vertices;
		if(F1 != null) {
			let nite = F1;
			while(true) {
				let p = nite;
				let q0 = p.next;
				p.diagonals.reverse();
				let cx_ite = p.diagonals.head;
				while(cx_ite != null) {
					let q = cx_ite.elt;
					if(q.id < p.id) {
						q0 = q;
						cx_ite = cx_ite.next;
						continue;
					}
					let q1 = cx_ite.next == null ? p.prev : cx_ite.next.elt;
					if(!ZPP_Triangular.delaunay(p,q0,q,q1)) {
						let ret;
						if(ZPP_PartitionPair.zpp_pool == null) {
							ret = new ZPP_PartitionPair();
						} else {
							ret = ZPP_PartitionPair.zpp_pool;
							ZPP_PartitionPair.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.a = p;
						ret.b = q;
						if(p.id < q.id) {
							ret.id = p.id;
							ret.di = q.id;
						} else {
							ret.id = q.id;
							ret.di = p.id;
						}
						let edge = ret;
						edgeStack.add(edge);
						edge.node = ZPP_Triangular.edgeSet.insert(edge);
					}
					q0 = q;
					cx_ite = cx_ite.next;
				}
				nite = nite.next;
				if(!(nite != L1)) {
					break;
				}
			}
		}
		while(edgeStack.next != null) {
			let edge = edgeStack.pop_unsafe();
			let A = edge.a;
			let C = edge.b;
			let B = A.next;
			let D = null;
			let cx_ite = A.diagonals.head;
			while(cx_ite != null) {
				let p = cx_ite.elt;
				if(p == C) {
					cx_ite = cx_ite.next;
					D = cx_ite == null ? A.prev : cx_ite.elt;
					break;
				}
				B = p;
				cx_ite = cx_ite.next;
			}
			A.diagonals.remove(C);
			C.diagonals.remove(A);
			if(C == B.next) {
				B.diagonals.add(D);
			} else {
				let cx_ite = B.diagonals.head;
				while(cx_ite != null) {
					let p = cx_ite.elt;
					if(p == C) {
						B.diagonals.insert(cx_ite,D);
						break;
					}
					cx_ite = cx_ite.next;
				}
			}
			if(A == D.next) {
				D.diagonals.add(B);
			} else {
				let cx_ite = D.diagonals.head;
				while(cx_ite != null) {
					let p = cx_ite.elt;
					if(p == A) {
						D.diagonals.insert(cx_ite,B);
						break;
					}
					cx_ite = cx_ite.next;
				}
			}
			ZPP_Triangular.edgeSet.remove_node(edge.node);
			let o = edge;
			o.a = o.b = null;
			o.node = null;
			o.next = ZPP_PartitionPair.zpp_pool;
			ZPP_PartitionPair.zpp_pool = o;
		}
		let o = edgeStack;
		o.a = o.b = null;
		o.node = null;
		o.next = ZPP_PartitionPair.zpp_pool;
		ZPP_PartitionPair.zpp_pool = o;
	}
	static triangulate(P) {
		let min = P.vertices;
		let max = P.vertices;
		let F = P.vertices.next;
		let L = P.vertices;
		if(F != null) {
			let nite = F;
			while(true) {
				let p = nite;
				if(p.y < min.y || p.y == min.y && p.x < min.x) {
					min = p;
				}
				if(max.y < p.y || max.y == p.y && max.x < p.x) {
					max = p;
				}
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		if(ZPP_Triangular.queue == null) {
			ZPP_Triangular.queue = new ZNPList_ZPP_PartitionVertex();
		}
		let rp = max.prev;
		let lp = max.next;
		ZPP_Triangular.queue.add(max);
		while(rp != min || lp != min) if(rp == min || lp != min && (rp.y < lp.y || rp.y == lp.y && rp.x < lp.x)) {
			ZPP_Triangular.queue.add(lp);
			lp.rightchain = false;
			lp = lp.next;
		} else {
			ZPP_Triangular.queue.add(rp);
			rp.rightchain = true;
			rp = rp.prev;
		}
		ZPP_Triangular.queue.add(min);
		if(ZPP_Triangular.stack == null) {
			ZPP_Triangular.stack = new ZNPList_ZPP_PartitionVertex();
		}
		ZPP_Triangular.stack.add(ZPP_Triangular.queue.pop_unsafe());
		let pre = ZPP_Triangular.queue.pop_unsafe();
		ZPP_Triangular.stack.add(pre);
		while(true) {
			let p = ZPP_Triangular.queue.pop_unsafe();
			if(ZPP_Triangular.queue.head == null) {
				break;
			}
			if(p.rightchain != ZPP_Triangular.stack.head.elt.rightchain) {
				while(true) {
					let s = ZPP_Triangular.stack.pop_unsafe();
					if(ZPP_Triangular.stack.head == null) {
						break;
					}
					P.add_diagonal(s,p);
				}
				ZPP_Triangular.stack.add(pre);
			} else {
				let q = ZPP_Triangular.stack.pop_unsafe();
				while(ZPP_Triangular.stack.head != null) {
					let s = ZPP_Triangular.stack.head.elt;
					let ux = 0.0;
					let uy = 0.0;
					ux = p.x - q.x;
					uy = p.y - q.y;
					let vx = 0.0;
					let vy = 0.0;
					vx = q.x - s.x;
					vy = q.y - s.y;
					let right = vy * ux - vx * uy;
					if(p.rightchain && right >= 0 || !p.rightchain && right <= 0) {
						break;
					}
					P.add_diagonal(s,p);
					q = s;
					ZPP_Triangular.stack.pop();
				}
				ZPP_Triangular.stack.add(q);
			}
			ZPP_Triangular.stack.add(p);
			pre = p;
		}
		if(ZPP_Triangular.stack.head != null) {
			ZPP_Triangular.stack.pop();
			while(ZPP_Triangular.stack.head != null) {
				let s = ZPP_Triangular.stack.pop_unsafe();
				if(ZPP_Triangular.stack.head == null) {
					break;
				}
				P.add_diagonal(max,s);
			}
		}
		return P;
	}
}
ZPP_Triangular.queue = null;
ZPP_Triangular.stack = null;
ZPP_Triangular.edgeSet = null;
