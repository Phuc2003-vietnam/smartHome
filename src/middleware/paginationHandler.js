const paginationHandler = async (req, res, next) => {
	try {
		req.per_page =
			!Boolean(req.query.per_page) || req.query.per_page < 1
				? 20
				: parseInt(req.query.per_page)
		req.current_page =
			!Boolean(req.query.current_page) || req.query.current_page < 1
				? 1
				: parseInt(req.query.current_page)
		next()
	} catch (error) {
		next(error)
	}
}

export default paginationHandler
