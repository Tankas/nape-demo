import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
export default class ShapeType {
	constructor() {
		if(!ZPP_Flags.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "ShapeType" + " derp!");
		}
	}
	toString() {
		if(ZPP_Flags.ShapeType_CIRCLE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.ShapeType_CIRCLE = new ShapeType();
			ZPP_Flags.internal = false;
		}
		if(this == ZPP_Flags.ShapeType_CIRCLE) {
			return "CIRCLE";
		} else {
			if(ZPP_Flags.ShapeType_POLYGON == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.ShapeType_POLYGON = new ShapeType();
				ZPP_Flags.internal = false;
			}
			if(this == ZPP_Flags.ShapeType_POLYGON) {
				return "POLYGON";
			} else {
				return "";
			}
		}
	}
	static get_CIRCLE() {
		if(ZPP_Flags.ShapeType_CIRCLE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.ShapeType_CIRCLE = new ShapeType();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.ShapeType_CIRCLE;
	}
	static get_POLYGON() {
		if(ZPP_Flags.ShapeType_POLYGON == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.ShapeType_POLYGON = new ShapeType();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.ShapeType_POLYGON;
	}
}
