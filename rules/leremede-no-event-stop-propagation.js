/**
 * Rule enforces the encoding of ampersand in html document
 *
 * BAD
 *    ng-click="$event.stopPropagation()"
 *
 * @author Tuan nguyen
 */
module.exports = function(HTMLHint) {
	HTMLHint.addRule({
		id: 'leremede-no-event-stop-propagation',
		description: 'Should not use event.stopPropagation()',
		init: function(parser, reporter) {
			parser.addListener('tagstart', event => {
				const error = 'event.stopPropagation() should be avoided';
				const lookupString = '$event.stopPropagation()';
				event.attrs
					.filter(attr => attr.raw.includes(lookupString))
					.forEach(attr => {
						const matchedPosition = attr.raw.indexOf(lookupString);
						const col = event.col + event.tagName.length + matchedPosition + 1;
						reporter.warn(error, event.line, col + attr.index, this, attr.raw);
					});
			});
		},
	});
};
