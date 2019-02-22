const Docker = require("dockerode");
const cp = require("child_process");
const expect = require('chai').expect;
const docker = new Docker();
const assert = require('assert');
const fs = require('fs');

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
      container = docker.getContainer(data.containerID);
      multichain = require('../index.js')(data.connection);
      done();
    });
  })

  context('General Utilities', function() {
    describe('#getblockchainparams()', function() {
      it('should return a list of values of this blockchain\'s parameters ', async() => {
        const response = await multichain.getBlockchainParams();
        const dockerResponse = await callDocker(container, "getblockchainparams");
        expect(response).to.equal(dockerResponse);
      });
    });
  }); 
});

async function callDocker(container, command) {
  let response = [];
  const dockerResponse = await container.exec(
    {
      Cmd: ["./multichain-cli", "MyChain", command], //Todo: Fix hard-coded name
      AttachStdin: true,
      AttachStdout: true,
      tty: true,
      WorkingDir: '/usr/local/bin',
      Env: []
    });
    dockerResponse.start({stdin: true}, (err, stream) => {
      if (err) console.log('err', err);
      stream.on('data', (d) => {
        response.push(d)
      });
      stream.on('end', (a) => {
        console.log(Buffer.concat(response).toString('utf8'));
      })
  })

  return response;
}