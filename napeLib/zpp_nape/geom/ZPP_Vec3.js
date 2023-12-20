export default class ZPP_Vec3 {
	constructor() {
		this._validate = null;
		this.immutable = false;
		this.z = 0.0;
		this.y = 0.0;
		this.x = 0.0;
		this.outer = null;
		this.immutable = false;
		this._validate = null;
	}
	validate() {
		if(this._validate != null) {
			this._validate();
		}
	}
}
