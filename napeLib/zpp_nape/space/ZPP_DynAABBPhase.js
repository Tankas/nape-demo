import ZNPNode_ZPP_AABBNode from '../util/ZNPNode_ZPP_AABBNode.js';
import ZNPNode_ZPP_AABBPair from '../util/ZNPNode_ZPP_AABBPair.js';
import ZNPList_ZPP_AABBNode from '../util/ZNPList_ZPP_AABBNode.js';
import ZPP_AABBTree from './ZPP_AABBTree.js';
import ZPP_AABBPair from './ZPP_AABBPair.js';
import ZPP_AABBNode from './ZPP_AABBNode.js';
import ZPP_Broadphase from './ZPP_Broadphase.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import ZPP_Collide from '../geom/ZPP_Collide.js';
import ZPP_AABB from '../geom/ZPP_AABB.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import ShapeList from '../../nape/shape/ShapeList.js';
import BodyList from '../../nape/phys/BodyList.js';
import RayResultList from '../../nape/geom/RayResultList.js';
export default class ZPP_DynAABBPhase extends ZPP_Broadphase {
	constructor(space) {
		ZPP_Broadphase._hx_skip_constructor = true;
		super();
		ZPP_Broadphase._hx_skip_constructor = false;
		this._hx_constructor(space);
	}
	_hx_constructor(space) {
		this.openlist = null;
		this.failed = null;
		this.treeStack2 = null;
		this.treeStack = null;
		this.moves = null;
		this.syncs = null;
		this.pairs = null;
		this.dtree = null;
		this.stree = null;
		super._hx_constructor();
		this.space = space;
		this.is_sweep = false;
		this.dynab = this;
		this.stree = new ZPP_AABBTree();
		this.dtree = new ZPP_AABBTree();
	}
	dyn(shape) {
		if(shape.body.type == ZPP_Flags.id_BodyType_STATIC) {
			return false;
		} else {
			return !shape.body.component.sleeping;
		}
	}
	__insert(shape) {
		let node;
		if(ZPP_AABBNode.zpp_pool == null) {
			node = new ZPP_AABBNode();
		} else {
			node = ZPP_AABBNode.zpp_pool;
			ZPP_AABBNode.zpp_pool = node.next;
			node.next = null;
		}
		if(ZPP_AABB.zpp_pool == null) {
			node.aabb = new ZPP_AABB();
		} else {
			node.aabb = ZPP_AABB.zpp_pool;
			ZPP_AABB.zpp_pool = node.aabb.next;
			node.aabb.next = null;
		}
		node.moved = false;
		node.synced = false;
		node.first_sync = false;
		node.shape = shape;
		shape.node = node;
		node.synced = true;
		node.first_sync = true;
		node.snext = this.syncs;
		this.syncs = node;
	}
	__remove(shape) {
		let node = shape.node;
		if(!node.first_sync) {
			if(node.dyn) {
				this.dtree.removeLeaf(node);
			} else {
				this.stree.removeLeaf(node);
			}
		}
		shape.node = null;
		if(node.synced) {
			let pre = null;
			let cur = this.syncs;
			while(cur != null) {
				if(cur == node) {
					break;
				}
				pre = cur;
				cur = cur.snext;
			}
			if(pre == null) {
				this.syncs = cur.snext;
			} else {
				pre.snext = cur.snext;
			}
			cur.snext = null;
			node.synced = false;
		}
		if(node.moved) {
			let pre = null;
			let cur = this.moves;
			while(cur != null) {
				if(cur == node) {
					break;
				}
				pre = cur;
				cur = cur.mnext;
			}
			if(pre == null) {
				this.moves = cur.mnext;
			} else {
				pre.mnext = cur.mnext;
			}
			cur.mnext = null;
			node.moved = false;
		}
		let pre = null;
		let cur = this.pairs;
		while(cur != null) {
			let nxt = cur.next;
			if(cur.n1 == node || cur.n2 == node) {
				if(pre == null) {
					this.pairs = nxt;
				} else {
					pre.next = nxt;
				}
				if(cur.arb != null) {
					cur.arb.pair = null;
				}
				cur.arb = null;
				cur.n1.shape.pairs.remove(cur);
				cur.n2.shape.pairs.remove(cur);
				let o = cur;
				o.n1 = o.n2 = null;
				o.sleeping = false;
				o.next = ZPP_AABBPair.zpp_pool;
				ZPP_AABBPair.zpp_pool = o;
				cur = nxt;
				continue;
			}
			pre = cur;
			cur = nxt;
		}
		while(shape.pairs.head != null) {
			let cur = shape.pairs.pop_unsafe();
			if(cur.n1 == node) {
				cur.n2.shape.pairs.remove(cur);
			} else {
				cur.n1.shape.pairs.remove(cur);
			}
			if(cur.arb != null) {
				cur.arb.pair = null;
			}
			cur.arb = null;
			let o = cur;
			o.n1 = o.n2 = null;
			o.sleeping = false;
			o.next = ZPP_AABBPair.zpp_pool;
			ZPP_AABBPair.zpp_pool = o;
		}
		let o = node;
		o.height = -1;
		let o1 = o.aabb;
		if(o1.outer != null) {
			o1.outer.zpp_inner = null;
			o1.outer = null;
		}
		o1.wrap_min = o1.wrap_max = null;
		o1._invalidate = null;
		o1._validate = null;
		o1.next = ZPP_AABB.zpp_pool;
		ZPP_AABB.zpp_pool = o1;
		o.child1 = o.child2 = o.parent = null;
		o.next = null;
		o.snext = null;
		o.mnext = null;
		o.next = ZPP_AABBNode.zpp_pool;
		ZPP_AABBNode.zpp_pool = o;
	}
	__sync(shape) {
		let node = shape.node;
		if(!node.synced) {
			if(!this.space.continuous) {
				if(shape.zip_aabb) {
					if(shape.body != null) {
						shape.zip_aabb = false;
						if(shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
							let _this = shape.circle;
							if(_this.zip_worldCOM) {
								if(_this.body != null) {
									_this.zip_worldCOM = false;
									if(_this.zip_localCOM) {
										_this.zip_localCOM = false;
										if(_this.type == ZPP_Flags.id_ShapeType_POLYGON) {
											let _this1 = _this.polygon;
											if(_this1.lverts.next == null) {
												throw haxe_Exception.thrown("Error: An empty polygon has no meaningful localCOM");
											}
											if(_this1.lverts.next.next == null) {
												_this1.localCOMx = _this1.lverts.next.x;
												_this1.localCOMy = _this1.lverts.next.y;
											} else if(_this1.lverts.next.next.next == null) {
												_this1.localCOMx = _this1.lverts.next.x;
												_this1.localCOMy = _this1.lverts.next.y;
												let t = 1.0;
												_this1.localCOMx += _this1.lverts.next.next.x * t;
												_this1.localCOMy += _this1.lverts.next.next.y * t;
												let t1 = 0.5;
												_this1.localCOMx *= t1;
												_this1.localCOMy *= t1;
											} else {
												_this1.localCOMx = 0;
												_this1.localCOMy = 0;
												let area = 0.0;
												let cx_ite = _this1.lverts.next;
												let u = cx_ite;
												cx_ite = cx_ite.next;
												let v = cx_ite;
												cx_ite = cx_ite.next;
												while(cx_ite != null) {
													let w = cx_ite;
													area += v.x * (w.y - u.y);
													let cf = w.y * v.x - w.x * v.y;
													_this1.localCOMx += (v.x + w.x) * cf;
													_this1.localCOMy += (v.y + w.y) * cf;
													u = v;
													v = w;
													cx_ite = cx_ite.next;
												}
												cx_ite = _this1.lverts.next;
												let w = cx_ite;
												area += v.x * (w.y - u.y);
												let cf = w.y * v.x - w.x * v.y;
												_this1.localCOMx += (v.x + w.x) * cf;
												_this1.localCOMy += (v.y + w.y) * cf;
												u = v;
												v = w;
												cx_ite = cx_ite.next;
												let w1 = cx_ite;
												area += v.x * (w1.y - u.y);
												let cf1 = w1.y * v.x - w1.x * v.y;
												_this1.localCOMx += (v.x + w1.x) * cf1;
												_this1.localCOMy += (v.y + w1.y) * cf1;
												area = 1 / (3 * area);
												let t = area;
												_this1.localCOMx *= t;
												_this1.localCOMy *= t;
											}
										}
										if(_this.wrap_localCOM != null) {
											_this.wrap_localCOM.zpp_inner.x = _this.localCOMx;
											_this.wrap_localCOM.zpp_inner.y = _this.localCOMy;
										}
									}
									let _this1 = _this.body;
									if(_this1.zip_axis) {
										_this1.zip_axis = false;
										_this1.axisx = Math.sin(_this1.rot);
										_this1.axisy = Math.cos(_this1.rot);
									}
									_this.worldCOMx = _this.body.posx + (_this.body.axisy * _this.localCOMx - _this.body.axisx * _this.localCOMy);
									_this.worldCOMy = _this.body.posy + (_this.localCOMx * _this.body.axisx + _this.localCOMy * _this.body.axisy);
								}
							}
							let rx = _this.radius;
							let ry = _this.radius;
							_this.aabb.minx = _this.worldCOMx - rx;
							_this.aabb.miny = _this.worldCOMy - ry;
							_this.aabb.maxx = _this.worldCOMx + rx;
							_this.aabb.maxy = _this.worldCOMy + ry;
						} else {
							let _this = shape.polygon;
							if(_this.zip_gverts) {
								if(_this.body != null) {
									_this.zip_gverts = false;
									_this.validate_lverts();
									let _this1 = _this.body;
									if(_this1.zip_axis) {
										_this1.zip_axis = false;
										_this1.axisx = Math.sin(_this1.rot);
										_this1.axisy = Math.cos(_this1.rot);
									}
									let li = _this.lverts.next;
									let cx_ite = _this.gverts.next;
									while(cx_ite != null) {
										let g = cx_ite;
										let l = li;
										li = li.next;
										g.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
										g.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
										cx_ite = cx_ite.next;
									}
								}
							}
							if(_this.lverts.next == null) {
								throw haxe_Exception.thrown("Error: An empty polygon has no meaningful bounds");
							}
							let p0 = _this.gverts.next;
							_this.aabb.minx = p0.x;
							_this.aabb.miny = p0.y;
							_this.aabb.maxx = p0.x;
							_this.aabb.maxy = p0.y;
							let cx_ite = _this.gverts.next.next;
							while(cx_ite != null) {
								let p = cx_ite;
								if(p.x < _this.aabb.minx) {
									_this.aabb.minx = p.x;
								}
								if(p.x > _this.aabb.maxx) {
									_this.aabb.maxx = p.x;
								}
								if(p.y < _this.aabb.miny) {
									_this.aabb.miny = p.y;
								}
								if(p.y > _this.aabb.maxy) {
									_this.aabb.maxy = p.y;
								}
								cx_ite = cx_ite.next;
							}
						}
					}
				}
			}
			let sync;
			if(node.dyn == (shape.body.type == ZPP_Flags.id_BodyType_STATIC ? false : !shape.body.component.sleeping)) {
				let _this = node.aabb;
				let x = shape.aabb;
				sync = !(x.minx >= _this.minx && x.miny >= _this.miny && x.maxx <= _this.maxx && x.maxy <= _this.maxy);
			} else {
				sync = true;
			}
			if(sync) {
				node.synced = true;
				node.snext = this.syncs;
				this.syncs = node;
			}
		}
	}
	sync_broadphase() {
		this.space.validation();
		if(this.syncs != null) {
			if(this.moves == null) {
				let node = this.syncs;
				while(node != null) {
					let shape = node.shape;
					if(!node.first_sync) {
						let tree = node.dyn ? this.dtree : this.stree;
						if(node == tree.root) {
							tree.root = null;
						} else {
							let parent = node.parent;
							let gparent = parent.parent;
							let sibling = parent.child1 == node ? parent.child2 : parent.child1;
							if(gparent != null) {
								if(gparent.child1 == parent) {
									gparent.child1 = sibling;
								} else {
									gparent.child2 = sibling;
								}
								sibling.parent = gparent;
								let o = parent;
								o.height = -1;
								let o1 = o.aabb;
								if(o1.outer != null) {
									o1.outer.zpp_inner = null;
									o1.outer = null;
								}
								o1.wrap_min = o1.wrap_max = null;
								o1._invalidate = null;
								o1._validate = null;
								o1.next = ZPP_AABB.zpp_pool;
								ZPP_AABB.zpp_pool = o1;
								o.child1 = o.child2 = o.parent = null;
								o.next = null;
								o.snext = null;
								o.mnext = null;
								o.next = ZPP_AABBNode.zpp_pool;
								ZPP_AABBNode.zpp_pool = o;
								let node = gparent;
								while(node != null) {
									if(!(node.child1 == null || node.height < 2)) {
										let b = node.child1;
										let c = node.child2;
										let balance = c.height - b.height;
										if(balance > 1) {
											let f = c.child1;
											let g = c.child2;
											c.child1 = node;
											c.parent = node.parent;
											node.parent = c;
											if(c.parent != null) {
												if(c.parent.child1 == node) {
													c.parent.child1 = c;
												} else {
													c.parent.child2 = c;
												}
											} else {
												tree.root = c;
											}
											if(f.height > g.height) {
												c.child2 = f;
												node.child2 = g;
												g.parent = node;
												let _this = node.aabb;
												let a = b.aabb;
												let b1 = g.aabb;
												_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
												_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
												_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
												_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
												let _this1 = c.aabb;
												let a1 = node.aabb;
												let b2 = f.aabb;
												_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
												_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
												_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
												_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
												let x = b.height;
												let y = g.height;
												node.height = 1 + (x > y ? x : y);
												let x1 = node.height;
												let y1 = f.height;
												c.height = 1 + (x1 > y1 ? x1 : y1);
											} else {
												c.child2 = g;
												node.child2 = f;
												f.parent = node;
												let _this = node.aabb;
												let a = b.aabb;
												let b1 = f.aabb;
												_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
												_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
												_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
												_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
												let _this1 = c.aabb;
												let a1 = node.aabb;
												let b2 = g.aabb;
												_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
												_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
												_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
												_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
												let x = b.height;
												let y = f.height;
												node.height = 1 + (x > y ? x : y);
												let x1 = node.height;
												let y1 = g.height;
												c.height = 1 + (x1 > y1 ? x1 : y1);
											}
											node = c;
										} else if(balance < -1) {
											let f = b.child1;
											let g = b.child2;
											b.child1 = node;
											b.parent = node.parent;
											node.parent = b;
											if(b.parent != null) {
												if(b.parent.child1 == node) {
													b.parent.child1 = b;
												} else {
													b.parent.child2 = b;
												}
											} else {
												tree.root = b;
											}
											if(f.height > g.height) {
												b.child2 = f;
												node.child1 = g;
												g.parent = node;
												let _this = node.aabb;
												let a = c.aabb;
												let b1 = g.aabb;
												_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
												_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
												_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
												_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
												let _this1 = b.aabb;
												let a1 = node.aabb;
												let b2 = f.aabb;
												_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
												_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
												_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
												_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
												let x = c.height;
												let y = g.height;
												node.height = 1 + (x > y ? x : y);
												let x1 = node.height;
												let y1 = f.height;
												b.height = 1 + (x1 > y1 ? x1 : y1);
											} else {
												b.child2 = g;
												node.child1 = f;
												f.parent = node;
												let _this = node.aabb;
												let a = c.aabb;
												let b1 = f.aabb;
												_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
												_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
												_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
												_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
												let _this1 = b.aabb;
												let a1 = node.aabb;
												let b2 = g.aabb;
												_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
												_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
												_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
												_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
												let x = c.height;
												let y = f.height;
												node.height = 1 + (x > y ? x : y);
												let x1 = node.height;
												let y1 = g.height;
												b.height = 1 + (x1 > y1 ? x1 : y1);
											}
											node = b;
										}
									}
									let child1 = node.child1;
									let child2 = node.child2;
									let _this = node.aabb;
									let a = child1.aabb;
									let b = child2.aabb;
									_this.minx = a.minx < b.minx ? a.minx : b.minx;
									_this.miny = a.miny < b.miny ? a.miny : b.miny;
									_this.maxx = a.maxx > b.maxx ? a.maxx : b.maxx;
									_this.maxy = a.maxy > b.maxy ? a.maxy : b.maxy;
									let x = child1.height;
									let y = child2.height;
									node.height = 1 + (x > y ? x : y);
									node = node.parent;
								}
							} else {
								tree.root = sibling;
								sibling.parent = null;
								let o = parent;
								o.height = -1;
								let o1 = o.aabb;
								if(o1.outer != null) {
									o1.outer.zpp_inner = null;
									o1.outer = null;
								}
								o1.wrap_min = o1.wrap_max = null;
								o1._invalidate = null;
								o1._validate = null;
								o1.next = ZPP_AABB.zpp_pool;
								ZPP_AABB.zpp_pool = o1;
								o.child1 = o.child2 = o.parent = null;
								o.next = null;
								o.snext = null;
								o.mnext = null;
								o.next = ZPP_AABBNode.zpp_pool;
								ZPP_AABBNode.zpp_pool = o;
							}
						}
					} else {
						node.first_sync = false;
					}
					let aabb = node.aabb;
					if(!this.space.continuous) {
						if(shape.zip_aabb) {
							if(shape.body != null) {
								shape.zip_aabb = false;
								if(shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
									let _this = shape.circle;
									if(_this.zip_worldCOM) {
										if(_this.body != null) {
											_this.zip_worldCOM = false;
											if(_this.zip_localCOM) {
												_this.zip_localCOM = false;
												if(_this.type == ZPP_Flags.id_ShapeType_POLYGON) {
													let _this1 = _this.polygon;
													if(_this1.lverts.next == null) {
														throw haxe_Exception.thrown("Error: An empty polygon has no meaningful localCOM");
													}
													if(_this1.lverts.next.next == null) {
														_this1.localCOMx = _this1.lverts.next.x;
														_this1.localCOMy = _this1.lverts.next.y;
													} else if(_this1.lverts.next.next.next == null) {
														_this1.localCOMx = _this1.lverts.next.x;
														_this1.localCOMy = _this1.lverts.next.y;
														let t = 1.0;
														_this1.localCOMx += _this1.lverts.next.next.x * t;
														_this1.localCOMy += _this1.lverts.next.next.y * t;
														let t1 = 0.5;
														_this1.localCOMx *= t1;
														_this1.localCOMy *= t1;
													} else {
														_this1.localCOMx = 0;
														_this1.localCOMy = 0;
														let area = 0.0;
														let cx_ite = _this1.lverts.next;
														let u = cx_ite;
														cx_ite = cx_ite.next;
														let v = cx_ite;
														cx_ite = cx_ite.next;
														while(cx_ite != null) {
															let w = cx_ite;
															area += v.x * (w.y - u.y);
															let cf = w.y * v.x - w.x * v.y;
															_this1.localCOMx += (v.x + w.x) * cf;
															_this1.localCOMy += (v.y + w.y) * cf;
															u = v;
															v = w;
															cx_ite = cx_ite.next;
														}
														cx_ite = _this1.lverts.next;
														let w = cx_ite;
														area += v.x * (w.y - u.y);
														let cf = w.y * v.x - w.x * v.y;
														_this1.localCOMx += (v.x + w.x) * cf;
														_this1.localCOMy += (v.y + w.y) * cf;
														u = v;
														v = w;
														cx_ite = cx_ite.next;
														let w1 = cx_ite;
														area += v.x * (w1.y - u.y);
														let cf1 = w1.y * v.x - w1.x * v.y;
														_this1.localCOMx += (v.x + w1.x) * cf1;
														_this1.localCOMy += (v.y + w1.y) * cf1;
														area = 1 / (3 * area);
														let t = area;
														_this1.localCOMx *= t;
														_this1.localCOMy *= t;
													}
												}
												if(_this.wrap_localCOM != null) {
													_this.wrap_localCOM.zpp_inner.x = _this.localCOMx;
													_this.wrap_localCOM.zpp_inner.y = _this.localCOMy;
												}
											}
											let _this1 = _this.body;
											if(_this1.zip_axis) {
												_this1.zip_axis = false;
												_this1.axisx = Math.sin(_this1.rot);
												_this1.axisy = Math.cos(_this1.rot);
											}
											_this.worldCOMx = _this.body.posx + (_this.body.axisy * _this.localCOMx - _this.body.axisx * _this.localCOMy);
											_this.worldCOMy = _this.body.posy + (_this.localCOMx * _this.body.axisx + _this.localCOMy * _this.body.axisy);
										}
									}
									let rx = _this.radius;
									let ry = _this.radius;
									_this.aabb.minx = _this.worldCOMx - rx;
									_this.aabb.miny = _this.worldCOMy - ry;
									_this.aabb.maxx = _this.worldCOMx + rx;
									_this.aabb.maxy = _this.worldCOMy + ry;
								} else {
									let _this = shape.polygon;
									if(_this.zip_gverts) {
										if(_this.body != null) {
											_this.zip_gverts = false;
											_this.validate_lverts();
											let _this1 = _this.body;
											if(_this1.zip_axis) {
												_this1.zip_axis = false;
												_this1.axisx = Math.sin(_this1.rot);
												_this1.axisy = Math.cos(_this1.rot);
											}
											let li = _this.lverts.next;
											let cx_ite = _this.gverts.next;
											while(cx_ite != null) {
												let g = cx_ite;
												let l = li;
												li = li.next;
												g.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
												g.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
												cx_ite = cx_ite.next;
											}
										}
									}
									if(_this.lverts.next == null) {
										throw haxe_Exception.thrown("Error: An empty polygon has no meaningful bounds");
									}
									let p0 = _this.gverts.next;
									_this.aabb.minx = p0.x;
									_this.aabb.miny = p0.y;
									_this.aabb.maxx = p0.x;
									_this.aabb.maxy = p0.y;
									let cx_ite = _this.gverts.next.next;
									while(cx_ite != null) {
										let p = cx_ite;
										if(p.x < _this.aabb.minx) {
											_this.aabb.minx = p.x;
										}
										if(p.x > _this.aabb.maxx) {
											_this.aabb.maxx = p.x;
										}
										if(p.y < _this.aabb.miny) {
											_this.aabb.miny = p.y;
										}
										if(p.y > _this.aabb.maxy) {
											_this.aabb.maxy = p.y;
										}
										cx_ite = cx_ite.next;
									}
								}
							}
						}
					}
					let a = shape.aabb;
					aabb.minx = a.minx - 3.0;
					aabb.miny = a.miny - 3.0;
					aabb.maxx = a.maxx + 3.0;
					aabb.maxy = a.maxy + 3.0;
					let tree = (node.dyn = shape.body.type == ZPP_Flags.id_BodyType_STATIC ? false : !shape.body.component.sleeping) ? this.dtree : this.stree;
					if(tree.root == null) {
						tree.root = node;
						tree.root.parent = null;
					} else {
						let leafaabb = node.aabb;
						let node1 = tree.root;
						while(node1.child1 != null) {
							let child1 = node1.child1;
							let child2 = node1.child2;
							let _this = node1.aabb;
							let area = (_this.maxx - _this.minx + (_this.maxy - _this.miny)) * 2;
							let _this1 = ZPP_AABBTree.tmpaabb;
							let a = node1.aabb;
							_this1.minx = a.minx < leafaabb.minx ? a.minx : leafaabb.minx;
							_this1.miny = a.miny < leafaabb.miny ? a.miny : leafaabb.miny;
							_this1.maxx = a.maxx > leafaabb.maxx ? a.maxx : leafaabb.maxx;
							_this1.maxy = a.maxy > leafaabb.maxy ? a.maxy : leafaabb.maxy;
							let _this2 = ZPP_AABBTree.tmpaabb;
							let carea = (_this2.maxx - _this2.minx + (_this2.maxy - _this2.miny)) * 2;
							let cost = 2 * carea;
							let icost = 2 * (carea - area);
							let _this3 = ZPP_AABBTree.tmpaabb;
							let b = child1.aabb;
							_this3.minx = leafaabb.minx < b.minx ? leafaabb.minx : b.minx;
							_this3.miny = leafaabb.miny < b.miny ? leafaabb.miny : b.miny;
							_this3.maxx = leafaabb.maxx > b.maxx ? leafaabb.maxx : b.maxx;
							_this3.maxy = leafaabb.maxy > b.maxy ? leafaabb.maxy : b.maxy;
							let cost1;
							if(child1.child1 == null) {
								let _this = ZPP_AABBTree.tmpaabb;
								cost1 = (_this.maxx - _this.minx + (_this.maxy - _this.miny)) * 2 + icost;
							} else {
								let _this = child1.aabb;
								let oarea = (_this.maxx - _this.minx + (_this.maxy - _this.miny)) * 2;
								let _this1 = ZPP_AABBTree.tmpaabb;
								let narea = (_this1.maxx - _this1.minx + (_this1.maxy - _this1.miny)) * 2;
								cost1 = narea - oarea + icost;
							}
							let _this4 = ZPP_AABBTree.tmpaabb;
							let b1 = child2.aabb;
							_this4.minx = leafaabb.minx < b1.minx ? leafaabb.minx : b1.minx;
							_this4.miny = leafaabb.miny < b1.miny ? leafaabb.miny : b1.miny;
							_this4.maxx = leafaabb.maxx > b1.maxx ? leafaabb.maxx : b1.maxx;
							_this4.maxy = leafaabb.maxy > b1.maxy ? leafaabb.maxy : b1.maxy;
							let cost2;
							if(child2.child1 == null) {
								let _this = ZPP_AABBTree.tmpaabb;
								cost2 = (_this.maxx - _this.minx + (_this.maxy - _this.miny)) * 2 + icost;
							} else {
								let _this = child2.aabb;
								let oarea = (_this.maxx - _this.minx + (_this.maxy - _this.miny)) * 2;
								let _this1 = ZPP_AABBTree.tmpaabb;
								let narea = (_this1.maxx - _this1.minx + (_this1.maxy - _this1.miny)) * 2;
								cost2 = narea - oarea + icost;
							}
							if(cost < cost1 && cost < cost2) {
								break;
							} else {
								node1 = cost1 < cost2 ? child1 : child2;
							}
						}
						let sibling = node1;
						let oparent = sibling.parent;
						let nparent;
						if(ZPP_AABBNode.zpp_pool == null) {
							nparent = new ZPP_AABBNode();
						} else {
							nparent = ZPP_AABBNode.zpp_pool;
							ZPP_AABBNode.zpp_pool = nparent.next;
							nparent.next = null;
						}
						if(ZPP_AABB.zpp_pool == null) {
							nparent.aabb = new ZPP_AABB();
						} else {
							nparent.aabb = ZPP_AABB.zpp_pool;
							ZPP_AABB.zpp_pool = nparent.aabb.next;
							nparent.aabb.next = null;
						}
						nparent.moved = false;
						nparent.synced = false;
						nparent.first_sync = false;
						nparent.parent = oparent;
						let _this = nparent.aabb;
						let b = sibling.aabb;
						_this.minx = leafaabb.minx < b.minx ? leafaabb.minx : b.minx;
						_this.miny = leafaabb.miny < b.miny ? leafaabb.miny : b.miny;
						_this.maxx = leafaabb.maxx > b.maxx ? leafaabb.maxx : b.maxx;
						_this.maxy = leafaabb.maxy > b.maxy ? leafaabb.maxy : b.maxy;
						nparent.height = sibling.height + 1;
						if(oparent != null) {
							if(oparent.child1 == sibling) {
								oparent.child1 = nparent;
							} else {
								oparent.child2 = nparent;
							}
							nparent.child1 = sibling;
							nparent.child2 = node;
							sibling.parent = nparent;
							node.parent = nparent;
						} else {
							nparent.child1 = sibling;
							nparent.child2 = node;
							sibling.parent = nparent;
							node.parent = nparent;
							tree.root = nparent;
						}
						node1 = node.parent;
						while(node1 != null) {
							if(!(node1.child1 == null || node1.height < 2)) {
								let b = node1.child1;
								let c = node1.child2;
								let balance = c.height - b.height;
								if(balance > 1) {
									let f = c.child1;
									let g = c.child2;
									c.child1 = node1;
									c.parent = node1.parent;
									node1.parent = c;
									if(c.parent != null) {
										if(c.parent.child1 == node1) {
											c.parent.child1 = c;
										} else {
											c.parent.child2 = c;
										}
									} else {
										tree.root = c;
									}
									if(f.height > g.height) {
										c.child2 = f;
										node1.child2 = g;
										g.parent = node1;
										let _this = node1.aabb;
										let a = b.aabb;
										let b1 = g.aabb;
										_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
										_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
										_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
										_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
										let _this1 = c.aabb;
										let a1 = node1.aabb;
										let b2 = f.aabb;
										_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
										_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
										_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
										_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
										let x = b.height;
										let y = g.height;
										node1.height = 1 + (x > y ? x : y);
										let x1 = node1.height;
										let y1 = f.height;
										c.height = 1 + (x1 > y1 ? x1 : y1);
									} else {
										c.child2 = g;
										node1.child2 = f;
										f.parent = node1;
										let _this = node1.aabb;
										let a = b.aabb;
										let b1 = f.aabb;
										_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
										_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
										_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
										_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
										let _this1 = c.aabb;
										let a1 = node1.aabb;
										let b2 = g.aabb;
										_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
										_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
										_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
										_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
										let x = b.height;
										let y = f.height;
										node1.height = 1 + (x > y ? x : y);
										let x1 = node1.height;
										let y1 = g.height;
										c.height = 1 + (x1 > y1 ? x1 : y1);
									}
									node1 = c;
								} else if(balance < -1) {
									let f = b.child1;
									let g = b.child2;
									b.child1 = node1;
									b.parent = node1.parent;
									node1.parent = b;
									if(b.parent != null) {
										if(b.parent.child1 == node1) {
											b.parent.child1 = b;
										} else {
											b.parent.child2 = b;
										}
									} else {
										tree.root = b;
									}
									if(f.height > g.height) {
										b.child2 = f;
										node1.child1 = g;
										g.parent = node1;
										let _this = node1.aabb;
										let a = c.aabb;
										let b1 = g.aabb;
										_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
										_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
										_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
										_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
										let _this1 = b.aabb;
										let a1 = node1.aabb;
										let b2 = f.aabb;
										_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
										_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
										_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
										_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
										let x = c.height;
										let y = g.height;
										node1.height = 1 + (x > y ? x : y);
										let x1 = node1.height;
										let y1 = f.height;
										b.height = 1 + (x1 > y1 ? x1 : y1);
									} else {
										b.child2 = g;
										node1.child1 = f;
										f.parent = node1;
										let _this = node1.aabb;
										let a = c.aabb;
										let b1 = f.aabb;
										_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
										_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
										_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
										_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
										let _this1 = b.aabb;
										let a1 = node1.aabb;
										let b2 = g.aabb;
										_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
										_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
										_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
										_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
										let x = c.height;
										let y = f.height;
										node1.height = 1 + (x > y ? x : y);
										let x1 = node1.height;
										let y1 = g.height;
										b.height = 1 + (x1 > y1 ? x1 : y1);
									}
									node1 = b;
								}
							}
							let child1 = node1.child1;
							let child2 = node1.child2;
							let x = child1.height;
							let y = child2.height;
							node1.height = 1 + (x > y ? x : y);
							let _this = node1.aabb;
							let a = child1.aabb;
							let b = child2.aabb;
							_this.minx = a.minx < b.minx ? a.minx : b.minx;
							_this.miny = a.miny < b.miny ? a.miny : b.miny;
							_this.maxx = a.maxx > b.maxx ? a.maxx : b.maxx;
							_this.maxy = a.maxy > b.maxy ? a.maxy : b.maxy;
							node1 = node1.parent;
						}
					}
					node.synced = false;
					node.moved = true;
					node.mnext = node.snext;
					node.snext = null;
					node = node.mnext;
				}
				let t = this.syncs;
				this.syncs = this.moves;
				this.moves = t;
			} else {
				while(this.syncs != null) {
					let ret = this.syncs;
					this.syncs = ret.snext;
					ret.snext = null;
					let node = ret;
					let shape = node.shape;
					if(!node.first_sync) {
						let tree = node.dyn ? this.dtree : this.stree;
						if(node == tree.root) {
							tree.root = null;
						} else {
							let parent = node.parent;
							let gparent = parent.parent;
							let sibling = parent.child1 == node ? parent.child2 : parent.child1;
							if(gparent != null) {
								if(gparent.child1 == parent) {
									gparent.child1 = sibling;
								} else {
									gparent.child2 = sibling;
								}
								sibling.parent = gparent;
								let o = parent;
								o.height = -1;
								let o1 = o.aabb;
								if(o1.outer != null) {
									o1.outer.zpp_inner = null;
									o1.outer = null;
								}
								o1.wrap_min = o1.wrap_max = null;
								o1._invalidate = null;
								o1._validate = null;
								o1.next = ZPP_AABB.zpp_pool;
								ZPP_AABB.zpp_pool = o1;
								o.child1 = o.child2 = o.parent = null;
								o.next = null;
								o.snext = null;
								o.mnext = null;
								o.next = ZPP_AABBNode.zpp_pool;
								ZPP_AABBNode.zpp_pool = o;
								let node = gparent;
								while(node != null) {
									if(!(node.child1 == null || node.height < 2)) {
										let b = node.child1;
										let c = node.child2;
										let balance = c.height - b.height;
										if(balance > 1) {
											let f = c.child1;
											let g = c.child2;
											c.child1 = node;
											c.parent = node.parent;
											node.parent = c;
											if(c.parent != null) {
												if(c.parent.child1 == node) {
													c.parent.child1 = c;
												} else {
													c.parent.child2 = c;
												}
											} else {
												tree.root = c;
											}
											if(f.height > g.height) {
												c.child2 = f;
												node.child2 = g;
												g.parent = node;
												let _this = node.aabb;
												let a = b.aabb;
												let b1 = g.aabb;
												_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
												_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
												_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
												_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
												let _this1 = c.aabb;
												let a1 = node.aabb;
												let b2 = f.aabb;
												_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
												_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
												_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
												_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
												let x = b.height;
												let y = g.height;
												node.height = 1 + (x > y ? x : y);
												let x1 = node.height;
												let y1 = f.height;
												c.height = 1 + (x1 > y1 ? x1 : y1);
											} else {
												c.child2 = g;
												node.child2 = f;
												f.parent = node;
												let _this = node.aabb;
												let a = b.aabb;
												let b1 = f.aabb;
												_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
												_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
												_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
												_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
												let _this1 = c.aabb;
												let a1 = node.aabb;
												let b2 = g.aabb;
												_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
												_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
												_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
												_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
												let x = b.height;
												let y = f.height;
												node.height = 1 + (x > y ? x : y);
												let x1 = node.height;
												let y1 = g.height;
												c.height = 1 + (x1 > y1 ? x1 : y1);
											}
											node = c;
										} else if(balance < -1) {
											let f = b.child1;
											let g = b.child2;
											b.child1 = node;
											b.parent = node.parent;
											node.parent = b;
											if(b.parent != null) {
												if(b.parent.child1 == node) {
													b.parent.child1 = b;
												} else {
													b.parent.child2 = b;
												}
											} else {
												tree.root = b;
											}
											if(f.height > g.height) {
												b.child2 = f;
												node.child1 = g;
												g.parent = node;
												let _this = node.aabb;
												let a = c.aabb;
												let b1 = g.aabb;
												_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
												_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
												_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
												_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
												let _this1 = b.aabb;
												let a1 = node.aabb;
												let b2 = f.aabb;
												_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
												_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
												_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
												_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
												let x = c.height;
												let y = g.height;
												node.height = 1 + (x > y ? x : y);
												let x1 = node.height;
												let y1 = f.height;
												b.height = 1 + (x1 > y1 ? x1 : y1);
											} else {
												b.child2 = g;
												node.child1 = f;
												f.parent = node;
												let _this = node.aabb;
												let a = c.aabb;
												let b1 = f.aabb;
												_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
												_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
												_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
												_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
												let _this1 = b.aabb;
												let a1 = node.aabb;
												let b2 = g.aabb;
												_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
												_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
												_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
												_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
												let x = c.height;
												let y = f.height;
												node.height = 1 + (x > y ? x : y);
												let x1 = node.height;
												let y1 = g.height;
												b.height = 1 + (x1 > y1 ? x1 : y1);
											}
											node = b;
										}
									}
									let child1 = node.child1;
									let child2 = node.child2;
									let _this = node.aabb;
									let a = child1.aabb;
									let b = child2.aabb;
									_this.minx = a.minx < b.minx ? a.minx : b.minx;
									_this.miny = a.miny < b.miny ? a.miny : b.miny;
									_this.maxx = a.maxx > b.maxx ? a.maxx : b.maxx;
									_this.maxy = a.maxy > b.maxy ? a.maxy : b.maxy;
									let x = child1.height;
									let y = child2.height;
									node.height = 1 + (x > y ? x : y);
									node = node.parent;
								}
							} else {
								tree.root = sibling;
								sibling.parent = null;
								let o = parent;
								o.height = -1;
								let o1 = o.aabb;
								if(o1.outer != null) {
									o1.outer.zpp_inner = null;
									o1.outer = null;
								}
								o1.wrap_min = o1.wrap_max = null;
								o1._invalidate = null;
								o1._validate = null;
								o1.next = ZPP_AABB.zpp_pool;
								ZPP_AABB.zpp_pool = o1;
								o.child1 = o.child2 = o.parent = null;
								o.next = null;
								o.snext = null;
								o.mnext = null;
								o.next = ZPP_AABBNode.zpp_pool;
								ZPP_AABBNode.zpp_pool = o;
							}
						}
					} else {
						node.first_sync = false;
					}
					let aabb = node.aabb;
					if(!this.space.continuous) {
						if(shape.zip_aabb) {
							if(shape.body != null) {
								shape.zip_aabb = false;
								if(shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
									let _this = shape.circle;
									if(_this.zip_worldCOM) {
										if(_this.body != null) {
											_this.zip_worldCOM = false;
											if(_this.zip_localCOM) {
												_this.zip_localCOM = false;
												if(_this.type == ZPP_Flags.id_ShapeType_POLYGON) {
													let _this1 = _this.polygon;
													if(_this1.lverts.next == null) {
														throw haxe_Exception.thrown("Error: An empty polygon has no meaningful localCOM");
													}
													if(_this1.lverts.next.next == null) {
														_this1.localCOMx = _this1.lverts.next.x;
														_this1.localCOMy = _this1.lverts.next.y;
													} else if(_this1.lverts.next.next.next == null) {
														_this1.localCOMx = _this1.lverts.next.x;
														_this1.localCOMy = _this1.lverts.next.y;
														let t = 1.0;
														_this1.localCOMx += _this1.lverts.next.next.x * t;
														_this1.localCOMy += _this1.lverts.next.next.y * t;
														let t1 = 0.5;
														_this1.localCOMx *= t1;
														_this1.localCOMy *= t1;
													} else {
														_this1.localCOMx = 0;
														_this1.localCOMy = 0;
														let area = 0.0;
														let cx_ite = _this1.lverts.next;
														let u = cx_ite;
														cx_ite = cx_ite.next;
														let v = cx_ite;
														cx_ite = cx_ite.next;
														while(cx_ite != null) {
															let w = cx_ite;
															area += v.x * (w.y - u.y);
															let cf = w.y * v.x - w.x * v.y;
															_this1.localCOMx += (v.x + w.x) * cf;
															_this1.localCOMy += (v.y + w.y) * cf;
															u = v;
															v = w;
															cx_ite = cx_ite.next;
														}
														cx_ite = _this1.lverts.next;
														let w = cx_ite;
														area += v.x * (w.y - u.y);
														let cf = w.y * v.x - w.x * v.y;
														_this1.localCOMx += (v.x + w.x) * cf;
														_this1.localCOMy += (v.y + w.y) * cf;
														u = v;
														v = w;
														cx_ite = cx_ite.next;
														let w1 = cx_ite;
														area += v.x * (w1.y - u.y);
														let cf1 = w1.y * v.x - w1.x * v.y;
														_this1.localCOMx += (v.x + w1.x) * cf1;
														_this1.localCOMy += (v.y + w1.y) * cf1;
														area = 1 / (3 * area);
														let t = area;
														_this1.localCOMx *= t;
														_this1.localCOMy *= t;
													}
												}
												if(_this.wrap_localCOM != null) {
													_this.wrap_localCOM.zpp_inner.x = _this.localCOMx;
													_this.wrap_localCOM.zpp_inner.y = _this.localCOMy;
												}
											}
											let _this1 = _this.body;
											if(_this1.zip_axis) {
												_this1.zip_axis = false;
												_this1.axisx = Math.sin(_this1.rot);
												_this1.axisy = Math.cos(_this1.rot);
											}
											_this.worldCOMx = _this.body.posx + (_this.body.axisy * _this.localCOMx - _this.body.axisx * _this.localCOMy);
											_this.worldCOMy = _this.body.posy + (_this.localCOMx * _this.body.axisx + _this.localCOMy * _this.body.axisy);
										}
									}
									let rx = _this.radius;
									let ry = _this.radius;
									_this.aabb.minx = _this.worldCOMx - rx;
									_this.aabb.miny = _this.worldCOMy - ry;
									_this.aabb.maxx = _this.worldCOMx + rx;
									_this.aabb.maxy = _this.worldCOMy + ry;
								} else {
									let _this = shape.polygon;
									if(_this.zip_gverts) {
										if(_this.body != null) {
											_this.zip_gverts = false;
											_this.validate_lverts();
											let _this1 = _this.body;
											if(_this1.zip_axis) {
												_this1.zip_axis = false;
												_this1.axisx = Math.sin(_this1.rot);
												_this1.axisy = Math.cos(_this1.rot);
											}
											let li = _this.lverts.next;
											let cx_ite = _this.gverts.next;
											while(cx_ite != null) {
												let g = cx_ite;
												let l = li;
												li = li.next;
												g.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
												g.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
												cx_ite = cx_ite.next;
											}
										}
									}
									if(_this.lverts.next == null) {
										throw haxe_Exception.thrown("Error: An empty polygon has no meaningful bounds");
									}
									let p0 = _this.gverts.next;
									_this.aabb.minx = p0.x;
									_this.aabb.miny = p0.y;
									_this.aabb.maxx = p0.x;
									_this.aabb.maxy = p0.y;
									let cx_ite = _this.gverts.next.next;
									while(cx_ite != null) {
										let p = cx_ite;
										if(p.x < _this.aabb.minx) {
											_this.aabb.minx = p.x;
										}
										if(p.x > _this.aabb.maxx) {
											_this.aabb.maxx = p.x;
										}
										if(p.y < _this.aabb.miny) {
											_this.aabb.miny = p.y;
										}
										if(p.y > _this.aabb.maxy) {
											_this.aabb.maxy = p.y;
										}
										cx_ite = cx_ite.next;
									}
								}
							}
						}
					}
					let a = shape.aabb;
					aabb.minx = a.minx - 3.0;
					aabb.miny = a.miny - 3.0;
					aabb.maxx = a.maxx + 3.0;
					aabb.maxy = a.maxy + 3.0;
					let tree = (node.dyn = shape.body.type == ZPP_Flags.id_BodyType_STATIC ? false : !shape.body.component.sleeping) ? this.dtree : this.stree;
					if(tree.root == null) {
						tree.root = node;
						tree.root.parent = null;
					} else {
						let leafaabb = node.aabb;
						let node1 = tree.root;
						while(node1.child1 != null) {
							let child1 = node1.child1;
							let child2 = node1.child2;
							let _this = node1.aabb;
							let area = (_this.maxx - _this.minx + (_this.maxy - _this.miny)) * 2;
							let _this1 = ZPP_AABBTree.tmpaabb;
							let a = node1.aabb;
							_this1.minx = a.minx < leafaabb.minx ? a.minx : leafaabb.minx;
							_this1.miny = a.miny < leafaabb.miny ? a.miny : leafaabb.miny;
							_this1.maxx = a.maxx > leafaabb.maxx ? a.maxx : leafaabb.maxx;
							_this1.maxy = a.maxy > leafaabb.maxy ? a.maxy : leafaabb.maxy;
							let _this2 = ZPP_AABBTree.tmpaabb;
							let carea = (_this2.maxx - _this2.minx + (_this2.maxy - _this2.miny)) * 2;
							let cost = 2 * carea;
							let icost = 2 * (carea - area);
							let _this3 = ZPP_AABBTree.tmpaabb;
							let b = child1.aabb;
							_this3.minx = leafaabb.minx < b.minx ? leafaabb.minx : b.minx;
							_this3.miny = leafaabb.miny < b.miny ? leafaabb.miny : b.miny;
							_this3.maxx = leafaabb.maxx > b.maxx ? leafaabb.maxx : b.maxx;
							_this3.maxy = leafaabb.maxy > b.maxy ? leafaabb.maxy : b.maxy;
							let cost1;
							if(child1.child1 == null) {
								let _this = ZPP_AABBTree.tmpaabb;
								cost1 = (_this.maxx - _this.minx + (_this.maxy - _this.miny)) * 2 + icost;
							} else {
								let _this = child1.aabb;
								let oarea = (_this.maxx - _this.minx + (_this.maxy - _this.miny)) * 2;
								let _this1 = ZPP_AABBTree.tmpaabb;
								let narea = (_this1.maxx - _this1.minx + (_this1.maxy - _this1.miny)) * 2;
								cost1 = narea - oarea + icost;
							}
							let _this4 = ZPP_AABBTree.tmpaabb;
							let b1 = child2.aabb;
							_this4.minx = leafaabb.minx < b1.minx ? leafaabb.minx : b1.minx;
							_this4.miny = leafaabb.miny < b1.miny ? leafaabb.miny : b1.miny;
							_this4.maxx = leafaabb.maxx > b1.maxx ? leafaabb.maxx : b1.maxx;
							_this4.maxy = leafaabb.maxy > b1.maxy ? leafaabb.maxy : b1.maxy;
							let cost2;
							if(child2.child1 == null) {
								let _this = ZPP_AABBTree.tmpaabb;
								cost2 = (_this.maxx - _this.minx + (_this.maxy - _this.miny)) * 2 + icost;
							} else {
								let _this = child2.aabb;
								let oarea = (_this.maxx - _this.minx + (_this.maxy - _this.miny)) * 2;
								let _this1 = ZPP_AABBTree.tmpaabb;
								let narea = (_this1.maxx - _this1.minx + (_this1.maxy - _this1.miny)) * 2;
								cost2 = narea - oarea + icost;
							}
							if(cost < cost1 && cost < cost2) {
								break;
							} else {
								node1 = cost1 < cost2 ? child1 : child2;
							}
						}
						let sibling = node1;
						let oparent = sibling.parent;
						let nparent;
						if(ZPP_AABBNode.zpp_pool == null) {
							nparent = new ZPP_AABBNode();
						} else {
							nparent = ZPP_AABBNode.zpp_pool;
							ZPP_AABBNode.zpp_pool = nparent.next;
							nparent.next = null;
						}
						if(ZPP_AABB.zpp_pool == null) {
							nparent.aabb = new ZPP_AABB();
						} else {
							nparent.aabb = ZPP_AABB.zpp_pool;
							ZPP_AABB.zpp_pool = nparent.aabb.next;
							nparent.aabb.next = null;
						}
						nparent.moved = false;
						nparent.synced = false;
						nparent.first_sync = false;
						nparent.parent = oparent;
						let _this = nparent.aabb;
						let b = sibling.aabb;
						_this.minx = leafaabb.minx < b.minx ? leafaabb.minx : b.minx;
						_this.miny = leafaabb.miny < b.miny ? leafaabb.miny : b.miny;
						_this.maxx = leafaabb.maxx > b.maxx ? leafaabb.maxx : b.maxx;
						_this.maxy = leafaabb.maxy > b.maxy ? leafaabb.maxy : b.maxy;
						nparent.height = sibling.height + 1;
						if(oparent != null) {
							if(oparent.child1 == sibling) {
								oparent.child1 = nparent;
							} else {
								oparent.child2 = nparent;
							}
							nparent.child1 = sibling;
							nparent.child2 = node;
							sibling.parent = nparent;
							node.parent = nparent;
						} else {
							nparent.child1 = sibling;
							nparent.child2 = node;
							sibling.parent = nparent;
							node.parent = nparent;
							tree.root = nparent;
						}
						node1 = node.parent;
						while(node1 != null) {
							if(!(node1.child1 == null || node1.height < 2)) {
								let b = node1.child1;
								let c = node1.child2;
								let balance = c.height - b.height;
								if(balance > 1) {
									let f = c.child1;
									let g = c.child2;
									c.child1 = node1;
									c.parent = node1.parent;
									node1.parent = c;
									if(c.parent != null) {
										if(c.parent.child1 == node1) {
											c.parent.child1 = c;
										} else {
											c.parent.child2 = c;
										}
									} else {
										tree.root = c;
									}
									if(f.height > g.height) {
										c.child2 = f;
										node1.child2 = g;
										g.parent = node1;
										let _this = node1.aabb;
										let a = b.aabb;
										let b1 = g.aabb;
										_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
										_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
										_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
										_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
										let _this1 = c.aabb;
										let a1 = node1.aabb;
										let b2 = f.aabb;
										_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
										_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
										_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
										_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
										let x = b.height;
										let y = g.height;
										node1.height = 1 + (x > y ? x : y);
										let x1 = node1.height;
										let y1 = f.height;
										c.height = 1 + (x1 > y1 ? x1 : y1);
									} else {
										c.child2 = g;
										node1.child2 = f;
										f.parent = node1;
										let _this = node1.aabb;
										let a = b.aabb;
										let b1 = f.aabb;
										_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
										_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
										_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
										_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
										let _this1 = c.aabb;
										let a1 = node1.aabb;
										let b2 = g.aabb;
										_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
										_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
										_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
										_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
										let x = b.height;
										let y = f.height;
										node1.height = 1 + (x > y ? x : y);
										let x1 = node1.height;
										let y1 = g.height;
										c.height = 1 + (x1 > y1 ? x1 : y1);
									}
									node1 = c;
								} else if(balance < -1) {
									let f = b.child1;
									let g = b.child2;
									b.child1 = node1;
									b.parent = node1.parent;
									node1.parent = b;
									if(b.parent != null) {
										if(b.parent.child1 == node1) {
											b.parent.child1 = b;
										} else {
											b.parent.child2 = b;
										}
									} else {
										tree.root = b;
									}
									if(f.height > g.height) {
										b.child2 = f;
										node1.child1 = g;
										g.parent = node1;
										let _this = node1.aabb;
										let a = c.aabb;
										let b1 = g.aabb;
										_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
										_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
										_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
										_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
										let _this1 = b.aabb;
										let a1 = node1.aabb;
										let b2 = f.aabb;
										_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
										_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
										_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
										_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
										let x = c.height;
										let y = g.height;
										node1.height = 1 + (x > y ? x : y);
										let x1 = node1.height;
										let y1 = f.height;
										b.height = 1 + (x1 > y1 ? x1 : y1);
									} else {
										b.child2 = g;
										node1.child1 = f;
										f.parent = node1;
										let _this = node1.aabb;
										let a = c.aabb;
										let b1 = f.aabb;
										_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
										_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
										_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
										_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
										let _this1 = b.aabb;
										let a1 = node1.aabb;
										let b2 = g.aabb;
										_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
										_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
										_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
										_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
										let x = c.height;
										let y = f.height;
										node1.height = 1 + (x > y ? x : y);
										let x1 = node1.height;
										let y1 = g.height;
										b.height = 1 + (x1 > y1 ? x1 : y1);
									}
									node1 = b;
								}
							}
							let child1 = node1.child1;
							let child2 = node1.child2;
							let x = child1.height;
							let y = child2.height;
							node1.height = 1 + (x > y ? x : y);
							let _this = node1.aabb;
							let a = child1.aabb;
							let b = child2.aabb;
							_this.minx = a.minx < b.minx ? a.minx : b.minx;
							_this.miny = a.miny < b.miny ? a.miny : b.miny;
							_this.maxx = a.maxx > b.maxx ? a.maxx : b.maxx;
							_this.maxy = a.maxy > b.maxy ? a.maxy : b.maxy;
							node1 = node1.parent;
						}
					}
					node.synced = false;
					if(!node.moved) {
						node.moved = true;
						node.mnext = this.moves;
						this.moves = node;
					}
				}
			}
		}
	}
	broadphase(space,discrete) {
		let node = this.syncs;
		while(node != null) {
			let shape = node.shape;
			if(!node.first_sync) {
				let tree = node.dyn ? this.dtree : this.stree;
				if(node == tree.root) {
					tree.root = null;
				} else {
					let parent = node.parent;
					let gparent = parent.parent;
					let sibling = parent.child1 == node ? parent.child2 : parent.child1;
					if(gparent != null) {
						if(gparent.child1 == parent) {
							gparent.child1 = sibling;
						} else {
							gparent.child2 = sibling;
						}
						sibling.parent = gparent;
						let o = parent;
						o.height = -1;
						let o1 = o.aabb;
						if(o1.outer != null) {
							o1.outer.zpp_inner = null;
							o1.outer = null;
						}
						o1.wrap_min = o1.wrap_max = null;
						o1._invalidate = null;
						o1._validate = null;
						o1.next = ZPP_AABB.zpp_pool;
						ZPP_AABB.zpp_pool = o1;
						o.child1 = o.child2 = o.parent = null;
						o.next = null;
						o.snext = null;
						o.mnext = null;
						o.next = ZPP_AABBNode.zpp_pool;
						ZPP_AABBNode.zpp_pool = o;
						let node = gparent;
						while(node != null) {
							if(!(node.child1 == null || node.height < 2)) {
								let b = node.child1;
								let c = node.child2;
								let balance = c.height - b.height;
								if(balance > 1) {
									let f = c.child1;
									let g = c.child2;
									c.child1 = node;
									c.parent = node.parent;
									node.parent = c;
									if(c.parent != null) {
										if(c.parent.child1 == node) {
											c.parent.child1 = c;
										} else {
											c.parent.child2 = c;
										}
									} else {
										tree.root = c;
									}
									if(f.height > g.height) {
										c.child2 = f;
										node.child2 = g;
										g.parent = node;
										let _this = node.aabb;
										let a = b.aabb;
										let b1 = g.aabb;
										_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
										_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
										_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
										_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
										let _this1 = c.aabb;
										let a1 = node.aabb;
										let b2 = f.aabb;
										_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
										_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
										_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
										_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
										let x = b.height;
										let y = g.height;
										node.height = 1 + (x > y ? x : y);
										let x1 = node.height;
										let y1 = f.height;
										c.height = 1 + (x1 > y1 ? x1 : y1);
									} else {
										c.child2 = g;
										node.child2 = f;
										f.parent = node;
										let _this = node.aabb;
										let a = b.aabb;
										let b1 = f.aabb;
										_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
										_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
										_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
										_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
										let _this1 = c.aabb;
										let a1 = node.aabb;
										let b2 = g.aabb;
										_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
										_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
										_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
										_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
										let x = b.height;
										let y = f.height;
										node.height = 1 + (x > y ? x : y);
										let x1 = node.height;
										let y1 = g.height;
										c.height = 1 + (x1 > y1 ? x1 : y1);
									}
									node = c;
								} else if(balance < -1) {
									let f = b.child1;
									let g = b.child2;
									b.child1 = node;
									b.parent = node.parent;
									node.parent = b;
									if(b.parent != null) {
										if(b.parent.child1 == node) {
											b.parent.child1 = b;
										} else {
											b.parent.child2 = b;
										}
									} else {
										tree.root = b;
									}
									if(f.height > g.height) {
										b.child2 = f;
										node.child1 = g;
										g.parent = node;
										let _this = node.aabb;
										let a = c.aabb;
										let b1 = g.aabb;
										_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
										_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
										_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
										_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
										let _this1 = b.aabb;
										let a1 = node.aabb;
										let b2 = f.aabb;
										_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
										_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
										_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
										_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
										let x = c.height;
										let y = g.height;
										node.height = 1 + (x > y ? x : y);
										let x1 = node.height;
										let y1 = f.height;
										b.height = 1 + (x1 > y1 ? x1 : y1);
									} else {
										b.child2 = g;
										node.child1 = f;
										f.parent = node;
										let _this = node.aabb;
										let a = c.aabb;
										let b1 = f.aabb;
										_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
										_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
										_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
										_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
										let _this1 = b.aabb;
										let a1 = node.aabb;
										let b2 = g.aabb;
										_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
										_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
										_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
										_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
										let x = c.height;
										let y = f.height;
										node.height = 1 + (x > y ? x : y);
										let x1 = node.height;
										let y1 = g.height;
										b.height = 1 + (x1 > y1 ? x1 : y1);
									}
									node = b;
								}
							}
							let child1 = node.child1;
							let child2 = node.child2;
							let _this = node.aabb;
							let a = child1.aabb;
							let b = child2.aabb;
							_this.minx = a.minx < b.minx ? a.minx : b.minx;
							_this.miny = a.miny < b.miny ? a.miny : b.miny;
							_this.maxx = a.maxx > b.maxx ? a.maxx : b.maxx;
							_this.maxy = a.maxy > b.maxy ? a.maxy : b.maxy;
							let x = child1.height;
							let y = child2.height;
							node.height = 1 + (x > y ? x : y);
							node = node.parent;
						}
					} else {
						tree.root = sibling;
						sibling.parent = null;
						let o = parent;
						o.height = -1;
						let o1 = o.aabb;
						if(o1.outer != null) {
							o1.outer.zpp_inner = null;
							o1.outer = null;
						}
						o1.wrap_min = o1.wrap_max = null;
						o1._invalidate = null;
						o1._validate = null;
						o1.next = ZPP_AABB.zpp_pool;
						ZPP_AABB.zpp_pool = o1;
						o.child1 = o.child2 = o.parent = null;
						o.next = null;
						o.snext = null;
						o.mnext = null;
						o.next = ZPP_AABBNode.zpp_pool;
						ZPP_AABBNode.zpp_pool = o;
					}
				}
			} else {
				node.first_sync = false;
			}
			let aabb = node.aabb;
			if(!space.continuous) {
				if(shape.zip_aabb) {
					if(shape.body != null) {
						shape.zip_aabb = false;
						if(shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
							let _this = shape.circle;
							if(_this.zip_worldCOM) {
								if(_this.body != null) {
									_this.zip_worldCOM = false;
									if(_this.zip_localCOM) {
										_this.zip_localCOM = false;
										if(_this.type == ZPP_Flags.id_ShapeType_POLYGON) {
											let _this1 = _this.polygon;
											if(_this1.lverts.next == null) {
												throw haxe_Exception.thrown("Error: An empty polygon has no meaningful localCOM");
											}
											if(_this1.lverts.next.next == null) {
												_this1.localCOMx = _this1.lverts.next.x;
												_this1.localCOMy = _this1.lverts.next.y;
											} else if(_this1.lverts.next.next.next == null) {
												_this1.localCOMx = _this1.lverts.next.x;
												_this1.localCOMy = _this1.lverts.next.y;
												let t = 1.0;
												_this1.localCOMx += _this1.lverts.next.next.x * t;
												_this1.localCOMy += _this1.lverts.next.next.y * t;
												let t1 = 0.5;
												_this1.localCOMx *= t1;
												_this1.localCOMy *= t1;
											} else {
												_this1.localCOMx = 0;
												_this1.localCOMy = 0;
												let area = 0.0;
												let cx_ite = _this1.lverts.next;
												let u = cx_ite;
												cx_ite = cx_ite.next;
												let v = cx_ite;
												cx_ite = cx_ite.next;
												while(cx_ite != null) {
													let w = cx_ite;
													area += v.x * (w.y - u.y);
													let cf = w.y * v.x - w.x * v.y;
													_this1.localCOMx += (v.x + w.x) * cf;
													_this1.localCOMy += (v.y + w.y) * cf;
													u = v;
													v = w;
													cx_ite = cx_ite.next;
												}
												cx_ite = _this1.lverts.next;
												let w = cx_ite;
												area += v.x * (w.y - u.y);
												let cf = w.y * v.x - w.x * v.y;
												_this1.localCOMx += (v.x + w.x) * cf;
												_this1.localCOMy += (v.y + w.y) * cf;
												u = v;
												v = w;
												cx_ite = cx_ite.next;
												let w1 = cx_ite;
												area += v.x * (w1.y - u.y);
												let cf1 = w1.y * v.x - w1.x * v.y;
												_this1.localCOMx += (v.x + w1.x) * cf1;
												_this1.localCOMy += (v.y + w1.y) * cf1;
												area = 1 / (3 * area);
												let t = area;
												_this1.localCOMx *= t;
												_this1.localCOMy *= t;
											}
										}
										if(_this.wrap_localCOM != null) {
											_this.wrap_localCOM.zpp_inner.x = _this.localCOMx;
											_this.wrap_localCOM.zpp_inner.y = _this.localCOMy;
										}
									}
									let _this1 = _this.body;
									if(_this1.zip_axis) {
										_this1.zip_axis = false;
										_this1.axisx = Math.sin(_this1.rot);
										_this1.axisy = Math.cos(_this1.rot);
									}
									_this.worldCOMx = _this.body.posx + (_this.body.axisy * _this.localCOMx - _this.body.axisx * _this.localCOMy);
									_this.worldCOMy = _this.body.posy + (_this.localCOMx * _this.body.axisx + _this.localCOMy * _this.body.axisy);
								}
							}
							let rx = _this.radius;
							let ry = _this.radius;
							_this.aabb.minx = _this.worldCOMx - rx;
							_this.aabb.miny = _this.worldCOMy - ry;
							_this.aabb.maxx = _this.worldCOMx + rx;
							_this.aabb.maxy = _this.worldCOMy + ry;
						} else {
							let _this = shape.polygon;
							if(_this.zip_gverts) {
								if(_this.body != null) {
									_this.zip_gverts = false;
									_this.validate_lverts();
									let _this1 = _this.body;
									if(_this1.zip_axis) {
										_this1.zip_axis = false;
										_this1.axisx = Math.sin(_this1.rot);
										_this1.axisy = Math.cos(_this1.rot);
									}
									let li = _this.lverts.next;
									let cx_ite = _this.gverts.next;
									while(cx_ite != null) {
										let g = cx_ite;
										let l = li;
										li = li.next;
										g.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
										g.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
										cx_ite = cx_ite.next;
									}
								}
							}
							if(_this.lverts.next == null) {
								throw haxe_Exception.thrown("Error: An empty polygon has no meaningful bounds");
							}
							let p0 = _this.gverts.next;
							_this.aabb.minx = p0.x;
							_this.aabb.miny = p0.y;
							_this.aabb.maxx = p0.x;
							_this.aabb.maxy = p0.y;
							let cx_ite = _this.gverts.next.next;
							while(cx_ite != null) {
								let p = cx_ite;
								if(p.x < _this.aabb.minx) {
									_this.aabb.minx = p.x;
								}
								if(p.x > _this.aabb.maxx) {
									_this.aabb.maxx = p.x;
								}
								if(p.y < _this.aabb.miny) {
									_this.aabb.miny = p.y;
								}
								if(p.y > _this.aabb.maxy) {
									_this.aabb.maxy = p.y;
								}
								cx_ite = cx_ite.next;
							}
						}
					}
				}
			}
			let a = shape.aabb;
			aabb.minx = a.minx - 3.0;
			aabb.miny = a.miny - 3.0;
			aabb.maxx = a.maxx + 3.0;
			aabb.maxy = a.maxy + 3.0;
			let tree = (node.dyn = shape.body.type == ZPP_Flags.id_BodyType_STATIC ? false : !shape.body.component.sleeping) ? this.dtree : this.stree;
			if(tree.root == null) {
				tree.root = node;
				tree.root.parent = null;
			} else {
				let leafaabb = node.aabb;
				let node1 = tree.root;
				while(node1.child1 != null) {
					let child1 = node1.child1;
					let child2 = node1.child2;
					let _this = node1.aabb;
					let area = (_this.maxx - _this.minx + (_this.maxy - _this.miny)) * 2;
					let _this1 = ZPP_AABBTree.tmpaabb;
					let a = node1.aabb;
					_this1.minx = a.minx < leafaabb.minx ? a.minx : leafaabb.minx;
					_this1.miny = a.miny < leafaabb.miny ? a.miny : leafaabb.miny;
					_this1.maxx = a.maxx > leafaabb.maxx ? a.maxx : leafaabb.maxx;
					_this1.maxy = a.maxy > leafaabb.maxy ? a.maxy : leafaabb.maxy;
					let _this2 = ZPP_AABBTree.tmpaabb;
					let carea = (_this2.maxx - _this2.minx + (_this2.maxy - _this2.miny)) * 2;
					let cost = 2 * carea;
					let icost = 2 * (carea - area);
					let _this3 = ZPP_AABBTree.tmpaabb;
					let b = child1.aabb;
					_this3.minx = leafaabb.minx < b.minx ? leafaabb.minx : b.minx;
					_this3.miny = leafaabb.miny < b.miny ? leafaabb.miny : b.miny;
					_this3.maxx = leafaabb.maxx > b.maxx ? leafaabb.maxx : b.maxx;
					_this3.maxy = leafaabb.maxy > b.maxy ? leafaabb.maxy : b.maxy;
					let cost1;
					if(child1.child1 == null) {
						let _this = ZPP_AABBTree.tmpaabb;
						cost1 = (_this.maxx - _this.minx + (_this.maxy - _this.miny)) * 2 + icost;
					} else {
						let _this = child1.aabb;
						let oarea = (_this.maxx - _this.minx + (_this.maxy - _this.miny)) * 2;
						let _this1 = ZPP_AABBTree.tmpaabb;
						let narea = (_this1.maxx - _this1.minx + (_this1.maxy - _this1.miny)) * 2;
						cost1 = narea - oarea + icost;
					}
					let _this4 = ZPP_AABBTree.tmpaabb;
					let b1 = child2.aabb;
					_this4.minx = leafaabb.minx < b1.minx ? leafaabb.minx : b1.minx;
					_this4.miny = leafaabb.miny < b1.miny ? leafaabb.miny : b1.miny;
					_this4.maxx = leafaabb.maxx > b1.maxx ? leafaabb.maxx : b1.maxx;
					_this4.maxy = leafaabb.maxy > b1.maxy ? leafaabb.maxy : b1.maxy;
					let cost2;
					if(child2.child1 == null) {
						let _this = ZPP_AABBTree.tmpaabb;
						cost2 = (_this.maxx - _this.minx + (_this.maxy - _this.miny)) * 2 + icost;
					} else {
						let _this = child2.aabb;
						let oarea = (_this.maxx - _this.minx + (_this.maxy - _this.miny)) * 2;
						let _this1 = ZPP_AABBTree.tmpaabb;
						let narea = (_this1.maxx - _this1.minx + (_this1.maxy - _this1.miny)) * 2;
						cost2 = narea - oarea + icost;
					}
					if(cost < cost1 && cost < cost2) {
						break;
					} else {
						node1 = cost1 < cost2 ? child1 : child2;
					}
				}
				let sibling = node1;
				let oparent = sibling.parent;
				let nparent;
				if(ZPP_AABBNode.zpp_pool == null) {
					nparent = new ZPP_AABBNode();
				} else {
					nparent = ZPP_AABBNode.zpp_pool;
					ZPP_AABBNode.zpp_pool = nparent.next;
					nparent.next = null;
				}
				if(ZPP_AABB.zpp_pool == null) {
					nparent.aabb = new ZPP_AABB();
				} else {
					nparent.aabb = ZPP_AABB.zpp_pool;
					ZPP_AABB.zpp_pool = nparent.aabb.next;
					nparent.aabb.next = null;
				}
				nparent.moved = false;
				nparent.synced = false;
				nparent.first_sync = false;
				nparent.parent = oparent;
				let _this = nparent.aabb;
				let b = sibling.aabb;
				_this.minx = leafaabb.minx < b.minx ? leafaabb.minx : b.minx;
				_this.miny = leafaabb.miny < b.miny ? leafaabb.miny : b.miny;
				_this.maxx = leafaabb.maxx > b.maxx ? leafaabb.maxx : b.maxx;
				_this.maxy = leafaabb.maxy > b.maxy ? leafaabb.maxy : b.maxy;
				nparent.height = sibling.height + 1;
				if(oparent != null) {
					if(oparent.child1 == sibling) {
						oparent.child1 = nparent;
					} else {
						oparent.child2 = nparent;
					}
					nparent.child1 = sibling;
					nparent.child2 = node;
					sibling.parent = nparent;
					node.parent = nparent;
				} else {
					nparent.child1 = sibling;
					nparent.child2 = node;
					sibling.parent = nparent;
					node.parent = nparent;
					tree.root = nparent;
				}
				node1 = node.parent;
				while(node1 != null) {
					if(!(node1.child1 == null || node1.height < 2)) {
						let b = node1.child1;
						let c = node1.child2;
						let balance = c.height - b.height;
						if(balance > 1) {
							let f = c.child1;
							let g = c.child2;
							c.child1 = node1;
							c.parent = node1.parent;
							node1.parent = c;
							if(c.parent != null) {
								if(c.parent.child1 == node1) {
									c.parent.child1 = c;
								} else {
									c.parent.child2 = c;
								}
							} else {
								tree.root = c;
							}
							if(f.height > g.height) {
								c.child2 = f;
								node1.child2 = g;
								g.parent = node1;
								let _this = node1.aabb;
								let a = b.aabb;
								let b1 = g.aabb;
								_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
								_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
								_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
								_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
								let _this1 = c.aabb;
								let a1 = node1.aabb;
								let b2 = f.aabb;
								_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
								_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
								_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
								_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
								let x = b.height;
								let y = g.height;
								node1.height = 1 + (x > y ? x : y);
								let x1 = node1.height;
								let y1 = f.height;
								c.height = 1 + (x1 > y1 ? x1 : y1);
							} else {
								c.child2 = g;
								node1.child2 = f;
								f.parent = node1;
								let _this = node1.aabb;
								let a = b.aabb;
								let b1 = f.aabb;
								_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
								_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
								_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
								_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
								let _this1 = c.aabb;
								let a1 = node1.aabb;
								let b2 = g.aabb;
								_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
								_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
								_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
								_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
								let x = b.height;
								let y = f.height;
								node1.height = 1 + (x > y ? x : y);
								let x1 = node1.height;
								let y1 = g.height;
								c.height = 1 + (x1 > y1 ? x1 : y1);
							}
							node1 = c;
						} else if(balance < -1) {
							let f = b.child1;
							let g = b.child2;
							b.child1 = node1;
							b.parent = node1.parent;
							node1.parent = b;
							if(b.parent != null) {
								if(b.parent.child1 == node1) {
									b.parent.child1 = b;
								} else {
									b.parent.child2 = b;
								}
							} else {
								tree.root = b;
							}
							if(f.height > g.height) {
								b.child2 = f;
								node1.child1 = g;
								g.parent = node1;
								let _this = node1.aabb;
								let a = c.aabb;
								let b1 = g.aabb;
								_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
								_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
								_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
								_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
								let _this1 = b.aabb;
								let a1 = node1.aabb;
								let b2 = f.aabb;
								_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
								_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
								_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
								_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
								let x = c.height;
								let y = g.height;
								node1.height = 1 + (x > y ? x : y);
								let x1 = node1.height;
								let y1 = f.height;
								b.height = 1 + (x1 > y1 ? x1 : y1);
							} else {
								b.child2 = g;
								node1.child1 = f;
								f.parent = node1;
								let _this = node1.aabb;
								let a = c.aabb;
								let b1 = f.aabb;
								_this.minx = a.minx < b1.minx ? a.minx : b1.minx;
								_this.miny = a.miny < b1.miny ? a.miny : b1.miny;
								_this.maxx = a.maxx > b1.maxx ? a.maxx : b1.maxx;
								_this.maxy = a.maxy > b1.maxy ? a.maxy : b1.maxy;
								let _this1 = b.aabb;
								let a1 = node1.aabb;
								let b2 = g.aabb;
								_this1.minx = a1.minx < b2.minx ? a1.minx : b2.minx;
								_this1.miny = a1.miny < b2.miny ? a1.miny : b2.miny;
								_this1.maxx = a1.maxx > b2.maxx ? a1.maxx : b2.maxx;
								_this1.maxy = a1.maxy > b2.maxy ? a1.maxy : b2.maxy;
								let x = c.height;
								let y = f.height;
								node1.height = 1 + (x > y ? x : y);
								let x1 = node1.height;
								let y1 = g.height;
								b.height = 1 + (x1 > y1 ? x1 : y1);
							}
							node1 = b;
						}
					}
					let child1 = node1.child1;
					let child2 = node1.child2;
					let x = child1.height;
					let y = child2.height;
					node1.height = 1 + (x > y ? x : y);
					let _this = node1.aabb;
					let a = child1.aabb;
					let b = child2.aabb;
					_this.minx = a.minx < b.minx ? a.minx : b.minx;
					_this.miny = a.miny < b.miny ? a.miny : b.miny;
					_this.maxx = a.maxx > b.maxx ? a.maxx : b.maxx;
					_this.maxy = a.maxy > b.maxy ? a.maxy : b.maxy;
					node1 = node1.parent;
				}
			}
			node.synced = false;
			node = node.snext;
		}
		while(this.syncs != null) {
			let ret = this.syncs;
			this.syncs = ret.snext;
			ret.snext = null;
			let leaf = ret;
			if(leaf.moved) {
				continue;
			}
			leaf.moved = false;
			let lshape = leaf.shape;
			let lbody = lshape.body;
			if(lbody.component.sleeping) {
				continue;
			}
			let ab = leaf.aabb;
			let stack = null;
			if(this.dtree.root != null) {
				this.dtree.root.next = stack;
				stack = this.dtree.root;
			}
			while(stack != null) {
				let ret = stack;
				stack = ret.next;
				ret.next = null;
				let node = ret;
				if(node == leaf) {
					continue;
				}
				if(node.child1 == null) {
					let shape = node.shape;
					if(shape.body != lshape.body && !(shape.body.type == ZPP_Flags.id_BodyType_STATIC && lshape.body.type == ZPP_Flags.id_BodyType_STATIC)) {
						let x = node.aabb;
						if(x.miny <= ab.maxy && ab.miny <= x.maxy && x.minx <= ab.maxx && ab.minx <= x.maxx) {
							let id;
							let di;
							if(lshape.id < shape.id) {
								id = lshape.id;
								di = shape.id;
							} else {
								id = shape.id;
								di = lshape.id;
							}
							let s = lshape.pairs.length < shape.pairs.length ? lshape : shape;
							let p = null;
							let cx_ite = s.pairs.head;
							while(cx_ite != null) {
								let px = cx_ite.elt;
								if(px.id == id && px.di == di) {
									p = px;
									break;
								}
								cx_ite = cx_ite.next;
							}
							if(p != null) {
								if(p.sleeping) {
									p.sleeping = false;
									p.next = this.pairs;
									this.pairs = p;
									p.first = true;
								}
								continue;
							}
							if(ZPP_AABBPair.zpp_pool == null) {
								p = new ZPP_AABBPair();
							} else {
								p = ZPP_AABBPair.zpp_pool;
								ZPP_AABBPair.zpp_pool = p.next;
								p.next = null;
							}
							p.n1 = leaf;
							p.n2 = node;
							p.id = id;
							p.di = di;
							p.next = this.pairs;
							this.pairs = p;
							p.first = true;
							let _this = lshape.pairs;
							let ret;
							if(ZNPNode_ZPP_AABBPair.zpp_pool == null) {
								ret = new ZNPNode_ZPP_AABBPair();
							} else {
								ret = ZNPNode_ZPP_AABBPair.zpp_pool;
								ZNPNode_ZPP_AABBPair.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = p;
							let temp = ret;
							temp.next = _this.head;
							_this.head = temp;
							_this.modified = true;
							_this.length++;
							let _this1 = shape.pairs;
							let ret1;
							if(ZNPNode_ZPP_AABBPair.zpp_pool == null) {
								ret1 = new ZNPNode_ZPP_AABBPair();
							} else {
								ret1 = ZNPNode_ZPP_AABBPair.zpp_pool;
								ZNPNode_ZPP_AABBPair.zpp_pool = ret1.next;
								ret1.next = null;
							}
							ret1.elt = p;
							let temp1 = ret1;
							temp1.next = _this1.head;
							_this1.head = temp1;
							_this1.modified = true;
							_this1.length++;
						}
					}
				} else {
					let x = node.aabb;
					if(x.miny <= ab.maxy && ab.miny <= x.maxy && x.minx <= ab.maxx && ab.minx <= x.maxx) {
						if(node.child1 != null) {
							node.child1.next = stack;
							stack = node.child1;
						}
						if(node.child2 != null) {
							node.child2.next = stack;
							stack = node.child2;
						}
					}
				}
			}
			if(this.stree.root != null) {
				this.stree.root.next = stack;
				stack = this.stree.root;
			}
			while(stack != null) {
				let ret = stack;
				stack = ret.next;
				ret.next = null;
				let node = ret;
				if(node == leaf) {
					continue;
				}
				if(node.child1 == null) {
					let shape = node.shape;
					if(shape.body != lshape.body && !(shape.body.type == ZPP_Flags.id_BodyType_STATIC && lshape.body.type == ZPP_Flags.id_BodyType_STATIC)) {
						let x = node.aabb;
						if(x.miny <= ab.maxy && ab.miny <= x.maxy && x.minx <= ab.maxx && ab.minx <= x.maxx) {
							let id;
							let di;
							if(lshape.id < shape.id) {
								id = lshape.id;
								di = shape.id;
							} else {
								id = shape.id;
								di = lshape.id;
							}
							let s = lshape.pairs.length < shape.pairs.length ? lshape : shape;
							let p = null;
							let cx_ite = s.pairs.head;
							while(cx_ite != null) {
								let px = cx_ite.elt;
								if(px.id == id && px.di == di) {
									p = px;
									break;
								}
								cx_ite = cx_ite.next;
							}
							if(p != null) {
								if(p.sleeping) {
									p.sleeping = false;
									p.next = this.pairs;
									this.pairs = p;
									p.first = true;
								}
								continue;
							}
							if(ZPP_AABBPair.zpp_pool == null) {
								p = new ZPP_AABBPair();
							} else {
								p = ZPP_AABBPair.zpp_pool;
								ZPP_AABBPair.zpp_pool = p.next;
								p.next = null;
							}
							p.n1 = leaf;
							p.n2 = node;
							p.id = id;
							p.di = di;
							p.next = this.pairs;
							this.pairs = p;
							p.first = true;
							let _this = lshape.pairs;
							let ret;
							if(ZNPNode_ZPP_AABBPair.zpp_pool == null) {
								ret = new ZNPNode_ZPP_AABBPair();
							} else {
								ret = ZNPNode_ZPP_AABBPair.zpp_pool;
								ZNPNode_ZPP_AABBPair.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = p;
							let temp = ret;
							temp.next = _this.head;
							_this.head = temp;
							_this.modified = true;
							_this.length++;
							let _this1 = shape.pairs;
							let ret1;
							if(ZNPNode_ZPP_AABBPair.zpp_pool == null) {
								ret1 = new ZNPNode_ZPP_AABBPair();
							} else {
								ret1 = ZNPNode_ZPP_AABBPair.zpp_pool;
								ZNPNode_ZPP_AABBPair.zpp_pool = ret1.next;
								ret1.next = null;
							}
							ret1.elt = p;
							let temp1 = ret1;
							temp1.next = _this1.head;
							_this1.head = temp1;
							_this1.modified = true;
							_this1.length++;
						}
					}
				} else {
					let x = node.aabb;
					if(x.miny <= ab.maxy && ab.miny <= x.maxy && x.minx <= ab.maxx && ab.minx <= x.maxx) {
						if(node.child1 != null) {
							node.child1.next = stack;
							stack = node.child1;
						}
						if(node.child2 != null) {
							node.child2.next = stack;
							stack = node.child2;
						}
					}
				}
			}
		}
		while(this.moves != null) {
			let ret = this.moves;
			this.moves = ret.mnext;
			ret.mnext = null;
			let leaf = ret;
			leaf.moved = false;
			let lshape = leaf.shape;
			let lbody = lshape.body;
			if(lbody.component.sleeping) {
				continue;
			}
			let ab = leaf.aabb;
			let stack = null;
			if(this.dtree.root != null) {
				this.dtree.root.next = stack;
				stack = this.dtree.root;
			}
			while(stack != null) {
				let ret = stack;
				stack = ret.next;
				ret.next = null;
				let node = ret;
				if(node == leaf) {
					continue;
				}
				if(node.child1 == null) {
					let shape = node.shape;
					if(shape.body != lshape.body && !(shape.body.type == ZPP_Flags.id_BodyType_STATIC && lshape.body.type == ZPP_Flags.id_BodyType_STATIC)) {
						let x = node.aabb;
						if(x.miny <= ab.maxy && ab.miny <= x.maxy && x.minx <= ab.maxx && ab.minx <= x.maxx) {
							let id;
							let di;
							if(lshape.id < shape.id) {
								id = lshape.id;
								di = shape.id;
							} else {
								id = shape.id;
								di = lshape.id;
							}
							let s = lshape.pairs.length < shape.pairs.length ? lshape : shape;
							let p = null;
							let cx_ite = s.pairs.head;
							while(cx_ite != null) {
								let px = cx_ite.elt;
								if(px.id == id && px.di == di) {
									p = px;
									break;
								}
								cx_ite = cx_ite.next;
							}
							if(p != null) {
								if(p.sleeping) {
									p.sleeping = false;
									p.next = this.pairs;
									this.pairs = p;
									p.first = true;
								}
								continue;
							}
							if(ZPP_AABBPair.zpp_pool == null) {
								p = new ZPP_AABBPair();
							} else {
								p = ZPP_AABBPair.zpp_pool;
								ZPP_AABBPair.zpp_pool = p.next;
								p.next = null;
							}
							p.n1 = leaf;
							p.n2 = node;
							p.id = id;
							p.di = di;
							p.next = this.pairs;
							this.pairs = p;
							p.first = true;
							let _this = lshape.pairs;
							let ret;
							if(ZNPNode_ZPP_AABBPair.zpp_pool == null) {
								ret = new ZNPNode_ZPP_AABBPair();
							} else {
								ret = ZNPNode_ZPP_AABBPair.zpp_pool;
								ZNPNode_ZPP_AABBPair.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = p;
							let temp = ret;
							temp.next = _this.head;
							_this.head = temp;
							_this.modified = true;
							_this.length++;
							let _this1 = shape.pairs;
							let ret1;
							if(ZNPNode_ZPP_AABBPair.zpp_pool == null) {
								ret1 = new ZNPNode_ZPP_AABBPair();
							} else {
								ret1 = ZNPNode_ZPP_AABBPair.zpp_pool;
								ZNPNode_ZPP_AABBPair.zpp_pool = ret1.next;
								ret1.next = null;
							}
							ret1.elt = p;
							let temp1 = ret1;
							temp1.next = _this1.head;
							_this1.head = temp1;
							_this1.modified = true;
							_this1.length++;
						}
					}
				} else {
					let x = node.aabb;
					if(x.miny <= ab.maxy && ab.miny <= x.maxy && x.minx <= ab.maxx && ab.minx <= x.maxx) {
						if(node.child1 != null) {
							node.child1.next = stack;
							stack = node.child1;
						}
						if(node.child2 != null) {
							node.child2.next = stack;
							stack = node.child2;
						}
					}
				}
			}
			if(this.stree.root != null) {
				this.stree.root.next = stack;
				stack = this.stree.root;
			}
			while(stack != null) {
				let ret = stack;
				stack = ret.next;
				ret.next = null;
				let node = ret;
				if(node == leaf) {
					continue;
				}
				if(node.child1 == null) {
					let shape = node.shape;
					if(shape.body != lshape.body && !(shape.body.type == ZPP_Flags.id_BodyType_STATIC && lshape.body.type == ZPP_Flags.id_BodyType_STATIC)) {
						let x = node.aabb;
						if(x.miny <= ab.maxy && ab.miny <= x.maxy && x.minx <= ab.maxx && ab.minx <= x.maxx) {
							let id;
							let di;
							if(lshape.id < shape.id) {
								id = lshape.id;
								di = shape.id;
							} else {
								id = shape.id;
								di = lshape.id;
							}
							let s = lshape.pairs.length < shape.pairs.length ? lshape : shape;
							let p = null;
							let cx_ite = s.pairs.head;
							while(cx_ite != null) {
								let px = cx_ite.elt;
								if(px.id == id && px.di == di) {
									p = px;
									break;
								}
								cx_ite = cx_ite.next;
							}
							if(p != null) {
								if(p.sleeping) {
									p.sleeping = false;
									p.next = this.pairs;
									this.pairs = p;
									p.first = true;
								}
								continue;
							}
							if(ZPP_AABBPair.zpp_pool == null) {
								p = new ZPP_AABBPair();
							} else {
								p = ZPP_AABBPair.zpp_pool;
								ZPP_AABBPair.zpp_pool = p.next;
								p.next = null;
							}
							p.n1 = leaf;
							p.n2 = node;
							p.id = id;
							p.di = di;
							p.next = this.pairs;
							this.pairs = p;
							p.first = true;
							let _this = lshape.pairs;
							let ret;
							if(ZNPNode_ZPP_AABBPair.zpp_pool == null) {
								ret = new ZNPNode_ZPP_AABBPair();
							} else {
								ret = ZNPNode_ZPP_AABBPair.zpp_pool;
								ZNPNode_ZPP_AABBPair.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = p;
							let temp = ret;
							temp.next = _this.head;
							_this.head = temp;
							_this.modified = true;
							_this.length++;
							let _this1 = shape.pairs;
							let ret1;
							if(ZNPNode_ZPP_AABBPair.zpp_pool == null) {
								ret1 = new ZNPNode_ZPP_AABBPair();
							} else {
								ret1 = ZNPNode_ZPP_AABBPair.zpp_pool;
								ZNPNode_ZPP_AABBPair.zpp_pool = ret1.next;
								ret1.next = null;
							}
							ret1.elt = p;
							let temp1 = ret1;
							temp1.next = _this1.head;
							_this1.head = temp1;
							_this1.modified = true;
							_this1.length++;
						}
					}
				} else {
					let x = node.aabb;
					if(x.miny <= ab.maxy && ab.miny <= x.maxy && x.minx <= ab.maxx && ab.minx <= x.maxx) {
						if(node.child1 != null) {
							node.child1.next = stack;
							stack = node.child1;
						}
						if(node.child2 != null) {
							node.child2.next = stack;
							stack = node.child2;
						}
					}
				}
			}
		}
		let pre = null;
		let cur = this.pairs;
		while(cur != null) {
			let tmp;
			if(!cur.first) {
				let _this = cur.n1.aabb;
				let x = cur.n2.aabb;
				tmp = !(x.miny <= _this.maxy && _this.miny <= x.maxy && x.minx <= _this.maxx && _this.minx <= x.maxx);
			} else {
				tmp = false;
			}
			if(tmp) {
				if(pre == null) {
					this.pairs = cur.next;
				} else {
					pre.next = cur.next;
				}
				let _this = cur.n1.shape.pairs;
				let pre1 = null;
				let cur1 = _this.head;
				let ret = false;
				while(cur1 != null) {
					if(cur1.elt == cur) {
						let old;
						let ret1;
						if(pre1 == null) {
							old = _this.head;
							ret1 = old.next;
							_this.head = ret1;
							if(_this.head == null) {
								_this.pushmod = true;
							}
						} else {
							old = pre1.next;
							ret1 = old.next;
							pre1.next = ret1;
							if(ret1 == null) {
								_this.pushmod = true;
							}
						}
						let o = old;
						o.elt = null;
						o.next = ZNPNode_ZPP_AABBPair.zpp_pool;
						ZNPNode_ZPP_AABBPair.zpp_pool = o;
						_this.modified = true;
						_this.length--;
						_this.pushmod = true;
						ret = true;
						break;
					}
					pre1 = cur1;
					cur1 = cur1.next;
				}
				let _this1 = cur.n2.shape.pairs;
				let pre2 = null;
				let cur2 = _this1.head;
				let ret1 = false;
				while(cur2 != null) {
					if(cur2.elt == cur) {
						let old;
						let ret;
						if(pre2 == null) {
							old = _this1.head;
							ret = old.next;
							_this1.head = ret;
							if(_this1.head == null) {
								_this1.pushmod = true;
							}
						} else {
							old = pre2.next;
							ret = old.next;
							pre2.next = ret;
							if(ret == null) {
								_this1.pushmod = true;
							}
						}
						let o = old;
						o.elt = null;
						o.next = ZNPNode_ZPP_AABBPair.zpp_pool;
						ZNPNode_ZPP_AABBPair.zpp_pool = o;
						_this1.modified = true;
						_this1.length--;
						_this1.pushmod = true;
						ret1 = true;
						break;
					}
					pre2 = cur2;
					cur2 = cur2.next;
				}
				let nxt = cur.next;
				if(cur.arb != null) {
					cur.arb.pair = null;
				}
				cur.arb = null;
				let o = cur;
				o.n1 = o.n2 = null;
				o.sleeping = false;
				o.next = ZPP_AABBPair.zpp_pool;
				ZPP_AABBPair.zpp_pool = o;
				cur = nxt;
				continue;
			}
			let s1 = cur.n1.shape;
			let b1 = s1.body;
			let s2 = cur.n2.shape;
			let b2 = s2.body;
			if(!cur.first) {
				if((b1.component.sleeping || b1.type == ZPP_Flags.id_BodyType_STATIC) && (b2.component.sleeping || b2.type == ZPP_Flags.id_BodyType_STATIC)) {
					cur.sleeping = true;
					if(pre == null) {
						this.pairs = cur.next;
					} else {
						pre.next = cur.next;
					}
					cur = cur.next;
					continue;
				}
			}
			cur.first = false;
			let _this = s1.aabb;
			let x = s2.aabb;
			if(x.miny <= _this.maxy && _this.miny <= x.maxy && x.minx <= _this.maxx && _this.minx <= x.maxx) {
				let oarb = cur.arb;
				if(discrete) {
					cur.arb = space.narrowPhase(s1,s2,b1.type != ZPP_Flags.id_BodyType_DYNAMIC || b2.type != ZPP_Flags.id_BodyType_DYNAMIC,cur.arb,false);
				} else {
					cur.arb = space.continuousEvent(s1,s2,b1.type != ZPP_Flags.id_BodyType_DYNAMIC || b2.type != ZPP_Flags.id_BodyType_DYNAMIC,cur.arb,false);
				}
				if(cur.arb == null) {
					if(oarb != null) {
						oarb.pair = null;
					}
				} else {
					cur.arb.pair = cur;
				}
			}
			pre = cur;
			cur = cur.next;
		}
	}
	clear() {
		while(this.syncs != null) {
			let next = this.syncs.snext;
			this.syncs.snext = null;
			if(this.syncs.first_sync) {
				this.syncs.shape.node = null;
				this.syncs.shape.removedFromSpace();
				this.syncs.shape = null;
			}
			this.syncs = next;
		}
		while(this.moves != null) {
			let next = this.moves.mnext;
			this.moves.mnext = null;
			if(this.moves.first_sync) {
				this.moves.shape.node = null;
				this.moves.shape.removedFromSpace();
				this.moves.shape = null;
			}
			this.moves = next;
		}
		while(this.pairs != null) {
			let nxt = this.pairs.next;
			if(this.pairs.arb != null) {
				this.pairs.arb.pair = null;
			}
			this.pairs.arb = null;
			let _this = this.pairs.n1.shape.pairs;
			let obj = this.pairs;
			let pre = null;
			let cur = _this.head;
			let ret = false;
			while(cur != null) {
				if(cur.elt == obj) {
					let old;
					let ret1;
					if(pre == null) {
						old = _this.head;
						ret1 = old.next;
						_this.head = ret1;
						if(_this.head == null) {
							_this.pushmod = true;
						}
					} else {
						old = pre.next;
						ret1 = old.next;
						pre.next = ret1;
						if(ret1 == null) {
							_this.pushmod = true;
						}
					}
					let o = old;
					o.elt = null;
					o.next = ZNPNode_ZPP_AABBPair.zpp_pool;
					ZNPNode_ZPP_AABBPair.zpp_pool = o;
					_this.modified = true;
					_this.length--;
					_this.pushmod = true;
					ret = true;
					break;
				}
				pre = cur;
				cur = cur.next;
			}
			let _this1 = this.pairs.n2.shape.pairs;
			let obj1 = this.pairs;
			let pre1 = null;
			let cur1 = _this1.head;
			let ret1 = false;
			while(cur1 != null) {
				if(cur1.elt == obj1) {
					let old;
					let ret;
					if(pre1 == null) {
						old = _this1.head;
						ret = old.next;
						_this1.head = ret;
						if(_this1.head == null) {
							_this1.pushmod = true;
						}
					} else {
						old = pre1.next;
						ret = old.next;
						pre1.next = ret;
						if(ret == null) {
							_this1.pushmod = true;
						}
					}
					let o = old;
					o.elt = null;
					o.next = ZNPNode_ZPP_AABBPair.zpp_pool;
					ZNPNode_ZPP_AABBPair.zpp_pool = o;
					_this1.modified = true;
					_this1.length--;
					_this1.pushmod = true;
					ret1 = true;
					break;
				}
				pre1 = cur1;
				cur1 = cur1.next;
			}
			let o = this.pairs;
			o.n1 = o.n2 = null;
			o.sleeping = false;
			o.next = ZPP_AABBPair.zpp_pool;
			ZPP_AABBPair.zpp_pool = o;
			this.pairs = nxt;
		}
		this.dtree.clear();
		this.stree.clear();
	}
	shapesUnderPoint(x,y,filter,output) {
		this.sync_broadphase();
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
		ret.x = x;
		ret.y = y;
		let v = ret;
		let ret1 = output == null ? new ShapeList() : output;
		if(this.stree.root != null) {
			if(this.treeStack == null) {
				this.treeStack = new ZNPList_ZPP_AABBNode();
			}
			this.treeStack.add(this.stree.root);
			while(this.treeStack.head != null) {
				let node = this.treeStack.pop_unsafe();
				let _this = node.aabb;
				if(v.x >= _this.minx && v.x <= _this.maxx && v.y >= _this.miny && v.y <= _this.maxy) {
					if(node.child1 == null) {
						let tmp;
						if(filter != null) {
							let _this = node.shape.filter;
							tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
						} else {
							tmp = true;
						}
						if(tmp) {
							if(node.shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
								if(ZPP_Collide.circleContains(node.shape.circle,v)) {
									ret1.push(node.shape.outer);
								}
							} else if(ZPP_Collide.polyContains(node.shape.polygon,v)) {
								ret1.push(node.shape.outer);
							}
						}
					} else {
						if(node.child1 != null) {
							this.treeStack.add(node.child1);
						}
						if(node.child2 != null) {
							this.treeStack.add(node.child2);
						}
					}
				}
			}
		}
		if(this.dtree.root != null) {
			if(this.treeStack == null) {
				this.treeStack = new ZNPList_ZPP_AABBNode();
			}
			this.treeStack.add(this.dtree.root);
			while(this.treeStack.head != null) {
				let node = this.treeStack.pop_unsafe();
				let _this = node.aabb;
				if(v.x >= _this.minx && v.x <= _this.maxx && v.y >= _this.miny && v.y <= _this.maxy) {
					if(node.child1 == null) {
						let tmp;
						if(filter != null) {
							let _this = node.shape.filter;
							tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
						} else {
							tmp = true;
						}
						if(tmp) {
							if(node.shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
								if(ZPP_Collide.circleContains(node.shape.circle,v)) {
									ret1.push(node.shape.outer);
								}
							} else if(ZPP_Collide.polyContains(node.shape.polygon,v)) {
								ret1.push(node.shape.outer);
							}
						}
					} else {
						if(node.child1 != null) {
							this.treeStack.add(node.child1);
						}
						if(node.child2 != null) {
							this.treeStack.add(node.child2);
						}
					}
				}
			}
		}
		let o = v;
		if(o.outer != null) {
			o.outer.zpp_inner = null;
			o.outer = null;
		}
		o._isimmutable = null;
		o._validate = null;
		o._invalidate = null;
		o.next = ZPP_Vec2.zpp_pool;
		ZPP_Vec2.zpp_pool = o;
		return ret1;
	}
	bodiesUnderPoint(x,y,filter,output) {
		this.sync_broadphase();
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
		ret.x = x;
		ret.y = y;
		let v = ret;
		let ret1 = output == null ? new BodyList() : output;
		if(this.stree.root != null) {
			if(this.treeStack == null) {
				this.treeStack = new ZNPList_ZPP_AABBNode();
			}
			this.treeStack.add(this.stree.root);
			while(this.treeStack.head != null) {
				let node = this.treeStack.pop_unsafe();
				let _this = node.aabb;
				if(v.x >= _this.minx && v.x <= _this.maxx && v.y >= _this.miny && v.y <= _this.maxy) {
					if(node.child1 == null) {
						let body = node.shape.body.outer;
						if(!ret1.has(body)) {
							let tmp;
							if(filter != null) {
								let _this = node.shape.filter;
								tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
							} else {
								tmp = true;
							}
							if(tmp) {
								if(node.shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
									if(ZPP_Collide.circleContains(node.shape.circle,v)) {
										ret1.push(body);
									}
								} else if(ZPP_Collide.polyContains(node.shape.polygon,v)) {
									ret1.push(body);
								}
							}
						}
					} else {
						if(node.child1 != null) {
							this.treeStack.add(node.child1);
						}
						if(node.child2 != null) {
							this.treeStack.add(node.child2);
						}
					}
				}
			}
		}
		if(this.dtree.root != null) {
			if(this.treeStack == null) {
				this.treeStack = new ZNPList_ZPP_AABBNode();
			}
			this.treeStack.add(this.dtree.root);
			while(this.treeStack.head != null) {
				let node = this.treeStack.pop_unsafe();
				let _this = node.aabb;
				if(v.x >= _this.minx && v.x <= _this.maxx && v.y >= _this.miny && v.y <= _this.maxy) {
					if(node.child1 == null) {
						let body = node.shape.body.outer;
						if(!ret1.has(body)) {
							let tmp;
							if(filter != null) {
								let _this = node.shape.filter;
								tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
							} else {
								tmp = true;
							}
							if(tmp) {
								if(node.shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
									if(ZPP_Collide.circleContains(node.shape.circle,v)) {
										ret1.push(body);
									}
								} else if(ZPP_Collide.polyContains(node.shape.polygon,v)) {
									ret1.push(body);
								}
							}
						}
					} else {
						if(node.child1 != null) {
							this.treeStack.add(node.child1);
						}
						if(node.child2 != null) {
							this.treeStack.add(node.child2);
						}
					}
				}
			}
		}
		let o = v;
		if(o.outer != null) {
			o.outer.zpp_inner = null;
			o.outer = null;
		}
		o._isimmutable = null;
		o._validate = null;
		o._invalidate = null;
		o.next = ZPP_Vec2.zpp_pool;
		ZPP_Vec2.zpp_pool = o;
		return ret1;
	}
	shapesInAABB(aabb,strict,containment,filter,output) {
		this.sync_broadphase();
		this.updateAABBShape(aabb);
		let ab = this.aabbShape.zpp_inner.aabb;
		let ret = output == null ? new ShapeList() : output;
		if(this.stree.root != null) {
			if(this.treeStack == null) {
				this.treeStack = new ZNPList_ZPP_AABBNode();
			}
			this.treeStack.add(this.stree.root);
			while(this.treeStack.head != null) {
				let node = this.treeStack.pop_unsafe();
				let x = node.aabb;
				if(x.minx >= ab.minx && x.miny >= ab.miny && x.maxx <= ab.maxx && x.maxy <= ab.maxy) {
					if(node.child1 == null) {
						let tmp;
						if(filter != null) {
							let _this = node.shape.filter;
							tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
						} else {
							tmp = true;
						}
						if(tmp) {
							ret.push(node.shape.outer);
						}
					} else {
						if(this.treeStack2 == null) {
							this.treeStack2 = new ZNPList_ZPP_AABBNode();
						}
						this.treeStack2.add(node);
						while(this.treeStack2.head != null) {
							let node = this.treeStack2.pop_unsafe();
							if(node.child1 == null) {
								let tmp;
								if(filter != null) {
									let _this = node.shape.filter;
									tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
								} else {
									tmp = true;
								}
								if(tmp) {
									ret.push(node.shape.outer);
								}
							} else {
								if(node.child1 != null) {
									this.treeStack2.add(node.child1);
								}
								if(node.child2 != null) {
									this.treeStack2.add(node.child2);
								}
							}
						}
					}
				} else {
					let _this = node.aabb;
					if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
						if(node.child1 == null) {
							let tmp;
							if(filter != null) {
								let _this = node.shape.filter;
								tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
							} else {
								tmp = true;
							}
							if(tmp) {
								if(strict) {
									if(containment) {
										if(ZPP_Collide.containTest(this.aabbShape.zpp_inner,node.shape)) {
											ret.push(node.shape.outer);
										}
									} else {
										let x = node.shape.aabb;
										if(x.minx >= ab.minx && x.miny >= ab.miny && x.maxx <= ab.maxx && x.maxy <= ab.maxy) {
											ret.push(node.shape.outer);
										} else if(ZPP_Collide.testCollide_safe(node.shape,this.aabbShape.zpp_inner)) {
											ret.push(node.shape.outer);
										}
									}
								} else {
									let tmp;
									if(containment) {
										let x = node.shape.aabb;
										tmp = x.minx >= ab.minx && x.miny >= ab.miny && x.maxx <= ab.maxx && x.maxy <= ab.maxy;
									} else {
										tmp = true;
									}
									if(tmp) {
										ret.push(node.shape.outer);
									}
								}
							}
						} else {
							if(node.child1 != null) {
								this.treeStack.add(node.child1);
							}
							if(node.child2 != null) {
								this.treeStack.add(node.child2);
							}
						}
					}
				}
			}
		}
		if(this.dtree.root != null) {
			if(this.treeStack == null) {
				this.treeStack = new ZNPList_ZPP_AABBNode();
			}
			this.treeStack.add(this.dtree.root);
			while(this.treeStack.head != null) {
				let node = this.treeStack.pop_unsafe();
				let x = node.aabb;
				if(x.minx >= ab.minx && x.miny >= ab.miny && x.maxx <= ab.maxx && x.maxy <= ab.maxy) {
					if(node.child1 == null) {
						let tmp;
						if(filter != null) {
							let _this = node.shape.filter;
							tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
						} else {
							tmp = true;
						}
						if(tmp) {
							ret.push(node.shape.outer);
						}
					} else {
						if(this.treeStack2 == null) {
							this.treeStack2 = new ZNPList_ZPP_AABBNode();
						}
						this.treeStack2.add(node);
						while(this.treeStack2.head != null) {
							let node = this.treeStack2.pop_unsafe();
							if(node.child1 == null) {
								let tmp;
								if(filter != null) {
									let _this = node.shape.filter;
									tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
								} else {
									tmp = true;
								}
								if(tmp) {
									ret.push(node.shape.outer);
								}
							} else {
								if(node.child1 != null) {
									this.treeStack2.add(node.child1);
								}
								if(node.child2 != null) {
									this.treeStack2.add(node.child2);
								}
							}
						}
					}
				} else {
					let _this = node.aabb;
					if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
						if(node.child1 == null) {
							let tmp;
							if(filter != null) {
								let _this = node.shape.filter;
								tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
							} else {
								tmp = true;
							}
							if(tmp) {
								if(strict) {
									if(containment) {
										if(ZPP_Collide.containTest(this.aabbShape.zpp_inner,node.shape)) {
											ret.push(node.shape.outer);
										}
									} else {
										let x = node.shape.aabb;
										if(x.minx >= ab.minx && x.miny >= ab.miny && x.maxx <= ab.maxx && x.maxy <= ab.maxy) {
											ret.push(node.shape.outer);
										} else if(ZPP_Collide.testCollide_safe(node.shape,this.aabbShape.zpp_inner)) {
											ret.push(node.shape.outer);
										}
									}
								} else {
									let tmp;
									if(containment) {
										let x = node.shape.aabb;
										tmp = x.minx >= ab.minx && x.miny >= ab.miny && x.maxx <= ab.maxx && x.maxy <= ab.maxy;
									} else {
										tmp = true;
									}
									if(tmp) {
										ret.push(node.shape.outer);
									}
								}
							}
						} else {
							if(node.child1 != null) {
								this.treeStack.add(node.child1);
							}
							if(node.child2 != null) {
								this.treeStack.add(node.child2);
							}
						}
					}
				}
			}
		}
		return ret;
	}
	bodiesInAABB(aabb,strict,containment,filter,output) {
		this.sync_broadphase();
		this.updateAABBShape(aabb);
		let ab = this.aabbShape.zpp_inner.aabb;
		let ret = output == null ? new BodyList() : output;
		if(this.failed == null) {
			this.failed = new BodyList();
		}
		if(this.stree.root != null) {
			if(this.treeStack == null) {
				this.treeStack = new ZNPList_ZPP_AABBNode();
			}
			this.treeStack.add(this.stree.root);
			while(this.treeStack.head != null) {
				let node = this.treeStack.pop_unsafe();
				let x = node.aabb;
				if(x.minx >= ab.minx && x.miny >= ab.miny && x.maxx <= ab.maxx && x.maxy <= ab.maxy) {
					if(node.child1 == null) {
						let tmp;
						if(filter != null) {
							let _this = node.shape.filter;
							tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
						} else {
							tmp = true;
						}
						if(tmp) {
							let body = node.shape.body.outer;
							if(!ret.has(body)) {
								ret.push(body);
							}
						}
					} else {
						if(this.treeStack2 == null) {
							this.treeStack2 = new ZNPList_ZPP_AABBNode();
						}
						this.treeStack2.add(node);
						while(this.treeStack2.head != null) {
							let node = this.treeStack2.pop_unsafe();
							if(node.child1 == null) {
								let tmp;
								if(filter != null) {
									let _this = node.shape.filter;
									tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
								} else {
									tmp = true;
								}
								if(tmp) {
									let body = node.shape.body.outer;
									if(!ret.has(body)) {
										ret.push(body);
									}
								}
							} else {
								if(node.child1 != null) {
									this.treeStack2.add(node.child1);
								}
								if(node.child2 != null) {
									this.treeStack2.add(node.child2);
								}
							}
						}
					}
				} else {
					let _this = node.aabb;
					if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
						if(node.child1 == null) {
							let body = node.shape.body.outer;
							let tmp;
							if(filter != null) {
								let _this = node.shape.filter;
								tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
							} else {
								tmp = true;
							}
							if(tmp) {
								if(strict) {
									if(containment) {
										if(!this.failed.has(body)) {
											let col = ZPP_Collide.containTest(this.aabbShape.zpp_inner,node.shape);
											if(!ret.has(body) && col) {
												ret.push(body);
											} else if(!col) {
												ret.remove(body);
												this.failed.push(body);
											}
										}
									} else if(!ret.has(body) && ZPP_Collide.testCollide_safe(node.shape,this.aabbShape.zpp_inner)) {
										ret.push(body);
									}
								} else if(containment) {
									if(!this.failed.has(body)) {
										let x = node.shape.aabb;
										let col = x.minx >= ab.minx && x.miny >= ab.miny && x.maxx <= ab.maxx && x.maxy <= ab.maxy;
										if(!ret.has(body) && col) {
											ret.push(body);
										} else if(!col) {
											ret.remove(body);
											this.failed.push(body);
										}
									}
								} else {
									let tmp;
									if(!ret.has(body)) {
										let x = node.shape.aabb;
										tmp = x.minx >= ab.minx && x.miny >= ab.miny && x.maxx <= ab.maxx && x.maxy <= ab.maxy;
									} else {
										tmp = false;
									}
									if(tmp) {
										ret.push(body);
									}
								}
							}
						} else {
							if(node.child1 != null) {
								this.treeStack.add(node.child1);
							}
							if(node.child2 != null) {
								this.treeStack.add(node.child2);
							}
						}
					}
				}
			}
		}
		if(this.dtree.root != null) {
			if(this.treeStack == null) {
				this.treeStack = new ZNPList_ZPP_AABBNode();
			}
			this.treeStack.add(this.dtree.root);
			while(this.treeStack.head != null) {
				let node = this.treeStack.pop_unsafe();
				let x = node.aabb;
				if(x.minx >= ab.minx && x.miny >= ab.miny && x.maxx <= ab.maxx && x.maxy <= ab.maxy) {
					if(node.child1 == null) {
						let tmp;
						if(filter != null) {
							let _this = node.shape.filter;
							tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
						} else {
							tmp = true;
						}
						if(tmp) {
							let body = node.shape.body.outer;
							if(!ret.has(body)) {
								ret.push(body);
							}
						}
					} else {
						if(this.treeStack2 == null) {
							this.treeStack2 = new ZNPList_ZPP_AABBNode();
						}
						this.treeStack2.add(node);
						while(this.treeStack2.head != null) {
							let node = this.treeStack2.pop_unsafe();
							if(node.child1 == null) {
								let tmp;
								if(filter != null) {
									let _this = node.shape.filter;
									tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
								} else {
									tmp = true;
								}
								if(tmp) {
									let body = node.shape.body.outer;
									if(!ret.has(body)) {
										ret.push(body);
									}
								}
							} else {
								if(node.child1 != null) {
									this.treeStack2.add(node.child1);
								}
								if(node.child2 != null) {
									this.treeStack2.add(node.child2);
								}
							}
						}
					}
				} else {
					let _this = node.aabb;
					if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
						if(node.child1 == null) {
							let body = node.shape.body.outer;
							let tmp;
							if(filter != null) {
								let _this = node.shape.filter;
								tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
							} else {
								tmp = true;
							}
							if(tmp) {
								if(strict) {
									if(containment) {
										if(!this.failed.has(body)) {
											let col = ZPP_Collide.containTest(this.aabbShape.zpp_inner,node.shape);
											if(!ret.has(body) && col) {
												ret.push(body);
											} else if(!col) {
												ret.remove(body);
												this.failed.push(body);
											}
										}
									} else if(!ret.has(body) && ZPP_Collide.testCollide_safe(node.shape,this.aabbShape.zpp_inner)) {
										ret.push(body);
									}
								} else if(containment) {
									if(!this.failed.has(body)) {
										let x = node.shape.aabb;
										let col = x.minx >= ab.minx && x.miny >= ab.miny && x.maxx <= ab.maxx && x.maxy <= ab.maxy;
										if(!ret.has(body) && col) {
											ret.push(body);
										} else if(!col) {
											ret.remove(body);
											this.failed.push(body);
										}
									}
								} else {
									let tmp;
									if(!ret.has(body)) {
										let x = node.shape.aabb;
										tmp = x.minx >= ab.minx && x.miny >= ab.miny && x.maxx <= ab.maxx && x.maxy <= ab.maxy;
									} else {
										tmp = false;
									}
									if(tmp) {
										ret.push(body);
									}
								}
							}
						} else {
							if(node.child1 != null) {
								this.treeStack.add(node.child1);
							}
							if(node.child2 != null) {
								this.treeStack.add(node.child2);
							}
						}
					}
				}
			}
		}
		this.failed.clear();
		return ret;
	}
	shapesInCircle(x,y,r,containment,filter,output) {
		this.sync_broadphase();
		this.updateCircShape(x,y,r);
		let ab = this.circShape.zpp_inner.aabb;
		let ret = output == null ? new ShapeList() : output;
		if(this.stree.root != null) {
			if(this.treeStack == null) {
				this.treeStack = new ZNPList_ZPP_AABBNode();
			}
			this.treeStack.add(this.stree.root);
			while(this.treeStack.head != null) {
				let node = this.treeStack.pop_unsafe();
				let _this = node.aabb;
				if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
					if(node.child1 == null) {
						let tmp;
						if(filter != null) {
							let _this = node.shape.filter;
							tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
						} else {
							tmp = true;
						}
						if(tmp) {
							if(containment) {
								if(ZPP_Collide.containTest(this.circShape.zpp_inner,node.shape)) {
									ret.push(node.shape.outer);
								}
							} else if(ZPP_Collide.testCollide_safe(node.shape,this.circShape.zpp_inner)) {
								ret.push(node.shape.outer);
							}
						}
					} else {
						if(node.child1 != null) {
							this.treeStack.add(node.child1);
						}
						if(node.child2 != null) {
							this.treeStack.add(node.child2);
						}
					}
				}
			}
		}
		if(this.dtree.root != null) {
			if(this.treeStack == null) {
				this.treeStack = new ZNPList_ZPP_AABBNode();
			}
			this.treeStack.add(this.dtree.root);
			while(this.treeStack.head != null) {
				let node = this.treeStack.pop_unsafe();
				let _this = node.aabb;
				if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
					if(node.child1 == null) {
						let tmp;
						if(filter != null) {
							let _this = node.shape.filter;
							tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
						} else {
							tmp = true;
						}
						if(tmp) {
							if(containment) {
								if(ZPP_Collide.containTest(this.circShape.zpp_inner,node.shape)) {
									ret.push(node.shape.outer);
								}
							} else if(ZPP_Collide.testCollide_safe(node.shape,this.circShape.zpp_inner)) {
								ret.push(node.shape.outer);
							}
						}
					} else {
						if(node.child1 != null) {
							this.treeStack.add(node.child1);
						}
						if(node.child2 != null) {
							this.treeStack.add(node.child2);
						}
					}
				}
			}
		}
		return ret;
	}
	bodiesInCircle(x,y,r,containment,filter,output) {
		this.sync_broadphase();
		this.updateCircShape(x,y,r);
		let ab = this.circShape.zpp_inner.aabb;
		let ret = output == null ? new BodyList() : output;
		if(this.failed == null) {
			this.failed = new BodyList();
		}
		if(this.stree.root != null) {
			if(this.treeStack == null) {
				this.treeStack = new ZNPList_ZPP_AABBNode();
			}
			this.treeStack.add(this.stree.root);
			while(this.treeStack.head != null) {
				let node = this.treeStack.pop_unsafe();
				let _this = node.aabb;
				if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
					if(node.child1 == null) {
						let body = node.shape.body.outer;
						let tmp;
						if(filter != null) {
							let _this = node.shape.filter;
							tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
						} else {
							tmp = true;
						}
						if(tmp) {
							if(containment) {
								if(!this.failed.has(body)) {
									let col = ZPP_Collide.containTest(this.circShape.zpp_inner,node.shape);
									if(!ret.has(body) && col) {
										ret.push(body);
									} else if(!col) {
										ret.remove(body);
										this.failed.push(body);
									}
								}
							} else if(!ret.has(body) && ZPP_Collide.testCollide_safe(node.shape,this.circShape.zpp_inner)) {
								ret.push(body);
							}
						}
					} else {
						if(node.child1 != null) {
							this.treeStack.add(node.child1);
						}
						if(node.child2 != null) {
							this.treeStack.add(node.child2);
						}
					}
				}
			}
		}
		if(this.dtree.root != null) {
			if(this.treeStack == null) {
				this.treeStack = new ZNPList_ZPP_AABBNode();
			}
			this.treeStack.add(this.dtree.root);
			while(this.treeStack.head != null) {
				let node = this.treeStack.pop_unsafe();
				let _this = node.aabb;
				if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
					if(node.child1 == null) {
						let body = node.shape.body.outer;
						let tmp;
						if(filter != null) {
							let _this = node.shape.filter;
							tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
						} else {
							tmp = true;
						}
						if(tmp) {
							if(containment) {
								if(!this.failed.has(body)) {
									let col = ZPP_Collide.containTest(this.circShape.zpp_inner,node.shape);
									if(!ret.has(body) && col) {
										ret.push(body);
									} else if(!col) {
										ret.remove(body);
										this.failed.push(body);
									}
								}
							} else if(!ret.has(body) && ZPP_Collide.testCollide_safe(node.shape,this.circShape.zpp_inner)) {
								ret.push(body);
							}
						}
					} else {
						if(node.child1 != null) {
							this.treeStack.add(node.child1);
						}
						if(node.child2 != null) {
							this.treeStack.add(node.child2);
						}
					}
				}
			}
		}
		this.failed.clear();
		return ret;
	}
	shapesInShape(shp,containment,filter,output) {
		this.sync_broadphase();
		this.validateShape(shp);
		let ab = shp.aabb;
		let ret = output == null ? new ShapeList() : output;
		if(this.stree.root != null) {
			if(this.treeStack == null) {
				this.treeStack = new ZNPList_ZPP_AABBNode();
			}
			this.treeStack.add(this.stree.root);
			while(this.treeStack.head != null) {
				let node = this.treeStack.pop_unsafe();
				let _this = node.aabb;
				if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
					if(node.child1 == null) {
						let tmp;
						if(filter != null) {
							let _this = node.shape.filter;
							tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
						} else {
							tmp = true;
						}
						if(tmp) {
							if(containment) {
								if(ZPP_Collide.containTest(shp,node.shape)) {
									ret.push(node.shape.outer);
								}
							} else if(ZPP_Collide.testCollide_safe(node.shape,shp)) {
								ret.push(node.shape.outer);
							}
						}
					} else {
						if(node.child1 != null) {
							this.treeStack.add(node.child1);
						}
						if(node.child2 != null) {
							this.treeStack.add(node.child2);
						}
					}
				}
			}
		}
		if(this.dtree.root != null) {
			if(this.treeStack == null) {
				this.treeStack = new ZNPList_ZPP_AABBNode();
			}
			this.treeStack.add(this.dtree.root);
			while(this.treeStack.head != null) {
				let node = this.treeStack.pop_unsafe();
				let _this = node.aabb;
				if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
					if(node.child1 == null) {
						let tmp;
						if(filter != null) {
							let _this = node.shape.filter;
							tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
						} else {
							tmp = true;
						}
						if(tmp) {
							if(containment) {
								if(ZPP_Collide.containTest(shp,node.shape)) {
									ret.push(node.shape.outer);
								}
							} else if(ZPP_Collide.testCollide_safe(node.shape,shp)) {
								ret.push(node.shape.outer);
							}
						}
					} else {
						if(node.child1 != null) {
							this.treeStack.add(node.child1);
						}
						if(node.child2 != null) {
							this.treeStack.add(node.child2);
						}
					}
				}
			}
		}
		return ret;
	}
	bodiesInShape(shp,containment,filter,output) {
		this.sync_broadphase();
		this.validateShape(shp);
		let ab = shp.aabb;
		let ret = output == null ? new BodyList() : output;
		if(this.failed == null) {
			this.failed = new BodyList();
		}
		if(this.stree.root != null) {
			if(this.treeStack == null) {
				this.treeStack = new ZNPList_ZPP_AABBNode();
			}
			this.treeStack.add(this.stree.root);
			while(this.treeStack.head != null) {
				let node = this.treeStack.pop_unsafe();
				let _this = node.aabb;
				if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
					if(node.child1 == null) {
						let body = node.shape.body.outer;
						let tmp;
						if(filter != null) {
							let _this = node.shape.filter;
							tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
						} else {
							tmp = true;
						}
						if(tmp) {
							if(containment) {
								if(!this.failed.has(body)) {
									let col = ZPP_Collide.containTest(shp,node.shape);
									if(!ret.has(body) && col) {
										ret.push(body);
									} else if(!col) {
										ret.remove(body);
										this.failed.push(body);
									}
								}
							} else if(!ret.has(body) && ZPP_Collide.testCollide_safe(node.shape,shp)) {
								ret.push(body);
							}
						}
					} else {
						if(node.child1 != null) {
							this.treeStack.add(node.child1);
						}
						if(node.child2 != null) {
							this.treeStack.add(node.child2);
						}
					}
				}
			}
		}
		if(this.dtree.root != null) {
			if(this.treeStack == null) {
				this.treeStack = new ZNPList_ZPP_AABBNode();
			}
			this.treeStack.add(this.dtree.root);
			while(this.treeStack.head != null) {
				let node = this.treeStack.pop_unsafe();
				let _this = node.aabb;
				if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
					if(node.child1 == null) {
						let body = node.shape.body.outer;
						let tmp;
						if(filter != null) {
							let _this = node.shape.filter;
							tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
						} else {
							tmp = true;
						}
						if(tmp) {
							if(containment) {
								if(!this.failed.has(body)) {
									let col = ZPP_Collide.containTest(shp,node.shape);
									if(!ret.has(body) && col) {
										ret.push(body);
									} else if(!col) {
										ret.remove(body);
										this.failed.push(body);
									}
								}
							} else if(!ret.has(body) && ZPP_Collide.testCollide_safe(node.shape,shp)) {
								ret.push(body);
							}
						}
					} else {
						if(node.child1 != null) {
							this.treeStack.add(node.child1);
						}
						if(node.child2 != null) {
							this.treeStack.add(node.child2);
						}
					}
				}
			}
		}
		this.failed.clear();
		return ret;
	}
	rayCast(ray,inner,filter) {
		if(this.openlist == null) {
			this.openlist = new ZNPList_ZPP_AABBNode();
		}
		this.sync_broadphase();
		ray.validate_dir();
		let mint = ray.maxdist;
		if(this.dtree.root != null) {
			if(ray.aabbtest(this.dtree.root.aabb)) {
				let t = ray.aabbsect(this.dtree.root.aabb);
				if(t >= 0 && t < mint) {
					this.dtree.root.rayt = t;
					let pre = null;
					let cx_ite = this.openlist.head;
					while(cx_ite != null) {
						let j = cx_ite.elt;
						if(this.dtree.root.rayt < j.rayt) {
							break;
						}
						pre = cx_ite;
						cx_ite = cx_ite.next;
					}
					let _this = this.openlist;
					let o = this.dtree.root;
					let ret;
					if(ZNPNode_ZPP_AABBNode.zpp_pool == null) {
						ret = new ZNPNode_ZPP_AABBNode();
					} else {
						ret = ZNPNode_ZPP_AABBNode.zpp_pool;
						ZNPNode_ZPP_AABBNode.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = o;
					let temp = ret;
					if(pre == null) {
						temp.next = _this.head;
						_this.head = temp;
					} else {
						temp.next = pre.next;
						pre.next = temp;
					}
					_this.pushmod = _this.modified = true;
					_this.length++;
				}
			}
		}
		if(this.stree.root != null) {
			if(ray.aabbtest(this.stree.root.aabb)) {
				let t = ray.aabbsect(this.stree.root.aabb);
				if(t >= 0 && t < mint) {
					this.stree.root.rayt = t;
					let pre = null;
					let cx_ite = this.openlist.head;
					while(cx_ite != null) {
						let j = cx_ite.elt;
						if(this.stree.root.rayt < j.rayt) {
							break;
						}
						pre = cx_ite;
						cx_ite = cx_ite.next;
					}
					let _this = this.openlist;
					let o = this.stree.root;
					let ret;
					if(ZNPNode_ZPP_AABBNode.zpp_pool == null) {
						ret = new ZNPNode_ZPP_AABBNode();
					} else {
						ret = ZNPNode_ZPP_AABBNode.zpp_pool;
						ZNPNode_ZPP_AABBNode.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = o;
					let temp = ret;
					if(pre == null) {
						temp.next = _this.head;
						_this.head = temp;
					} else {
						temp.next = pre.next;
						pre.next = temp;
					}
					_this.pushmod = _this.modified = true;
					_this.length++;
				}
			}
		}
		let minres = null;
		while(this.openlist.head != null) {
			let cnode = this.openlist.pop_unsafe();
			if(cnode.rayt >= mint) {
				break;
			}
			if(cnode.child1 == null) {
				let shape = cnode.shape;
				let tmp;
				if(filter != null) {
					let _this = shape.filter;
					tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
				} else {
					tmp = true;
				}
				if(tmp) {
					let result = shape.type == ZPP_Flags.id_ShapeType_CIRCLE ? ray.circlesect(shape.circle,inner,mint) : ray.aabbtest(shape.aabb) ? ray.polysect(shape.polygon,inner,mint) : null;
					if(result != null) {
						if(result.zpp_inner.next != null) {
							throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
						}
						mint = result.zpp_inner.toiDistance;
						if(minres != null) {
							if(minres.zpp_inner.next != null) {
								throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
							}
							minres.zpp_inner.free();
						}
						minres = result;
					}
				}
			} else {
				if(cnode.child1 != null) {
					if(ray.aabbtest(cnode.child1.aabb)) {
						let t = ray.aabbsect(cnode.child1.aabb);
						if(t >= 0 && t < mint) {
							cnode.child1.rayt = t;
							let pre = null;
							let cx_ite = this.openlist.head;
							while(cx_ite != null) {
								let j = cx_ite.elt;
								if(cnode.child1.rayt < j.rayt) {
									break;
								}
								pre = cx_ite;
								cx_ite = cx_ite.next;
							}
							let _this = this.openlist;
							let o = cnode.child1;
							let ret;
							if(ZNPNode_ZPP_AABBNode.zpp_pool == null) {
								ret = new ZNPNode_ZPP_AABBNode();
							} else {
								ret = ZNPNode_ZPP_AABBNode.zpp_pool;
								ZNPNode_ZPP_AABBNode.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = o;
							let temp = ret;
							if(pre == null) {
								temp.next = _this.head;
								_this.head = temp;
							} else {
								temp.next = pre.next;
								pre.next = temp;
							}
							_this.pushmod = _this.modified = true;
							_this.length++;
						}
					}
				}
				if(cnode.child2 != null) {
					if(ray.aabbtest(cnode.child2.aabb)) {
						let t = ray.aabbsect(cnode.child2.aabb);
						if(t >= 0 && t < mint) {
							cnode.child2.rayt = t;
							let pre = null;
							let cx_ite = this.openlist.head;
							while(cx_ite != null) {
								let j = cx_ite.elt;
								if(cnode.child2.rayt < j.rayt) {
									break;
								}
								pre = cx_ite;
								cx_ite = cx_ite.next;
							}
							let _this = this.openlist;
							let o = cnode.child2;
							let ret;
							if(ZNPNode_ZPP_AABBNode.zpp_pool == null) {
								ret = new ZNPNode_ZPP_AABBNode();
							} else {
								ret = ZNPNode_ZPP_AABBNode.zpp_pool;
								ZNPNode_ZPP_AABBNode.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = o;
							let temp = ret;
							if(pre == null) {
								temp.next = _this.head;
								_this.head = temp;
							} else {
								temp.next = pre.next;
								pre.next = temp;
							}
							_this.pushmod = _this.modified = true;
							_this.length++;
						}
					}
				}
			}
		}
		this.openlist.clear();
		return minres;
	}
	rayMultiCast(ray,inner,filter,output) {
		if(this.openlist == null) {
			this.openlist = new ZNPList_ZPP_AABBNode();
		}
		this.sync_broadphase();
		ray.validate_dir();
		let inf = ray.maxdist >= Infinity;
		let ret = output == null ? new RayResultList() : output;
		if(this.dtree.root != null) {
			if(ray.aabbtest(this.dtree.root.aabb)) {
				if(inf) {
					this.openlist.add(this.dtree.root);
				} else {
					let t = ray.aabbsect(this.dtree.root.aabb);
					if(t >= 0 && t < ray.maxdist) {
						this.openlist.add(this.dtree.root);
					}
				}
			}
		}
		if(this.stree.root != null) {
			if(ray.aabbtest(this.stree.root.aabb)) {
				if(inf) {
					this.openlist.add(this.stree.root);
				} else {
					let t = ray.aabbsect(this.stree.root.aabb);
					if(t >= 0 && t < ray.maxdist) {
						this.openlist.add(this.stree.root);
					}
				}
			}
		}
		while(this.openlist.head != null) {
			let cnode = this.openlist.pop_unsafe();
			if(cnode.child1 == null) {
				let shape = cnode.shape;
				let tmp;
				if(filter != null) {
					let _this = shape.filter;
					tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
				} else {
					tmp = true;
				}
				if(tmp) {
					if(shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
						ray.circlesect2(shape.circle,inner,ret);
					} else if(ray.aabbtest(shape.aabb)) {
						ray.polysect2(shape.polygon,inner,ret);
					}
				}
			} else {
				if(cnode.child1 != null) {
					if(ray.aabbtest(cnode.child1.aabb)) {
						if(inf) {
							this.openlist.add(cnode.child1);
						} else {
							let t = ray.aabbsect(cnode.child1.aabb);
							if(t >= 0 && t < ray.maxdist) {
								this.openlist.add(cnode.child1);
							}
						}
					}
				}
				if(cnode.child2 != null) {
					if(ray.aabbtest(cnode.child2.aabb)) {
						if(inf) {
							this.openlist.add(cnode.child2);
						} else {
							let t = ray.aabbsect(cnode.child2.aabb);
							if(t >= 0 && t < ray.maxdist) {
								this.openlist.add(cnode.child2);
							}
						}
					}
				}
			}
		}
		this.openlist.clear();
		return ret;
	}
}
ZPP_DynAABBPhase.FATTEN = 3.0;
ZPP_DynAABBPhase.VEL_STEPS = 2.0;
