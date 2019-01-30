
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
    
    var Member = [], userID = {};
    
    robot.respond(/START$/i, (res) => {
        
        //user name list
        const userNames = res.message.roomUsers.map(user => `${user.name}`);
        
        for (let count = 0; count < userNames.length; count++){
                
                // 各メンバーに対応するnumber割り当て　& インスタンス化作成 //
                userID[userNames[count]] = count;
                Member[count] = new Person();
                Member[count].task_list = [];
        }
        
        res.send ('[タスク登録]は "目標: ○○"と入力してください。' + '\n'
                            + '(タスクは5個までしか登録できません。)');
        //console.log ( Member[0].point);
    });
    
    //Member[userID[res.message.user.name]].point += 1;
    
    robot.respond(/目標:(.*)$/i, (res) => {
        
        // ユーザー識別番号をuser_numberに代入 //
        const user_number = userID[res.message.user.name];
                  
        if (Member[userID[res.message.user.name]].task_number < 5) { // 未達成タスクが5個未満 //
                  
                  const current_task = Member[userID[res.message.user.name]].task_number;
                  const total_task = Member[userID[res.message.user.name]].task_total;
                  
                  // タスク送信者のtask_listに追加 //
                  Member[userID[res.message.user.name]].task_list.push( {ID: total_task, content: res.match[1], flag: "false"});
                  Member[userID[res.message.user.name]].task_number += 1;
                  Member[userID[res.message.user.name]].task_total += 1;
                  res.send (Member[user_number].task_list[total_task]['content'] + 'をタスク登録しました。');
                  //console.log (Member[user_number].task_list[total_task]);
        }
        else { // 未達成タスクが5個以上 //
                  
                  res.send ('これ以上タスクを登録できません。(現在5個)' + '\n' +
                            'まずは今登録しているタスクを消費しましょう!');
        }
    });
};

