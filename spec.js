var Spec = require ('./lib/mocha/lib/reporters/spec');
var JasmineRunner = require('./jasmine-mocha').JasmineRunner;

class JasmineRunnerSpec extends JasmineRunner {
	constructor () {
		super ();

		new Spec (this);
	}
}

module.exports = JasmineRunnerSpec;