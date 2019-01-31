'use strict';

class Person {
    
  //task_list = [];
  
  constructor (user_name) {
      this.point = 0.0;
      // 未達成タスクの個数 //
      this.task_number = 0;
      // これまでインプットされたタスクの個数 //
      this.task_total = 0;
      this.name = user_name;
  }
}

module.exports = (robot) => {

    var Member = [], userID = {};
    var employment = false;
    var time=new Date();
    
    if(time.getHours() === 9 && employment === false){
        robot.send({room:'_200264273_-599785472'},{text:'9時です。今日も1日頑張りましょう！'});//user003とのトーク
        employment = true;
    }else if(time.getHours() === 17 && employment === true){
        robot.send({room:'_200264273_-599785472'},{text:'17時です。今日も1日お疲れ様でした！'});//user003とのトーク
        employment = false;
    }
    
    robot.hear(/START$/i, (res) => {
        
        //user name list
        const userNames = res.message.roomUsers.map(user => `${user.name}`);
        
        for (let count = 0; count < userNames.length; count++){
                
                // 各メンバーに対応するnumber割り当て　& インスタンス化作成 //
                userID[userNames[count]] = count;
                Member[count] = new Person(userNames[count]);
                Member[count].task_list = [];
        }
        
        res.send ('[タスク登録]は "目標: ○○"と入力してください。');
        console.log ( userNames);
        
    });
    
    //Member[userID[res.message.user.name]].point += 1;
    robot.hear(/目標:(.*)$/i, (res) => {
        
        const user_number = userID[res.message.user.name];
                  
        if (Member[userID[res.message.user.name]].task_number < 5 && res.match[1] !== '') { // 未達成タスクが5個未満 //
            const current_task = Member[userID[res.message.user.name]].task_number;
            const total_task = Member[userID[res.message.user.name]].task_total;    
                  // タスク送信者のtask_listに追加 //
            Member[userID[res.message.user.name]].task_list.push( {ID: total_task, content: res.match[1], flag: false});
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
    
    robot.hear(/DONE$/i, (res) => {
        const total_task = Member[userID[res.message.user.name]].task_total;
        var task_undone = []; //未完了タスク
        //未完了タスクの抽出
        for(let k = 0; k < total_task; k++){
            if(Member[userID[res.message.user.name]].task_list[k]['flag'] === false){
                task_undone.push(Member[userID[res.message.user.name]].task_list[k]);
           }
        }
        console.log(task_undone);
        var task_undone_content = task_undone.map(function(value){return value['content']});
        var task_undone_flag = task_undone.map(function(value){return value['flag']});
        var task_undone_ID = task_undone.map(function(value){return value['ID']});
        res.send({
            question: '完了したタスクを選んでください。',
            options: task_undone_content,
            onsend: (sent, msg) => {
                 robot.brain.set(`_${msg.id.high}_${msg.id.low}`, 'タスク完了処理をしました。偉業！');
                 robot.brain.set('task_user', Member[userID[res.message.user.name]]);
                 console.log(msg.id);
                 //Member[userID[res.message.user.name]].task_list[sent.message.id]['flag'] = true; //フラグの更新
            }
        });
    });
    
    //セレクトスタンプでの選択後の処理
    robot.hear('select', (res) => {
        //res.send(robot.brain.get(res.json.in_reply_to)); //onsendのメッセージの表示
        var taskUserName = robot.brain.get('task_user');
        console.log(robot.brain.get('task_user'));
        res.send({
            question: robot.brain.get(res.json.in_reply_to),
            options: ['イイネ！'],
            onsend: (sent) => {
                taskUserName.point += 1.0; //ポイント加算
            }
        });
    });

  robot.respond(/CLOSE$/i, (res) => {
    res.send({
      close_select: sent.message.id
    });
  });

  robot.respond(/TIME$/i, (res) => {
    res.send(`Server time is: ${new Date()}`);
  });

    robot.hear(/日報$/i, (res) => {
                
        const userNames = res.message.roomUsers.map(user => `${user.name}`);
        //const total_task = Member[userID[res.message.user.name]].task_total;
        var number_of_menbers = userNames.length;
        var point_msg = [], rank_msg = [], point = [];
        // point 配列作成 //
        for (var id = 0; id < userID; id ++){
               
            point.push (Member[id].point);
        }
        var point_sort = point.slice().sort(
            function(a,b){
                return (a < b ? 1 : -1);
            }
        );
        
        
        var id = 0;
          
        var output_tasks = () => {
            
            for (var id = 0; id < number_of_menbers; id ++){
               
               if (Member[id].task_total !== 0){
                   var final_task = [];
                   for(let k = 0; k < Member[id].task_total; k++){
               
                        if (Member[id].task_list[k]['flag'] === false) {
                            var final_task_each = Member[id].task_list[k]['content'];
                            final_task.push(final_task_each);
                        }
                   }
                   res.send(Member[id].name + "の残りタスクは\n" + final_task.join("\n")  + "です");
               }
            }
        }
          
        var output_points = () => {
            
            for (id = 0; id < number_of_menbers; id++){
               
               if (Member[id].name !== 'もってぃーくん'){
                   var point_msg_each = Member[id].name + "の得点は" + Member[id].point + "です";
                   point_msg.push(point_msg_each);
               }
            }
            res.send(point_msg.join("\n"));
        }
          
        var output_rank = () => {
            for (var id = 0; id < number_of_menbers; id++){
               
               if (Member[id].name !== 'もってぃーくん'){
                   var rank = point_sort.indexOf(Member[id].point) + 1;
                   var rank_msg_each = Member[id].name + "の順位は" + rank + "位です";
                   rank_msg.push(rank_msg_each);
               }
            }
            res.send(rank_msg.join("\n"));
        }
          
        output_tasks();
        output_points();
        output_rank();
    })
  
};
