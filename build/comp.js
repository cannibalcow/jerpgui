"use strict";

var Component = React.createClass({
    displayName: "Component",

    render: function render() {
        var data = this.props.data;
        if (data == null) {
            return React.createElement(
                "p",
                null,
                "..."
            );
        }
        if (data.information == null) {
            data.information = { informations: [] };
        }
        if (data.technicalData == null) {
            data.technicalData = [];
        }

        if (data.suppliers == null) {
            data.suppliers = [];
        }

        console.log(data);

        return React.createElement(
            "div",
            { className: "row" },
            React.createElement(
                "h1",
                { className: "page-header" },
                data.name
            ),
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-md-12 " },
                    React.createElement(
                        "dl",
                        { className: "dl-horizontal well" },
                        React.createElement(
                            "dt",
                            null,
                            "Quantity:"
                        ),
                        React.createElement(
                            "dd",
                            null,
                            data.quantity
                        ),
                        React.createElement(
                            "dt",
                            null,
                            "Description:"
                        ),
                        React.createElement(
                            "dd",
                            null,
                            data.description
                        ),
                        React.createElement(
                            "dt",
                            null,
                            "Manufacturer:"
                        ),
                        React.createElement(
                            "dd",
                            null,
                            data.manufacturer
                        )
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-md-4" },
                    React.createElement(Information, { info: data.information.informations })
                ),
                React.createElement(
                    "div",
                    { className: "col-md-4" },
                    React.createElement(TechInfo, { tech: data.technicalData })
                ),
                React.createElement(
                    "div",
                    { className: "col-md-4" },
                    React.createElement(Supplier, { data: data.suppliers })
                )
            )
        );
    }
});

var Supplier = React.createClass({
    displayName: "Supplier",

    render: function render() {
        return React.createElement(
            "div",
            null,
            this.props.data.map(function (sup, i) {
                return React.createElement(
                    "ul",
                    { className: "list-group" },
                    React.createElement(
                        "li",
                        { key: sup.name, className: "list-group-item active" },
                        sup.name
                    ),
                    sup.attributes.map(function (attr) {
                        return React.createElement(
                            "li",
                            { className: "list-group-item", key: attr.key },
                            React.createElement(
                                "div",
                                { className: "row" },
                                React.createElement(
                                    "div",
                                    { className: "col-md-2" },
                                    React.createElement(
                                        "strong",
                                        null,
                                        attr.key
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-md-10" },
                                    attr.value
                                )
                            )
                        );
                    })
                );
            })
        );
    }
});

var TechInfo = React.createClass({
    displayName: "TechInfo",

    render: function render() {
        if (this.props.tech == null) {
            return React.createElement(
                "p",
                null,
                "N/A"
            );
        } else {
            return React.createElement(
                "ul",
                { className: "list-group" },
                React.createElement(
                    "li",
                    { className: "list-group-item active" },
                    "Technical Data"
                ),
                this.props.tech.map(function (item) {
                    return React.createElement(
                        "li",
                        { className: "list-group-item", key: item.key },
                        React.createElement(
                            "div",
                            { className: "row" },
                            React.createElement(
                                "div",
                                { className: "col-md-6 " },
                                React.createElement(
                                    "strong",
                                    null,
                                    item.key
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-6" },
                                item.value
                            )
                        )
                    );
                })
            );
        }
    }

});

var Information = React.createClass({
    displayName: "Information",

    render: function render() {
        return React.createElement(
            "ul",
            { className: "list-group" },
            React.createElement(
                "li",
                { className: "list-group-item active" },
                "Information"
            ),
            this.props.info.map(function (item) {
                return React.createElement(
                    "li",
                    { key: item, className: "list-group-item" },
                    item
                );
            })
        );
    }
});

var Search = React.createClass({
    displayName: "Search",

    handleChange: function handleChange(e) {
        this.setState({ search: e.target.value });
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        this.props.onSearchSubmit(this.state.search);
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "form",
                { className: "navbar-form navbar-right", id: "search", method: "post", onSubmit: this.handleSubmit },
                React.createElement("input", { type: "text", className: "form-control", onChange: this.handleChange, placeholder: "Search..." }),
                " ",
                React.createElement("input", { type: "submit" })
            )
        );
    }
});