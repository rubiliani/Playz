var gcm = require('node-gcm');

module.exports GCM = function(){
  
  var message = new gcm.Message(); 
  var sender = new gcm.Sender('AIzaSyA3QmsDW_2JMTJP3rIIVJZR0ADHhGrN9B4');
  var message_id = 123;
  var reg_id = "abc";

  message.addData('title', 'Playz');
      message.addData('message', 'New Invetation');
      message.addData('_id', message_id);

      message.delay_while_idle = 1;
      sender.sendNoRetry(message, reg_id, function(err, sentResult)
      {
          if(err)
          {
              console.log(err);
          }
          else
          {
              console.log(sentResult);
          }
      });
  // check by timestamp day before message and dayBefore bool
  


  //message.addData('notId', new Date().getTime());
  //message.addData('style', "inbox");
  //message.addData('summaryText', "There are %n% notifications");
  // message.addData('actions', [
  //       { icon: "emailGuests", title: "EMAIL GUESTS", callback: "app.emailGuests"},
  //       { icon: "snooze", title: "SNOOZE", callback: "app.snooze"},
  //   ]);
}