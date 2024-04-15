async function fetchWalletData() {
  try {
    // Set networks
    const options = {
      mainnet: "https://mainnet.infura.io/v3/b174c1273df14a9685091eded6bc3003",
      sepolia: "https://sepolia.infura.io/v3/b174c1273df14a9685091eded6bc3003",
      walletAddress: "0xB07626Bc2fF18d680ec886c3109e9BF6ee05E6b7",
    };

    // manually setting ETH price 🤔
    ethPrice = 3189;
    const fetch = (await import("node-fetch")).default;

    // Get the blocknumber
    async function getBlockNumberOnMainnet() {
      try {
        const url = options.mainnet;
        const requestData = {
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1,
        };

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        const data = await response.json();
        return console.log(
          "Prgram queried at block number:",
          parseInt(data.result)
        );
      } catch (error) {
        console.error("Error fetching block number:", error);
        return null;
      }
    }
    // Get the blocknumber on Sepolia
    async function getBlockNumberOnSepolia() {
      try {
        const url = options.sepolia;
        const requestData = {
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1,
        };

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        const data = await response.json();
        return console.log(
          "Prgram queried at block number on Speolia 😎:",
          parseInt(data.result)
        );
      } catch (error) {
        console.error("Error fetching block number:", error);
        return null;
      }
    }

    // Get balance on sepolia
    async function getBalanceOnSepolia() {
      try {
        const url = options.sepolia;
        const requestData = {
          jsonrpc: "2.0",
          method: "eth_getBalance",
          params: [options.walletAddress, "latest"],
          id: 1,
        };

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        const data = await response.json();
        return console.log(
          "Balance on Sepolia:",
          parseInt(data.result) / 10 ** 18
        );
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }

    const url = options.mainnet;
    const requestData = {
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [options.walletAddress, "latest"],
      id: 1,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();
    // console.log("Balance:", data.result); // Convert to ETH?
    console.log("Balance on Mainnet:", parseInt(data.result) / 10 ** 18);
    console.log(
      "Balance in USD:",
      (parseInt(data.result) / 10 ** 18) * ethPrice
    );
    getBlockNumberOnMainnet();
    getBlockNumberOnSepolia();
    getBalanceOnSepolia();
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
}

// Call prgram
fetchWalletData();
