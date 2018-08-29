# get-redshift-cluster-info
**Repo:** *analyze.shared.bi-core-backend-lambda-get-redshift-cluster-info*

---

**Summary:** Lambda function that gets redshift cluster info object (json) and returns the value of the property passed in.

**Detail**
Function takes an Event of the following format:
{
    "cluster_name" : "value",    
    "json_query" : "value",      
    "return_full_type" : "value"                               
}
1. cluster_name: The ClusterIdentifier Prefix or Full id for which to get data
1. json_query: A json query per this specification: [https://www.npmjs.com/package/jsonpath], will return the value at the query point.
1. return_full_type: This can be one of the following values: 
    i. all(returns all clusters that match), 
    i. latest(return only the latest of the matching clusters), 
    i. null (if passing this in then you must provide a json_query value)
