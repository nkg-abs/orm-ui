const helpers = {
	// eslint-disable-next-line max-lines-per-function
	setStatus: (previous, current) => {
		const { results, remaining } = current.reduce((acc, currentEntity) => {
			const { results, remaining } = acc;
			const { textField: currentText } = currentEntity;
			const isExists = remaining.findIndex(({ textField: previousText }) =>
				previousText === currentText);

			return {
				results: [
					...results,
					{
						...currentEntity,
						...{ _status: isExists !== -1 ? 'sync' : 'create' },
					},
				],
				remaining: remaining.filter((val, index) => index !== isExists),
			};
		}, { results: [], remaining: previous });

		return [
			...results,
			...remaining.map((entity) => ({ ...entity, _status: 'delete' })),
		];
	},
};

module.exports = helpers;
