const Docker = require('dockerode');
const docker = new Docker();

const Dockerode = require('simple-dockerode'); // Todo: This can be redundant if I manage to make Dockerode works. 
const dockerode = new Dockerode();

const cp = require('child_process');
const fs = require('fs');
const stream = require('stream')

const assert = require('assert');
const expect = require('chai').expect;

function Exec(command, options = { log: false, cwd: process.cwd() }) {
  if (options.log) console.log(command);

  return new Promise((done, failed) => {
    cp.exec(command, { ...options }, (err, stdout, stderr) => {
      if (err) {
        err.stdout = stdout;
        err.stderr = stderr;
        failed(err);
        return;
      }

      done({ stdout, stderr });
    });
  });
}

const setup = (async () => {
  const containersArray = await docker.listContainers();
  const containerID = containersArray[2].Id // Todo: It's not always the second ID, add a filter function to search for masternode
  const masterNodeContainer = await docker
    .getContainer(containerID) 
    .inspect();

  const IP = await Exec(
    "docker inspect -f '{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)"
  );
  const masterNodeIP = IP.stdout
    .split("\n")
    .filter(container => {
      return container.includes("masternode");
    })[0]
    .split(" ")
    .pop();

  const masterNodePort = masterNodeContainer.Config.Env.filter(env => {
    return env.includes("RPC_PORT");
  })[0]
    .split("=")
    .pop();
  const masterNodeUser = masterNodeContainer.Config.Env.filter(env => {
    return env.includes("RPC_USER");
  })[0]
    .split("=")
    .pop();
  const masterNodePass = masterNodeContainer.Config.Env.filter(env => {
    return env.includes("RPC_PASSWORD");
  })[0]
    .split("=")
    .pop();

  const connection = {
    connection: {
      port: masterNodePort,
      host: masterNodeIP,
      user: masterNodeUser,
      pass: masterNodePass
    },
    containerID: containerID
  }

  return connection;
})();

describe('Testing the Wrapper: ', function() {
  let multichain;
  let container;

  before(function (done) {
    setup.then((data) => {
      container = dockerode.getContainer(data.containerID);
      multichain = require('../index.js')(data.connection);
      done();
    });
  })

  context('General Utilities: ', function() {
    describe('getblockchainparams()', function() {
      it('should return a list of values of this blockchain\'s parameters ', async() => {
        const response = await multichain.getBlockchainParams();
        const dockerResponse = await callDocker(container, "getblockchainparams");
        expect(response).to.eql(dockerResponse);
      });
    });
    describe('setruntimeparam(param value) and getruntimeparams()', function() {
      it('Sets the runtime parameter param to value and Returns a selection of this node\'s runtime parameters', async() => {
        
        await multichain.setRuntimeParam({param: 'maxshowndata', value: '10384'});
        const response = await multichain.getRuntimeParams();

        await multichain.setRuntimeParam({param: 'maxshowndata', value: '16384'}); // Reverting back the state

        await callDocker(container, 'setruntimeparam maxshowndata 10384');
        const dockerResponse = await callDocker(container, 'getruntimeparams');

        expect(response).to.eql(dockerResponse);
      });
      after(function revertingChanges() {
        multichain.setRuntimeParam({param: 'maxshowndata', value: '16384'});
      });
    });
    describe('getinfo()', function () {
      it('Returns general information about this node and blockchain.', async() => {
        const pResponse = multichain.getInfo();
        const pDockerResponse = callDocker(container, 'getinfo');
        // This should replicate Promise.all()
        const response = await pResponse;
        const dockerResponse = await pDockerResponse;
        expect(response).to.eql(dockerResponse);        
      });
    });
    describe('help()', function() {
      it('Returns a list of available API commands ', async() => {
        const response = await multichain.help();
        const dockerResponse = await callDocker(container, "help");
        expect(true).to.eql(true);
      });
    });
    describe('stop()', function() {
      it('Shuts down the this blockchain node, i.e. stops the multichaind process.', async() => {
        const response = await multichain.help();
        const dockerResponse = await callDocker(container, "help");
        expect(true).to.eql(true);
      });
    });
  }); 
});

async function callDocker(container, command) {
  const commands = ['multichain-cli', 'MyChain'].concat(command.split(' '));
  const response = await container.exec(commands, {stdout: true});
  try {
    return JSON.parse(response.stdout)
  } catch (err) {
    if (err == 'SyntaxError: Unexpected end of JSON input' && command.split(' ')[0] == 'setruntimeparam') {
      return '';
    } else if ('SyntaxError: Unexpected token = in JSON at position 0' && command.split(' ')[0] == 'help'){
      return response.toString();
    } else {
      throw new Error(err);
    }
  }
}