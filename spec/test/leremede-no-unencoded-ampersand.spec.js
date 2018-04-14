const {HTMLHint} = require('htmlhint');
require('../../rules/leremede-no-unencoded-ampersand')(HTMLHint);

const ruleId = 'leremede-no-unencoded-ampersand',
	ruleOptions = {};

ruleOptions[ruleId] = true;
describe('Rules: ' + ruleId, () => {

	it('should not report logical AND operator', () => {
		const code = '<div ng-if="a && b">';
		const messages = HTMLHint.verify(code, ruleOptions);
		expect(messages.length).toBe(0);
	});

	it('should not report valid entity', () => {
		let code = '<a>&amp;</a>';
		let messages = HTMLHint.verify(code, ruleOptions);
		expect(messages.length).toBe(0);

		code = '<a href="/?action=view_company&amp;id=9">';
		messages = HTMLHint.verify(code, ruleOptions);
		expect(messages.length).toBe(0);
	});

	it('should report & in html attributes', () => {
		const code = '<a href="/?action=view_company&id=9">';
		const messages = HTMLHint.verify(code, ruleOptions);
		expect(messages.length).toBe(1);
		assertError({message: messages[0], line: 1, col: 31, ruleId});
	});

	it('should report & in html text', () => {
		const code = '<div>&</div>';
		const messages = HTMLHint.verify(code, ruleOptions);
		expect(messages.length).toBe(1);
		assertError({message: messages[0], line: 1, col: 6, ruleId});
	});

	it('should report invalid entity', () => {
		const code = '<div>&copy</div>';
		const messages = HTMLHint.verify(code, ruleOptions);
		expect(messages.length).toBe(1);
		assertError({message: messages[0], line: 1, col: 6, ruleId});
	});

	it('should report mulitple errors on the same line', () => {
		const code = '<a hre="?action=view_company&id=12">&copy</a>';
		const messages = HTMLHint.verify(code, ruleOptions);
		expect(messages.length).toBe(2);
		assertError({message: messages[0], line: 1, col: 29, ruleId});
		assertError({message: messages[1], line: 1, col: 37, ruleId});
	});

	it('should report the correct error when there are valid and invalid usages on the same line', () => {
		const code = '<a hre="?action=view_company&id=12">&copy;</a>';
		const messages = HTMLHint.verify(code, ruleOptions);
		expect(messages.length).toBe(1);
		assertError({message: messages[0], line: 1, col: 29, ruleId});
	});
});

function assertError({message, line, col, ruleId}) {
	expect(message.rule.id).toBe(ruleId);
	expect(message.line).toBe(line);
	expect(message.col).toBe(col);
	expect(message.type).toBe('error')
}