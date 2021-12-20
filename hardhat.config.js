require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
};


module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
    },
    bsctestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: ["0ea42d5ed699cb926d19ae1d16616ab60f440cdd086b327d4c48da2147cf1214","65b9f767be93e9680814ac7d51c0822313c321ab21128a2e7ddc4ecff9b5ef8b","b2c1c2d98bd0ecc3e6c50ca08ef3f038266bb642de6bccba47b26b250ab66a14","92c6b7ddf4147efd525ba33647afe4010d68e9f18d4f9e311100a3ff325546c5","060c1d0efcd0bd1fa698ce5743b7b6f4513f51b519abfa47dc62f1946393263d"]
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 2000000000,
      accounts: ["0ea42d5ed699cb926d19ae1d16616ab60f440cdd086b327d4c48da2147cf1214"]
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/d7664b29cba4410087208d855c54e4db`,
      accounts: ["0ea42d5ed699cb926d19ae1d16616ab60f440cdd086b327d4c48da2147cf1214","65b9f767be93e9680814ac7d51c0822313c321ab21128a2e7ddc4ecff9b5ef8b","b2c1c2d98bd0ecc3e6c50ca08ef3f038266bb642de6bccba47b26b250ab66a14","92c6b7ddf4147efd525ba33647afe4010d68e9f18d4f9e311100a3ff325546c5","060c1d0efcd0bd1fa698ce5743b7b6f4513f51b519abfa47dc62f1946393263d"]
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 2000000000,
      accounts: ["5da0ac69e925c8677f6d11c0e63b0c30d840a31ff6b8f4ae4d893a167b51efc0"]
    },
    MumbaiTestnet: {
      url: `https://polygon-mumbai.infura.io/v3/d7664b29cba4410087208d855c54e4db`,
      accounts: ["0ea42d5ed699cb926d19ae1d16616ab60f440cdd086b327d4c48da2147cf1214","65b9f767be93e9680814ac7d51c0822313c321ab21128a2e7ddc4ecff9b5ef8b","b2c1c2d98bd0ecc3e6c50ca08ef3f038266bb642de6bccba47b26b250ab66a14","92c6b7ddf4147efd525ba33647afe4010d68e9f18d4f9e311100a3ff325546c5","060c1d0efcd0bd1fa698ce5743b7b6f4513f51b519abfa47dc62f1946393263d"]
    },
  },
  solidity: {
  version: "0.8.4",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
   }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};
