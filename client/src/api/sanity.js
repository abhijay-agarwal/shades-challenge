import { createClient } from "@sanity/client";

const SANITY_API_TOKEN = "sknYR53pYso8HNnC6DGdqIRNPsWPoA5ZqKNaQSoFqq7mvdTA8b4Z9dLCyv4kaYZXpyeA0Tgr6mdd0Rd90F7NZnTmG2uDxPOMOQRJw9lDrVrvTlJXJIJ1uNQTh0bXh0uv0bKWcNVmhRbwFInkarlYjpAvNsoV9ht1Ojtz2EUcwmCWh7Fl6ydC"

const config = {
  projectId: "0unlbb72",
  dataset: "dev",
  apiVersion: "2022-03-29",
  token: SANITY_API_TOKEN,
  useCdn: false,
};
const client = createClient(config);

export default client;