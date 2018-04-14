/**
 * Rule enforces leremede component style
 * BAD
 *
 * <leremede-test
 * 	  a="1"
 * 	  	b="2">
 * </leremede-test>
 *
 * <leremede-test
 * 	  a="1"
 *
 * 	  b="2">
 * </leremede-test>
 *
 * <leremede-test
 * 	  a="1"
 * 	  b="2"/>
 *
 * GOOD
 * <leremede-test
 * 	  a="1"
 * 	  b="2">
 * </leremede-test>
 *
 * <leremede-test a="1">
 * </leremede-test>
 *
 * @author Tuan nguyen
 */

const stringUtils = require('../lib/string-utils');

module.exports = function(HTMLHint) {
	HTMLHint.addRule({
		id: 'leremede-component-style',
		description: `All components / directives should have the open tag of the 
					directive/component on a line and all attributes 
					should be tabbed to the following lines and indented 1 tab`,
		init: function(parser, reporter) {
			parser.addListener('tagstart', event => {
				const col = event.col + event.tagName.length + 1;
				if (!isAngularComponent(event.tagName)) {
					return;
				}
				let elementIndentationLevel = 0;
				if (event.lastEvent && event.lastEvent.raw) {
					elementIndentationLevel = stringUtils.findIndentationLevel(
						event.lastEvent.raw
					);
				}
				//make sure tag is not self-closing
				if (event.close !== '') {
					reporter.error(
						'Should not use self-closing tag',
						event.line,
						col,
						this,
						event.raw
					);
				}
				for (let attr of event.attrs) {
					const newLineLevel = stringUtils.findNewLineLevel(attr.raw);
					if (newLineLevel > 1) {
						reporter.error(
							'There should be no extra new lines between attributes',
							event.line,
							col + attr.index + 1,
							this,
							attr.raw
						);
						return;
					}
					const attributeIndentationLevel = stringUtils.findIndentationLevel(
						attr.raw
					);
					if (attributeIndentationLevel !== elementIndentationLevel + 1) {
						if (event.attrs.length === 1) {
							return;
						}
						reporter.error(
							'Open tag should be on a line and attributes should be tabbed to the following lines and indented 1 tab',
							event.line,
							col + attr.index + 1,
							this,
							attr.raw
						);
						return;
					}
				}
			});
		},
	});

	function isAngularComponent(tagName) {
		return tagName.startsWith('lr');
	}
};
