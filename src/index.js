//function takes an Event of the following format:
/*
{
    "cluster_name" : "value",    //The ClusterIdentifier Prefix or Full id for which to get data
    "json_query" : "value",      //A json query per this specification: https://www.npmjs.com/package/jsonpath, will return the value at the query point.
    "return_full_type" : "value" //This can be one of the following values: all(returns all clusters that match), latest(return only the latest of the matching clusters), null (if passing this in then you must provide a json_query value)
}
*/
//
'use strict';

const aws = require('aws-sdk');
var jp = require('jsonpath');

console.log('Loading bi-get-redshift-cluster-info...');

exports.handler = async function (event, context)
{   
    try 
    {
        //const clust_name = 'release-admin';
        //const query = '$.Endpoint.Address';
        //const return_full_type = 'latest';        

        const redshift = new aws.Redshift();

        var clusters = await redshift.describeClusters({}).promise();

        var clusts = clusters.Clusters.filter(clust => { return clust.ClusterIdentifier.startsWith(event.cluster_name)});

        var cluster = clusts.sort(function(a, b) { return b.ClusterCreateTime - a.ClusterCreateTime ;});

        if (event.return_full_type == 'all')
        {
            return JSON.stringify(cluster);
            //console.log(JSON.stringify(cluster));
        }
        else if (event.return_full_type == 'latest')
        {
            return JSON.stringify(cluster[0]);
            //console.log(JSON.stringify(cluster[0]));
        }       
        else
        {
            return jp.query(cluster[0], event.json_query)[0];
            //console.log(jp.query(cluster[0], event.json_query)[0]);
        }
    }
    catch(ex)
    {
        throw ex;
    }
};

