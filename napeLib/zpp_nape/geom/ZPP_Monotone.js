import ZPP_Set_ZPP_PartitionVertex from '../util/ZPP_Set_ZPP_PartitionVertex.js';
import ZNPList_ZPP_PartitionVertex from '../util/ZNPList_ZPP_PartitionVertex.js';
import ZPP_Vec2 from './ZPP_Vec2.js';
import ZPP_PartitionedPoly from './ZPP_PartitionedPoly.js';
import ZPP_PartitionVertex from './ZPP_PartitionVertex.js';
export default class ZPP_Monotone {
	static bisector(b) {
		let a = b.prev;
		let c = b.next;
		let ux = 0.0;
		let uy = 0.0;
		ux = b.x - a.x;
		uy = b.y - a.y;
		let vx = 0.0;
		let vy = 0.0;
		vx = c.x - b.x;
		vy = c.y - b.y;
		let ret;
		if(ZPP_Vec2.zpp_pool == null) {
			ret = new ZPP_Vec2();
		} else {
			ret = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.weak = false;
		ret._immutable = false;
		ret.x = -uy - vy;
		ret.y = ux + vx;
		let ret1 = ret;
		let d = ret1.x * ret1.x + ret1.y * ret1.y;
		let imag = 1.0 / Math.sqrt(d);
		let t = imag;
		ret1.x *= t;
		ret1.y *= t;
		if(vy * ux - vx * uy < 0) {
			ret1.x = -ret1.x;
			ret1.y = -ret1.y;
		}
		return ret1;
	}
	static below(p,q) {
		if(p.y < q.y) {
			return true;
		} else if(p.y > q.y) {
			return false;
		} else if(p.x < q.x) {
			return true;
		} else if(p.x > q.x) {
			return false;
		} else {
			let po = ZPP_Monotone.bisector(p);
			let qo = ZPP_Monotone.bisector(q);
			let t = 1.0;
			po.x += p.x * t;
			po.y += p.y * t;
			let t1 = 1.0;
			qo.x += q.x * t1;
			qo.y += q.y * t1;
			let ret = po.x < qo.x || po.x == qo.x && po.y < qo.y;
			let o = po;
			if(o.outer != null) {
				o.outer.zpp_inner = null;
				o.outer = null;
			}
			o._isimmutable = null;
			o._validate = null;
			o._invalidate = null;
			o.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o;
			let o1 = qo;
			if(o1.outer != null) {
				o1.outer.zpp_inner = null;
				o1.outer = null;
			}
			o1._isimmutable = null;
			o1._validate = null;
			o1._invalidate = null;
			o1.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o1;
			return ret;
		}
	}
	static above(p,q) {
		return ZPP_Monotone.below(q,p);
	}
	static left_vertex(p) {
		let pre = p.prev;
		if(!(pre.y > p.y)) {
			if(pre.y == p.y) {
				return p.next.y < p.y;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	static isMonotone(P) {
		let min = P;
		let max = P;
		let F = P.next;
		let L = P;
		if(F != null) {
			let nite = F;
			while(true) {
				let p = nite;
				if(p.y < min.y) {
					min = p;
				}
				if(p.y > max.y) {
					max = p;
				}
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		let ret = true;
		let pre = min;
		if(max != min.next) {
			let F = min.next;
			let L = max;
			if(F != null) {
				let nite = F;
				while(true) {
					let p = nite;
					if(p.y < pre.y) {
						ret = false;
						break;
					}
					pre = p;
					nite = nite.next;
					if(!(nite != L)) {
						break;
					}
				}
			}
		}
		if(!ret) {
			return false;
		}
		pre = min;
		if(max != min.prev) {
			let F = min.prev;
			let L = max;
			if(F != null) {
				let nite = F;
				while(true) {
					let p = nite;
					if(p.y < pre.y) {
						ret = false;
						break;
					}
					pre = p;
					nite = nite.prev;
					if(!(nite != L)) {
						break;
					}
				}
			}
		}
		return ret;
	}
	static getShared() {
		if(ZPP_Monotone.sharedPPoly == null) {
			ZPP_Monotone.sharedPPoly = new ZPP_PartitionedPoly();
		}
		return ZPP_Monotone.sharedPPoly;
	}
	static decompose(P,poly) {
		if(poly == null) {
			poly = new ZPP_PartitionedPoly(P);
		} else {
			poly.init(P);
		}
		if(poly.vertices == null) {
			return poly;
		}
		if(ZPP_Monotone.queue == null) {
			ZPP_Monotone.queue = new ZNPList_ZPP_PartitionVertex();
		}
		let F = poly.vertices;
		let L = poly.vertices;
		if(F != null) {
			let nite = F;
			while(true) {
				let p = nite;
				ZPP_Monotone.queue.add(p);
				let ux = 0.0;
				let uy = 0.0;
				ux = p.next.x - p.x;
				uy = p.next.y - p.y;
				let vx = 0.0;
				let vy = 0.0;
				vx = p.prev.x - p.x;
				vy = p.prev.y - p.y;
				let cx = vy * ux - vx * uy > 0.0;
				p.type = ZPP_Monotone.below(p.prev,p) ? ZPP_Monotone.below(p.next,p) ? cx ? 0 : 3 : 4 : ZPP_Monotone.below(p,p.next) ? cx ? 1 : 2 : 4;
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		let xxlist = ZPP_Monotone.queue;
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
						} else if(ZPP_Monotone.above(left.elt,right.elt)) {
							nxt = left;
							left = left.next;
							--leftSize;
						} else {
							nxt = right;
							right = right.next;
							--rightSize;
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
		if(ZPP_Monotone.edges == null) {
			if(ZPP_Set_ZPP_PartitionVertex.zpp_pool == null) {
				ZPP_Monotone.edges = new ZPP_Set_ZPP_PartitionVertex();
			} else {
				ZPP_Monotone.edges = ZPP_Set_ZPP_PartitionVertex.zpp_pool;
				ZPP_Set_ZPP_PartitionVertex.zpp_pool = ZPP_Monotone.edges.next;
				ZPP_Monotone.edges.next = null;
			}
			ZPP_Monotone.edges.lt = ZPP_PartitionVertex.edge_lt;
			ZPP_Monotone.edges.swapped = ZPP_PartitionVertex.edge_swap;
		}
		while(ZPP_Monotone.queue.head != null) {
			let v = ZPP_Monotone.queue.pop_unsafe();
			switch(v.type) {
			case 0:
				v.helper = v;
				v.node = ZPP_Monotone.edges.insert(v);
				break;
			case 1:
				let e = v.prev;
				if(e.helper == null) {
					throw haxe_Exception.thrown("Fatal error (1): Polygon is not weakly-simple and clockwise");
				}
				if(e.helper.type == 2) {
					poly.add_diagonal(v,e.helper);
				}
				ZPP_Monotone.edges.remove_node(e.node);
				e.helper = null;
				break;
			case 2:
				let e1 = v.prev;
				if(e1.helper == null) {
					throw haxe_Exception.thrown("Fatal error (3): Polygon is not weakly-simple and clockwise");
				}
				if(e1.helper.type == 2) {
					poly.add_diagonal(v,e1.helper);
				}
				ZPP_Monotone.edges.remove_node(e1.node);
				e1.helper = null;
				let ret = null;
				if(!ZPP_Monotone.edges.empty()) {
					let set_ite = ZPP_Monotone.edges.parent;
					while(set_ite.prev != null) set_ite = set_ite.prev;
					while(set_ite != null) {
						let elt = set_ite.data;
						if(!ZPP_PartitionVertex.vert_lt(elt,v)) {
							ret = elt;
							break;
						}
						if(set_ite.next != null) {
							set_ite = set_ite.next;
							while(set_ite.prev != null) set_ite = set_ite.prev;
						} else {
							while(set_ite.parent != null && set_ite == set_ite.parent.next) set_ite = set_ite.parent;
							set_ite = set_ite.parent;
						}
					}
				}
				let e2 = ret;
				if(e2 != null) {
					if(e2.helper == null) {
						throw haxe_Exception.thrown("Fatal error (4): Polygon is not weakly-simple and clockwise");
					}
					if(e2.helper.type == 2) {
						poly.add_diagonal(v,e2.helper);
					}
					e2.helper = v;
				}
				break;
			case 3:
				let ret1 = null;
				if(!ZPP_Monotone.edges.empty()) {
					let set_ite = ZPP_Monotone.edges.parent;
					while(set_ite.prev != null) set_ite = set_ite.prev;
					while(set_ite != null) {
						let elt = set_ite.data;
						if(!ZPP_PartitionVertex.vert_lt(elt,v)) {
							ret1 = elt;
							break;
						}
						if(set_ite.next != null) {
							set_ite = set_ite.next;
							while(set_ite.prev != null) set_ite = set_ite.prev;
						} else {
							while(set_ite.parent != null && set_ite == set_ite.parent.next) set_ite = set_ite.parent;
							set_ite = set_ite.parent;
						}
					}
				}
				let e3 = ret1;
				if(e3 != null) {
					if(e3.helper == null) {
						throw haxe_Exception.thrown("Fatal error (2): Polygon is not weakly-simple and clockwise");
					}
					poly.add_diagonal(v,e3.helper);
					e3.helper = v;
				}
				v.node = ZPP_Monotone.edges.insert(v);
				v.helper = v;
				break;
			case 4:
				let pre = v.prev;
				if(ZPP_Monotone.left_vertex(v)) {
					if(pre.helper == null) {
						throw haxe_Exception.thrown("Fatal error (5): Polygon is not weakly-simple and clockwise");
					}
					if(pre.helper.type == 2) {
						poly.add_diagonal(v,pre.helper);
					}
					ZPP_Monotone.edges.remove_node(pre.node);
					pre.helper = null;
					v.node = ZPP_Monotone.edges.insert(v);
					v.helper = v;
				} else {
					let ret = null;
					if(!ZPP_Monotone.edges.empty()) {
						let set_ite = ZPP_Monotone.edges.parent;
						while(set_ite.prev != null) set_ite = set_ite.prev;
						while(set_ite != null) {
							let elt = set_ite.data;
							if(!ZPP_PartitionVertex.vert_lt(elt,v)) {
								ret = elt;
								break;
							}
							if(set_ite.next != null) {
								set_ite = set_ite.next;
								while(set_ite.prev != null) set_ite = set_ite.prev;
							} else {
								while(set_ite.parent != null && set_ite == set_ite.parent.next) set_ite = set_ite.parent;
								set_ite = set_ite.parent;
							}
						}
					}
					let e = ret;
					if(e == null || e.helper == null) {
						throw haxe_Exception.thrown("Fatal error (6): Polygon is not weakly-simple and clockwise");
					}
					if(e.helper.type == 2) {
						poly.add_diagonal(v,e.helper);
					}
					e.helper = v;
				}
				break;
			}
		}
		return poly;
	}
}
ZPP_Monotone.sharedPPoly = null;
ZPP_Monotone.queue = null;
ZPP_Monotone.edges = null;
