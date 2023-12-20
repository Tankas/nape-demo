import ZNPList_ZPP_GeomVert from '../util/ZNPList_ZPP_GeomVert.js';
import ZNPList_ZPP_PartitionedPoly from '../util/ZNPList_ZPP_PartitionedPoly.js';
import ZPP_PartitionVertex from './ZPP_PartitionVertex.js';
import ZPP_GeomVert from './ZPP_GeomVert.js';
import Config from '../../nape/Config.js';
export default class ZPP_PartitionedPoly {
	constructor(P) {
		this.next = null;
		this.vertices = null;
		this.init(P);
	}
	eq(a,b) {
		let dx = 0.0;
		let dy = 0.0;
		dx = a.x - b.x;
		dy = a.y - b.y;
		return dx * dx + dy * dy < Config.epsilon * Config.epsilon;
	}
	alloc() {
	}
	free() {
	}
	init(P) {
		if(P == null) {
			return;
		}
		let area = 0.0;
		let F = P;
		let L = P;
		if(F != null) {
			let nite = F;
			while(true) {
				let v = nite;
				area += v.x * (v.next.y - v.prev.y);
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		let cw = area * 0.5 > 0.0;
		let p = P;
		while(true) {
			let tmp;
			if(cw) {
				let ret;
				if(ZPP_PartitionVertex.zpp_pool == null) {
					ret = new ZPP_PartitionVertex();
				} else {
					ret = ZPP_PartitionVertex.zpp_pool;
					ZPP_PartitionVertex.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.x = p.x;
				ret.y = p.y;
				let obj = ret;
				if(this.vertices == null) {
					this.vertices = obj.prev = obj.next = obj;
				} else {
					obj.prev = this.vertices;
					obj.next = this.vertices.next;
					this.vertices.next.prev = obj;
					this.vertices.next = obj;
				}
				tmp = obj;
			} else {
				let ret;
				if(ZPP_PartitionVertex.zpp_pool == null) {
					ret = new ZPP_PartitionVertex();
				} else {
					ret = ZPP_PartitionVertex.zpp_pool;
					ZPP_PartitionVertex.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.x = p.x;
				ret.y = p.y;
				let obj = ret;
				if(this.vertices == null) {
					this.vertices = obj.prev = obj.next = obj;
				} else {
					obj.next = this.vertices;
					obj.prev = this.vertices.prev;
					this.vertices.prev.next = obj;
					this.vertices.prev = obj;
				}
				tmp = obj;
			}
			this.vertices = tmp;
			this.vertices.forced = p.forced;
			p = p.next;
			if(!(p != P)) {
				break;
			}
		}
		this.remove_collinear_vertices();
	}
	remove_collinear_vertices() {
		let p = this.vertices;
		let skip = true;
		while(skip || p != this.vertices) {
			skip = false;
			if(this.eq(p,p.next)) {
				if(p == this.vertices) {
					this.vertices = p.next;
					skip = true;
				}
				if(p.forced) {
					p.next.forced = true;
				}
				if(p != null && p.prev == p) {
					p.next = p.prev = null;
					let o = p;
					o.helper = null;
					o.next = ZPP_PartitionVertex.zpp_pool;
					ZPP_PartitionVertex.zpp_pool = o;
					p = null;
				} else {
					let retnodes = p.next;
					p.prev.next = p.next;
					p.next.prev = p.prev;
					p.next = p.prev = null;
					let o = p;
					o.helper = null;
					o.next = ZPP_PartitionVertex.zpp_pool;
					ZPP_PartitionVertex.zpp_pool = o;
					p = null;
					p = retnodes;
				}
				if(p == null) {
					this.vertices = null;
					break;
				}
			} else {
				p = p.next;
			}
		}
		if(this.vertices == null) {
			return true;
		}
		let removed;
		while(true) {
			removed = false;
			p = this.vertices;
			skip = true;
			while(skip || p != this.vertices) {
				skip = false;
				let pre = p.prev;
				let ux = 0.0;
				let uy = 0.0;
				ux = p.x - pre.x;
				uy = p.y - pre.y;
				let vx = 0.0;
				let vy = 0.0;
				vx = p.next.x - p.x;
				vy = p.next.y - p.y;
				let crs = vy * ux - vx * uy;
				if(crs * crs >= Config.epsilon * Config.epsilon) {
					p = p.next;
				} else {
					if(p == this.vertices) {
						this.vertices = p.next;
						skip = true;
					}
					if(p != null && p.prev == p) {
						p.next = p.prev = null;
						let o = p;
						o.helper = null;
						o.next = ZPP_PartitionVertex.zpp_pool;
						ZPP_PartitionVertex.zpp_pool = o;
						p = null;
					} else {
						let retnodes = p.next;
						p.prev.next = p.next;
						p.next.prev = p.prev;
						p.next = p.prev = null;
						let o = p;
						o.helper = null;
						o.next = ZPP_PartitionVertex.zpp_pool;
						ZPP_PartitionVertex.zpp_pool = o;
						p = null;
						p = retnodes;
					}
					removed = true;
					if(p == null) {
						removed = false;
						this.vertices = null;
						break;
					}
				}
			}
			if(!removed) {
				break;
			}
		}
		return this.vertices == null;
	}
	add_diagonal(p,q) {
		p.diagonals.add(q);
		q.diagonals.add(p);
		p.forced = q.forced = true;
	}
	extract_partitions(ret) {
		if(ret == null) {
			ret = new ZNPList_ZPP_PartitionedPoly();
		}
		if(this.vertices != null) {
			let F = this.vertices;
			let L = this.vertices;
			if(F != null) {
				let nite = F;
				while(true) {
					let c = nite;
					c.sort();
					nite = nite.next;
					if(!(nite != L)) {
						break;
					}
				}
			}
			this.pull_partitions(this.vertices,ret);
			while(this.vertices != null) {
				let tmp;
				if(this.vertices != null && this.vertices.prev == this.vertices) {
					this.vertices.next = this.vertices.prev = null;
					let o = this.vertices;
					o.helper = null;
					o.next = ZPP_PartitionVertex.zpp_pool;
					ZPP_PartitionVertex.zpp_pool = o;
					tmp = this.vertices = null;
				} else {
					let retnodes = this.vertices.next;
					this.vertices.prev.next = this.vertices.next;
					this.vertices.next.prev = this.vertices.prev;
					this.vertices.next = this.vertices.prev = null;
					let o = this.vertices;
					o.helper = null;
					o.next = ZPP_PartitionVertex.zpp_pool;
					ZPP_PartitionVertex.zpp_pool = o;
					this.vertices = null;
					tmp = retnodes;
				}
				this.vertices = tmp;
			}
			let pre = null;
			let cx_ite = ret.head;
			while(cx_ite != null) {
				let p = cx_ite.elt;
				if(p.remove_collinear_vertices()) {
					ret.erase(pre);
					continue;
				}
				pre = cx_ite;
				cx_ite = cx_ite.next;
			}
		}
		return ret;
	}
	pull_partitions(start,ret) {
		let poly;
		if(ZPP_PartitionedPoly.zpp_pool == null) {
			poly = new ZPP_PartitionedPoly();
		} else {
			poly = ZPP_PartitionedPoly.zpp_pool;
			ZPP_PartitionedPoly.zpp_pool = poly.next;
			poly.next = null;
		}
		let next = start;
		while(true) {
			let ret1;
			if(ZPP_PartitionVertex.zpp_pool == null) {
				ret1 = new ZPP_PartitionVertex();
			} else {
				ret1 = ZPP_PartitionVertex.zpp_pool;
				ZPP_PartitionVertex.zpp_pool = ret1.next;
				ret1.next = null;
			}
			ret1.x = next.x;
			ret1.y = next.y;
			ret1.forced = next.forced;
			let obj = ret1;
			if(poly.vertices == null) {
				poly.vertices = obj.prev = obj.next = obj;
			} else {
				obj.prev = poly.vertices;
				obj.next = poly.vertices.next;
				poly.vertices.next.prev = obj;
				poly.vertices.next = obj;
			}
			poly.vertices = obj;
			poly.vertices.forced = next.forced;
			if(next.diagonals.head != null) {
				let _this = next.diagonals;
				let ret1 = _this.head.elt;
				_this.pop();
				let diag = ret1;
				if(diag == start) {
					break;
				} else {
					next = this.pull_partitions(next,ret);
				}
			} else {
				next = next.next;
			}
			if(!(next != start)) {
				break;
			}
		}
		let area = 0.0;
		let F = poly.vertices;
		let L = poly.vertices;
		if(F != null) {
			let nite = F;
			while(true) {
				let v = nite;
				area += v.x * (v.next.y - v.prev.y);
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		if(area * 0.5 != 0) {
			ret.add(poly);
		}
		return next;
	}
	extract(ret) {
		if(ret == null) {
			ret = new ZNPList_ZPP_GeomVert();
		}
		if(this.vertices != null) {
			let F = this.vertices;
			let L = this.vertices;
			if(F != null) {
				let nite = F;
				while(true) {
					let c = nite;
					c.sort();
					nite = nite.next;
					if(!(nite != L)) {
						break;
					}
				}
			}
			this.pull(this.vertices,ret);
			while(this.vertices != null) {
				let tmp;
				if(this.vertices != null && this.vertices.prev == this.vertices) {
					this.vertices.next = this.vertices.prev = null;
					let o = this.vertices;
					o.helper = null;
					o.next = ZPP_PartitionVertex.zpp_pool;
					ZPP_PartitionVertex.zpp_pool = o;
					tmp = this.vertices = null;
				} else {
					let retnodes = this.vertices.next;
					this.vertices.prev.next = this.vertices.next;
					this.vertices.next.prev = this.vertices.prev;
					this.vertices.next = this.vertices.prev = null;
					let o = this.vertices;
					o.helper = null;
					o.next = ZPP_PartitionVertex.zpp_pool;
					ZPP_PartitionVertex.zpp_pool = o;
					this.vertices = null;
					tmp = retnodes;
				}
				this.vertices = tmp;
			}
		}
		return ret;
	}
	pull(start,ret) {
		let poly = null;
		let next = start;
		while(true) {
			let x = next.x;
			let y = next.y;
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
			if(poly == null) {
				poly = obj.prev = obj.next = obj;
			} else {
				obj.prev = poly;
				obj.next = poly.next;
				poly.next.prev = obj;
				poly.next = obj;
			}
			poly = obj;
			poly.forced = next.forced;
			if(next.diagonals.head != null) {
				let _this = next.diagonals;
				let ret1 = _this.head.elt;
				_this.pop();
				let diag = ret1;
				if(diag == start) {
					break;
				} else {
					next = this.pull(next,ret);
				}
			} else {
				next = next.next;
			}
			if(!(next != start)) {
				break;
			}
		}
		let area = 0.0;
		let F = poly;
		let L = poly;
		if(F != null) {
			let nite = F;
			while(true) {
				let v = nite;
				area += v.x * (v.next.y - v.prev.y);
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		let area1 = area * 0.5;
		if(area1 * area1 >= Config.epsilon * Config.epsilon) {
			let p = poly;
			let skip = true;
			while(skip || p != poly) {
				skip = false;
				let dx = 0.0;
				let dy = 0.0;
				dx = p.x - p.next.x;
				dy = p.y - p.next.y;
				if(dx * dx + dy * dy < Config.epsilon * Config.epsilon) {
					if(p == poly) {
						poly = p.next;
						skip = true;
					}
					if(p.forced) {
						p.next.forced = true;
					}
					if(p != null && p.prev == p) {
						p.next = p.prev = null;
						p = null;
					} else {
						let retnodes = p.next;
						p.prev.next = p.next;
						p.next.prev = p.prev;
						p.next = p.prev = null;
						p = null;
						p = retnodes;
					}
					if(p == null) {
						poly = null;
						break;
					}
				} else {
					p = p.next;
				}
			}
			if(poly != null) {
				let removed;
				while(true) {
					removed = false;
					p = poly;
					skip = true;
					while(skip || p != poly) {
						skip = false;
						let pre = p.prev;
						let ux = 0.0;
						let uy = 0.0;
						ux = p.x - pre.x;
						uy = p.y - pre.y;
						let vx = 0.0;
						let vy = 0.0;
						vx = p.next.x - p.x;
						vy = p.next.y - p.y;
						let crs = vy * ux - vx * uy;
						if(crs * crs >= Config.epsilon * Config.epsilon) {
							p = p.next;
						} else {
							if(p == poly) {
								poly = p.next;
								skip = true;
							}
							if(p != null && p.prev == p) {
								p.next = p.prev = null;
								p = null;
							} else {
								let retnodes = p.next;
								p.prev.next = p.next;
								p.next.prev = p.prev;
								p.next = p.prev = null;
								p = null;
								p = retnodes;
							}
							removed = true;
							if(p == null) {
								removed = false;
								poly = null;
								break;
							}
						}
					}
					if(!removed) {
						break;
					}
				}
			}
			if(poly != null) {
				ret.add(poly);
			}
		}
		return next;
	}
	static getSharedPP() {
		if(ZPP_PartitionedPoly.sharedPPList == null) {
			ZPP_PartitionedPoly.sharedPPList = new ZNPList_ZPP_PartitionedPoly();
		}
		return ZPP_PartitionedPoly.sharedPPList;
	}
	static getShared() {
		if(ZPP_PartitionedPoly.sharedGVList == null) {
			ZPP_PartitionedPoly.sharedGVList = new ZNPList_ZPP_GeomVert();
		}
		return ZPP_PartitionedPoly.sharedGVList;
	}
}
ZPP_PartitionedPoly.sharedPPList = null;
ZPP_PartitionedPoly.sharedGVList = null;
ZPP_PartitionedPoly.zpp_pool = null;
