const allowedCors = ["http://localhost:3001", "http://localhost:5173"];

function cors(req, res, next) {
	try {
		const { origin } = req.headers;

		if (allowedCors.includes(origin)) {
			res.header("Access-Control-Allow-Origin", origin);
		}
		res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
		res.header(
			"Access-Control-Allow-Headers",
			"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
		);
		next();
	} catch (err) {
		console.log(err);
	}
}

module.exports = cors;
