'use strict';
class Person {
    
  //task_list = [];
  
  constructor () {
      this.point = 0.0;
      // 未達成タスクの個数 //
      this.task_number = 0;
      // これまでインプットされたタスクの個数 //
      this.task_total = 0;
  }
}

// Person.task_list = [];

module.exports = (robot) => {
  
  var Member = [], userID = {};
  
  robot.respond(/START$/i, (res) => {
      
      //user name list
      // 「userNames」の最後の要素はbotの名前になる
      const userNames = res.message.roomUsers.map(user => `${user.name}`);
      for (let count = 0; count < userNames.length - 1; count++){
              
              // 各メンバーに対応するnumber割り当て　& インスタンス化作成 //
              // userID = {"userNames":0(ID番号)}
              // count = ID番号(int)
              userID[userNames[count]] = count;
              // 
              Member[count] = new Person();
              Member[count].task_list = [];
              // console.log(Member[count].task_list)
      }
      
      res.send ('[タスク登録]は "目標: ○○"と入力してください。' + '\n'
                          + '(タスクは5個までしか登録できません。)');
      // console.log ( Member[0].point);
      console.log(Member[userID[res.message.user.name]]);
    });

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
  