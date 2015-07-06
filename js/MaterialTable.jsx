var React = require('react');
var cx = require("classnames");
var util = require("./util");

var MaterialRow = React.createClass({
  getInitialState:function(){
    return {point: this.props.point};
  },
  handleTDClick:function(num){
    var input = React.findDOMNode(this.refs["p"+num]);
    if(!input.checked){
      this.props.handleClick(this.props.item,num);
    }else{
      this.props.handleClick(this.props.item,-1);
    }

  },
  render:function(){
    var item = this.props.item;
    var map = this.props.map;

    var point = this.props.point;
    // "id": 134,
    // "title": "螃蟹",
    // "track_id": 212634641,
    // "author_name": "創作人：青春笑捻夢  詞/曲：莊凱程",
    // "desc": "在台灣的勞動市場裡，有太多不是努力就能有希望的事，\n熱愛台灣的我們，也只能在繼續努力之餘，\n用首歌博君一笑，順便用螃蟹的螯夾一下可愛的台灣老闆們。\n",
    // "lyrics": "今天晚上下班還有⼀一點時間 我想去逛街\n今天晚上下班還有⼀一點時間 我想去吃螃蟹\n從未來來的未來叫我不要 不能去逛街\n他說該研究投資還要留⼀一點錢 不然他很可憐\n房地產正夯利息也不會太貴 應該趕緊兼差賣屁股賺點錢\n\n可不可以 努力上班就可以\n不用管 黃金現在幾塊銀\n不用怕 股市現在正慘兮兮\n可不可以 不用想房子要買哪裡\n還是 車子要買幾ＣＣ\n包包要不要背ＧＵＣＣＩ\n可不可以 照媽媽說的做就可以\n不用想拯救那些非洲難民\n不用管北極還有沒有冰\n",
    // "vote_count": 111,
    // "official_url": "",
    // "winners": false
    var comp = this;

    var disabled = this.props.disabled;

    var detail = null;
    return (
      <tr className="song">
        <td>
          #{item.id} {item.title}<br />
          {item.author_name} <br />
          <a target="_blank" href={
            "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"+
            item.track_id +"&amp;auto_play=true"}>在新視窗播放</a>
        </td>
        <td >{item.vote_count}</td>
        {
          [5,4,3,2,1].map(function(index){
            var dis = disabled[index] == 2 && point != index;
            return (
              <td className={cx({lock:dis})} 
                onClick={comp.handleTDClick.bind(this,index)} style={{cursor:"pointer"}}>
                <input diabled={dis}  ref={"p"+index} type="checkbox" checked={point == index} value="" /></td>
              );
          })
        }
      </tr>
    );
  }
})

var MaterialTable = React.createClass({
  getInitialState:function(){
    return {
      // vote:{},
      vote:this.props.vote || {},
      button:"送出"
    };
  },
  onSongVote:function(sing,point){
    var check = 0;
    if(point == -1){
      var vote = this.state.vote;
      delete vote[sing.track_id];
      this.setState({vote:vote});
      return true;      
    }
    for(var k in this.state.vote){
      if(this.state.vote[k] == point){
        check++;
      }
    }
    if(check == 2){
      alert("已有兩首評為 " + point + " 分的歌，請先取消舊的再選擇");
      return false;
    }
    var vote = this.state.vote;
    vote[sing.track_id] = point;
    this.setState({vote:vote});
    console.log(arguments);
  },
  onSubmit:function(){
    var comp = this;
    var materials = this.props.songs;
    var lock_grid = {
      1:0,
      2:0,
      3:0,
      4:0,
      5:0
    };
    for(var k in this.state.vote){
      lock_grid[this.state.vote[k]]++;
    }

    var vote = this.state.vote;

    var songs = {}; 

    for(var i = 0 ; i < materials.length ;++i){
      songs[materials[i].track_id] = materials[i];
    }

    var selecteds = [];
    for(var k in vote){
      selecteds.push({name:"#"+songs[k].id+" "+songs[k].title,point:vote[k]});
    }

    var all_selected = true;
    for(var i =1 ; i <= 5;++i){
      if(lock_grid[i] != 2){
        all_selected = false;
      }
    }
    if(!all_selected){
      // alert("請先選完十首評分歌曲。");
      // return true;
    }

    this.setState({button:"送出中，請稍後"});



    $.ajax({
      type: 'POST',
      headers: {'X-Parse-Application-Id':'BVMiiOrTCynefil7p2yRQpjIRhYQElfiAHXtByjs',
        'X-Parse-REST-API-Key':'xJXfAjz4Ll2YHmriuILSOXO9HXxD1M3SmxeaZ8kt'},
      url: "https://api.parse.com/1/functions/v",
      data: JSON.stringify({uID: this.props.user.objectId,
        vote:this.state.vote}),
      contentType: "application/json"
    }).then(function(data){
      if(data.result.ok){
        comp.setState({button:"已完成"});
        alert("已送出完成，至最終結果前仍然可以用本連結修正您的評分。");
      }else{
        comp.setState({button:"送出時發生錯誤"});
      }
    });


  },
  render: function() {
    var comp = this;
    var materials = this.props.songs;

    var max_20 = [];
    materials.sort(function(s1,s2){
      return s2.vote_count - s1.vote_count;
    })

    max_20 = materials.slice(0,20);
    
    var lock_grid = {
      1:0,
      2:0,
      3:0,
      4:0,
      5:0
    };
    for(var k in this.state.vote){
      lock_grid[this.state.vote[k]]++;
    }

    var vote = this.state.vote;

    var songs = {};

    for(var i = 0 ; i < materials.length ;++i){
      songs[materials[i].track_id] = materials[i];
    }

    var selecteds = [];
    for(var k in vote){
      selecteds.push({name:"#"+songs[k].id+" "+songs[k].title,point:vote[k]});
    }

    var all_selected = true;
    for(var i =1 ; i <= 5;++i){
      if(lock_grid[i] != 2){
        all_selected = false;
      }
    }

    var res = (
      <div>
        <p></p>
        <p>{this.props.user.name } 老師的評分單</p>
        <p></p>
        <table style={{width:'100%','padding-left':'20px','padding-right':'20px'}} className="table table-bordered col-xs-12">
          <tbody>
            <tr >
              <td width="30%">#編號 名稱</td>
              <td  width="10%">網友票數</td>
              <td  width="10%">評分 5 </td>
              <td  width="10%">評分 4 </td>
              <td  width="10%">評分 3 </td>
              <td  width="10%">評分 2 </td>
              <td  width="10%">評分 1 </td>
            </tr>
          </tbody>
          {
            max_20.map(function(s){
              return <MaterialRow disabled={lock_grid} handleClick={comp.onSongVote} point={vote[s.track_id] == null ? -1 : vote[s.track_id]} item={s} key={s.id} /> 
            })
          }
        </table>
        {all_selected?"":"（請先選好評分歌曲）"}
        <br />
        <button onClick={this.onSubmit} className="btn btn-disable">{this.state.button}</button>
      </div>
    );
    return res;
  }
});

module.exports = MaterialTable;
