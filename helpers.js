const helpers = {
	setStatus: (previous, current) => {
		const { results, remaining } = current.reduce((acc, currentEntity) => {
			const { results, remaining } = acc;
			const { textField: currentText } = currentEntity;
			const matchedEntity = remaining.findIndex(({ textField: previousText }) =>
				previousText === currentText);
			const isExists = matchedEntity !== -1;

			return {
				results: [
					...results,
					{
						...isExists ? previous[matchedEntity] : currentEntity,
						...{ _status: isExists ? 'sync' : 'create' },
					},
				],
				remaining: remaining.filter((val, index) => index !== matchedEntity),
			};
		}, { results: [], remaining: previous });

		return [
			...results,
			...remaining.map((entity) => ({ ...entity, _status: 'delete' })),
		];
	},
};

module.exports = helpers;
