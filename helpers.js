const helpers = {
	setStatus: (
		previous, current, fieldName
	) => {
		const { results, remaining } = current.reduce((acc, currentEntity) => {
			const { results, remaining } = acc;
			const { [fieldName]: currentText } = currentEntity;
			const matchedEntity = remaining.findIndex(({ [fieldName]: previousText }) =>
				previousText === currentText);
			const isExists = matchedEntity !== -1;

			return {
				results: [
					...results,
					{
						...isExists ? remaining[matchedEntity] : currentEntity,
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
