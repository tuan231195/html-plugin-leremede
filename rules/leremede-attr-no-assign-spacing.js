/**
 * Rule requires no spacing between attribute assignment
 *
 * BAD
 * attribute ="something"
 * attribute= "something"
 * attribute = "something"
 *
 * GOOD
 * attribute="angular.value == somethingelse"
 * attribute=10
 *
 */
module.exports = {
	id: 'leremede-attr-no-assign-spacing',
	description: 'All attributes must be assigned without spaces.',
	init: function(parser, reporter) {
		parser.addListener('tagstart', event => {
			event.attrs.forEach(attr => {
				const [left, right] = attr.raw.split('=', 2);
				if (left && right && (left.endsWith(' ') || right.startsWith(' '))) {
					// try and find the "=" part of the assignment
					const col = event.col + event.tagName.length + left.length + 1;

					reporter.error(
						`The assignment of [ ${attr.name} ] must not have spaces. e.g, ${
							attr.name
						}=${attr.quote}${attr.value}${attr.quote}`,
						event.line,
						col + attr.index,
						this,
						attr.raw
					);
				}
			});
		});
	},
};
