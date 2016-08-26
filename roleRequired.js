var HttpError = require('http-error');

module.exports = function(opts) {
	opts = opts || {};
	opts.errorStatus = opts.errorStatus || 403;
	opts.errorMessage = opts.errorMessage || "Forbidden";
	opts.rolesField = opts.rolesField || "roles";

	function middleware(req, res, next) {
		if (!opts.roleRequired) {
			next();
			return;
		}

		if (req.session[opts.rolesField]
			&& req.session[opts.rolesField].indexOf(opts.roleRequired) >= 0) {
			next();
			return;
		}

		next(new HttpError(opts.errorStatus, opts.errorMessage));
	}

	return middleware;
}

