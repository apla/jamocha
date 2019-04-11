'use strict';

var constants = {
  /**
   * {@link Runner}-related constants.
   * @public
   * @memberof Runner
   * @readonly
   * @alias constants
   * @static
   * @enum {string}
   */
  /**
   * Emitted when {@link Hook} execution begins
   */
  EVENT_HOOK_BEGIN: 'hook',
  /**
   * Emitted when {@link Hook} execution ends
   */
  EVENT_HOOK_END: 'hook end',
  /**
   * Emitted when Root {@link Suite} execution begins (all files have been parsed and hooks/tests are ready for execution)
   */
  EVENT_RUN_BEGIN: 'start',
  /**
   * Emitted when Root {@link Suite} execution has been delayed via `delay` option
   */
  EVENT_DELAY_BEGIN: 'waiting',
  /**
   * Emitted when delayed Root {@link Suite} execution is triggered by user via `global.run()`
   */
  EVENT_DELAY_END: 'ready',
  /**
   * Emitted when Root {@link Suite} execution ends
   */
  EVENT_RUN_END: 'end',
  /**
   * Emitted when {@link Suite} execution begins
   */
  EVENT_SUITE_BEGIN: 'suite',
  /**
   * Emitted when {@link Suite} execution ends
   */
  EVENT_SUITE_END: 'suite end',
  /**
   * Emitted when {@link Test} execution begins
   */
  EVENT_TEST_BEGIN: 'test',
  /**
   * Emitted when {@link Test} execution ends
   */
  EVENT_TEST_END: 'test end',
  /**
   * Emitted when {@link Test} execution fails
   */
  EVENT_TEST_FAIL: 'fail',
  /**
   * Emitted when {@link Test} execution succeeds
   */
  EVENT_TEST_PASS: 'pass',
  /**
   * Emitted when {@link Test} becomes pending
   */
  EVENT_TEST_PENDING: 'pending',
  /**
   * Emitted when {@link Test} execution has failed, but will retry
   */
  EVENT_TEST_RETRY: 'retry'
};

module.exports.constants = constants;

