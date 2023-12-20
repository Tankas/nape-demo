import ZPP_AABBNode from './ZPP_AABBNode.js';
import ZPP_AABB from '../geom/ZPP_AABB.js';
export default class ZPP_AABBTree {
	constructor() {
		this.root = null;
	}
	clear() {
		if(this.root == null) {
			return;
		}
		let stack = null;
		this.root.next = stack;
		stack = this.root;
		while(stack != null) {
			let ret = stack;
			stack = ret.next;
			ret.next = null;
			let node = ret;
			if(node.child1 == null) {
				node.shape.node = null;
				node.shape.removedFromSpace();
				node.shape = null;
			} else {
				if(node.child1 != null) {
					node.child1.next = stack;
					stack = node.child1;
				}
				if(node.child2 != null) {
					node.child2.next = stack;
					stack = node.child2;
				}
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
		this.root = null;
	}
	insertLeaf(leaf) {
		if(this.root == null) {
			this.root = leaf;
			this.root.parent = null;
		} else {
			let leafaabb = leaf.aabb;
			let node = this.root;
			while(node.child1 != null) {
				let child1 = node.child1;
				let child2 = node.child2;
				let _this = node.aabb;
				let area = (_this.maxx - _this.minx + (_this.maxy - _this.miny)) * 2;
				let _this1 = ZPP_AABBTree.tmpaabb;
				let a = node.aabb;
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
					node = cost1 < cost2 ? child1 : child2;
				}
			}
			let sibling = node;
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
				nparent.child2 = leaf;
				sibling.parent = nparent;
				leaf.parent = nparent;
			} else {
				nparent.child1 = sibling;
				nparent.child2 = leaf;
				sibling.parent = nparent;
				leaf.parent = nparent;
				this.root = nparent;
			}
			node = leaf.parent;
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
							this.root = c;
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
							this.root = b;
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
				let x = child1.height;
				let y = child2.height;
				node.height = 1 + (x > y ? x : y);
				let _this = node.aabb;
				let a = child1.aabb;
				let b = child2.aabb;
				_this.minx = a.minx < b.minx ? a.minx : b.minx;
				_this.miny = a.miny < b.miny ? a.miny : b.miny;
				_this.maxx = a.maxx > b.maxx ? a.maxx : b.maxx;
				_this.maxy = a.maxy > b.maxy ? a.maxy : b.maxy;
				node = node.parent;
			}
		}
	}
	inlined_insertLeaf(leaf) {
		if(this.root == null) {
			this.root = leaf;
			this.root.parent = null;
		} else {
			let leafaabb = leaf.aabb;
			let node = this.root;
			while(node.child1 != null) {
				let child1 = node.child1;
				let child2 = node.child2;
				let _this = node.aabb;
				let area = (_this.maxx - _this.minx + (_this.maxy - _this.miny)) * 2;
				let _this1 = ZPP_AABBTree.tmpaabb;
				let a = node.aabb;
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
					node = cost1 < cost2 ? child1 : child2;
				}
			}
			let sibling = node;
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
				nparent.child2 = leaf;
				sibling.parent = nparent;
				leaf.parent = nparent;
			} else {
				nparent.child1 = sibling;
				nparent.child2 = leaf;
				sibling.parent = nparent;
				leaf.parent = nparent;
				this.root = nparent;
			}
			node = leaf.parent;
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
							this.root = c;
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
							this.root = b;
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
				let x = child1.height;
				let y = child2.height;
				node.height = 1 + (x > y ? x : y);
				let _this = node.aabb;
				let a = child1.aabb;
				let b = child2.aabb;
				_this.minx = a.minx < b.minx ? a.minx : b.minx;
				_this.miny = a.miny < b.miny ? a.miny : b.miny;
				_this.maxx = a.maxx > b.maxx ? a.maxx : b.maxx;
				_this.maxy = a.maxy > b.maxy ? a.maxy : b.maxy;
				node = node.parent;
			}
		}
	}
	removeLeaf(leaf) {
		if(leaf == this.root) {
			this.root = null;
		} else {
			let parent = leaf.parent;
			let gparent = parent.parent;
			let sibling = parent.child1 == leaf ? parent.child2 : parent.child1;
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
								this.root = c;
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
								this.root = b;
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
				this.root = sibling;
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
	}
	inlined_removeLeaf(leaf) {
		if(leaf == this.root) {
			this.root = null;
			return;
		} else {
			let parent = leaf.parent;
			let gparent = parent.parent;
			let sibling = parent.child1 == leaf ? parent.child2 : parent.child1;
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
								this.root = c;
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
								this.root = b;
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
				this.root = sibling;
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
	}
	balance(a) {
		if(a.child1 == null || a.height < 2) {
			return a;
		} else {
			let b = a.child1;
			let c = a.child2;
			let balance = c.height - b.height;
			if(balance > 1) {
				let f = c.child1;
				let g = c.child2;
				c.child1 = a;
				c.parent = a.parent;
				a.parent = c;
				if(c.parent != null) {
					if(c.parent.child1 == a) {
						c.parent.child1 = c;
					} else {
						c.parent.child2 = c;
					}
				} else {
					this.root = c;
				}
				if(f.height > g.height) {
					c.child2 = f;
					a.child2 = g;
					g.parent = a;
					let _this = a.aabb;
					let a1 = b.aabb;
					let b1 = g.aabb;
					_this.minx = a1.minx < b1.minx ? a1.minx : b1.minx;
					_this.miny = a1.miny < b1.miny ? a1.miny : b1.miny;
					_this.maxx = a1.maxx > b1.maxx ? a1.maxx : b1.maxx;
					_this.maxy = a1.maxy > b1.maxy ? a1.maxy : b1.maxy;
					let _this1 = c.aabb;
					let a2 = a.aabb;
					let b2 = f.aabb;
					_this1.minx = a2.minx < b2.minx ? a2.minx : b2.minx;
					_this1.miny = a2.miny < b2.miny ? a2.miny : b2.miny;
					_this1.maxx = a2.maxx > b2.maxx ? a2.maxx : b2.maxx;
					_this1.maxy = a2.maxy > b2.maxy ? a2.maxy : b2.maxy;
					let x = b.height;
					let y = g.height;
					a.height = 1 + (x > y ? x : y);
					let x1 = a.height;
					let y1 = f.height;
					c.height = 1 + (x1 > y1 ? x1 : y1);
				} else {
					c.child2 = g;
					a.child2 = f;
					f.parent = a;
					let _this = a.aabb;
					let a1 = b.aabb;
					let b1 = f.aabb;
					_this.minx = a1.minx < b1.minx ? a1.minx : b1.minx;
					_this.miny = a1.miny < b1.miny ? a1.miny : b1.miny;
					_this.maxx = a1.maxx > b1.maxx ? a1.maxx : b1.maxx;
					_this.maxy = a1.maxy > b1.maxy ? a1.maxy : b1.maxy;
					let _this1 = c.aabb;
					let a2 = a.aabb;
					let b2 = g.aabb;
					_this1.minx = a2.minx < b2.minx ? a2.minx : b2.minx;
					_this1.miny = a2.miny < b2.miny ? a2.miny : b2.miny;
					_this1.maxx = a2.maxx > b2.maxx ? a2.maxx : b2.maxx;
					_this1.maxy = a2.maxy > b2.maxy ? a2.maxy : b2.maxy;
					let x = b.height;
					let y = f.height;
					a.height = 1 + (x > y ? x : y);
					let x1 = a.height;
					let y1 = g.height;
					c.height = 1 + (x1 > y1 ? x1 : y1);
				}
				return c;
			} else if(balance < -1) {
				let f = b.child1;
				let g = b.child2;
				b.child1 = a;
				b.parent = a.parent;
				a.parent = b;
				if(b.parent != null) {
					if(b.parent.child1 == a) {
						b.parent.child1 = b;
					} else {
						b.parent.child2 = b;
					}
				} else {
					this.root = b;
				}
				if(f.height > g.height) {
					b.child2 = f;
					a.child1 = g;
					g.parent = a;
					let _this = a.aabb;
					let a1 = c.aabb;
					let b1 = g.aabb;
					_this.minx = a1.minx < b1.minx ? a1.minx : b1.minx;
					_this.miny = a1.miny < b1.miny ? a1.miny : b1.miny;
					_this.maxx = a1.maxx > b1.maxx ? a1.maxx : b1.maxx;
					_this.maxy = a1.maxy > b1.maxy ? a1.maxy : b1.maxy;
					let _this1 = b.aabb;
					let a2 = a.aabb;
					let b2 = f.aabb;
					_this1.minx = a2.minx < b2.minx ? a2.minx : b2.minx;
					_this1.miny = a2.miny < b2.miny ? a2.miny : b2.miny;
					_this1.maxx = a2.maxx > b2.maxx ? a2.maxx : b2.maxx;
					_this1.maxy = a2.maxy > b2.maxy ? a2.maxy : b2.maxy;
					let x = c.height;
					let y = g.height;
					a.height = 1 + (x > y ? x : y);
					let x1 = a.height;
					let y1 = f.height;
					b.height = 1 + (x1 > y1 ? x1 : y1);
				} else {
					b.child2 = g;
					a.child1 = f;
					f.parent = a;
					let _this = a.aabb;
					let a1 = c.aabb;
					let b1 = f.aabb;
					_this.minx = a1.minx < b1.minx ? a1.minx : b1.minx;
					_this.miny = a1.miny < b1.miny ? a1.miny : b1.miny;
					_this.maxx = a1.maxx > b1.maxx ? a1.maxx : b1.maxx;
					_this.maxy = a1.maxy > b1.maxy ? a1.maxy : b1.maxy;
					let _this1 = b.aabb;
					let a2 = a.aabb;
					let b2 = g.aabb;
					_this1.minx = a2.minx < b2.minx ? a2.minx : b2.minx;
					_this1.miny = a2.miny < b2.miny ? a2.miny : b2.miny;
					_this1.maxx = a2.maxx > b2.maxx ? a2.maxx : b2.maxx;
					_this1.maxy = a2.maxy > b2.maxy ? a2.maxy : b2.maxy;
					let x = c.height;
					let y = f.height;
					a.height = 1 + (x > y ? x : y);
					let x1 = a.height;
					let y1 = g.height;
					b.height = 1 + (x1 > y1 ? x1 : y1);
				}
				return b;
			} else {
				return a;
			}
		}
	}
}
ZPP_AABBTree.tmpaabb = new ZPP_AABB();
