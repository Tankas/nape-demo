import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
export default class Broadphase {
	constructor() {
		if(!ZPP_Flags.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "Broadphase" + " derp!");
		}
	}
	toString() {
		if(ZPP_Flags.Broadphase_DYNAMIC_AABB_TREE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.Broadphase_DYNAMIC_AABB_TREE = new Broadphase();
			ZPP_Flags.internal = false;
		}
		if(this == ZPP_Flags.Broadphase_DYNAMIC_AABB_TREE) {
			return "DYNAMIC_AABB_TREE";
		} else {
			if(ZPP_Flags.Broadphase_SWEEP_AND_PRUNE == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.Broadphase_SWEEP_AND_PRUNE = new Broadphase();
				ZPP_Flags.internal = false;
			}
			if(this == ZPP_Flags.Broadphase_SWEEP_AND_PRUNE) {
				return "SWEEP_AND_PRUNE";
			} else {
				return "";
			}
		}
	}
	static get_DYNAMIC_AABB_TREE() {
		if(ZPP_Flags.Broadphase_DYNAMIC_AABB_TREE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.Broadphase_DYNAMIC_AABB_TREE = new Broadphase();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.Broadphase_DYNAMIC_AABB_TREE;
	}
	static get_SWEEP_AND_PRUNE() {
		if(ZPP_Flags.Broadphase_SWEEP_AND_PRUNE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.Broadphase_SWEEP_AND_PRUNE = new Broadphase();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.Broadphase_SWEEP_AND_PRUNE;
	}
}
