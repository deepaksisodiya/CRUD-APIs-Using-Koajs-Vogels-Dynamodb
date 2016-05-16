/**
 * Created by deepaksisodiya on 15/05/16.
 */


import vogels from 'vogels';

vogels.AWS.config.update({region: "ap-northeast-1"});

const AWS = vogels.AWS;
const opts = {endpoint: 'http://localhost:8000', apiVersion: '2012-08-10'};
const driver = new AWS.DynamoDB(opts);
vogels.dynamoDriver(driver);

import Joi from 'joi';

let User = vogels.define('User', {
  hashKey: 'userId',
  schema: {
    userId: vogels.types.uuid(),
    name: Joi.string(),
    location: Joi.string()
  }
});

export default User;