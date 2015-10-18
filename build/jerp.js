"use strict";

var Jerp = React.createClass({
	displayName: "Jerp",

	getInitialState: function getInitialState() {
		return { curComp: {}, compName: "sune" };
	},
	handleSearch: function handleSearch(search) {
		this.setState({ compName: search });
		this.searchComponent(search);
	},
	componentDidMount: function componentDidMount() {
		this.searchComponent(this.state.compName);
	},
	searchComponent: function searchComponent(component) {
		$.ajax({
			url: "http://localhost:8080/component/" + component,
			dataType: 'json',
			cache: false,
			success: (function (data) {
				this.setState({ curComp: data });
			}).bind(this),
			error: (function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}).bind(this)
		});
	},
	render: function render() {
		return React.createElement(Component, { data: this.state.curComp });
	}
});

var jerpApp = ReactDOM.render(React.createElement(Jerp, null), document.getElementById('main'));
var search = ReactDOM.render(React.createElement(Search, { onSearchSubmit: jerpApp.handleSearch }), document.getElementById('search'));