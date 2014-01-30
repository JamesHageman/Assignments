window.RootComponent = React.createClass({
	render: function () {
		return (
			<div>
				<header className="container">
					<h1>Assignments</h1>
				</header>
				<hr/>
				<AppRouter/>
				<hr/>
				<footer className="container">
					<small>2014 James Hageman</small>
				</footer>
			</div>
		);
	}
});