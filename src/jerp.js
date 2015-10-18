var Jerp = React.createClass({
	getInitialState: function() {
		return { curComp: {}, compName: "sune" };
	},
	handleSearch: function(search) {
		this.setState({ compName: search });
		this.searchComponent(search);
	},
	componentDidMount: function() {
	    this.searchComponent(this.state.compName);
	},
	searchComponent: function(component) {
		$.ajax({
	      url: "http://localhost:8080/component/" + component,
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	        this.setState({curComp: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	},
	render: function(){
		return (<Component data={this.state.curComp}/>)
	}
});

var jerpApp = ReactDOM.render(<Jerp/>, document.getElementById('main'));
var search = ReactDOM.render(<Search onSearchSubmit={jerpApp.handleSearch}/>, document.getElementById('search') )
