//note at this point I suck at node and keep forgetting that to run .js files in node, you need to do "node index.js"

var login = require("facebook-chat-api");
var prompt = require('prompt');

var schema = {
    properties: {
      email: {
        required: true
      },
      pass: {
        required: true,
        hidden: true
      },
      chatname: {
        required: true,
      },
      colorvalue: {
        required: true,
      }
    }
  };

  prompt.start();

  prompt.get(schema, function (err, result) {
    console.log('Command-line input received:');
    console.log('  email: ' + result.email);
    console.log('  password: ********');
    login({email: result.email, password: result.pass}, function callback (err, api) {
    if(err) return console.error(err);
    
    api.getUserID(result.chatname, function(err, data) {
        if(err) return callback(err);

        // Send the message to the best match (best by Facebook's criteria)
        var threadID = data[0].userID;
        api.changeThreadColor(result.colorvalue, threadID, function callback(err) {
            if(err) {
                return console.error(err);
            }
        });
    });

    // api.searchForThread("Mobile Lab Group", function(err, data) {
    //     if(err) return callback(err);

    //     // Send the message to the best match (best by Facebook's criteria)
    //     var threadID = data[0].threadID;
    //     console.log(threadID);
    //     api.changeThreadColor("#FFFFFF", threadID, function callback(err) {
    //         if(err) {
    //             return console.error(err);
    //         }
    //     });
    // });
    });
  });

