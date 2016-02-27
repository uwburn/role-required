var HttpError = require('http-error');

module.exports = function(opts) {
	opts = opts || {};
	opts.errorStatus = opts.errorStatus || 403;
	opts.errorMessage = opts.errorMessage || "Forbidden";

	function middleware(req, res, next) {
		if (!opts.roleRequired) {
			next();
			return;
		}

		if (req.session.roles
			&& req.session.roles.indexOf(opts.roleRequired) >= 0) {
			next();
			return;
		}

		next(new HttpError(opts.errorStatus, opts.errorMessage));
	}

	return middleware;
}
