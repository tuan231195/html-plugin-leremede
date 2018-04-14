const { HTMLHint } = require('htmlhint');
const rule = require('../../rules/leremede-attr-use-ng-src-ng-href');
HTMLHint.addRule(rule);

const ruleId = 'leremede-attr-use-ng-src-ng-href',
	ruleOptions = {};

ruleOptions[ruleId] = true;
describe('Rules: ' + ruleId, () => {
	it('should not report correct usages', () => {
		let code = '<div ng-href="//google.com/{{path}}">';
		let messages = HTMLHint.verify(code, ruleOptions);
		expect(messages.length).toBe(0);

		code = '<img ng-src="//google.com/{{path}}">';
		messages = HTMLHint.verify(code, ruleOptions);
		expect(messages.length).toBe(0);
	});

	it('should report invalid href', () => {
		const code = '<div href="//google.com/{{path}}">';
		const messages = HTMLHint.verify(code, ruleOptions);
		expect(messages.length).toBe(1);
		assertError({ message: messages[0], line: 1, col: 5, ruleId });
	});

	it('should report invalid src', () => {
		const code = '<img src="//google.com/{{path}}">';
		const messages = HTMLHint.verify(code, ruleOptions);
		expect(messages.length).toBe(1);
		assertError({ message: messages[0], line: 1, col: 5, ruleId });
	});
});

function assertError({ message, line, col, ruleId }) {
	expect(message.rule.id).toBe(ruleId);
	expect(message.line).toBe(line);
	expect(message.col).toBe(col);
	expect(message.type).toBe('error');
}
