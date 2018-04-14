const { HTMLHint } = require('htmlhint');
const rule = require('../../rules/leremede-no-event-stop-propagation');
HTMLHint.addRule(rule);

const ruleId = 'leremede-no-event-stop-propagation',
	ruleOptions = {};

ruleOptions[ruleId] = true;
describe('Rules: ' + ruleId, () => {
	it('should report usage of $event.stopPropagation()', () => {
		const code = '<div ng-click="a=true; $event.stopPropagation()">';
		const messages = HTMLHint.verify(code, ruleOptions);
		expect(messages.length).toBe(1);
		expect(messages[0].rule.id).toBe(ruleId);
		expect(messages[0].line).toBe(1);
		expect(messages[0].col).toBe(24);
		expect(messages[0].type).toBe('warning');
	});
});
