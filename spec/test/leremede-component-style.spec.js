'use strict';

const { HTMLHint } = require('htmlhint');
require('../../rules/leremede-component-style')(HTMLHint);

const ruleId = 'leremede-component-style',
	ruleOptions = {};

ruleOptions[ruleId] = true;
describe('Rules: ' + ruleId, () => {
	it('should not report correct usages', () => {
		let code = `
			<lr-test
				a="1"
				b="2">
			</lr-test>	
		`;
		let errors = HTMLHint.verify(code, ruleOptions);
		expect(errors.length).toBe(0);

		code = `
			<lr-test a="1">
			</lr-test>	
		`;
		errors = HTMLHint.verify(code, ruleOptions);
		expect(errors.length).toBe(0);

		code = `
			<lr-test 
				a="1">
			</lr-test>	
		`;
		errors = HTMLHint.verify(code, ruleOptions);
		expect(errors.length).toBe(0);
	});

	it('should report self-closing tag', () => {
		let code = `
			<lr-test
				a="1"
				b="2"/>
		`;
		let errors = HTMLHint.verify(code, ruleOptions);
		expect(errors.length).toBe(1);
		assertError({
			error: errors[0],
			message: 'Should not use self-closing tag',
			line: 3,
			col: 1,
		});
	});

	it('should report extra new line after any attribute', () => {
		let code = `
			<lr-test
				a="1"
				
				b="2">
			</lr-test>
		`;
		let errors = HTMLHint.verify(code, ruleOptions);
		expect(errors.length).toBe(1);
		assertError({
			error: errors[0],
			message: 'There should be no extra new lines between attributes',
			line: 4,
			col: 1,
		});
	});

	it('should report wrong indentation', () => {
		let code = `
			<lr-test
				a="1"
					b="2">
			</lr-test>
		`;
		let errors = HTMLHint.verify(code, ruleOptions);
		expect(errors.length).toBe(1);
		assertError({
			error: errors[0],
			message:
				'Open tag should be on a line and attributes should be tabbed to the following lines and indented 1 tab',
			line: 4,
			col: 1,
		});
	});

	function assertError({ error, message, line, col }) {
		expect(error.rule.id).toBe(ruleId);
		expect(error.line).toBe(line);
		expect(error.col).toBe(col);
		expect(error.type).toBe('error');
		expect(error.message).toBe(message);
	}
});
