var fs = require('fs');
var path = require('path');

module.exports = {
  index : function(req,res) {
    var logFileName = req.param('filename');
    var locals = {
      log : null,
      files : JSON.stringify(fs.readdirSync(path.join(__dirname, '../../', '/logs'))),
      err : null
    };

    if (logFileName) {
      // read file and send in ejs local var
      try {
        var log = fs
                    .readFileSync(path.join(__dirname, '../../', '/logs', logFileName),'utf-8')
                    .toString().split("\n");;
        // log = JSON.stringify(log);

        locals.log = log;
      }
      catch(e) {
        locals.err = 'Cannot find log file in /logs dir';
      }
    }

    return res.view('homepage', locals);
  }
};
