const path = require('path')


const Contenedor = require("../class/contenedir");
const productos = new Contenedor(path.join(__dirname, '../data/productos.json'));



const getIndex = (req, res) => {
	let content = productos.content;
	let boolean = content.length !== 0;
	let { username } = req.user;
	res.render('inicio.handlebars',
		{
			list: content,
			showList: boolean,
			username: username,
		});
}

// Login
const getLogin = (req, res) => {
	if (req.isAuthenticated()) {
		let { username } = req.user;
		res.render('inicio.handlebars', { username });
	} else res.render('login.handlebars');
};
// Signup
const getSignup = (req, res) => res.render('signup.handlebars');

// Process login
const postLogin = (req, res) => {
	let content = productos.content;
	let boolean = content.length !== 0;
	let { username } = req.user;
	res.render('inicio.handlebars',
		{
			list: content,
			showList: boolean,
			username: username,
		});
}

// Process signup
function postSignup(req, res) {
	const { username } = req.user;
	res.render('inicio.handlebars', { username });
}

const getFailLogin = (req, res) => res.render('faillogin.handlebars');
const getFailSignup = (req, res) => res.render('failsignup.handlebars');

// Logout
const getLogout = (req, res) => {
	req.logout(error => { if (error) next(error) });
	res.redirect('/login');
}

const failRoute = (req, res) => res.status(404).render('routing-error');

module.exports = { getIndex, getLogin, getSignup, postLogin, postSignup, getFailLogin, getFailSignup, getLogout, failRoute };