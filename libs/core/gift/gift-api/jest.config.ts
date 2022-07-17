/* eslint-disable */
export default {
	displayName: 'core-gift-gift-api',
	preset: '../../../../jest.preset.js',
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.spec.json',
		},
	},
	transform: {
		'^.+\\.[tj]s$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	coverageDirectory: '../../../../coverage/libs/core/gift/gift-api',
};
