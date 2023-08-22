/**
 * OBJECTS
 */
// console.log(String({}));
// console.log(String({test: 123}));
// console.log(Number({}));
// console.log(Number({test: 123}));
// console.log(Boolean({}));
// console.log(Boolean({test: 123}));

/**
 * ARRAYS
 */
// console.log(String([]));
// console.log(String([1]));
// console.log([1] + [1]);
// console.log(String([1, 2]));
// console.log(Number([]));
// console.log(Number([1]));
// console.log(Number(['f']));
// console.log(Boolean(['f']));
// console.log(Boolean([]));

// console.log({} + [1]);
// console.log([2] + [1]);
// console.log([2] - [1]);
// console.log({} + [1, 2]);
// console.log({} + [1]);
// console.log(+[1] + {});
// console.log(1 + {});
// console.log({} + [1] + false);
// console.log({} + [1] + false + 7);
// console.log(['f'] + 7);
// console.log(['f'] * 7);
// console.log(['1'] * 7);
// console.log('b' + 'a' + +'a' + 'a');
// console.log(null + {});
// console.log(null == undefined);
// console.log(null + undefined);
// console.log(undefined + null);
// console.log(null + {});
// console.log(null + null);
// console.log(undefined + undefined);
// console.log(true + false);
// console.log(+'Infinity');
// console.log([1] + undefined);
// console.log(+[1] + undefined);
// console.log(1 + undefined);
// console.log([1] + 1);
// console.log({} + [] + 1);
// console.log({} + []);
//
// console.log(!!{});
// console.log(!![]);
// console.log(+[]);
// console.log(+[1] + {});
// console.log(+[1, 2]);
// console.log(null > undefined);
// console.log(null < undefined);
// console.log(null == '');
// console.log(null == null);
// console.log(15 + 3 + NaN + 'test');
// console.log(15 + 3 + 'test');
// console.log('test' + 15 + 3 + NaN);
// console.log(15 + 'test' + 3 + NaN);
// console.log('' == 0);
// console.log(null == 0); // exception about null
// console.log({} + {});
// console.log([] + []);
// console.log({} == {});
// console.log({} + null);
// console.log(null + {});
// console.log(undefined + {});
// console.log([1] + 1);
// console.log({} + 1);
// console.log([{}, {}] + 1);
// console.log(+[{}, 'd'] + 1);
// console.log(!![]);
// console.log(1 + true);
// console.log(1 + false);
// console.log('1' + false);
// console.log(null + false);
// console.log(undefined + false);
// console.log({} + {});
// console.log({} == {});

/**
 * Symbol.toPrimitive
 */
// let user = {
// 	name: 'John',
// 	money: 1000,

// 	[Symbol.toPrimitive](hint) {
// 		console.log(`hint: ${hint}`);
// 		return hint == 'string' ? `{name: "${this.name}"}` : this.money;
// 	},
// };

// let user = {
// 	name: 'John',
// 	money: 1000,

// 	// for hint="string"
// 	toString() {
// 		return `{name: "${this.name}"}`;
// 	},

// 	// for hint="number" or "default"
// 	valueOf() {
// 		return this.money;
// 	},
// };

// console.log(user.toString());
// console.log(+user);
// console.log(user + '');
