var EventEmitter = require ('events').EventEmitter;

var utils = require ('./lib/mocha/lib/utils');
var constants = require ('./lib/mocha/lib/runner').constants;

var defaultNow = (function(Date) {
    return function() { return new Date().getTime(); };
})(Date);

function Timer(options) {
	options = options || {};

	var now = options.now || defaultNow,
		startTime;

	this.start = function() {
		startTime = now();
	};

	this.elapsed = function() {
		return now() - startTime;
	};
}

function convertSuite (suiteResult) {

}

// https://jasmine.github.io/api/edge/global
/**
 * @typedef {import('./node_modules/jasmine-core/lib/jasmine-core/jasmine.js').SpecResult} SpecResult
 */
/**
 * Converts jasmine spec result to mocha
 *
 * @param {SpecResult} specResult
 * @returns
 */
function convertSpec (specResult, suitePath) {
	return {
		title: specResult.description,
		fullTitle() {return specResult.fullTitle},
		slow() {return 75},
		duration: specResult.duration,
		_titlePath: suitePath.slice(0),
		titlePath () {return this._titlePath}
	}
}

var mochaStackFilter = utils.stackTraceFilter();

function diffFilter (spec) {
	if (spec.actual === '' && spec.expected === '') {
		var newSpec = Object.assign({}, spec);
		delete newSpec.actual;
		delete newSpec.expected;
		return newSpec;
	}

	return spec;
}

class JasmineRunner extends EventEmitter {

	constructor () {

		super();

		this.timer = new Timer ();

		this._total = 0;

		this.stats = {
			passes:   0,
			duration: 0,
			pending:  undefined,
			failures: undefined
		}

		this.suitePath = [];

	}

	total () {
		return this._total;
	}

	jasmineStarted (suiteInfo) {

		this._total = suiteInfo.totalSpecsDefined;

		this.emit (constants.EVENT_RUN_BEGIN);
		// console.log('Running suite with ' + suiteInfo.totalSpecsDefined);
	}

	suiteStarted (result) {
		this.emit (constants.EVENT_SUITE_BEGIN, {
			title: result.description,
			// result.fullName ???
		});

		this.suitePath.push (result.description);
	}

	specStarted (result) {

		this.emit (constants.EVENT_TEST_BEGIN);

		// TODO: remove
		this.timer.start();
	}

	specDone (specResult) {

		this.stats.duration += this.timer.elapsed();

		var test = convertSpec (specResult, this.suitePath);

		if (specResult.status === 'passed') {
			this.stats.passes ++;
			this.emit (constants.EVENT_TEST_PASS, test);
		} else if (specResult.status === 'failed') {
			// TODO: foreach
			this.stats.failures = (this.stats.failures || 0) + specResult.failedExpectations.length;

			var failures = specResult.failedExpectations.map (function (failedSpec) {
				failedSpec = diffFilter (failedSpec);

				return failedSpec.stack ? Object.assign ({}, failedSpec, {
					stack: mochaStackFilter (failedSpec.stack)
				}) : failedSpec;
			});

			this.emit (constants.EVENT_TEST_FAIL, test, failures[0]);
		} else if (specResult.status === 'pending') {
			this.stats.pending = (this.stats.pending || 0) + 1;
			// pending because of xit or xdescribe
			this.emit (constants.EVENT_TEST_PENDING, test);
		} else if (specResult.status === 'excluded') {
			this.stats.pending = (this.stats.pending || 0) + 1;
			// excluded because of fit or fdescribe
			this.emit (constants.EVENT_TEST_PENDING, test);
		} else if (specResult.status === 'disabled') {
			this.stats.pending = (this.stats.pending || 0) + 1;
			// ???
			this.emit (constants.EVENT_TEST_PENDING, test);
		} else {
			console.log ('unknown ' + specResult.status);
		}

		this.emit (constants.EVENT_TEST_END, test);

	}

	suiteDone (suiteResult) {

		this.suitePath.pop();

		this.emit (constants.EVENT_SUITE_END, /*{
			title: suiteResult.description,
			// suiteResult.fullName ???
		}*/);
	}

	jasmineDone (jasmineResult) {

		this.emit (constants.EVENT_RUN_END);

	}
};

module.exports.JasmineRunner = JasmineRunner;