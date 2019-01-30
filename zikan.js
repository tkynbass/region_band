'use strict';

var syugyou=0;

var time=new Date();
module.exports = (robot) => {
    //robot.respond(/PING$/i, (res) => {
    //console.log(robot.brain.rooms());
  //});
  if(time.getHours()==9 && syugyou==0){
    //robot.send({room:'_200261188_-1530920960'},{text:'hello'});//複数
    //robot.send({room:'_131349001_1447034880'},{text:'hello'});//複数
    robot.send({room:'_200264273_-599785472'},{text:'9時だよ'});//user003とのトーク
    //robot.send({room:'_200275217_574619648'},{text:'hello'});//何も起こらない
    syugyou=1;
  }else if(time.getHours()==17 && syugyou==1){
    robot.send({room:'_200264273_-599785472'},{text:'17時だよ'});//user003とのトーク
  }
}
