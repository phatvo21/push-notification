#!/bin/bash
mongorestore --host localhost:27017 -u mongo -p mongo --authenticationDatabase admin --nsInclude=notification.* --archive=database/notification.archive --drop --noIndexRestore --numParallelCollections=4 --numInsertionWorkersPerCollection=2
