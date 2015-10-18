var Component = React.createClass({
	render: function(){
		var data = this.props.data;
        if(data == null) {
            return (<p>...</p>)
        }
        if(data.information == null) {
            data.information = {informations: []};
        }
        if(data.technicalData == null){ 
            data.technicalData=[];
        }

        if(data.suppliers == null)  {
            data.suppliers = [];
        }

        console.log(data);

        return (
         <div className="row">
                <h1 className="page-header">{data.name}</h1>

            <div className="row">
                <div className="col-md-12 ">
                    <dl className="dl-horizontal well">
                      <dt>Quantity:</dt>
                      <dd>{data.quantity}</dd>
                      <dt>Description:</dt>
                      <dd>{data.description}</dd>
                      <dt>Manufacturer:</dt>
                      <dd>{data.manufacturer}</dd>
                    </dl>
                </div>
            </div>

            <div className="row">
                 <div className="col-md-4">
                     <Information info={data.information.informations}/>
                 </div>
                 <div className="col-md-4">
                     <TechInfo tech={data.technicalData}/>
                </div>
                <div className="col-md-4">
                    <Supplier data={data.suppliers}/>
                </div>
            </div>
         </div>
         );
    }
});

var Supplier = React.createClass({
    render: function() {
      return (
             <div >
                    {this.props.data.map(function(sup, i){
                       return ( 
                        <ul className="list-group">
                            <li key={sup.name} className="list-group-item active">{sup.name}</li>
                            {sup.attributes.map(function(attr) {
                                return (
                                    <li className="list-group-item" key={attr.key}>
                                        <div className="row">
                                            <div className="col-md-2"><strong>{attr.key}</strong></div>
                                            <div className="col-md-10">{attr.value}</div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        )
                    })}
            </div>
        )
    }
});

var TechInfo = React.createClass({
    render: function() {
        if(this.props.tech == null) {
            return (<p>N/A</p>)
        } else {
            return (
                <ul className="list-group"> 
                <li className="list-group-item active">Technical Data</li>
                {this.props.tech.map(function(item){
                    return (<li className="list-group-item" key={item.key}>
                        <div className="row">
                        <div className="col-md-6 "><strong>{item.key}</strong></div>
                        <div className="col-md-6">{item.value}</div>
                        </div>
                        </li> )
                })}
                </ul>     
                )   
        }     
    }

});

var Information = React.createClass({
    render: function() {
        return (
            <ul className="list-group"> 
            <li className="list-group-item active">Information</li>
            {this.props.info.map(function(item){
                return (<li key={item} className="list-group-item">{item}</li> )
            })}
            </ul>      
            )
    }
});

var Search = React.createClass({
	handleChange: function(e) {
		this.setState({search: e.target.value});
	},
	handleSubmit: function(e) {
       e.preventDefault();
       this.props.onSearchSubmit(this.state.search);
   },
   render: function() {
      return (
         <div>
         <form className="navbar-form navbar-right" id="search" method="post" onSubmit={this.handleSubmit}>
         <input type="text" className="form-control" onChange={this.handleChange} placeholder="Search..."/> <input type="submit"/>	
         </form>
         </div>
         )
  }
});

