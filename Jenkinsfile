#!groovy

if (BRANCH_NAME.startsWith('PR-')) 
{
  // don’t build pr-branches
  return 0
}

node('linux')
{
    println "BRANCH_NAME ${BRANCH_NAME}"
    
    stage('Check Out') 
	{
        checkout scm
    }

    stage('Build/Test') 
	{
        sh 'npm install'
        sh 'npm test'
        sh 'npm run validate'
    }

    if (env.BRANCH_NAME != 'master') 
    {
        return 0;
    }
	
	stage('Sonarqube Scan') 
    {
        sh 'chmod +x sonarRunner.js'
        sh 'npm run sonarscan'
    }

   stage('Deploy DevQA') 
    {           
        sh 'npm run packageDevQA'
        sh 'npm run deployDevQA'
        sh 'npm run e2eDevQA'       
    }

    stage('deploy Integration') 
	{
        input 'deploy to Integration?'
        sh 'npm run packageIntegration'
        sh 'npm run deployIntegration'        
    }

    stage('deploy Production') 
	{
        input 'deploy to Production?'        
        sh 'npm run packageProduction'
        sh 'npm run deployProduction'
    }

}
