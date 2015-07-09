var React = require('react');
var cx = require("classnames");
var util = require("./util");

var ScoreRow = React.createClass({
  getInitialState:function(){
    return {};
  },
  render:function(){
    var item = this.props.item;
    var votes = this.props.votes;

    var comp = this;

    var detail = null;
    return (
      <tr className="song">
        <td>
          #{item.id} {item.title}<br />
        </td>
        <td>{item.author_name} </td>
        <td >{item.vote_count} (#{item.vote_index})</td>
        <td> {item.admin_sum} (#{this.props.index}) </td>
        {
          votes.map(function(v){
            return (<td className={cx({empty:v.data[item.track_id] == null})}>{v.data[item.track_id]}</td>);
          })
        }
      </tr>
    );
  }
})
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};
var MaterialTable = React.createClass({
  mixins: [SetIntervalMixin], // Use the mixin
  getInitialState:function(){
    return {
      // vote:{},
      votes:this.props.votes || {},
      button:"送出"
    };
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 3000); // Call a method on the mixin
  },
  tick: function() {
    var getParam = function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    var comp = this;

    $.ajax({
      type: 'POST',
      headers: {'X-Parse-Application-Id':'BVMiiOrTCynefil7p2yRQpjIRhYQElfiAHXtByjs',
        'X-Parse-REST-API-Key':'xJXfAjz4Ll2YHmriuILSOXO9HXxD1M3SmxeaZ8kt'},
      url: "https://api.parse.com/1/functions/q",
      data: JSON.stringify({uID: getParam("q")}),
      contentType: "application/json"
    }).then(function(data){
      comp.setState({votes:data.result.votes});
    });
  },
  render: function() {
    var comp = this;
    var materials = this.props.songs;

    materials.sort(function(s1,s2){
      return s2.vote_count - s1.vote_count;
    });

    util.each(materials,function(m,ind){
      m.vote_index = ind +1;
    });

    var max_20 = materials;
    
    var votes = this.state.votes;
    votes.sort(function(v1,v2){
      return v1.user.charCodeAt(0) - v2.user.charCodeAt(0);
    });

    util.each(max_20,function(song){
      var sum = 0 ;
      for(var i = 0 ; i < votes.length;++i){
        var point = votes[i].data[song.track_id];
        if(point!= null){
          sum += parseInt(point,10);
        }
      }
      song.admin_sum = sum;
    });

    materials.sort(function(s1,s2){
      return s2.admin_sum - s1.admin_sum;
    });

    var songs = {};

    for(var i = 0 ; i < materials.length ;++i){
      songs[materials[i].track_id] = materials[i];
    }

    var res = (
      <div>
        <p></p>
        <p>評審狀態 ( {votes.length} / 14 ) </p>
        <p></p>
        <table style={{width:'100%','padding-left':'20px','padding-right':'20px'}} className="table table-bordered col-xs-12">
          <tbody>
            <tr >
              <td width="10%">#編號</td>
              <td  width="20%">名稱</td>
              <td  width="10%">網友票數</td>
              <td  width="10%">評審總分</td>
              {votes.map(function(vote){
                return (<td > 評審 {vote.user} </td>);
              })}
            </tr>
          </tbody>
          {
            max_20.map(function(s,ind){
              return <ScoreRow index={ind+1} votes={votes} item={s} key={s.id} /> 
            })
          }
        </table>
      </div>
    );
    return res;
  }
});

module.exports = MaterialTable;
