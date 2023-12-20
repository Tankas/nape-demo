import ZNPList_ZPP_SimplifyP from '../util/ZNPList_ZPP_SimplifyP.js';
import ZPP_SimplifyP from './ZPP_SimplifyP.js';
import ZPP_SimplifyV from './ZPP_SimplifyV.js';
import ZPP_GeomVert from './ZPP_GeomVert.js';
export default class ZPP_Simplify {
	static lessval(a,b) {
		return a.x - b.x + (a.y - b.y);
	}
	static less(a,b) {
		return a.x - b.x + (a.y - b.y) < 0.0;
	}
	static distance(v,a,b) {
		let nx = 0.0;
		let ny = 0.0;
		nx = b.x - a.x;
		ny = b.y - a.y;
		let cx = 0.0;
		let cy = 0.0;
		cx = v.x - a.x;
		cy = v.y - a.y;
		let den = nx * nx + ny * ny;
		if(den == 0.0) {
			return cx * cx + cy * cy;
		} else {
			let t = (cx * nx + cy * ny) / (nx * nx + ny * ny);
			if(t <= 0) {
				return cx * cx + cy * cy;
			} else if(t >= 1) {
				let dx = 0.0;
				let dy = 0.0;
				dx = v.x - b.x;
				dy = v.y - b.y;
				return dx * dx + dy * dy;
			} else {
				let t1 = t;
				cx -= nx * t1;
				cy -= ny * t1;
				return cx * cx + cy * cy;
			}
		}
	}
	static simplify(P,epsilon) {
		let ret = null;
		let min = null;
		let max = null;
		epsilon *= epsilon;
		if(ZPP_Simplify.stack == null) {
			ZPP_Simplify.stack = new ZNPList_ZPP_SimplifyP();
		}
		let pre = null;
		let fst = null;
		let cur = P;
		while(true) {
			let ret1;
			if(ZPP_SimplifyV.zpp_pool == null) {
				ret1 = new ZPP_SimplifyV();
			} else {
				ret1 = ZPP_SimplifyV.zpp_pool;
				ZPP_SimplifyV.zpp_pool = ret1.next;
				ret1.next = null;
			}
			ret1.x = cur.x;
			ret1.y = cur.y;
			ret1.flag = false;
			let v = ret1;
			v.forced = cur.forced;
			if(v.forced) {
				v.flag = true;
				if(pre != null) {
					let tmp = ZPP_Simplify.stack;
					let ret;
					if(ZPP_SimplifyP.zpp_pool == null) {
						ret = new ZPP_SimplifyP();
					} else {
						ret = ZPP_SimplifyP.zpp_pool;
						ZPP_SimplifyP.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.min = pre;
					ret.max = v;
					tmp.add(ret);
				} else {
					fst = v;
				}
				pre = v;
			}
			let obj = v;
			if(ret == null) {
				ret = obj.prev = obj.next = obj;
			} else {
				obj.prev = ret;
				obj.next = ret.next;
				ret.next.prev = obj;
				ret.next = obj;
			}
			ret = obj;
			if(min == null) {
				min = ret;
				max = ret;
			} else {
				if(ret.x - min.x + (ret.y - min.y) < 0.0) {
					min = ret;
				}
				if(max.x - ret.x + (max.y - ret.y) < 0.0) {
					max = ret;
				}
			}
			cur = cur.next;
			if(!(cur != P)) {
				break;
			}
		}
		if(ZPP_Simplify.stack.head == null) {
			if(fst == null) {
				min.flag = max.flag = true;
				let tmp = ZPP_Simplify.stack;
				let ret;
				if(ZPP_SimplifyP.zpp_pool == null) {
					ret = new ZPP_SimplifyP();
				} else {
					ret = ZPP_SimplifyP.zpp_pool;
					ZPP_SimplifyP.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.min = min;
				ret.max = max;
				tmp.add(ret);
				let tmp1 = ZPP_Simplify.stack;
				let ret1;
				if(ZPP_SimplifyP.zpp_pool == null) {
					ret1 = new ZPP_SimplifyP();
				} else {
					ret1 = ZPP_SimplifyP.zpp_pool;
					ZPP_SimplifyP.zpp_pool = ret1.next;
					ret1.next = null;
				}
				ret1.min = max;
				ret1.max = min;
				tmp1.add(ret1);
			} else {
				let d1 = min.x - fst.x + (min.y - fst.y);
				if(d1 < 0) {
					d1 = -d1;
				}
				let d2 = max.x - fst.x + (max.y - fst.y);
				if(d2 < 0) {
					d2 = -d2;
				}
				if(d1 > d2) {
					min.flag = fst.flag = true;
					let tmp = ZPP_Simplify.stack;
					let ret;
					if(ZPP_SimplifyP.zpp_pool == null) {
						ret = new ZPP_SimplifyP();
					} else {
						ret = ZPP_SimplifyP.zpp_pool;
						ZPP_SimplifyP.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.min = min;
					ret.max = fst;
					tmp.add(ret);
					let tmp1 = ZPP_Simplify.stack;
					let ret1;
					if(ZPP_SimplifyP.zpp_pool == null) {
						ret1 = new ZPP_SimplifyP();
					} else {
						ret1 = ZPP_SimplifyP.zpp_pool;
						ZPP_SimplifyP.zpp_pool = ret1.next;
						ret1.next = null;
					}
					ret1.min = fst;
					ret1.max = min;
					tmp1.add(ret1);
				} else {
					max.flag = fst.flag = true;
					let tmp = ZPP_Simplify.stack;
					let ret;
					if(ZPP_SimplifyP.zpp_pool == null) {
						ret = new ZPP_SimplifyP();
					} else {
						ret = ZPP_SimplifyP.zpp_pool;
						ZPP_SimplifyP.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.min = max;
					ret.max = fst;
					tmp.add(ret);
					let tmp1 = ZPP_Simplify.stack;
					let ret1;
					if(ZPP_SimplifyP.zpp_pool == null) {
						ret1 = new ZPP_SimplifyP();
					} else {
						ret1 = ZPP_SimplifyP.zpp_pool;
						ZPP_SimplifyP.zpp_pool = ret1.next;
						ret1.next = null;
					}
					ret1.min = fst;
					ret1.max = max;
					tmp1.add(ret1);
				}
			}
		} else {
			let tmp = ZPP_Simplify.stack;
			let ret;
			if(ZPP_SimplifyP.zpp_pool == null) {
				ret = new ZPP_SimplifyP();
			} else {
				ret = ZPP_SimplifyP.zpp_pool;
				ZPP_SimplifyP.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.min = pre;
			ret.max = fst;
			tmp.add(ret);
		}
		while(ZPP_Simplify.stack.head != null) {
			let cur = ZPP_Simplify.stack.pop_unsafe();
			let min = cur.min;
			let max = cur.max;
			let o = cur;
			o.min = o.max = null;
			o.next = ZPP_SimplifyP.zpp_pool;
			ZPP_SimplifyP.zpp_pool = o;
			let dmax = epsilon;
			let dv = null;
			let ite = min.next;
			while(ite != max) {
				let dist = ZPP_Simplify.distance(ite,min,max);
				if(dist > dmax) {
					dmax = dist;
					dv = ite;
				}
				ite = ite.next;
			}
			if(dv != null) {
				dv.flag = true;
				let tmp = ZPP_Simplify.stack;
				let ret;
				if(ZPP_SimplifyP.zpp_pool == null) {
					ret = new ZPP_SimplifyP();
				} else {
					ret = ZPP_SimplifyP.zpp_pool;
					ZPP_SimplifyP.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.min = min;
				ret.max = dv;
				tmp.add(ret);
				let tmp1 = ZPP_Simplify.stack;
				let ret1;
				if(ZPP_SimplifyP.zpp_pool == null) {
					ret1 = new ZPP_SimplifyP();
				} else {
					ret1 = ZPP_SimplifyP.zpp_pool;
					ZPP_SimplifyP.zpp_pool = ret1.next;
					ret1.next = null;
				}
				ret1.min = dv;
				ret1.max = max;
				tmp1.add(ret1);
			}
		}
		let retp = null;
		while(ret != null) {
			if(ret.flag) {
				let x = ret.x;
				let y = ret.y;
				let ret1;
				if(ZPP_GeomVert.zpp_pool == null) {
					ret1 = new ZPP_GeomVert();
				} else {
					ret1 = ZPP_GeomVert.zpp_pool;
					ZPP_GeomVert.zpp_pool = ret1.next;
					ret1.next = null;
				}
				ret1.forced = false;
				ret1.x = x;
				ret1.y = y;
				let obj = ret1;
				if(retp == null) {
					retp = obj.prev = obj.next = obj;
				} else {
					obj.prev = retp;
					obj.next = retp.next;
					retp.next.prev = obj;
					retp.next = obj;
				}
				retp = obj;
				retp.forced = ret.forced;
			}
			if(ret != null && ret.prev == ret) {
				ret.next = ret.prev = null;
				let o = ret;
				o.next = ZPP_SimplifyV.zpp_pool;
				ZPP_SimplifyV.zpp_pool = o;
				ret = null;
			} else {
				let retnodes = ret.next;
				ret.prev.next = ret.next;
				ret.next.prev = ret.prev;
				ret.next = ret.prev = null;
				let o = ret;
				o.next = ZPP_SimplifyV.zpp_pool;
				ZPP_SimplifyV.zpp_pool = o;
				ret = null;
				ret = retnodes;
			}
		}
		return retp;
	}
}
ZPP_Simplify.stack = null;
