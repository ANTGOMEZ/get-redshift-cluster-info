'use strict';

const aws = require('aws-sdk');
const assert = require("chai").assert;

aws.config.update({ region: 'us-east-1' });
const credentials = new aws.SharedIniFileCredentials({ profile: 'devqa' }); //devqa for release

aws.config.credentials = credentials;

const handler = require ('../../src/index.js');

 describe('Testing Redshift Get Info Lambda Function', function () 
 {
    this.timeout(30000);       
    it('full get rs info test', async function () 
    {
        try 
        {           
            handler.handler();            
        }//try
        catch (ex) 
        {
            throw ex;
        }

    });//it

});//describe 
