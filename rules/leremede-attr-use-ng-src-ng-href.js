/**
 * Rule enforces the use of ng-src and ng-href
 * BAD
 * <a href="//google.com/{{path}}">
 * <img src="//google.com/{{path}}">
 * GOOD
 * <a ng-href="//google.com/{{path}}">
 * <img ng-src="//google.com/{{path}}">
 *
 * @author Tuan nguyen
 */
module.exports = function(HTMLHint) {
	HTMLHint.addRule({
		id: 'leremede-attr-use-ng-src-ng-href',
		description: 'ng-src and ng-href should be used when bindings are in value',
		init: function(parser, reporter) {
			parser.addListener('tagstart', event => {
				event.attrs.forEach(attr => {
					if (attr.name === 'href' || attr.name === 'src') {
						if (attr.value && attr.value.includes('{{')) {
							const col = event.col + event.tagName.length + attr.index + 1;
							reporter.error(
								`${attr.name} should be replaced by ng-${attr.name}`,
								event.line,
								col,
								this,
								attr.raw
							);
						}
					}
				});
			});
		},
	});
};
