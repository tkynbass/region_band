'use strict';

module.exports = (robot) =>{
  robot.respond(/日報$/i, (res) => {
    var number_of_menbers = 5;
    var point_msg = [];
    var rank_msg = [];
    var task = ["コーヒーを飲む", "皿を洗う", "新聞を読む", "机を片付ける", "服をたたむ"]
    var point = [10,30,50,20,40];
    var point_sort = point.slice().sort(
      function(a,b){
        return (a < b ? 1 : -1);
      }
    );
    var id = 0;
    
    var output_tasks = () => {
      res.send(task.join("\n"));
    }

    var output_points = () => {
      for (id = 0; id < number_of_menbers; id++){
        var point_msg_each = "ユーザ" + id + "の得点は" + point[id] + "です";
        point_msg.push(point_msg_each);
      }
      res.send(point_msg.join("\n"));
    }
    
    var output_rank = () => {
      for (var id = 0; id < number_of_menbers; id++){
        var rank = point_sort.indexOf(point[id]) + 1;
        var rank_msg_each = "ユーザ" + id + "の順位は" + rank + "位です";
        rank_msg.push(rank_msg_each);
      }
      res.send(rank_msg.join("\n"));
    }
    
    output_tasks();  
    output_points();
    output_rank();
  })
};
  