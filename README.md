# README #

*Resources
**Tags
***http://timschlechter.github.io/bootstrap-tagsinput/examples/
***https://github.com/mizzao/meteor-autocomplete

**Table
***https://github.com/ecohealthalliance/reactive-table

## Backup and restore

### Mac OS X : 
Terminal : 
In your meteor folder type: 

```
sudo meteor mongo
```

It returns : 
```
MongoDB shell version: 2.6.7
connecting to: 127.0.0.1:3001/meteor
```

Then do :
```
use meteor 
```
(because it is the name of the db after the slash)

then do : 
```
show collections
```
### Backup

Your app must be running, so start up your Meteor server.

In a terminal window (NOT in the meteor mongo shell), 
enter: 

Mac : 
```
sudo mongodump -h 127.0.0.1 --port 3001 --out /Users/thomasdokithonon/Dropbox/rationalk/dumps/20150819 --db meteor
```

On a production server using mup :
```
mongodump --db rationalK --out /home/jesa/tests/20150820
```


### Restoring

From a terminal window, enter:

Mac : 
```
mongorestore -h 127.0.0.1 --port 3001 --drop  /Users/thomasdokithonon/Dropbox/rationalK/dumps/20150821/
```

Windows :
```
mongorestore -h 127.0.0.1 --port 3001 --drop  C:/Users/doki/20150820/
```

In terminal type in :
```
meteor mongo --url
```
It return the name of the database : "meteor" so you can use it after the --db option in the following line :
```
"C:\Program Files\MongoDB\Server\3.0\bin\mongorestore.exe" -h 127.0.0.1 --port 3001 --db meteor --drop  C:/Users/doki/20150820/
```
