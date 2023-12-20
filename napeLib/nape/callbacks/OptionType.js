import ZPP_OptionType from '../../zpp_nape/callbacks/ZPP_OptionType.js';
export default class OptionType {
	constructor(includes,excludes) {
		this.zpp_inner = null;
		this.zpp_inner = new ZPP_OptionType();
		this.zpp_inner.outer = this;
		if(includes != null) {
			this.including(includes);
		}
		if(excludes != null) {
			this.excluding(excludes);
		}
	}
	get_includes() {
		if(this.zpp_inner.wrap_includes == null) {
			this.zpp_inner.setup_includes();
		}
		return this.zpp_inner.wrap_includes;
	}
	get_excludes() {
		if(this.zpp_inner.wrap_excludes == null) {
			this.zpp_inner.setup_excludes();
		}
		return this.zpp_inner.wrap_excludes;
	}
	including(includes) {
		this.zpp_inner.append(this.zpp_inner.includes,includes);
		return this;
	}
	excluding(excludes) {
		this.zpp_inner.append(this.zpp_inner.excludes,excludes);
		return this;
	}
	toString() {
		if(this.zpp_inner.wrap_includes == null) {
			this.zpp_inner.setup_includes();
		}
		let inc = this.zpp_inner.wrap_includes.toString();
		if(this.zpp_inner.wrap_excludes == null) {
			this.zpp_inner.setup_excludes();
		}
		let exc = this.zpp_inner.wrap_excludes.toString();
		return "@{" + inc + " excluding " + exc + "}";
	}
}
