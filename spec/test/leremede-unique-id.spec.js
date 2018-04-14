const { HTMLHint } = require('htmlhint');
const rule = require('../../rules/leremede-unique-id');
HTMLHint.addRule(rule);

const ruleId = 'leremede-unique-id',
	ruleOptions = {};

ruleOptions[ruleId] = true;
describe('Rules: ' + ruleId, () => {
	it('should report duplicate id', () => {
		const code = `<div id="test"></div>
					  <div ID="test"></div>`;
		const messages = HTMLHint.verify(code, ruleOptions);
		expect(messages.length).toBe(1);
		assertError({ message: messages[0], line: 2, col: 12, ruleId, id: 'test' });
	});

	it('should not report correct usages', () => {
		const code = `<div id="test"></div>
					  <div ID="test-1"></div>`;
		const messages = HTMLHint.verify(code, ruleOptions);
		expect(messages.length).toBe(0);
	});

	it('should not report when bindings are used', () => {
		const code = `<div id="{{test}}"></div>
					  <div ID="{{test}}"></div>`;
		const messages = HTMLHint.verify(code, ruleOptions);
		expect(messages.length).toBe(0);
	});

	function assertError({ message, line, col, id }) {
		expect(message.rule.id).toBe(ruleId);
		expect(message.line).toBe(line);
		expect(message.col).toBe(col);
		expect(message.type).toBe('error');
		expect(message.message).toBe(`The id value [ ${id} ] must be unique.`);
	}
});
