
'use strict'

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
    
    
    
    robot.respond(/START$/i, (res) => {
        
        var userID =　{}, Member = [];
        
        //user name list
        const userNames = res.message.roomUsers.map(user => `${user.name}`);
        
        for (let count = 0; count < userNames.length; count++){
                
                // 各メンバーに対応するnumber割り当て　& インスタンス化作成 //
                userID[userNames[count]] = count;
                Member[count] = new Person();
        }
        
        //console.log ( Member[0].point);
    });
    
    Member[userID[res.message.user.name]].point += 1;
    
    robot.respond(/目標: (.*)$/i, (res) => {
                  
          if (Member[userID[res.message.user.name]].task_number < 5) {
                  
                  // タスク送信者のtask_listに追加 //
                  Member[userID[res.message.user.name]].task_list[ Member[userID[res.message.user.name]].task_total ]
                  = {ID: Member[userID[res.message.user.name]].task_total, content: , flag: False};
                  Member[userID[res.message.user.name]].task_number += 1;
                  Member[userID[res.message.user.name]].task_total += 1;
                  res.send("タスクを登録しました。\n");
          }
    });
};

