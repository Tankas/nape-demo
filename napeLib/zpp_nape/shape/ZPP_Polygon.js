import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZPP_EdgeList from '../util/ZPP_EdgeList.js';
import ZPP_MixVec2List from '../util/ZPP_MixVec2List.js';
import ZNPList_ZPP_Edge from '../util/ZNPList_ZPP_Edge.js';
import ZPP_Edge from './ZPP_Edge.js';
import ZPP_Shape from './ZPP_Shape.js';
import ZPP_Interactor from '../phys/ZPP_Interactor.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import ValidationResult from '../../nape/shape/ValidationResult.js';
import Polygon from '../../nape/shape/Polygon.js';
import Vec2 from '../../nape/geom/Vec2.js';
import Config from '../../nape/Config.js';
export default class ZPP_Polygon extends ZPP_Shape {
	constructor() {
		ZPP_Interactor._hx_skip_constructor = true;
		super();
		ZPP_Interactor._hx_skip_constructor = false;
		this._hx_constructor();
	}
	_hx_constructor() {
		this.zip_sanitation = false;
		this.zip_valid = false;
		this.zip_gaxi = false;
		this.zip_gverts = false;
		this.zip_laxi = false;
		this.zip_lverts = false;
		this.reverse_flag = false;
		this.edgeCnt = 0;
		this.wrap_edges = null;
		this.edges = null;
		this.wrap_gverts = null;
		this.gverts = null;
		this.wrap_lverts = null;
		this.lverts = null;
		this.outer_zn = null;
		super._hx_constructor(ZPP_Flags.id_ShapeType_POLYGON);
		this.polygon = this;
		this.lverts = new ZPP_Vec2();
		this.gverts = new ZPP_Vec2();
		this.edges = new ZNPList_ZPP_Edge();
		this.edgeCnt = 0;
	}
	__clear() {
	}
	lverts_pa_invalidate(x) {
		this.invalidate_lverts();
	}
	lverts_pa_immutable() {
		if(this.body != null && this.body.type == ZPP_Flags.id_BodyType_STATIC && this.body.space != null) {
			throw haxe_Exception.thrown("Error: Cannot modify local vertex of Polygon added to a static body whilst within a Space");
		}
	}
	gverts_pa_validate() {
		if(this.body == null) {
			throw haxe_Exception.thrown("Error: World vertex only makes sense when Polygon is contained in a rigid body");
		}
		if(this.zip_gverts) {
			if(this.body != null) {
				this.zip_gverts = false;
				this.validate_lverts();
				let _this = this.body;
				if(_this.zip_axis) {
					_this.zip_axis = false;
					_this.axisx = Math.sin(_this.rot);
					_this.axisy = Math.cos(_this.rot);
				}
				let li = this.lverts.next;
				let cx_ite = this.gverts.next;
				while(cx_ite != null) {
					let g = cx_ite;
					let l = li;
					li = li.next;
					g.x = this.body.posx + (this.body.axisy * l.x - this.body.axisx * l.y);
					g.y = this.body.posy + (l.x * this.body.axisx + l.y * this.body.axisy);
					cx_ite = cx_ite.next;
				}
			}
		}
	}
	lverts_post_adder(x) {
		x.zpp_inner._invalidate = $bind(this,this.lverts_pa_invalidate);
		x.zpp_inner._isimmutable = $bind(this,this.lverts_pa_immutable);
		let ite = null;
		let ite2 = null;
		let cx_ite = this.lverts.next;
		while(cx_ite != null) {
			let i = cx_ite;
			if(i == x.zpp_inner) {
				break;
			} else {
				ite = ite == null ? this.gverts.next : ite.next;
				ite2 = ite2 == null ? this.edges.head : ite2.next;
			}
			cx_ite = cx_ite.next;
		}
		let immutable = true;
		if(immutable == null) {
			immutable = false;
		}
		let ret;
		if(ZPP_Vec2.zpp_pool == null) {
			ret = new ZPP_Vec2();
		} else {
			ret = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.weak = false;
		ret._immutable = immutable;
		ret.x = 0;
		ret.y = 0;
		let vec = ret;
		this.gverts.insert(ite,vec);
		if(this.lverts.next.next != null) {
			if(this.lverts.next.next.next == null) {
				let ed;
				if(ZPP_Edge.zpp_pool == null) {
					ed = new ZPP_Edge();
				} else {
					ed = ZPP_Edge.zpp_pool;
					ZPP_Edge.zpp_pool = ed.next;
					ed.next = null;
				}
				ed.polygon = this;
				this.edges.add(ed);
				let ed1;
				if(ZPP_Edge.zpp_pool == null) {
					ed1 = new ZPP_Edge();
				} else {
					ed1 = ZPP_Edge.zpp_pool;
					ZPP_Edge.zpp_pool = ed1.next;
					ed1.next = null;
				}
				ed1.polygon = this;
				this.edges.add(ed1);
				this.edgeCnt += 2;
			} else {
				let ed;
				if(ZPP_Edge.zpp_pool == null) {
					ed = new ZPP_Edge();
				} else {
					ed = ZPP_Edge.zpp_pool;
					ZPP_Edge.zpp_pool = ed.next;
					ed.next = null;
				}
				ed.polygon = this;
				this.edges.insert(ite2,ed);
				this.edgeCnt++;
			}
		}
		vec._validate = $bind(this,this.gverts_pa_validate);
	}
	lverts_subber(x) {
		this.cleanup_lvert(x.zpp_inner);
	}
	lverts_invalidate(_) {
		this.invalidate_lverts();
	}
	lverts_validate() {
		this.validate_lverts();
	}
	lverts_modifiable() {
		this.immutable_midstep("Polygon::localVerts");
		if(this.body != null && this.body.type == ZPP_Flags.id_BodyType_STATIC && this.body.space != null) {
			throw haxe_Exception.thrown("Error: Cannot modifiy shapes of static object once added to Space");
		}
	}
	gverts_validate() {
		if(this.zip_gverts) {
			if(this.body != null) {
				this.zip_gverts = false;
				this.validate_lverts();
				let _this = this.body;
				if(_this.zip_axis) {
					_this.zip_axis = false;
					_this.axisx = Math.sin(_this.rot);
					_this.axisy = Math.cos(_this.rot);
				}
				let li = this.lverts.next;
				let cx_ite = this.gverts.next;
				while(cx_ite != null) {
					let g = cx_ite;
					let l = li;
					li = li.next;
					g.x = this.body.posx + (this.body.axisy * l.x - this.body.axisx * l.y);
					g.y = this.body.posy + (l.x * this.body.axisx + l.y * this.body.axisy);
					cx_ite = cx_ite.next;
				}
			}
		}
	}
	edges_validate() {
		this.validate_lverts();
	}
	getlverts() {
		let me = this;
		this.wrap_lverts = ZPP_MixVec2List.get(this.lverts);
		this.wrap_lverts.zpp_inner.post_adder = $bind(this,this.lverts_post_adder);
		this.wrap_lverts.zpp_inner.subber = $bind(this,this.lverts_subber);
		this.wrap_lverts.zpp_inner._invalidate = $bind(this,this.lverts_invalidate);
		this.wrap_lverts.zpp_inner._validate = $bind(this,this.lverts_validate);
		this.wrap_lverts.zpp_inner._modifiable = $bind(this,this.lverts_modifiable);
		this.wrap_lverts.zpp_inner.reverse_flag = this.reverse_flag;
	}
	getgverts() {
		let me = this;
		this.wrap_gverts = ZPP_MixVec2List.get(this.gverts,true);
		this.wrap_gverts.zpp_inner.reverse_flag = this.reverse_flag;
		this.wrap_gverts.zpp_inner._validate = $bind(this,this.gverts_validate);
	}
	getedges() {
		let me = this;
		this.wrap_edges = ZPP_EdgeList.get(this.edges,true);
		this.wrap_edges.zpp_inner.reverse_flag = this.reverse_flag;
		this.wrap_edges.zpp_inner._validate = $bind(this,this.edges_validate);
	}
	invalidate_lverts() {
		this.invalidate_laxi();
		this.invalidate_area_inertia();
		this.invalidate_angDrag();
		this.invalidate_localCOM();
		this.invalidate_gverts();
		this.zip_lverts = true;
		this.zip_valid = true;
		this.zip_sanitation = true;
		if(this.body != null) {
			this.body.wake();
		}
	}
	invalidate_laxi() {
		this.invalidate_gaxi();
		this.zip_sweepRadius = true;
		this.zip_laxi = true;
	}
	invalidate_gverts() {
		this.zip_aabb = true;
		if(this.body != null) {
			this.body.zip_aabb = true;
		}
		this.zip_gverts = true;
	}
	invalidate_gaxi() {
		this.zip_gaxi = true;
	}
	valid() {
		if(this.zip_valid) {
			this.zip_valid = false;
			if(this.zip_sanitation) {
				this.zip_sanitation = false;
				this.splice_collinear_real();
			}
			if(this.lverts.length < 3) {
				if(ZPP_Flags.ValidationResult_DEGENERATE == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.ValidationResult_DEGENERATE = new ValidationResult();
					ZPP_Flags.internal = false;
				}
				return this.validation = ZPP_Flags.ValidationResult_DEGENERATE;
			} else {
				this.validate_lverts();
				this.validate_area_inertia();
				if(this.area < Config.epsilon) {
					if(ZPP_Flags.ValidationResult_DEGENERATE == null) {
						ZPP_Flags.internal = true;
						ZPP_Flags.ValidationResult_DEGENERATE = new ValidationResult();
						ZPP_Flags.internal = false;
					}
					return this.validation = ZPP_Flags.ValidationResult_DEGENERATE;
				} else {
					let neg = false;
					let pos = false;
					let cx_cont = true;
					let cx_ite = this.lverts.next;
					let u = cx_ite;
					cx_ite = cx_ite.next;
					let v = cx_ite;
					cx_ite = cx_ite.next;
					while(cx_ite != null) {
						let w = cx_ite;
						let ax = 0.0;
						let ay = 0.0;
						ax = w.x - v.x;
						ay = w.y - v.y;
						let bx = 0.0;
						let by = 0.0;
						bx = v.x - u.x;
						by = v.y - u.y;
						let dot = by * ax - bx * ay;
						if(dot > Config.epsilon) {
							pos = true;
						} else if(dot < -Config.epsilon) {
							neg = true;
						}
						if(pos && neg) {
							cx_cont = false;
							break;
						}
						u = v;
						v = w;
						cx_ite = cx_ite.next;
					}
					if(cx_cont) {
						cx_ite = this.lverts.next;
						let w = cx_ite;
						while(true) {
							let ax = 0.0;
							let ay = 0.0;
							ax = w.x - v.x;
							ay = w.y - v.y;
							let bx = 0.0;
							let by = 0.0;
							bx = v.x - u.x;
							by = v.y - u.y;
							let dot = by * ax - bx * ay;
							if(dot > Config.epsilon) {
								pos = true;
							} else if(dot < -Config.epsilon) {
								neg = true;
							}
							if(pos && neg) {
								cx_cont = false;
								break;
							}
							if(!false) {
								break;
							}
						}
						if(cx_cont) {
							u = v;
							v = w;
							cx_ite = cx_ite.next;
							let w1 = cx_ite;
							while(true) {
								let ax = 0.0;
								let ay = 0.0;
								ax = w1.x - v.x;
								ay = w1.y - v.y;
								let bx = 0.0;
								let by = 0.0;
								bx = v.x - u.x;
								by = v.y - u.y;
								let dot = by * ax - bx * ay;
								if(dot > Config.epsilon) {
									pos = true;
								} else if(dot < -Config.epsilon) {
									neg = true;
								}
								if(pos && neg) {
									break;
								}
								if(!false) {
									break;
								}
							}
						}
					}
					if(pos && neg) {
						if(ZPP_Flags.ValidationResult_CONCAVE == null) {
							ZPP_Flags.internal = true;
							ZPP_Flags.ValidationResult_CONCAVE = new ValidationResult();
							ZPP_Flags.internal = false;
						}
						return this.validation = ZPP_Flags.ValidationResult_CONCAVE;
					} else {
						let cont = true;
						let cx_cont = true;
						let cx_ite = this.lverts.next;
						let u = cx_ite;
						cx_ite = cx_ite.next;
						while(cx_ite != null) {
							let v = cx_ite;
							if(!cont) {
								cx_cont = false;
								break;
							}
							let cx_cont1 = true;
							let cx_ite1 = this.lverts.next;
							let a = cx_ite1;
							cx_ite1 = cx_ite1.next;
							while(cx_ite1 != null) {
								let b = cx_ite1;
								if(u == a || u == b || v == a || v == b) {
									a = b;
									cx_ite1 = cx_ite1.next;
									continue;
								}
								let sx = 0.0;
								let sy = 0.0;
								sx = u.x - a.x;
								sy = u.y - a.y;
								let vx = 0.0;
								let vy = 0.0;
								vx = v.x - u.x;
								vy = v.y - u.y;
								let qx = 0.0;
								let qy = 0.0;
								qx = b.x - a.x;
								qy = b.y - a.y;
								let den = vy * qx - vx * qy;
								if(den * den > Config.epsilon) {
									den = 1 / den;
									let t = (qy * sx - qx * sy) * den;
									if(t > Config.epsilon && t < 1 - Config.epsilon) {
										let s = (vy * sx - vx * sy) * den;
										if(s > Config.epsilon && s < 1 - Config.epsilon) {
											cont = false;
											cx_cont1 = false;
											break;
										}
									}
								}
								a = b;
								cx_ite1 = cx_ite1.next;
							}
							if(cx_cont1) {
								while(true) {
									let b = this.lverts.next;
									if(u == a || u == b || v == a || v == b) {
										break;
									}
									let sx = 0.0;
									let sy = 0.0;
									sx = u.x - a.x;
									sy = u.y - a.y;
									let vx = 0.0;
									let vy = 0.0;
									vx = v.x - u.x;
									vy = v.y - u.y;
									let qx = 0.0;
									let qy = 0.0;
									qx = b.x - a.x;
									qy = b.y - a.y;
									let den = vy * qx - vx * qy;
									if(den * den > Config.epsilon) {
										den = 1 / den;
										let t = (qy * sx - qx * sy) * den;
										if(t > Config.epsilon && t < 1 - Config.epsilon) {
											let s = (vy * sx - vx * sy) * den;
											if(s > Config.epsilon && s < 1 - Config.epsilon) {
												cont = false;
												break;
											}
										}
									}
									if(!false) {
										break;
									}
								}
							}
							u = v;
							cx_ite = cx_ite.next;
						}
						if(cx_cont) {
							while(true) {
								let v = this.lverts.next;
								if(!cont) {
									break;
								}
								let cx_cont = true;
								let cx_ite = this.lverts.next;
								let a = cx_ite;
								cx_ite = cx_ite.next;
								while(cx_ite != null) {
									let b = cx_ite;
									if(u == a || u == b || v == a || v == b) {
										a = b;
										cx_ite = cx_ite.next;
										continue;
									}
									let sx = 0.0;
									let sy = 0.0;
									sx = u.x - a.x;
									sy = u.y - a.y;
									let vx = 0.0;
									let vy = 0.0;
									vx = v.x - u.x;
									vy = v.y - u.y;
									let qx = 0.0;
									let qy = 0.0;
									qx = b.x - a.x;
									qy = b.y - a.y;
									let den = vy * qx - vx * qy;
									if(den * den > Config.epsilon) {
										den = 1 / den;
										let t = (qy * sx - qx * sy) * den;
										if(t > Config.epsilon && t < 1 - Config.epsilon) {
											let s = (vy * sx - vx * sy) * den;
											if(s > Config.epsilon && s < 1 - Config.epsilon) {
												cont = false;
												cx_cont = false;
												break;
											}
										}
									}
									a = b;
									cx_ite = cx_ite.next;
								}
								if(cx_cont) {
									while(true) {
										let b = this.lverts.next;
										if(u == a || u == b || v == a || v == b) {
											break;
										}
										let sx = 0.0;
										let sy = 0.0;
										sx = u.x - a.x;
										sy = u.y - a.y;
										let vx = 0.0;
										let vy = 0.0;
										vx = v.x - u.x;
										vy = v.y - u.y;
										let qx = 0.0;
										let qy = 0.0;
										qx = b.x - a.x;
										qy = b.y - a.y;
										let den = vy * qx - vx * qy;
										if(den * den > Config.epsilon) {
											den = 1 / den;
											let t = (qy * sx - qx * sy) * den;
											if(t > Config.epsilon && t < 1 - Config.epsilon) {
												let s = (vy * sx - vx * sy) * den;
												if(s > Config.epsilon && s < 1 - Config.epsilon) {
													cont = false;
													break;
												}
											}
										}
										if(!false) {
											break;
										}
									}
								}
								if(!false) {
									break;
								}
							}
						}
						if(!cont) {
							if(ZPP_Flags.ValidationResult_SELF_INTERSECTING == null) {
								ZPP_Flags.internal = true;
								ZPP_Flags.ValidationResult_SELF_INTERSECTING = new ValidationResult();
								ZPP_Flags.internal = false;
							}
							return this.validation = ZPP_Flags.ValidationResult_SELF_INTERSECTING;
						} else {
							if(ZPP_Flags.ValidationResult_VALID == null) {
								ZPP_Flags.internal = true;
								ZPP_Flags.ValidationResult_VALID = new ValidationResult();
								ZPP_Flags.internal = false;
							}
							return this.validation = ZPP_Flags.ValidationResult_VALID;
						}
					}
				}
			}
		} else {
			return this.validation;
		}
	}
	validate_lverts() {
		if(this.zip_lverts) {
			this.zip_lverts = false;
			if(this.lverts.length > 2) {
				this.validate_area_inertia();
				if(this.area < 0) {
					this.reverse_vertices();
					this.area = -this.area;
				}
			}
		}
	}
	cleanup_lvert(x) {
		let ite = null;
		let ite2 = null;
		let cx_ite = this.lverts.next;
		while(cx_ite != null) {
			let i = cx_ite;
			if(i == x) {
				break;
			} else {
				ite = ite == null ? this.gverts.next : ite.next;
				ite2 = ite2 == null ? this.edges.head : ite2.next;
			}
			cx_ite = cx_ite.next;
		}
		let rem = ite == null ? this.gverts.next : ite.next;
		this.gverts.erase(ite);
		let o = rem;
		if(o.outer != null) {
			o.outer.zpp_inner = null;
			o.outer = null;
		}
		o._isimmutable = null;
		o._validate = null;
		o._invalidate = null;
		o.next = ZPP_Vec2.zpp_pool;
		ZPP_Vec2.zpp_pool = o;
		if(this.edgeCnt == 2) {
			let rem = this.edges.pop_unsafe();
			let o = rem;
			o.polygon = null;
			o.next = ZPP_Edge.zpp_pool;
			ZPP_Edge.zpp_pool = o;
			rem = this.edges.pop_unsafe();
			let o1 = rem;
			o1.polygon = null;
			o1.next = ZPP_Edge.zpp_pool;
			ZPP_Edge.zpp_pool = o1;
			this.edgeCnt = 0;
		} else if(this.edgeCnt != 0) {
			let rem = ite2 == null ? this.edges.head.elt : ite2.next.elt;
			this.edges.erase(ite2);
			let o = rem;
			o.polygon = null;
			o.next = ZPP_Edge.zpp_pool;
			ZPP_Edge.zpp_pool = o;
			this.edgeCnt--;
		}
	}
	splice_collinear() {
		if(this.zip_sanitation) {
			this.zip_sanitation = false;
			this.splice_collinear_real();
		}
	}
	splice_collinear_real() {
		if(this.lverts.next == null) {
			return;
		}
		if(this.lverts.next.next == null) {
			return;
		}
		if(this.lverts.next.next.next == null) {
			return;
		}
		let pre = null;
		let cur = this.lverts.next;
		while(cur != null) {
			let nxt = cur.next == null ? this.lverts.next : cur.next;
			let u = cur;
			let v = nxt;
			let dx = 0.0;
			let dy = 0.0;
			dx = u.x - v.x;
			dy = u.y - v.y;
			if(dx * dx + dy * dy < Config.epsilon * Config.epsilon) {
				this.cleanup_lvert(cur);
				cur = this.lverts.erase(pre);
			} else {
				pre = cur;
				cur = cur.next;
			}
		}
		if(this.lverts.next == null) {
			return;
		}
		let removed;
		while(true) {
			removed = false;
			let pre = this.lverts.next;
			while(pre != null) {
				let cur = pre.next == null ? this.lverts.next : pre.next;
				let nxt = cur.next == null ? this.lverts.next : cur.next;
				let u = pre;
				let v = cur;
				let w = nxt;
				let ax = 0.0;
				let ay = 0.0;
				ax = v.x - u.x;
				ay = v.y - u.y;
				let bx = 0.0;
				let by = 0.0;
				bx = w.x - v.x;
				by = w.y - v.y;
				let crs = by * ax - bx * ay;
				if(crs * crs >= Config.epsilon * Config.epsilon) {
					pre = pre.next;
				} else {
					this.cleanup_lvert(cur);
					this.lverts.erase(pre.next == null ? null : pre);
					removed = true;
					pre = pre.next;
				}
			}
			if(!removed) {
				break;
			}
		}
	}
	reverse_vertices() {
		this.lverts.reverse();
		this.gverts.reverse();
		this.edges.reverse();
		let ite = this.edges.iterator_at(this.edgeCnt - 1);
		let elem = this.edges.pop_unsafe();
		this.edges.insert(ite,elem);
		this.reverse_flag = !this.reverse_flag;
		if(this.wrap_lverts != null) {
			this.wrap_lverts.zpp_inner.reverse_flag = this.reverse_flag;
		}
		if(this.wrap_gverts != null) {
			this.wrap_gverts.zpp_inner.reverse_flag = this.reverse_flag;
		}
		if(this.wrap_edges != null) {
			this.wrap_edges.zpp_inner.reverse_flag = this.reverse_flag;
		}
	}
	validate_laxi() {
		if(this.zip_laxi) {
			this.zip_laxi = false;
			this.validate_lverts();
			let ite = this.edges.head;
			let cx_ite = this.lverts.next;
			let u = cx_ite;
			cx_ite = cx_ite.next;
			while(cx_ite != null) {
				let v = cx_ite;
				let edge = ite.elt;
				ite = ite.next;
				edge.lp0 = u;
				edge.lp1 = v;
				let dx = 0.0;
				let dy = 0.0;
				dx = u.x - v.x;
				dy = u.y - v.y;
				let l = Math.sqrt(dx * dx + dy * dy);
				edge.length = l;
				let t = 1.0 / l;
				dx *= t;
				dy *= t;
				let t1 = dx;
				dx = -dy;
				dy = t1;
				edge.lprojection = dx * u.x + dy * u.y;
				edge.lnormx = dx;
				edge.lnormy = dy;
				if(edge.wrap_lnorm != null) {
					edge.wrap_lnorm.zpp_inner.x = dx;
					edge.wrap_lnorm.zpp_inner.y = dy;
				}
				u = v;
				cx_ite = cx_ite.next;
			}
			let v = this.lverts.next;
			let edge = ite.elt;
			ite = ite.next;
			edge.lp0 = u;
			edge.lp1 = v;
			let dx = 0.0;
			let dy = 0.0;
			dx = u.x - v.x;
			dy = u.y - v.y;
			let l = Math.sqrt(dx * dx + dy * dy);
			edge.length = l;
			let t = 1.0 / l;
			dx *= t;
			dy *= t;
			let t1 = dx;
			dx = -dy;
			dy = t1;
			edge.lprojection = dx * u.x + dy * u.y;
			edge.lnormx = dx;
			edge.lnormy = dy;
			if(edge.wrap_lnorm != null) {
				edge.wrap_lnorm.zpp_inner.x = dx;
				edge.wrap_lnorm.zpp_inner.y = dy;
			}
		}
	}
	validate_gverts() {
		if(this.zip_gverts) {
			if(this.body != null) {
				this.zip_gverts = false;
				this.validate_lverts();
				let _this = this.body;
				if(_this.zip_axis) {
					_this.zip_axis = false;
					_this.axisx = Math.sin(_this.rot);
					_this.axisy = Math.cos(_this.rot);
				}
				let li = this.lverts.next;
				let cx_ite = this.gverts.next;
				while(cx_ite != null) {
					let g = cx_ite;
					let l = li;
					li = li.next;
					g.x = this.body.posx + (this.body.axisy * l.x - this.body.axisx * l.y);
					g.y = this.body.posy + (l.x * this.body.axisx + l.y * this.body.axisy);
					cx_ite = cx_ite.next;
				}
			}
		}
	}
	validate_gaxi() {
		if(this.zip_gaxi) {
			if(this.body != null) {
				this.zip_gaxi = false;
				this.validate_laxi();
				let _this = this.body;
				if(_this.zip_axis) {
					_this.zip_axis = false;
					_this.axisx = Math.sin(_this.rot);
					_this.axisy = Math.cos(_this.rot);
				}
				if(this.zip_gverts) {
					if(this.body != null) {
						this.zip_gverts = false;
						this.validate_lverts();
						let _this = this.body;
						if(_this.zip_axis) {
							_this.zip_axis = false;
							_this.axisx = Math.sin(_this.rot);
							_this.axisy = Math.cos(_this.rot);
						}
						let li = this.lverts.next;
						let cx_ite = this.gverts.next;
						while(cx_ite != null) {
							let g = cx_ite;
							let l = li;
							li = li.next;
							g.x = this.body.posx + (this.body.axisy * l.x - this.body.axisx * l.y);
							g.y = this.body.posy + (l.x * this.body.axisx + l.y * this.body.axisy);
							cx_ite = cx_ite.next;
						}
					}
				}
				let ite = this.edges.head;
				let cx_ite = this.gverts.next;
				let u = cx_ite;
				cx_ite = cx_ite.next;
				while(cx_ite != null) {
					let v = cx_ite;
					let e = ite.elt;
					ite = ite.next;
					e.gp0 = u;
					e.gp1 = v;
					e.gnormx = this.body.axisy * e.lnormx - this.body.axisx * e.lnormy;
					e.gnormy = e.lnormx * this.body.axisx + e.lnormy * this.body.axisy;
					e.gprojection = this.body.posx * e.gnormx + this.body.posy * e.gnormy + e.lprojection;
					if(e.wrap_gnorm != null) {
						e.wrap_gnorm.zpp_inner.x = e.gnormx;
						e.wrap_gnorm.zpp_inner.y = e.gnormy;
					}
					e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
					e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
					u = v;
					cx_ite = cx_ite.next;
				}
				let v = this.gverts.next;
				let e = ite.elt;
				ite = ite.next;
				e.gp0 = u;
				e.gp1 = v;
				e.gnormx = this.body.axisy * e.lnormx - this.body.axisx * e.lnormy;
				e.gnormy = e.lnormx * this.body.axisx + e.lnormy * this.body.axisy;
				e.gprojection = this.body.posx * e.gnormx + this.body.posy * e.gnormy + e.lprojection;
				if(e.wrap_gnorm != null) {
					e.wrap_gnorm.zpp_inner.x = e.gnormx;
					e.wrap_gnorm.zpp_inner.y = e.gnormy;
				}
				e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
				e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
			}
		}
	}
	__validate_aabb() {
		if(this.zip_gverts) {
			if(this.body != null) {
				this.zip_gverts = false;
				this.validate_lverts();
				let _this = this.body;
				if(_this.zip_axis) {
					_this.zip_axis = false;
					_this.axisx = Math.sin(_this.rot);
					_this.axisy = Math.cos(_this.rot);
				}
				let li = this.lverts.next;
				let cx_ite = this.gverts.next;
				while(cx_ite != null) {
					let g = cx_ite;
					let l = li;
					li = li.next;
					g.x = this.body.posx + (this.body.axisy * l.x - this.body.axisx * l.y);
					g.y = this.body.posy + (l.x * this.body.axisx + l.y * this.body.axisy);
					cx_ite = cx_ite.next;
				}
			}
		}
		if(this.lverts.next == null) {
			throw haxe_Exception.thrown("Error: An empty polygon has no meaningful bounds");
		}
		let p0 = this.gverts.next;
		this.aabb.minx = p0.x;
		this.aabb.miny = p0.y;
		this.aabb.maxx = p0.x;
		this.aabb.maxy = p0.y;
		let cx_ite = this.gverts.next.next;
		while(cx_ite != null) {
			let p = cx_ite;
			if(p.x < this.aabb.minx) {
				this.aabb.minx = p.x;
			}
			if(p.x > this.aabb.maxx) {
				this.aabb.maxx = p.x;
			}
			if(p.y < this.aabb.miny) {
				this.aabb.miny = p.y;
			}
			if(p.y > this.aabb.maxy) {
				this.aabb.maxy = p.y;
			}
			cx_ite = cx_ite.next;
		}
	}
	_force_validate_aabb() {
		let li = this.lverts.next;
		let p0 = this.gverts.next;
		let l = li;
		li = li.next;
		p0.x = this.body.posx + (this.body.axisy * l.x - this.body.axisx * l.y);
		p0.y = this.body.posy + (l.x * this.body.axisx + l.y * this.body.axisy);
		this.aabb.minx = p0.x;
		this.aabb.miny = p0.y;
		this.aabb.maxx = p0.x;
		this.aabb.maxy = p0.y;
		let cx_ite = this.gverts.next.next;
		while(cx_ite != null) {
			let p = cx_ite;
			let l = li;
			li = li.next;
			p.x = this.body.posx + (this.body.axisy * l.x - this.body.axisx * l.y);
			p.y = this.body.posy + (l.x * this.body.axisx + l.y * this.body.axisy);
			if(p.x < this.aabb.minx) {
				this.aabb.minx = p.x;
			}
			if(p.x > this.aabb.maxx) {
				this.aabb.maxx = p.x;
			}
			if(p.y < this.aabb.miny) {
				this.aabb.miny = p.y;
			}
			if(p.y > this.aabb.maxy) {
				this.aabb.maxy = p.y;
			}
			cx_ite = cx_ite.next;
		}
	}
	__validate_sweepRadius() {
		let maxRadius = 0.0;
		let minRadius = 0.0;
		this.validate_laxi();
		let cx_ite = this.lverts.next;
		while(cx_ite != null) {
			let x = cx_ite;
			let r = x.x * x.x + x.y * x.y;
			if(r > maxRadius) {
				maxRadius = r;
			}
			cx_ite = cx_ite.next;
		}
		let cx_ite1 = this.edges.head;
		while(cx_ite1 != null) {
			let e = cx_ite1.elt;
			if(e.lprojection < minRadius) {
				minRadius = e.lprojection;
				if(minRadius < 0) {
					break;
				}
			}
			cx_ite1 = cx_ite1.next;
		}
		if(minRadius < 0) {
			minRadius = 0;
		}
		this.sweepRadius = Math.sqrt(maxRadius);
		this.sweepCoef = this.sweepRadius - minRadius;
	}
	__validate_area_inertia() {
		if(this.lverts.next == null || this.lverts.next.next == null || this.lverts.next.next.next == null) {
			this.area = 0;
			this.inertia = 0;
		} else {
			this.area = 0.0;
			let s1 = 0.0;
			let s2 = 0.0;
			let cx_ite = this.lverts.next;
			let u = cx_ite;
			cx_ite = cx_ite.next;
			let v = cx_ite;
			cx_ite = cx_ite.next;
			while(cx_ite != null) {
				let w = cx_ite;
				let a = v.y * u.x - v.x * u.y;
				let b = v.x * v.x + v.y * v.y + (v.x * u.x + v.y * u.y) + (u.x * u.x + u.y * u.y);
				s1 += a * b;
				s2 += a;
				this.area += v.x * (w.y - u.y);
				u = v;
				v = w;
				cx_ite = cx_ite.next;
			}
			cx_ite = this.lverts.next;
			let w = cx_ite;
			let a = v.y * u.x - v.x * u.y;
			let b = v.x * v.x + v.y * v.y + (v.x * u.x + v.y * u.y) + (u.x * u.x + u.y * u.y);
			s1 += a * b;
			s2 += a;
			this.area += v.x * (w.y - u.y);
			u = v;
			v = w;
			cx_ite = cx_ite.next;
			let w1 = cx_ite;
			let a1 = v.y * u.x - v.x * u.y;
			let b1 = v.x * v.x + v.y * v.y + (v.x * u.x + v.y * u.y) + (u.x * u.x + u.y * u.y);
			s1 += a1 * b1;
			s2 += a1;
			this.area += v.x * (w1.y - u.y);
			this.inertia = s1 / (6 * s2);
			this.area *= 0.5;
			if(this.area < 0) {
				this.area = -this.area;
				this.reverse_vertices();
			}
		}
	}
	__validate_angDrag() {
		if(this.lverts.length < 3) {
			throw haxe_Exception.thrown("Error: Polygon's with less than 3 vertices have no meaningful angDrag");
		}
		this.validate_area_inertia();
		this.validate_laxi();
		let accum = 0.0;
		let ei = this.edges.head;
		let perim = 0.0;
		let cx_cont = true;
		let cx_itei = this.lverts.next;
		let u = cx_itei;
		let cx_itej = cx_itei.next;
		while(cx_itej != null) {
			let v = cx_itej;
			let edge = ei.elt;
			ei = ei.next;
			perim += edge.length;
			let dx = 0.0;
			let dy = 0.0;
			dx = v.x - u.x;
			dy = v.y - u.y;
			accum += edge.length * Config.fluidAngularDragFriction * this.material.dynamicFriction * edge.lprojection * edge.lprojection;
			let t = -(u.y * edge.lnormx - u.x * edge.lnormy) / (dy * edge.lnormx - dx * edge.lnormy);
			if(t > 0) {
				let ta = t > 1 ? 1 : t;
				let cx = 0.0;
				let cy = 0.0;
				cx = u.x;
				cy = u.y;
				let t1 = ta;
				cx += dx * t1;
				cy += dy * t1;
				let dota = edge.lnormy * u.x - edge.lnormx * u.y;
				let dotb = edge.lnormy * cx - edge.lnormx * cy;
				let dots = (dotb * dotb * dotb - dota * dota * dota) / (3 * (dotb - dota));
				accum += dots * ta * edge.length * Config.fluidAngularDrag;
			}
			if(t < 1) {
				let tb = t < 0 ? 0 : t;
				let cx = 0.0;
				let cy = 0.0;
				cx = u.x;
				cy = u.y;
				let t1 = tb;
				cx += dx * t1;
				cy += dy * t1;
				let dota = edge.lnormy * cx - edge.lnormx * cy;
				let dotb = edge.lnormy * v.x - edge.lnormx * v.y;
				let dots = (dotb * dotb * dotb - dota * dota * dota) / (3 * (dotb - dota));
				accum += dots * Config.fluidVacuumDrag * (1 - tb) * edge.length * Config.fluidAngularDrag;
			}
			cx_itei = cx_itej;
			u = v;
			cx_itej = cx_itej.next;
		}
		if(cx_cont) {
			while(true) {
				cx_itej = this.lverts.next;
				let v = cx_itej;
				let edge = ei.elt;
				ei = ei.next;
				perim += edge.length;
				let dx = 0.0;
				let dy = 0.0;
				dx = v.x - u.x;
				dy = v.y - u.y;
				accum += edge.length * Config.fluidAngularDragFriction * this.material.dynamicFriction * edge.lprojection * edge.lprojection;
				let t = -(u.y * edge.lnormx - u.x * edge.lnormy) / (dy * edge.lnormx - dx * edge.lnormy);
				if(t > 0) {
					let ta = t > 1 ? 1 : t;
					let cx = 0.0;
					let cy = 0.0;
					cx = u.x;
					cy = u.y;
					let t1 = ta;
					cx += dx * t1;
					cy += dy * t1;
					let dota = edge.lnormy * u.x - edge.lnormx * u.y;
					let dotb = edge.lnormy * cx - edge.lnormx * cy;
					let dots = (dotb * dotb * dotb - dota * dota * dota) / (3 * (dotb - dota));
					accum += dots * ta * edge.length * Config.fluidAngularDrag;
				}
				if(t < 1) {
					let tb = t < 0 ? 0 : t;
					let cx = 0.0;
					let cy = 0.0;
					cx = u.x;
					cy = u.y;
					let t1 = tb;
					cx += dx * t1;
					cy += dy * t1;
					let dota = edge.lnormy * cx - edge.lnormx * cy;
					let dotb = edge.lnormy * v.x - edge.lnormx * v.y;
					let dots = (dotb * dotb * dotb - dota * dota * dota) / (3 * (dotb - dota));
					accum += dots * Config.fluidVacuumDrag * (1 - tb) * edge.length * Config.fluidAngularDrag;
				}
				if(!false) {
					break;
				}
			}
		}
		this.angDrag = accum / (this.inertia * perim);
	}
	__validate_localCOM() {
		if(this.lverts.next == null) {
			throw haxe_Exception.thrown("Error: An empty polygon has no meaningful localCOM");
		}
		if(this.lverts.next.next == null) {
			this.localCOMx = this.lverts.next.x;
			this.localCOMy = this.lverts.next.y;
		} else if(this.lverts.next.next.next == null) {
			this.localCOMx = this.lverts.next.x;
			this.localCOMy = this.lverts.next.y;
			let t = 1.0;
			this.localCOMx += this.lverts.next.next.x * t;
			this.localCOMy += this.lverts.next.next.y * t;
			let t1 = 0.5;
			this.localCOMx *= t1;
			this.localCOMy *= t1;
		} else {
			this.localCOMx = 0;
			this.localCOMy = 0;
			let area = 0.0;
			let cx_ite = this.lverts.next;
			let u = cx_ite;
			cx_ite = cx_ite.next;
			let v = cx_ite;
			cx_ite = cx_ite.next;
			while(cx_ite != null) {
				let w = cx_ite;
				area += v.x * (w.y - u.y);
				let cf = w.y * v.x - w.x * v.y;
				this.localCOMx += (v.x + w.x) * cf;
				this.localCOMy += (v.y + w.y) * cf;
				u = v;
				v = w;
				cx_ite = cx_ite.next;
			}
			cx_ite = this.lverts.next;
			let w = cx_ite;
			area += v.x * (w.y - u.y);
			let cf = w.y * v.x - w.x * v.y;
			this.localCOMx += (v.x + w.x) * cf;
			this.localCOMy += (v.y + w.y) * cf;
			u = v;
			v = w;
			cx_ite = cx_ite.next;
			let w1 = cx_ite;
			area += v.x * (w1.y - u.y);
			let cf1 = w1.y * v.x - w1.x * v.y;
			this.localCOMx += (v.x + w1.x) * cf1;
			this.localCOMy += (v.y + w1.y) * cf1;
			area = 1 / (3 * area);
			let t = area;
			this.localCOMx *= t;
			this.localCOMy *= t;
		}
	}
	localCOM_validate() {
		if(this.lverts.next == null) {
			throw haxe_Exception.thrown("Error: An empty polygon does not have any meaningful localCOM");
		}
		if(this.zip_localCOM) {
			this.zip_localCOM = false;
			if(this.type == ZPP_Flags.id_ShapeType_POLYGON) {
				let _this = this.polygon;
				if(_this.lverts.next == null) {
					throw haxe_Exception.thrown("Error: An empty polygon has no meaningful localCOM");
				}
				if(_this.lverts.next.next == null) {
					_this.localCOMx = _this.lverts.next.x;
					_this.localCOMy = _this.lverts.next.y;
				} else if(_this.lverts.next.next.next == null) {
					_this.localCOMx = _this.lverts.next.x;
					_this.localCOMy = _this.lverts.next.y;
					let t = 1.0;
					_this.localCOMx += _this.lverts.next.next.x * t;
					_this.localCOMy += _this.lverts.next.next.y * t;
					let t1 = 0.5;
					_this.localCOMx *= t1;
					_this.localCOMy *= t1;
				} else {
					_this.localCOMx = 0;
					_this.localCOMy = 0;
					let area = 0.0;
					let cx_ite = _this.lverts.next;
					let u = cx_ite;
					cx_ite = cx_ite.next;
					let v = cx_ite;
					cx_ite = cx_ite.next;
					while(cx_ite != null) {
						let w = cx_ite;
						area += v.x * (w.y - u.y);
						let cf = w.y * v.x - w.x * v.y;
						_this.localCOMx += (v.x + w.x) * cf;
						_this.localCOMy += (v.y + w.y) * cf;
						u = v;
						v = w;
						cx_ite = cx_ite.next;
					}
					cx_ite = _this.lverts.next;
					let w = cx_ite;
					area += v.x * (w.y - u.y);
					let cf = w.y * v.x - w.x * v.y;
					_this.localCOMx += (v.x + w.x) * cf;
					_this.localCOMy += (v.y + w.y) * cf;
					u = v;
					v = w;
					cx_ite = cx_ite.next;
					let w1 = cx_ite;
					area += v.x * (w1.y - u.y);
					let cf1 = w1.y * v.x - w1.x * v.y;
					_this.localCOMx += (v.x + w1.x) * cf1;
					_this.localCOMy += (v.y + w1.y) * cf1;
					area = 1 / (3 * area);
					let t = area;
					_this.localCOMx *= t;
					_this.localCOMy *= t;
				}
			}
			if(this.wrap_localCOM != null) {
				this.wrap_localCOM.zpp_inner.x = this.localCOMx;
				this.wrap_localCOM.zpp_inner.y = this.localCOMy;
			}
		}
	}
	localCOM_invalidate(x) {
		if(this.zip_localCOM) {
			this.zip_localCOM = false;
			if(this.type == ZPP_Flags.id_ShapeType_POLYGON) {
				let _this = this.polygon;
				if(_this.lverts.next == null) {
					throw haxe_Exception.thrown("Error: An empty polygon has no meaningful localCOM");
				}
				if(_this.lverts.next.next == null) {
					_this.localCOMx = _this.lverts.next.x;
					_this.localCOMy = _this.lverts.next.y;
				} else if(_this.lverts.next.next.next == null) {
					_this.localCOMx = _this.lverts.next.x;
					_this.localCOMy = _this.lverts.next.y;
					let t = 1.0;
					_this.localCOMx += _this.lverts.next.next.x * t;
					_this.localCOMy += _this.lverts.next.next.y * t;
					let t1 = 0.5;
					_this.localCOMx *= t1;
					_this.localCOMy *= t1;
				} else {
					_this.localCOMx = 0;
					_this.localCOMy = 0;
					let area = 0.0;
					let cx_ite = _this.lverts.next;
					let u = cx_ite;
					cx_ite = cx_ite.next;
					let v = cx_ite;
					cx_ite = cx_ite.next;
					while(cx_ite != null) {
						let w = cx_ite;
						area += v.x * (w.y - u.y);
						let cf = w.y * v.x - w.x * v.y;
						_this.localCOMx += (v.x + w.x) * cf;
						_this.localCOMy += (v.y + w.y) * cf;
						u = v;
						v = w;
						cx_ite = cx_ite.next;
					}
					cx_ite = _this.lverts.next;
					let w = cx_ite;
					area += v.x * (w.y - u.y);
					let cf = w.y * v.x - w.x * v.y;
					_this.localCOMx += (v.x + w.x) * cf;
					_this.localCOMy += (v.y + w.y) * cf;
					u = v;
					v = w;
					cx_ite = cx_ite.next;
					let w1 = cx_ite;
					area += v.x * (w1.y - u.y);
					let cf1 = w1.y * v.x - w1.x * v.y;
					_this.localCOMx += (v.x + w1.x) * cf1;
					_this.localCOMy += (v.y + w1.y) * cf1;
					area = 1 / (3 * area);
					let t = area;
					_this.localCOMx *= t;
					_this.localCOMy *= t;
				}
			}
			if(this.wrap_localCOM != null) {
				this.wrap_localCOM.zpp_inner.x = this.localCOMx;
				this.wrap_localCOM.zpp_inner.y = this.localCOMy;
			}
		}
		let delx = 0;
		let dely = 0;
		delx = x.x - this.localCOMx;
		dely = x.y - this.localCOMy;
		let cx_ite = this.lverts.next;
		while(cx_ite != null) {
			let p = cx_ite;
			let t = 1.0;
			p.x += delx * t;
			p.y += dely * t;
			cx_ite = cx_ite.next;
		}
		this.invalidate_lverts();
	}
	setupLocalCOM() {
		let x = this.localCOMx;
		let y = this.localCOMy;
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		if(x != x || y != y) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let ret;
		if(ZPP_PubPool.poolVec2 == null) {
			ret = new Vec2();
		} else {
			ret = ZPP_PubPool.poolVec2;
			ZPP_PubPool.poolVec2 = ret.zpp_pool;
			ret.zpp_pool = null;
			ret.zpp_disp = false;
			if(ret == ZPP_PubPool.nextVec2) {
				ZPP_PubPool.nextVec2 = null;
			}
		}
		if(ret.zpp_inner == null) {
			let ret1;
			if(ZPP_Vec2.zpp_pool == null) {
				ret1 = new ZPP_Vec2();
			} else {
				ret1 = ZPP_Vec2.zpp_pool;
				ZPP_Vec2.zpp_pool = ret1.next;
				ret1.next = null;
			}
			ret1.weak = false;
			ret1._immutable = false;
			ret1.x = x;
			ret1.y = y;
			ret.zpp_inner = ret1;
			ret.zpp_inner.outer = ret;
		} else {
			if(ret != null && ret.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = ret.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(x != x || y != y) {
				throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
			}
			let tmp;
			if(ret != null && ret.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = ret.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			if(ret.zpp_inner.x == x) {
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = ret.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = ret.zpp_inner.y == y;
			} else {
				tmp = false;
			}
			if(!tmp) {
				ret.zpp_inner.x = x;
				ret.zpp_inner.y = y;
				let _this = ret.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret.zpp_inner.weak = false;
		this.wrap_localCOM = ret;
		this.wrap_localCOM.zpp_inner._inuse = true;
		this.wrap_localCOM.zpp_inner._validate = $bind(this,this.localCOM_validate);
		this.wrap_localCOM.zpp_inner._invalidate = $bind(this,this.localCOM_invalidate);
	}
	__translate(dx,dy) {
		let cx_ite = this.lverts.next;
		while(cx_ite != null) {
			let p = cx_ite;
			let t = 1.0;
			p.x += dx * t;
			p.y += dy * t;
			cx_ite = cx_ite.next;
		}
		this.invalidate_lverts();
	}
	__scale(sx,sy) {
		let cx_ite = this.lverts.next;
		while(cx_ite != null) {
			let p = cx_ite;
			p.x *= sx;
			p.y *= sy;
			cx_ite = cx_ite.next;
		}
		this.invalidate_lverts();
	}
	__rotate(ax,ay) {
		let cx_ite = this.lverts.next;
		while(cx_ite != null) {
			let p = cx_ite;
			let tempx = 0.0;
			let tempy = 0.0;
			tempx = ay * p.x - ax * p.y;
			tempy = p.x * ax + p.y * ay;
			p.x = tempx;
			p.y = tempy;
			cx_ite = cx_ite.next;
		}
		this.invalidate_lverts();
	}
	__transform(mat) {
		let cx_ite = this.lverts.next;
		while(cx_ite != null) {
			let p = cx_ite;
			let t = mat.zpp_inner.a * p.x + mat.zpp_inner.b * p.y + mat.zpp_inner.tx;
			p.y = mat.zpp_inner.c * p.x + mat.zpp_inner.d * p.y + mat.zpp_inner.ty;
			p.x = t;
			cx_ite = cx_ite.next;
		}
		this.invalidate_lverts();
	}
	__copy() {
		let _this = this.outer_zn;
		if(_this.zpp_inner_zn.wrap_lverts == null) {
			_this.zpp_inner_zn.getlverts();
		}
		let ret = new Polygon(_this.zpp_inner_zn.wrap_lverts).zpp_inner_zn;
		return ret;
	}
}
