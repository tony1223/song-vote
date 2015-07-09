var React = require('react');
var cx = require("classnames");

var materialDatas = require("./songs");
var ScoreTable = require("./ScoreTable.jsx");

var getParam = function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

$.ajax({
  type: 'POST',
  headers: {'X-Parse-Application-Id':'BVMiiOrTCynefil7p2yRQpjIRhYQElfiAHXtByjs',
  	'X-Parse-REST-API-Key':'xJXfAjz4Ll2YHmriuILSOXO9HXxD1M3SmxeaZ8kt'},
  url: "https://api.parse.com/1/functions/q",
  data: JSON.stringify({uID: getParam("q")}),
  contentType: "application/json"
}).then(function(data){
	if(data.result.votes != null){
		React.render((
			<div className="">
			    <ScoreTable votes={data.result.votes} songs={materialDatas} />
		 	</div>
		),document.getElementById("react-root"));
	}else{
		alert("您沒有權限存取本頁");
	}
});

