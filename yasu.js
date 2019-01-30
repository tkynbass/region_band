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
        
        res.send ('[タスク登録]は "目標: ○○"と入力してください。');
        //console.log ( Member[0].point);
    });
    
    //Member[userID[res.message.user.name]].point += 1;
    
    robot.respond(/目標:(.*)$/i, (res) => {
        
        const user_number = userID[res.message.user.name];
                  
        if (Member[userID[res.message.user.name]].task_number < 5) { // 未達成タスクが5個未満 //
                  
            const current_task = Member[userID[res.message.user.name]].task_number;
            const total_task = Member[userID[res.message.user.name]].task_total;
                  
                  // タスク送信者のtask_listに追加 //
            Member[userID[res.message.user.name]].task_list.push( {ID: total_task, content: res.match[1], flag: "false"});
            Member[userID[res.message.user.name]].task_number += 1;
            Member[userID[res.message.user.name]].task_total += 1;
            res.send (Member[user_number].task_list[total_task]['content'] + 'をタスク登録しました。');
            console.log (Member[user_number].task_list[total_task]);
        }
        else { // 未達成タスクが5個以上 //
                  
            res.send ('これ以上タスクを登録できません。(現在5個)' + '\n' +
                            'まずは今登録しているタスクを消費しましょう!');
        }
    });

  robot.respond(/PING$/i, (res) => { //bot確認用
    res.send('PONG');
  });

  robot.hear(/DONE/, (res) => {
    var task_undone = []; //未完了タスク
    //未完了タスクの抽出
    for(let k = 0; k < total_task; k++){
      if(Member[userID[res.message.user.name]].task_list[k]['flag'] === false){
        task_undone.push(Member[userID[res.message.user.name]].task_list[k]['content']);
      }
    }
    
    res.send({
      question: '完了したタスクを選んでください。',
      options: task_undone,  //ここで未完了タスクをセレクトスタンプで表示させたいけどできない、??
      // options: [選択肢1,選択肢2,選択肢3],　　だと行けるのだけど、、
      onsend: (sent, msg) => {
        robot.brain.set(`_${msg.id.high}_${msg.id.low}`, 'タスク完了処理をしました。おめでとう！');
      }
    });
  });

  //セレクトスタンプでの選択後の処理
  robot.hear('select', (res) => {
    res.send(robot.brain.get(res.json.in_reply_to)); //onsendのメッセージの表示
    // flag の更新処理をここに記述したい
  });


  robot.respond(/CLOSE$/i, (res) => {
    res.send({
      close_select: sent.message.id
    });
  });

  robot.respond(/TIME$/i, (res) => {
    res.send(`Server time is: ${new Date()}`);
  });
  
};