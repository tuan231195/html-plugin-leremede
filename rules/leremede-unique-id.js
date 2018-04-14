'use strict';

/**
 * Rule enforces the encoding of ampersand in html document
 *
 * BAD
 * <a id="hi"></a>
 * <div id="hi"></div>
 *
 * NOT BAD
 * <a id="{{object}}"></div>
 * <div id="{{object}}"></div>
 *
 * @author Tuan nguyen
 */
module.exports = {
	id: 'leremede-unique-id',
	description: 'The value of id attributes must be unique.',
	init: function(parser, reporter) {
		const idSet = new Set();
		parser.addListener('tagstart', event => {
			const attrs = event.attrs
				.filter(isIdAttribute)
				.filter(attr => !hasBinding(attr));
			for (let attr of attrs) {
				const col = event.col + event.tagName.length + 1;
				const id = attr.value;
				if (idSet.has(id)) {
					reporter.error(
						`The id value [ ${id} ] must be unique.`,
						event.line,
						col + attr.index,
						this,
						attr.raw
					);
					return;
				}
				idSet.add(id);
			}
		});
	},
};

function isIdAttribute(attr) {
	return attr.name && attr.name.toLowerCase() === 'id';
}

function hasBinding(attr) {
	return attr.value && attr.value.includes('{{');
}
