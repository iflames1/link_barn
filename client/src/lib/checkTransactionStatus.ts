import axios from "axios";
import { toast } from "sonner";

export const checkTransactionStatus = async (txID: string | undefined) => {
  if (!txID || txID === "") {
    console.log("no tx found");
    return "no tx made";
  }
  const url = `https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/${txID}`;

  try {
    const response = await axios.get(url);
    const res = response.data;
    console.log("tx data", res);

    return res.tx_status;
  } catch (error) {
    console.error("Error fetching transaction status:", error);
    toast.error("Error checking transaction status");
    return "";
  }
};
