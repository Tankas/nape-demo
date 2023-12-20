import ZPP_ShapeList from '../../zpp_nape/util/ZPP_ShapeList.js';
import ZPP_InteractionFilter from '../../zpp_nape/dynamics/ZPP_InteractionFilter.js';
export default class InteractionFilter {
	constructor(collisionGroup,collisionMask,sensorGroup,sensorMask,fluidGroup,fluidMask) {
		if(fluidMask == null) {
			fluidMask = -1;
		}
		if(fluidGroup == null) {
			fluidGroup = 1;
		}
		if(sensorMask == null) {
			sensorMask = -1;
		}
		if(sensorGroup == null) {
			sensorGroup = 1;
		}
		if(collisionMask == null) {
			collisionMask = -1;
		}
		if(collisionGroup == null) {
			collisionGroup = 1;
		}
		this.zpp_inner = null;
		if(ZPP_InteractionFilter.zpp_pool == null) {
			this.zpp_inner = new ZPP_InteractionFilter();
		} else {
			this.zpp_inner = ZPP_InteractionFilter.zpp_pool;
			ZPP_InteractionFilter.zpp_pool = this.zpp_inner.next;
			this.zpp_inner.next = null;
		}
		this.zpp_inner.outer = this;
		if(this.zpp_inner.collisionGroup != collisionGroup) {
			this.zpp_inner.collisionGroup = collisionGroup;
			this.zpp_inner.invalidate();
		}
		if(this.zpp_inner.collisionMask != collisionMask) {
			this.zpp_inner.collisionMask = collisionMask;
			this.zpp_inner.invalidate();
		}
		if(this.zpp_inner.sensorGroup != sensorGroup) {
			this.zpp_inner.sensorGroup = sensorGroup;
			this.zpp_inner.invalidate();
		}
		if(this.zpp_inner.sensorMask != sensorMask) {
			this.zpp_inner.sensorMask = sensorMask;
			this.zpp_inner.invalidate();
		}
		if(this.zpp_inner.fluidGroup != fluidGroup) {
			this.zpp_inner.fluidGroup = fluidGroup;
			this.zpp_inner.invalidate();
		}
		if(this.zpp_inner.fluidMask != fluidMask) {
			this.zpp_inner.fluidMask = fluidMask;
			this.zpp_inner.invalidate();
		}
	}
	get_userData() {
		if(this.zpp_inner.userData == null) {
			this.zpp_inner.userData = { };
		}
		return this.zpp_inner.userData;
	}
	get_shapes() {
		if(this.zpp_inner.wrap_shapes == null) {
			this.zpp_inner.wrap_shapes = ZPP_ShapeList.get(this.zpp_inner.shapes,true);
		}
		return this.zpp_inner.wrap_shapes;
	}
	get_collisionGroup() {
		return this.zpp_inner.collisionGroup;
	}
	set_collisionGroup(collisionGroup) {
		if(this.zpp_inner.collisionGroup != collisionGroup) {
			this.zpp_inner.collisionGroup = collisionGroup;
			this.zpp_inner.invalidate();
		}
		return this.zpp_inner.collisionGroup;
	}
	get_collisionMask() {
		return this.zpp_inner.collisionMask;
	}
	set_collisionMask(collisionMask) {
		if(this.zpp_inner.collisionMask != collisionMask) {
			this.zpp_inner.collisionMask = collisionMask;
			this.zpp_inner.invalidate();
		}
		return this.zpp_inner.collisionMask;
	}
	get_sensorGroup() {
		return this.zpp_inner.sensorGroup;
	}
	set_sensorGroup(sensorGroup) {
		if(this.zpp_inner.sensorGroup != sensorGroup) {
			this.zpp_inner.sensorGroup = sensorGroup;
			this.zpp_inner.invalidate();
		}
		return this.zpp_inner.sensorGroup;
	}
	get_sensorMask() {
		return this.zpp_inner.sensorMask;
	}
	set_sensorMask(sensorMask) {
		if(this.zpp_inner.sensorMask != sensorMask) {
			this.zpp_inner.sensorMask = sensorMask;
			this.zpp_inner.invalidate();
		}
		return this.zpp_inner.sensorMask;
	}
	get_fluidGroup() {
		return this.zpp_inner.fluidGroup;
	}
	set_fluidGroup(fluidGroup) {
		if(this.zpp_inner.fluidGroup != fluidGroup) {
			this.zpp_inner.fluidGroup = fluidGroup;
			this.zpp_inner.invalidate();
		}
		return this.zpp_inner.fluidGroup;
	}
	get_fluidMask() {
		return this.zpp_inner.fluidMask;
	}
	set_fluidMask(fluidMask) {
		if(this.zpp_inner.fluidMask != fluidMask) {
			this.zpp_inner.fluidMask = fluidMask;
			this.zpp_inner.invalidate();
		}
		return this.zpp_inner.fluidMask;
	}
	shouldCollide(filter) {
		if(filter == null) {
			throw haxe_Exception.thrown("Error: filter argument cannot be null for shouldCollide");
		}
		let _this = this.zpp_inner;
		let x = filter.zpp_inner;
		if((_this.collisionMask & x.collisionGroup) != 0) {
			return (x.collisionMask & _this.collisionGroup) != 0;
		} else {
			return false;
		}
	}
	shouldSense(filter) {
		if(filter == null) {
			throw haxe_Exception.thrown("Error: filter argument cannot be null for shouldSense");
		}
		let _this = this.zpp_inner;
		let x = filter.zpp_inner;
		if((_this.sensorMask & x.sensorGroup) != 0) {
			return (x.sensorMask & _this.sensorGroup) != 0;
		} else {
			return false;
		}
	}
	shouldFlow(filter) {
		if(filter == null) {
			throw haxe_Exception.thrown("Error: filter argument cannot be null for shouldFlow");
		}
		let _this = this.zpp_inner;
		let x = filter.zpp_inner;
		if((_this.fluidMask & x.fluidGroup) != 0) {
			return (x.fluidMask & _this.fluidGroup) != 0;
		} else {
			return false;
		}
	}
	copy() {
		return new InteractionFilter(this.zpp_inner.collisionGroup,this.zpp_inner.collisionMask,this.zpp_inner.sensorGroup,this.zpp_inner.sensorMask,this.zpp_inner.fluidGroup,this.zpp_inner.fluidMask);
	}
	toString() {
		return "{ collision: " + StringTools.hex(this.zpp_inner.collisionGroup,8) + "~" + StringTools.hex(this.zpp_inner.collisionMask,8) + " sensor: " + StringTools.hex(this.zpp_inner.sensorGroup,8) + "~" + StringTools.hex(this.zpp_inner.sensorMask,8) + " fluid: " + StringTools.hex(this.zpp_inner.fluidGroup,8) + "~" + StringTools.hex(this.zpp_inner.fluidMask,8) + " }";
	}
}
