const path = require ('path');

let reporter = 'spec';
// not works, because nodejs resolve require symlinks
// reporter = path.parse (__filename).name;

process.argv.filter (arg => {try {
	reporter = arg.match(/--reporter=jamocha\/(\w+)/)[1]
} catch (err) {}});

reporter = process.env.REPORTER || reporter;

const Reporter = require ('./lib/mocha/lib/reporters/' + reporter);
const JasmineRunner = require('./jasmine-mocha').JasmineRunner;

class JasmineRunnerSpec extends JasmineRunner {
	constructor () {
		super ();

		new Reporter (this);
	}
}

module.exports = JasmineRunnerSpec;
