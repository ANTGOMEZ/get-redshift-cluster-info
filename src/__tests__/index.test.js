// This test uses the jest test runner.
// Documentation can be found here: https://facebook.github.io/jest/

jest.mock('aws-sdk');
jest.mock('pg');

var aws = require('aws-sdk');
var fs = require('fs');
var pg = require('pg');

describe('main handler', () => {
    it('Test 1', () => 
	{
		var index = require('../index');
		
		var event = JSON.parse(fs.readFileSync('./testData/snsEvent.json', 'utf8').trim());
		const context = {};
        const callback = jest.fn();
        
		let actualS3Parameters;
        let actualGetObjectCb;

		// the aws-sdk is mocked out in this unit test on line 1
        aws.S3.mockImplementation(() => 
        {
            return 
            {
                getObject: (parameters, getObjectCb) => 
                {
                    actualS3Parameters = parameters;
                    actualGetObjectCb = getObjectCb;
                }
            }
        });
		
		aws.SSM.mockImplementation(() => {
            return {
                getParameter: (parameter, cb) => {
                    cb(null, { Parameter: { Value: 'Parameter Store Value' } });
                }
            }
        });


		
        index.handler(event, context, callback);


        

    });
});