import ZPP_Set_ZPP_SimpleSeg from '../util/ZPP_Set_ZPP_SimpleSeg.js';
import ZPP_SimpleEvent from './ZPP_SimpleEvent.js';
import ZPP_SimpleVert from './ZPP_SimpleVert.js';
export default class ZPP_SimpleSweep {
	constructor() {
		this.tree = null;
		this.sweepx = 0.0;
		if(ZPP_Set_ZPP_SimpleSeg.zpp_pool == null) {
			this.tree = new ZPP_Set_ZPP_SimpleSeg();
		} else {
			this.tree = ZPP_Set_ZPP_SimpleSeg.zpp_pool;
			ZPP_Set_ZPP_SimpleSeg.zpp_pool = this.tree.next;
			this.tree.next = null;
		}
		this.tree.lt = $bind(this,this.edge_lt);
		this.tree.swapped = $bind(this,this.swap_nodes);
	}
	swap_nodes(p,q) {
		let t = p.node;
		p.node = q.node;
		q.node = t;
	}
	edge_lt(p,q) {
		let ux = 0.0;
		let uy = 0.0;
		let vx = 0.0;
		let vy = 0.0;
		let flip;
		if(p.left == q.left && p.right == q.right) {
			return false;
		} else if(p.left == q.right) {
			if(p.left.x == p.right.x) {
				if(p.left.y < p.right.y) {
					return p.left.y > q.left.y;
				} else {
					return p.right.y > q.left.y;
				}
			} else {
				flip = p.right.x < p.left.x;
				ux = p.right.x - p.left.x;
				uy = p.right.y - p.left.y;
				vx = q.left.x - p.left.x;
				vy = q.left.y - p.left.y;
				return (flip ? uy * vx - ux * vy : vy * ux - vx * uy) < 0;
			}
		} else if(p.right == q.left) {
			let tmp;
			if(q.left.x == q.right.x) {
				tmp = q.left.y < q.right.y ? q.left.y > p.left.y : q.right.y > p.left.y;
			} else {
				flip = q.right.x < q.left.x;
				ux = q.right.x - q.left.x;
				uy = q.right.y - q.left.y;
				vx = p.left.x - q.left.x;
				vy = p.left.y - q.left.y;
				tmp = (flip ? uy * vx - ux * vy : vy * ux - vx * uy) < 0;
			}
			return !tmp;
		} else if(p.left == q.left) {
			if(p.left.x == p.right.x) {
				if(p.left.y < p.right.y) {
					return p.left.y > q.right.y;
				} else {
					return p.right.y > q.right.y;
				}
			} else {
				flip = p.right.x < p.left.x;
				ux = p.right.x - p.left.x;
				uy = p.right.y - p.left.y;
				vx = q.right.x - p.left.x;
				vy = q.right.y - p.left.y;
				return (flip ? uy * vx - ux * vy : vy * ux - vx * uy) < 0;
			}
		} else if(p.right == q.right) {
			if(p.left.x == p.right.x) {
				if(p.left.y < p.right.y) {
					return p.left.y > q.left.y;
				} else {
					return p.right.y > q.left.y;
				}
			} else {
				flip = p.right.x < p.left.x;
				ux = p.right.x - p.left.x;
				uy = p.right.y - p.left.y;
				vx = q.left.x - p.left.x;
				vy = q.left.y - p.left.y;
				return (flip ? uy * vx - ux * vy : vy * ux - vx * uy) < 0;
			}
		}
		if(p.left.x == p.right.x) {
			if(q.left.x == q.right.x) {
				let pmax = p.left.y < p.right.y ? p.right : p.left;
				let qmax = q.left.y < q.right.y ? q.right : q.left;
				return pmax.y > qmax.y;
			} else {
				flip = q.right.x < q.left.x;
				ux = q.right.x - q.left.x;
				uy = q.right.y - q.left.y;
				vx = p.left.x - q.left.x;
				vy = p.left.y - q.left.y;
				let plrg = flip ? uy * vx - ux * vy : vy * ux - vx * uy;
				flip = q.right.x < q.left.x;
				ux = q.right.x - q.left.x;
				uy = q.right.y - q.left.y;
				vx = p.right.x - q.left.x;
				vy = p.right.y - q.left.y;
				let aplrg = flip ? uy * vx - ux * vy : vy * ux - vx * uy;
				if(plrg * aplrg >= 0) {
					return plrg >= 0.0;
				} else {
					return this.sweepx >= p.left.x;
				}
			}
		} else if(q.left.x == q.right.x) {
			flip = p.right.x < p.left.x;
			ux = p.right.x - p.left.x;
			uy = p.right.y - p.left.y;
			vx = q.left.x - p.left.x;
			vy = q.left.y - p.left.y;
			let qlrg = flip ? uy * vx - ux * vy : vy * ux - vx * uy;
			flip = p.right.x < p.left.x;
			ux = p.right.x - p.left.x;
			uy = p.right.y - p.left.y;
			vx = q.right.x - p.left.x;
			vy = q.right.y - p.left.y;
			let aqlrg = flip ? uy * vx - ux * vy : vy * ux - vx * uy;
			if(qlrg * aqlrg >= 0) {
				return qlrg < 0.0;
			} else {
				return this.sweepx < q.left.x;
			}
		} else {
			flip = p.right.x < p.left.x;
			ux = p.right.x - p.left.x;
			uy = p.right.y - p.left.y;
			vx = q.left.x - p.left.x;
			vy = q.left.y - p.left.y;
			let qlrg = (flip ? uy * vx - ux * vy : vy * ux - vx * uy) < 0.0;
			flip = p.right.x < p.left.x;
			ux = p.right.x - p.left.x;
			uy = p.right.y - p.left.y;
			vx = q.right.x - p.left.x;
			vy = q.right.y - p.left.y;
			let aqlrg = (flip ? uy * vx - ux * vy : vy * ux - vx * uy) < 0.0;
			if(qlrg == aqlrg) {
				return qlrg;
			} else {
				flip = q.right.x < q.left.x;
				ux = q.right.x - q.left.x;
				uy = q.right.y - q.left.y;
				vx = p.left.x - q.left.x;
				vy = p.left.y - q.left.y;
				let plrg = (flip ? uy * vx - ux * vy : vy * ux - vx * uy) >= 0.0;
				flip = q.right.x < q.left.x;
				ux = q.right.x - q.left.x;
				uy = q.right.y - q.left.y;
				vx = p.right.x - q.left.x;
				vy = p.right.y - q.left.y;
				let aplrg = (flip ? uy * vx - ux * vy : vy * ux - vx * uy) >= 0.0;
				if(plrg == aplrg) {
					return plrg;
				}
				let py = (this.sweepx - p.left.x) / (p.right.x - p.left.x) * (p.right.y - p.left.y) + p.left.y;
				let qy = (this.sweepx - q.left.x) / (q.right.x - q.left.x) * (q.right.y - q.left.y) + q.left.y;
				return py > qy;
			}
		}
	}
	clear() {
		this.tree.clear();
	}
	add(e) {
		e.node = this.tree.insert(e);
		let nxt = this.tree.successor_node(e.node);
		let pre = this.tree.predecessor_node(e.node);
		if(nxt != null) {
			e.next = nxt.data;
			nxt.data.prev = e;
		}
		if(pre != null) {
			e.prev = pre.data;
			pre.data.next = e;
		}
		return e;
	}
	remove(e) {
		let nxt = this.tree.successor_node(e.node);
		let pre = this.tree.predecessor_node(e.node);
		if(nxt != null) {
			nxt.data.prev = e.prev;
		}
		if(pre != null) {
			pre.data.next = e.next;
		}
		this.tree.remove_node(e.node);
		e.node = null;
	}
	intersect(p,q) {
		if(p == null || q == null) {
			return false;
		} else if(p.left == q.left || p.left == q.right || p.right == q.left || p.right == q.right) {
			return false;
		} else {
			let lsign = (q.left.x - p.left.x) * (p.right.y - p.left.y) - (p.right.x - p.left.x) * (q.left.y - p.left.y);
			let rsign = (q.right.x - p.left.x) * (p.right.y - p.left.y) - (p.right.x - p.left.x) * (q.right.y - p.left.y);
			if(lsign * rsign > 0) {
				return false;
			} else {
				let lsign2 = (p.left.x - q.left.x) * (q.right.y - q.left.y) - (q.right.x - q.left.x) * (p.left.y - q.left.y);
				let rsign2 = (p.right.x - q.left.x) * (q.right.y - q.left.y) - (q.right.x - q.left.x) * (p.right.y - q.left.y);
				if(lsign2 * rsign2 > 0) {
					return false;
				} else if(lsign * rsign >= 0 && lsign2 * rsign2 >= 0) {
					return true;
				} else {
					return true;
				}
			}
		}
	}
	intersection(p,q) {
		if(p == null || q == null) {
			return null;
		} else if(p.left == q.left || p.left == q.right || p.right == q.left || p.right == q.right) {
			return null;
		} else {
			let ux = 0.0;
			let uy = 0.0;
			ux = p.right.x - p.left.x;
			uy = p.right.y - p.left.y;
			let vx = 0.0;
			let vy = 0.0;
			vx = q.right.x - q.left.x;
			vy = q.right.y - q.left.y;
			let denom = vy * ux - vx * uy;
			if(denom == 0.0) {
				return null;
			}
			denom = 1 / denom;
			let cx = 0.0;
			let cy = 0.0;
			cx = q.left.x - p.left.x;
			cy = q.left.y - p.left.y;
			let t = (vy * cx - vx * cy) * denom;
			if(t < 0 || t > 1) {
				return null;
			}
			let s = (uy * cx - ux * cy) * denom;
			if(s < 0 || s > 1) {
				return null;
			}
			let vet;
			if(s == 0 || s == 1 || t == 0 || t == 1) {
				let cases = s == 0;
				if(s == 1 && cases) {
					throw haxe_Exception.thrown("corner case 1a");
				} else if(s == 1) {
					cases = true;
				}
				if(t == 0 && cases) {
					throw haxe_Exception.thrown("corner case 1b");
				} else if(t == 0) {
					cases = true;
				}
				if(t == 1 && cases) {
					throw haxe_Exception.thrown("corner case 1c");
				}
				vet = s == 0 ? q.left : s == 1 ? q.right : t == 0 ? p.left : p.right;
			} else {
				let x = 0.5 * (p.left.x + ux * t + q.left.x + vx * s);
				let y = 0.5 * (p.left.y + uy * t + q.left.y + vy * s);
				let ret;
				if(ZPP_SimpleVert.zpp_pool == null) {
					ret = new ZPP_SimpleVert();
				} else {
					ret = ZPP_SimpleVert.zpp_pool;
					ZPP_SimpleVert.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.x = x;
				ret.y = y;
				vet = ret;
			}
			let ret;
			if(ZPP_SimpleEvent.zpp_pool == null) {
				ret = new ZPP_SimpleEvent();
			} else {
				ret = ZPP_SimpleEvent.zpp_pool;
				ZPP_SimpleEvent.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.vertex = vet;
			let ret1 = ret;
			ret1.type = 0;
			ret1.segment = p;
			ret1.segment2 = q;
			return ret1;
		}
	}
}
