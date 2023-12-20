import ZPP_Set_ZPP_SimpleEvent from '../util/ZPP_Set_ZPP_SimpleEvent.js';
import ZPP_Set_ZPP_SimpleVert from '../util/ZPP_Set_ZPP_SimpleVert.js';
import ZNPList_ZPP_SimpleEvent from '../util/ZNPList_ZPP_SimpleEvent.js';
import ZNPList_ZPP_SimpleVert from '../util/ZNPList_ZPP_SimpleVert.js';
import ZNPList_ZPP_GeomVert from '../util/ZNPList_ZPP_GeomVert.js';
import FastHash2_Hashable2_Boolfalse from '../util/FastHash2_Hashable2_Boolfalse.js';
import Hashable2_Boolfalse from '../util/Hashable2_Boolfalse.js';
import ZPP_SimpleSweep from './ZPP_SimpleSweep.js';
import ZPP_SimpleEvent from './ZPP_SimpleEvent.js';
import ZPP_SimpleSeg from './ZPP_SimpleSeg.js';
import ZPP_SimpleVert from './ZPP_SimpleVert.js';
import ZPP_GeomVert from './ZPP_GeomVert.js';
export default class ZPP_Simple {
	static decompose(poly,rets) {
		if(ZPP_Simple.sweep == null) {
			ZPP_Simple.sweep = new ZPP_SimpleSweep();
			ZPP_Simple.inthash = new FastHash2_Hashable2_Boolfalse();
		}
		if(ZPP_Simple.vertices == null) {
			if(ZPP_Set_ZPP_SimpleVert.zpp_pool == null) {
				ZPP_Simple.vertices = new ZPP_Set_ZPP_SimpleVert();
			} else {
				ZPP_Simple.vertices = ZPP_Set_ZPP_SimpleVert.zpp_pool;
				ZPP_Set_ZPP_SimpleVert.zpp_pool = ZPP_Simple.vertices.next;
				ZPP_Simple.vertices.next = null;
			}
			ZPP_Simple.vertices.lt = ZPP_SimpleVert.less_xy;
			ZPP_Simple.vertices.swapped = ZPP_SimpleVert.swap_nodes;
		}
		if(ZPP_Simple.queue == null) {
			if(ZPP_Set_ZPP_SimpleEvent.zpp_pool == null) {
				ZPP_Simple.queue = new ZPP_Set_ZPP_SimpleEvent();
			} else {
				ZPP_Simple.queue = ZPP_Set_ZPP_SimpleEvent.zpp_pool;
				ZPP_Set_ZPP_SimpleEvent.zpp_pool = ZPP_Simple.queue.next;
				ZPP_Simple.queue.next = null;
			}
			ZPP_Simple.queue.lt = ZPP_SimpleEvent.less_xy;
			ZPP_Simple.queue.swapped = ZPP_SimpleEvent.swap_nodes;
		}
		let fst = null;
		let pre = null;
		let F = poly;
		let L = poly;
		if(F != null) {
			let nite = F;
			while(true) {
				let v = nite;
				let x = v.x;
				let y = v.y;
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
				let vert = ret;
				let cur = ZPP_Simple.vertices.parent;
				while(cur != null) if(ZPP_Simple.vertices.lt(vert,cur.data)) {
					cur = cur.prev;
				} else if(ZPP_Simple.vertices.lt(cur.data,vert)) {
					cur = cur.next;
				} else {
					break;
				}
				let vx = cur;
				if(vx != null) {
					let o = vert;
					o.links.clear();
					o.node = null;
					o.forced = false;
					o.next = ZPP_SimpleVert.zpp_pool;
					ZPP_SimpleVert.zpp_pool = o;
					vert = vx.data;
				} else {
					vert.node = ZPP_Simple.vertices.insert(vert);
				}
				if(pre != null) {
					let ret;
					if(ZPP_SimpleEvent.zpp_pool == null) {
						ret = new ZPP_SimpleEvent();
					} else {
						ret = ZPP_SimpleEvent.zpp_pool;
						ZPP_SimpleEvent.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.vertex = pre;
					let e1 = ret;
					let ret1;
					if(ZPP_SimpleEvent.zpp_pool == null) {
						ret1 = new ZPP_SimpleEvent();
					} else {
						ret1 = ZPP_SimpleEvent.zpp_pool;
						ZPP_SimpleEvent.zpp_pool = ret1.next;
						ret1.next = null;
					}
					ret1.vertex = vert;
					let e2 = ret1;
					let seg;
					if(ZPP_SimpleEvent.less_xy(e1,e2)) {
						e1.type = 1;
						e2.type = 2;
						seg = ZPP_SimpleSeg.get(pre,vert);
					} else {
						e1.type = 2;
						e2.type = 1;
						seg = ZPP_SimpleSeg.get(vert,pre);
					}
					e1.segment = e2.segment = seg;
					ZPP_Simple.queue.insert(e1);
					ZPP_Simple.queue.insert(e2);
					pre.links.insert(vert);
					vert.links.insert(pre);
				}
				pre = vert;
				if(fst == null) {
					fst = vert;
				}
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		let ret;
		if(ZPP_SimpleEvent.zpp_pool == null) {
			ret = new ZPP_SimpleEvent();
		} else {
			ret = ZPP_SimpleEvent.zpp_pool;
			ZPP_SimpleEvent.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.vertex = pre;
		let e1 = ret;
		let ret1;
		if(ZPP_SimpleEvent.zpp_pool == null) {
			ret1 = new ZPP_SimpleEvent();
		} else {
			ret1 = ZPP_SimpleEvent.zpp_pool;
			ZPP_SimpleEvent.zpp_pool = ret1.next;
			ret1.next = null;
		}
		ret1.vertex = fst;
		let e2 = ret1;
		let seg;
		if(ZPP_SimpleEvent.less_xy(e1,e2)) {
			e1.type = 1;
			e2.type = 2;
			seg = ZPP_SimpleSeg.get(pre,fst);
		} else {
			e1.type = 2;
			e2.type = 1;
			seg = ZPP_SimpleSeg.get(fst,pre);
		}
		e1.segment = e2.segment = seg;
		ZPP_Simple.queue.insert(e1);
		ZPP_Simple.queue.insert(e2);
		pre.links.insert(fst);
		fst.links.insert(pre);
		if(ZPP_Simple.ints == null) {
			if(ZPP_Set_ZPP_SimpleEvent.zpp_pool == null) {
				ZPP_Simple.ints = new ZPP_Set_ZPP_SimpleEvent();
			} else {
				ZPP_Simple.ints = ZPP_Set_ZPP_SimpleEvent.zpp_pool;
				ZPP_Set_ZPP_SimpleEvent.zpp_pool = ZPP_Simple.ints.next;
				ZPP_Simple.ints.next = null;
			}
			ZPP_Simple.ints.lt = ZPP_SimpleEvent.less_xy;
		}
		while(!ZPP_Simple.queue.empty()) {
			let e = ZPP_Simple.queue.pop_front();
			ZPP_Simple.sweep.sweepx = e.vertex.x;
			if(e.type == 1) {
				let s = e.segment;
				ZPP_Simple.sweep.add(s);
				if(s.next != null && s != null && !(s.next.id < s.id ? ZPP_Simple.inthash.has(s.next.id,s.id) : ZPP_Simple.inthash.has(s.id,s.next.id))) {
					let intx = ZPP_Simple.sweep.intersection(s.next,s);
					if(intx != null) {
						if(intx.vertex.x >= ZPP_Simple.sweep.sweepx) {
							let cur = ZPP_Simple.queue.parent;
							while(cur != null) if(ZPP_Simple.queue.lt(intx,cur.data)) {
								cur = cur.prev;
							} else if(ZPP_Simple.queue.lt(cur.data,intx)) {
								cur = cur.next;
							} else {
								break;
							}
							let ex = cur;
							if(ex == null) {
								let cur = ZPP_Simple.ints.parent;
								while(cur != null) if(ZPP_Simple.ints.lt(intx,cur.data)) {
									cur = cur.prev;
								} else if(ZPP_Simple.ints.lt(cur.data,intx)) {
									cur = cur.next;
								} else {
									break;
								}
								let vx = cur;
								if(vx != null) {
									let o = intx.vertex;
									o.links.clear();
									o.node = null;
									o.forced = false;
									o.next = ZPP_SimpleVert.zpp_pool;
									ZPP_SimpleVert.zpp_pool = o;
									intx.vertex = vx.data.vertex;
									vx.data = intx;
									ZPP_Simple.queue.insert(intx);
								} else {
									ZPP_Simple.queue.insert(intx);
									ZPP_Simple.ints.insert(intx);
								}
								if(s.next.id < s.id) {
									let tmp = ZPP_Simple.inthash;
									let id = s.next.id;
									let di = s.id;
									let ret;
									if(Hashable2_Boolfalse.zpp_pool == null) {
										ret = new Hashable2_Boolfalse();
									} else {
										ret = Hashable2_Boolfalse.zpp_pool;
										Hashable2_Boolfalse.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.id = id;
									ret.di = di;
									let ret1 = ret;
									ret1.value = true;
									tmp.add(ret1);
								} else {
									let tmp = ZPP_Simple.inthash;
									let id = s.id;
									let di = s.next.id;
									let ret;
									if(Hashable2_Boolfalse.zpp_pool == null) {
										ret = new Hashable2_Boolfalse();
									} else {
										ret = Hashable2_Boolfalse.zpp_pool;
										Hashable2_Boolfalse.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.id = id;
									ret.di = di;
									let ret1 = ret;
									ret1.value = true;
									tmp.add(ret1);
								}
							} else {
								let x = ex.data;
								if(x.segment != intx.segment || intx.segment2 != x.segment2) {
									throw haxe_Exception.thrown("corner case 2, shiiiit.");
								}
								let o = intx.vertex;
								o.links.clear();
								o.node = null;
								o.forced = false;
								o.next = ZPP_SimpleVert.zpp_pool;
								ZPP_SimpleVert.zpp_pool = o;
								let o1 = intx;
								o1.vertex = null;
								o1.segment = o1.segment2 = null;
								o1.node = null;
								o1.next = ZPP_SimpleEvent.zpp_pool;
								ZPP_SimpleEvent.zpp_pool = o1;
							}
						} else {
							let o = intx.vertex;
							o.links.clear();
							o.node = null;
							o.forced = false;
							o.next = ZPP_SimpleVert.zpp_pool;
							ZPP_SimpleVert.zpp_pool = o;
							let o1 = intx;
							o1.vertex = null;
							o1.segment = o1.segment2 = null;
							o1.node = null;
							o1.next = ZPP_SimpleEvent.zpp_pool;
							ZPP_SimpleEvent.zpp_pool = o1;
						}
					}
				}
				if(s != null && s.prev != null && !(s.id < s.prev.id ? ZPP_Simple.inthash.has(s.id,s.prev.id) : ZPP_Simple.inthash.has(s.prev.id,s.id))) {
					let intx = ZPP_Simple.sweep.intersection(s,s.prev);
					if(intx != null) {
						if(intx.vertex.x >= ZPP_Simple.sweep.sweepx) {
							let cur = ZPP_Simple.queue.parent;
							while(cur != null) if(ZPP_Simple.queue.lt(intx,cur.data)) {
								cur = cur.prev;
							} else if(ZPP_Simple.queue.lt(cur.data,intx)) {
								cur = cur.next;
							} else {
								break;
							}
							let ex = cur;
							if(ex == null) {
								let cur = ZPP_Simple.ints.parent;
								while(cur != null) if(ZPP_Simple.ints.lt(intx,cur.data)) {
									cur = cur.prev;
								} else if(ZPP_Simple.ints.lt(cur.data,intx)) {
									cur = cur.next;
								} else {
									break;
								}
								let vx = cur;
								if(vx != null) {
									let o = intx.vertex;
									o.links.clear();
									o.node = null;
									o.forced = false;
									o.next = ZPP_SimpleVert.zpp_pool;
									ZPP_SimpleVert.zpp_pool = o;
									intx.vertex = vx.data.vertex;
									vx.data = intx;
									ZPP_Simple.queue.insert(intx);
								} else {
									ZPP_Simple.queue.insert(intx);
									ZPP_Simple.ints.insert(intx);
								}
								if(s.id < s.prev.id) {
									let tmp = ZPP_Simple.inthash;
									let id = s.id;
									let di = s.prev.id;
									let ret;
									if(Hashable2_Boolfalse.zpp_pool == null) {
										ret = new Hashable2_Boolfalse();
									} else {
										ret = Hashable2_Boolfalse.zpp_pool;
										Hashable2_Boolfalse.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.id = id;
									ret.di = di;
									let ret1 = ret;
									ret1.value = true;
									tmp.add(ret1);
								} else {
									let tmp = ZPP_Simple.inthash;
									let id = s.prev.id;
									let di = s.id;
									let ret;
									if(Hashable2_Boolfalse.zpp_pool == null) {
										ret = new Hashable2_Boolfalse();
									} else {
										ret = Hashable2_Boolfalse.zpp_pool;
										Hashable2_Boolfalse.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.id = id;
									ret.di = di;
									let ret1 = ret;
									ret1.value = true;
									tmp.add(ret1);
								}
							} else {
								let x = ex.data;
								if(x.segment != intx.segment || intx.segment2 != x.segment2) {
									throw haxe_Exception.thrown("corner case 2, shiiiit.");
								}
								let o = intx.vertex;
								o.links.clear();
								o.node = null;
								o.forced = false;
								o.next = ZPP_SimpleVert.zpp_pool;
								ZPP_SimpleVert.zpp_pool = o;
								let o1 = intx;
								o1.vertex = null;
								o1.segment = o1.segment2 = null;
								o1.node = null;
								o1.next = ZPP_SimpleEvent.zpp_pool;
								ZPP_SimpleEvent.zpp_pool = o1;
							}
						} else {
							let o = intx.vertex;
							o.links.clear();
							o.node = null;
							o.forced = false;
							o.next = ZPP_SimpleVert.zpp_pool;
							ZPP_SimpleVert.zpp_pool = o;
							let o1 = intx;
							o1.vertex = null;
							o1.segment = o1.segment2 = null;
							o1.node = null;
							o1.next = ZPP_SimpleEvent.zpp_pool;
							ZPP_SimpleEvent.zpp_pool = o1;
						}
					}
				}
			} else if(e.type == 2) {
				let s = e.segment;
				if(s.node != null) {
					let nxt = s.next;
					let pre = s.prev;
					ZPP_Simple.sweep.remove(s);
					let o = s;
					o.left = o.right = null;
					o.prev = null;
					o.node = null;
					o.vertices.clear();
					o.next = ZPP_SimpleSeg.zpp_pool;
					ZPP_SimpleSeg.zpp_pool = o;
					if(nxt != null && pre != null && !(nxt.id < pre.id ? ZPP_Simple.inthash.has(nxt.id,pre.id) : ZPP_Simple.inthash.has(pre.id,nxt.id))) {
						let intx = ZPP_Simple.sweep.intersection(nxt,pre);
						if(intx != null) {
							if(intx.vertex.x >= ZPP_Simple.sweep.sweepx) {
								let cur = ZPP_Simple.queue.parent;
								while(cur != null) if(ZPP_Simple.queue.lt(intx,cur.data)) {
									cur = cur.prev;
								} else if(ZPP_Simple.queue.lt(cur.data,intx)) {
									cur = cur.next;
								} else {
									break;
								}
								let ex = cur;
								if(ex == null) {
									let cur = ZPP_Simple.ints.parent;
									while(cur != null) if(ZPP_Simple.ints.lt(intx,cur.data)) {
										cur = cur.prev;
									} else if(ZPP_Simple.ints.lt(cur.data,intx)) {
										cur = cur.next;
									} else {
										break;
									}
									let vx = cur;
									if(vx != null) {
										let o = intx.vertex;
										o.links.clear();
										o.node = null;
										o.forced = false;
										o.next = ZPP_SimpleVert.zpp_pool;
										ZPP_SimpleVert.zpp_pool = o;
										intx.vertex = vx.data.vertex;
										vx.data = intx;
										ZPP_Simple.queue.insert(intx);
									} else {
										ZPP_Simple.queue.insert(intx);
										ZPP_Simple.ints.insert(intx);
									}
									if(nxt.id < pre.id) {
										let tmp = ZPP_Simple.inthash;
										let id = nxt.id;
										let di = pre.id;
										let ret;
										if(Hashable2_Boolfalse.zpp_pool == null) {
											ret = new Hashable2_Boolfalse();
										} else {
											ret = Hashable2_Boolfalse.zpp_pool;
											Hashable2_Boolfalse.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.id = id;
										ret.di = di;
										let ret1 = ret;
										ret1.value = true;
										tmp.add(ret1);
									} else {
										let tmp = ZPP_Simple.inthash;
										let id = pre.id;
										let di = nxt.id;
										let ret;
										if(Hashable2_Boolfalse.zpp_pool == null) {
											ret = new Hashable2_Boolfalse();
										} else {
											ret = Hashable2_Boolfalse.zpp_pool;
											Hashable2_Boolfalse.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.id = id;
										ret.di = di;
										let ret1 = ret;
										ret1.value = true;
										tmp.add(ret1);
									}
								} else {
									let x = ex.data;
									if(x.segment != intx.segment || intx.segment2 != x.segment2) {
										throw haxe_Exception.thrown("corner case 2, shiiiit.");
									}
									let o = intx.vertex;
									o.links.clear();
									o.node = null;
									o.forced = false;
									o.next = ZPP_SimpleVert.zpp_pool;
									ZPP_SimpleVert.zpp_pool = o;
									let o1 = intx;
									o1.vertex = null;
									o1.segment = o1.segment2 = null;
									o1.node = null;
									o1.next = ZPP_SimpleEvent.zpp_pool;
									ZPP_SimpleEvent.zpp_pool = o1;
								}
							} else {
								let o = intx.vertex;
								o.links.clear();
								o.node = null;
								o.forced = false;
								o.next = ZPP_SimpleVert.zpp_pool;
								ZPP_SimpleVert.zpp_pool = o;
								let o1 = intx;
								o1.vertex = null;
								o1.segment = o1.segment2 = null;
								o1.node = null;
								o1.next = ZPP_SimpleEvent.zpp_pool;
								ZPP_SimpleEvent.zpp_pool = o1;
							}
						}
					}
				}
			} else {
				let intx = e.vertex;
				let pnull = intx.node == null;
				let a = e.segment;
				let b = e.segment2;
				if(b.next != a) {
					let t = a;
					a = b;
					b = t;
				}
				let cur = a.vertices.parent;
				while(cur != null) if(a.vertices.lt(intx,cur.data)) {
					cur = cur.prev;
				} else if(a.vertices.lt(cur.data,intx)) {
					cur = cur.next;
				} else {
					break;
				}
				let anew = cur == null;
				let cur1 = b.vertices.parent;
				while(cur1 != null) if(b.vertices.lt(intx,cur1.data)) {
					cur1 = cur1.prev;
				} else if(b.vertices.lt(cur1.data,intx)) {
					cur1 = cur1.next;
				} else {
					break;
				}
				let bnew = cur1 == null;
				if(anew) {
					let aint = a.vertices.insert(intx);
					let naleft = intx == a.left ? intx : a.vertices.predecessor_node(aint).data;
					let naright = intx == a.right ? intx : a.vertices.successor_node(aint).data;
					naleft.links.remove(naright);
					if(intx != naleft) {
						naleft.links.insert(intx);
					}
					naright.links.remove(naleft);
					if(intx != naright) {
						naright.links.insert(intx);
					}
					if(intx != naleft) {
						intx.links.insert(naleft);
					}
					if(intx != naright) {
						intx.links.insert(naright);
					}
				}
				if(bnew) {
					let bint = b.vertices.insert(intx);
					let nbleft = intx == b.left ? intx : b.vertices.predecessor_node(bint).data;
					let nbright = intx == b.right ? intx : b.vertices.successor_node(bint).data;
					nbleft.links.remove(nbright);
					if(intx != nbleft) {
						nbleft.links.insert(intx);
					}
					nbright.links.remove(nbleft);
					if(intx != nbright) {
						nbright.links.insert(intx);
					}
					if(intx != nbleft) {
						intx.links.insert(nbleft);
					}
					if(intx != nbright) {
						intx.links.insert(nbright);
					}
				}
				if(pnull) {
					intx.node = ZPP_Simple.vertices.insert(intx);
				}
				intx.forced = true;
				if(pnull) {
					let an = a.node;
					let bn = b.node;
					an.data = b;
					bn.data = a;
					a.node = bn;
					b.node = an;
					b.next = a.next;
					a.next = b;
					a.prev = b.prev;
					b.prev = a;
					if(a.prev != null) {
						a.prev.next = a;
					}
					if(b.next != null) {
						b.next.prev = b;
					}
				}
				if(b.next != null && b != null && !(b.next.id < b.id ? ZPP_Simple.inthash.has(b.next.id,b.id) : ZPP_Simple.inthash.has(b.id,b.next.id))) {
					let intx = ZPP_Simple.sweep.intersection(b.next,b);
					if(intx != null) {
						if(intx.vertex.x >= ZPP_Simple.sweep.sweepx) {
							let cur = ZPP_Simple.queue.parent;
							while(cur != null) if(ZPP_Simple.queue.lt(intx,cur.data)) {
								cur = cur.prev;
							} else if(ZPP_Simple.queue.lt(cur.data,intx)) {
								cur = cur.next;
							} else {
								break;
							}
							let ex = cur;
							if(ex == null) {
								let cur = ZPP_Simple.ints.parent;
								while(cur != null) if(ZPP_Simple.ints.lt(intx,cur.data)) {
									cur = cur.prev;
								} else if(ZPP_Simple.ints.lt(cur.data,intx)) {
									cur = cur.next;
								} else {
									break;
								}
								let vx = cur;
								if(vx != null) {
									let o = intx.vertex;
									o.links.clear();
									o.node = null;
									o.forced = false;
									o.next = ZPP_SimpleVert.zpp_pool;
									ZPP_SimpleVert.zpp_pool = o;
									intx.vertex = vx.data.vertex;
									vx.data = intx;
									ZPP_Simple.queue.insert(intx);
								} else {
									ZPP_Simple.queue.insert(intx);
									ZPP_Simple.ints.insert(intx);
								}
								if(b.next.id < b.id) {
									let tmp = ZPP_Simple.inthash;
									let id = b.next.id;
									let di = b.id;
									let ret;
									if(Hashable2_Boolfalse.zpp_pool == null) {
										ret = new Hashable2_Boolfalse();
									} else {
										ret = Hashable2_Boolfalse.zpp_pool;
										Hashable2_Boolfalse.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.id = id;
									ret.di = di;
									let ret1 = ret;
									ret1.value = true;
									tmp.add(ret1);
								} else {
									let tmp = ZPP_Simple.inthash;
									let id = b.id;
									let di = b.next.id;
									let ret;
									if(Hashable2_Boolfalse.zpp_pool == null) {
										ret = new Hashable2_Boolfalse();
									} else {
										ret = Hashable2_Boolfalse.zpp_pool;
										Hashable2_Boolfalse.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.id = id;
									ret.di = di;
									let ret1 = ret;
									ret1.value = true;
									tmp.add(ret1);
								}
							} else {
								let x = ex.data;
								if(x.segment != intx.segment || intx.segment2 != x.segment2) {
									throw haxe_Exception.thrown("corner case 2, shiiiit.");
								}
								let o = intx.vertex;
								o.links.clear();
								o.node = null;
								o.forced = false;
								o.next = ZPP_SimpleVert.zpp_pool;
								ZPP_SimpleVert.zpp_pool = o;
								let o1 = intx;
								o1.vertex = null;
								o1.segment = o1.segment2 = null;
								o1.node = null;
								o1.next = ZPP_SimpleEvent.zpp_pool;
								ZPP_SimpleEvent.zpp_pool = o1;
							}
						} else {
							let o = intx.vertex;
							o.links.clear();
							o.node = null;
							o.forced = false;
							o.next = ZPP_SimpleVert.zpp_pool;
							ZPP_SimpleVert.zpp_pool = o;
							let o1 = intx;
							o1.vertex = null;
							o1.segment = o1.segment2 = null;
							o1.node = null;
							o1.next = ZPP_SimpleEvent.zpp_pool;
							ZPP_SimpleEvent.zpp_pool = o1;
						}
					}
				}
				if(a != null && a.prev != null && !(a.id < a.prev.id ? ZPP_Simple.inthash.has(a.id,a.prev.id) : ZPP_Simple.inthash.has(a.prev.id,a.id))) {
					let intx = ZPP_Simple.sweep.intersection(a,a.prev);
					if(intx != null) {
						if(intx.vertex.x >= ZPP_Simple.sweep.sweepx) {
							let cur = ZPP_Simple.queue.parent;
							while(cur != null) if(ZPP_Simple.queue.lt(intx,cur.data)) {
								cur = cur.prev;
							} else if(ZPP_Simple.queue.lt(cur.data,intx)) {
								cur = cur.next;
							} else {
								break;
							}
							let ex = cur;
							if(ex == null) {
								let cur = ZPP_Simple.ints.parent;
								while(cur != null) if(ZPP_Simple.ints.lt(intx,cur.data)) {
									cur = cur.prev;
								} else if(ZPP_Simple.ints.lt(cur.data,intx)) {
									cur = cur.next;
								} else {
									break;
								}
								let vx = cur;
								if(vx != null) {
									let o = intx.vertex;
									o.links.clear();
									o.node = null;
									o.forced = false;
									o.next = ZPP_SimpleVert.zpp_pool;
									ZPP_SimpleVert.zpp_pool = o;
									intx.vertex = vx.data.vertex;
									vx.data = intx;
									ZPP_Simple.queue.insert(intx);
								} else {
									ZPP_Simple.queue.insert(intx);
									ZPP_Simple.ints.insert(intx);
								}
								if(a.id < a.prev.id) {
									let tmp = ZPP_Simple.inthash;
									let id = a.id;
									let di = a.prev.id;
									let ret;
									if(Hashable2_Boolfalse.zpp_pool == null) {
										ret = new Hashable2_Boolfalse();
									} else {
										ret = Hashable2_Boolfalse.zpp_pool;
										Hashable2_Boolfalse.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.id = id;
									ret.di = di;
									let ret1 = ret;
									ret1.value = true;
									tmp.add(ret1);
								} else {
									let tmp = ZPP_Simple.inthash;
									let id = a.prev.id;
									let di = a.id;
									let ret;
									if(Hashable2_Boolfalse.zpp_pool == null) {
										ret = new Hashable2_Boolfalse();
									} else {
										ret = Hashable2_Boolfalse.zpp_pool;
										Hashable2_Boolfalse.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.id = id;
									ret.di = di;
									let ret1 = ret;
									ret1.value = true;
									tmp.add(ret1);
								}
							} else {
								let x = ex.data;
								if(x.segment != intx.segment || intx.segment2 != x.segment2) {
									throw haxe_Exception.thrown("corner case 2, shiiiit.");
								}
								let o = intx.vertex;
								o.links.clear();
								o.node = null;
								o.forced = false;
								o.next = ZPP_SimpleVert.zpp_pool;
								ZPP_SimpleVert.zpp_pool = o;
								let o1 = intx;
								o1.vertex = null;
								o1.segment = o1.segment2 = null;
								o1.node = null;
								o1.next = ZPP_SimpleEvent.zpp_pool;
								ZPP_SimpleEvent.zpp_pool = o1;
							}
						} else {
							let o = intx.vertex;
							o.links.clear();
							o.node = null;
							o.forced = false;
							o.next = ZPP_SimpleVert.zpp_pool;
							ZPP_SimpleVert.zpp_pool = o;
							let o1 = intx;
							o1.vertex = null;
							o1.segment = o1.segment2 = null;
							o1.node = null;
							o1.next = ZPP_SimpleEvent.zpp_pool;
							ZPP_SimpleEvent.zpp_pool = o1;
						}
					}
				}
				ZPP_Simple.ints.remove(e);
			}
			let o = e;
			o.vertex = null;
			o.segment = o.segment2 = null;
			o.node = null;
			o.next = ZPP_SimpleEvent.zpp_pool;
			ZPP_SimpleEvent.zpp_pool = o;
		}
		let _g = 0;
		let _g1 = ZPP_Simple.inthash.table.length;
		while(_g < _g1) {
			let i = _g++;
			let n = ZPP_Simple.inthash.table[i];
			if(n == null) {
				continue;
			}
			while(n != null) {
				let t = n.hnext;
				n.hnext = null;
				let o = n;
				o.next = Hashable2_Boolfalse.zpp_pool;
				Hashable2_Boolfalse.zpp_pool = o;
				n = t;
			}
			ZPP_Simple.inthash.table[i] = null;
		}
		if(rets == null) {
			rets = new ZNPList_ZPP_GeomVert();
		}
		while(!ZPP_Simple.vertices.empty()) ZPP_Simple.clip_polygon(ZPP_Simple.vertices,rets);
		return rets;
	}
	static clip_polygon(vertices,rets) {
		let ret = null;
		let cur = vertices.first();
		let fst = cur;
		let pren = cur.links.parent;
		let nxtn = pren.prev == null ? pren.next : pren.prev;
		let pre = pren.data;
		let nxt = nxtn.data;
		let ux = 0.0;
		let uy = 0.0;
		ux = cur.x - pre.x;
		uy = cur.y - pre.y;
		let vx = 0.0;
		let vy = 0.0;
		vx = nxt.x - cur.x;
		vy = nxt.y - cur.y;
		if(vy * ux - vx * uy < 0) {
			nxt = pre;
		}
		let x = cur.x;
		let y = cur.y;
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
		if(ret == null) {
			ret = obj.prev = obj.next = obj;
		} else {
			obj.prev = ret;
			obj.next = ret.next;
			ret.next.prev = obj;
			ret.next = obj;
		}
		ret = obj;
		ret.forced = cur.forced;
		while(true) {
			cur.links.remove(nxt);
			nxt.links.remove(cur);
			if(nxt == fst) {
				if(cur.links.empty()) {
					vertices.remove(cur);
					let o = cur;
					o.links.clear();
					o.node = null;
					o.forced = false;
					o.next = ZPP_SimpleVert.zpp_pool;
					ZPP_SimpleVert.zpp_pool = o;
				}
				break;
			}
			let x = nxt.x;
			let y = nxt.y;
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
			if(ret == null) {
				ret = obj.prev = obj.next = obj;
			} else {
				obj.prev = ret;
				obj.next = ret.next;
				ret.next.prev = obj;
				ret.next = obj;
			}
			ret = obj;
			ret.forced = nxt.forced;
			if(nxt.links.singular()) {
				if(cur.links.empty()) {
					vertices.remove(cur);
					let o = cur;
					o.links.clear();
					o.node = null;
					o.forced = false;
					o.next = ZPP_SimpleVert.zpp_pool;
					ZPP_SimpleVert.zpp_pool = o;
				}
				cur = nxt;
				nxt = nxt.links.parent.data;
			} else {
				let min = null;
				let minl = 0.0;
				if(!nxt.links.empty()) {
					let set_ite = nxt.links.parent;
					while(set_ite.prev != null) set_ite = set_ite.prev;
					while(set_ite != null) {
						let p = set_ite.data;
						if(min == null) {
							min = p;
							let ux = 0.0;
							let uy = 0.0;
							ux = nxt.x - cur.x;
							uy = nxt.y - cur.y;
							let vx = 0.0;
							let vy = 0.0;
							vx = p.x - nxt.x;
							vy = p.y - nxt.y;
							minl = vy * ux - vx * uy;
						} else {
							let ux = 0.0;
							let uy = 0.0;
							ux = nxt.x - cur.x;
							uy = nxt.y - cur.y;
							let vx = 0.0;
							let vy = 0.0;
							vx = p.x - nxt.x;
							vy = p.y - nxt.y;
							let nleft = vy * ux - vx * uy;
							if(nleft > 0 && minl <= 0) {
								min = p;
								minl = nleft;
							} else if(minl * nleft >= 0) {
								let ux = 0.0;
								let uy = 0.0;
								ux = nxt.x - p.x;
								uy = nxt.y - p.y;
								let vx = 0.0;
								let vy = 0.0;
								vx = min.x - nxt.x;
								vy = min.y - nxt.y;
								let pleft = vy * ux - vx * uy;
								if(pleft > 0) {
									min = p;
									minl = nleft;
								}
							}
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
				if(cur.links.empty()) {
					vertices.remove(cur);
					let o = cur;
					o.links.clear();
					o.node = null;
					o.forced = false;
					o.next = ZPP_SimpleVert.zpp_pool;
					ZPP_SimpleVert.zpp_pool = o;
				}
				cur = nxt;
				nxt = min;
			}
		}
		vertices.remove(fst);
		let o = fst;
		o.links.clear();
		o.node = null;
		o.forced = false;
		o.next = ZPP_SimpleVert.zpp_pool;
		ZPP_SimpleVert.zpp_pool = o;
		rets.add(ret);
	}
	static isSimple(poly) {
		if(ZPP_Simple.sweep == null) {
			ZPP_Simple.sweep = new ZPP_SimpleSweep();
			ZPP_Simple.inthash = new FastHash2_Hashable2_Boolfalse();
		}
		let vertices = ZPP_Simple.list_vertices;
		if(vertices == null) {
			vertices = ZPP_Simple.list_vertices = new ZNPList_ZPP_SimpleVert();
		}
		let F = poly;
		let L = poly;
		if(F != null) {
			let nite = F;
			while(true) {
				let v = nite;
				let x = v.x;
				let y = v.y;
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
				vertices.add(ret);
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		let queue = ZPP_Simple.list_queue;
		if(queue == null) {
			queue = ZPP_Simple.list_queue = new ZNPList_ZPP_SimpleEvent();
		}
		let cx_ite = vertices.head;
		let u = cx_ite.elt;
		cx_ite = cx_ite.next;
		while(cx_ite != null) {
			let v = cx_ite.elt;
			let ret;
			if(ZPP_SimpleEvent.zpp_pool == null) {
				ret = new ZPP_SimpleEvent();
			} else {
				ret = ZPP_SimpleEvent.zpp_pool;
				ZPP_SimpleEvent.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.vertex = u;
			let e1 = queue.add(ret);
			let ret1;
			if(ZPP_SimpleEvent.zpp_pool == null) {
				ret1 = new ZPP_SimpleEvent();
			} else {
				ret1 = ZPP_SimpleEvent.zpp_pool;
				ZPP_SimpleEvent.zpp_pool = ret1.next;
				ret1.next = null;
			}
			ret1.vertex = v;
			let e2 = queue.add(ret1);
			let tmp;
			if(ZPP_SimpleEvent.less_xy(e1,e2)) {
				e1.type = 1;
				e2.type = 2;
				tmp = ZPP_SimpleSeg.get(u,v);
			} else {
				e1.type = 2;
				e2.type = 1;
				tmp = ZPP_SimpleSeg.get(v,u);
			}
			e1.segment = e2.segment = tmp;
			u = v;
			cx_ite = cx_ite.next;
		}
		let v = vertices.head.elt;
		let ret;
		if(ZPP_SimpleEvent.zpp_pool == null) {
			ret = new ZPP_SimpleEvent();
		} else {
			ret = ZPP_SimpleEvent.zpp_pool;
			ZPP_SimpleEvent.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.vertex = u;
		let e1 = queue.add(ret);
		let ret1;
		if(ZPP_SimpleEvent.zpp_pool == null) {
			ret1 = new ZPP_SimpleEvent();
		} else {
			ret1 = ZPP_SimpleEvent.zpp_pool;
			ZPP_SimpleEvent.zpp_pool = ret1.next;
			ret1.next = null;
		}
		ret1.vertex = v;
		let e2 = queue.add(ret1);
		let tmp;
		if(ZPP_SimpleEvent.less_xy(e1,e2)) {
			e1.type = 1;
			e2.type = 2;
			tmp = ZPP_SimpleSeg.get(u,v);
		} else {
			e1.type = 2;
			e2.type = 1;
			tmp = ZPP_SimpleSeg.get(v,u);
		}
		e1.segment = e2.segment = tmp;
		let xxlist = queue;
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
						} else if(ZPP_SimpleEvent.less_xy(left.elt,right.elt)) {
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
		let ret2 = true;
		while(queue.head != null) {
			let e = queue.pop_unsafe();
			let seg = e.segment;
			if(e.type == 1) {
				ZPP_Simple.sweep.add(seg);
				if(ZPP_Simple.sweep.intersect(seg,seg.next) || ZPP_Simple.sweep.intersect(seg,seg.prev)) {
					ret2 = false;
					break;
				}
			} else if(e.type == 2) {
				if(ZPP_Simple.sweep.intersect(seg.prev,seg.next)) {
					ret2 = false;
					break;
				}
				ZPP_Simple.sweep.remove(seg);
				let o = seg;
				o.left = o.right = null;
				o.prev = null;
				o.node = null;
				o.vertices.clear();
				o.next = ZPP_SimpleSeg.zpp_pool;
				ZPP_SimpleSeg.zpp_pool = o;
			}
			let o = e;
			o.vertex = null;
			o.segment = o.segment2 = null;
			o.node = null;
			o.next = ZPP_SimpleEvent.zpp_pool;
			ZPP_SimpleEvent.zpp_pool = o;
		}
		while(queue.head != null) {
			let e = queue.pop_unsafe();
			if(e.type == 2) {
				let o = e.segment;
				o.left = o.right = null;
				o.prev = null;
				o.node = null;
				o.vertices.clear();
				o.next = ZPP_SimpleSeg.zpp_pool;
				ZPP_SimpleSeg.zpp_pool = o;
			}
			let o = e;
			o.vertex = null;
			o.segment = o.segment2 = null;
			o.node = null;
			o.next = ZPP_SimpleEvent.zpp_pool;
			ZPP_SimpleEvent.zpp_pool = o;
		}
		ZPP_Simple.sweep.clear();
		while(vertices.head != null) {
			let o = vertices.pop_unsafe();
			o.links.clear();
			o.node = null;
			o.forced = false;
			o.next = ZPP_SimpleVert.zpp_pool;
			ZPP_SimpleVert.zpp_pool = o;
		}
		return ret2;
	}
}
ZPP_Simple.sweep = null;
ZPP_Simple.inthash = null;
ZPP_Simple.vertices = null;
ZPP_Simple.queue = null;
ZPP_Simple.ints = null;
ZPP_Simple.list_vertices = null;
ZPP_Simple.list_queue = null;
