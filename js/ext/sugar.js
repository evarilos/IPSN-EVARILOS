// Some syntactic sugar by Douglas Crockford

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Function.method('inherits', function (parent) {
    this.prototype = new parent();
    var d = {}, 
        p = this.prototype;
    this.prototype.constructor = parent; 
    this.method('_super', function _super(name) {
        if (!(name in d)) {
            d[name] = 0;
        }        
        var f, r, t = d[name], v = parent.prototype;
        if (t) {
            while (t) {
                v = v.constructor.prototype;
                t -= 1;
            }
            f = v[name];
        } else {
            f = p[name];
            if (f == this[name]) {
                f = v[name];
            }
        }
        d[name] += 1;
        r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
        d[name] -= 1;
        return r;
    });
    return this;
});

Function.method('swiss', function (parent) {
    for (var i = 1; i < arguments.length; i += 1) {
        var name = arguments[i];
        this.prototype[name] = parent.prototype[name];
    }
    return this;
});

// Usage: var newObject = Object.create(sourceObject); 
if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
}

// The 'dim' function inits an Array with a given value
// Usage: var myArray = Array.dim(10, 0);
Array.dim = function (dimension, initial) {
	var a = [], i;
	for (i = 0; i < dimension; i += 1) {
		a[i] = initial;
	}
	return a;
};

// This function augments the Number object with a 'integer' function
// Usage: (-10 / 3).integer()
Number.method('integer', function () {
	return Math[this < 0 ? 'ceil' : 'floor'](this);
});

// This function augments the String object with a 'trim' function
// Usage: "   testString    ".trim()
String.method('trim', function () {
	return this.replace(/^\s+|\s+$/g, '');
});
