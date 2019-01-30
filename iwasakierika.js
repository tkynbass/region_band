// Description:
//   Utility commands surrounding Hubot uptime.
//
// Commands:
//   ping - Reply with pong
//   echo <text> - Reply back with <text>
//   time - Reply with current time
'use strict';

// module.exports = (robot) => {
//   robot.respond(/PING$/i, (res) => {
//     res.send('PONG');
//   });

//   robot.respond(/ADAPTER$/i, (res) => {
//     res.send(robot.adapterName);
//   });

//   robot.respond(/ECHO (.*)$/i, (res) => {
//     res.send(res.match[1]);
//   });

//   robot.respond(/TIME$/i, (res) => {
//     res.send(`Server time is: ${new Date()}`);
//   });

  
// };


module.exports = (robot) =>{
  robot.respond(/日報$/i, (res) => {
    var number_of_menbers = 5;
    var point = [10,30,50,20,40];
    var point_sort = point.slice().sort(
      function(a,b){
        return (a < b ? 1 : -1);
      }
    );
    var id = 0;
    for (id = 0; id < number_of_menbers; id++){
      res.send("ユーザ" + id + "の得点は" + point[id] + "です");
    }
    for (var id = 0; id < number_of_menbers; id++){
      var rank = point_sort.indexOf(point[id]) + 1;
      res.send("ユーザ" + id + "の順位は" + rank + "位です");
    }
  })
};
  