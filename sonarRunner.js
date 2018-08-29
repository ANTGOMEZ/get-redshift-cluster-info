#!/usr/bin/env node

const package = require('./package.json');
const sonarqubeScanner = require('sonarqube-scanner');
const axios = require('axios');

sonarqubeScanner({
    serverUrl : "http://jenkins-internal.ebiqa.ebscohost.com:9000",
    token : "37326ef3ddbc62ee581d1cd8d23281b4ff7c779e",
    options : {
        "sonar.projectKey": package.name,
        "sonar.sources": "./src",
        "sonar.exclusions": "**/*.test.js,src/coverage/**/*",
        "sonar.javascript.lcov.reportPaths": "./src/coverage/lcov.info"
    }
  }, (err) => {
    const statusUrl = 'http://jenkins-internal.ebiqa.ebscohost.com:9000/api/project_branches/list?project=' + package.name;

    setTimeout(() => {
        axios.get(statusUrl).then((response) => {
            let status = response.data.branches.find(n => n.name === 'master').status.qualityGateStatus;

            if (status === 'ERROR') {
                console.log('Failed Sonarqube gate');
                process.exit(1);
            } else if (status !== 'OK') {
                console.log('Unknown Sonarqube error', status);
                process.exit(1);
            }
        });
    }, 5000); // waiting 5 seconds for sonarqube analysis to finish
  });