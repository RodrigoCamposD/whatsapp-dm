const instanceConfig = (port, options = {}) => {
  const { webhook, origin } = options;
  return {
    name: `api_${port}`,
    script: "./src/app.js",
    env: {
      PORT: port,
      HOOK: webhook,
      ORIGIN: origin,
    },
  };
};

module.exports = {
  apps: [
    instanceConfig(3001), // http://host-ip:3001/
    // instanceConfig(3002, { webhook: "custom_webhook" }), // http://host-ip:3002/custom_webhook
    // instanceConfig(3003, { origin: "https://allowed-origin" }), // only requests from https://allowed-origin
    // ... other instances
  ],
};
