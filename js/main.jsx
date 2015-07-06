var React = require('react');
var cx = require("classnames");

var materialDatas = require("./songs");
var MaterialTable = require("./MaterialTable.jsx");


React.render((
	<div className="container">
	    <MaterialTable songs={materialDatas} />
 	</div>
),document.getElementById("react-root"));
