
'use strict'

class Person {
    
    //task_list = [];
    
    constructor () {
        this.point = 0.0;
        //console.log (this.point);
    }
}

// Person.task_list = [];

module.exports = (robot) => {
    
    
    robot.respond(/START$/i, (res) => {
        
        var userID =　{}, Member = [];
        
        //user name list
        const userNames = res.message.roomUsers.map(user => `${user.name}`);
        
        for (let count = 0; count < userNames.length; count++){
          
                let name = userNames[count];
                userID[name] = count;
                Member[count] = new Person();
        }
        
        //console.log ( Member[0].point);
    });
};

