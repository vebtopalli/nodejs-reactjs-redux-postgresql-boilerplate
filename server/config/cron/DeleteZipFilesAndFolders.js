var CronJob = require('cron').CronJob;


new CronJob( '01 00 * * * * ', function() { // every hour cronjob
  const path=require('path');
  var source=path.join(__dirname,'/../../../uploads');
  const { readdirSync } = require('fs');
  const fs = require('fs');

  const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

  // readdirSync(source).map(name => join(source, name)).filter(isDirectory)


  function createdDate (file) {  
    const { birthtime } = fs.statSync(file)

    return birthtime
  }

  getDirectories(source).map((value,index)=>{
    var folder=source+'/'+value;
    var d1 = new Date();
    var d2 = createdDate(folder);
    var difference = d1.getTime() - d2.getTime(); // This will give difference in milliseconds
    var resultInMinutes = Math.round(difference / 60000);
    if(resultInMinutes>200){

    }
  })
}, null, true, 'Europe/Belgrade');