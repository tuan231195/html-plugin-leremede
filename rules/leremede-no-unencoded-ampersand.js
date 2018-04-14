/**
 * Rule enforces the encoding of ampersand in html document
 *
 * BAD
 * href="id=3&action=view_company"
 * <a>&copybar</a>
 *
 * GOOD
 * href="id=3&amp;action=view_company"
 * ng-if="a && b"
 *
 * @author Tuan nguyen
 */
module.exports = {
	id: 'leremede-no-unencoded-ampersand',
	description: 'Ampersand should be encoded in html document',
	init: function(parser, reporter) {
		//match a standalone & or & followed by a number of alphanumeric characters but not terminated by ; (not a valid entity)
		const regex = new RegExp(/(^|[^&])&(\B(?!&)|\w+\b(?!;))/);
		const error = '& should be encoded as &amp;';
		parser.addListener('tagstart', event => {
			event.attrs.forEach(attr => {
				const matches = regex.exec(attr.raw);
				if (matches) {
					const col = event.col + event.tagName.length + matches.index + 2;
					reporter.error(error, event.line, col + attr.index, this, attr.raw);
				}
			});
		});

		parser.addListener('text', event => {
			const matches = regex.exec(event.raw);
			if (matches) {
				const col = event.col + matches.index;
				reporter.error(error, event.line, col, this, event.raw);
			}
		});
	},
};
