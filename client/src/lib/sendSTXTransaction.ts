import { openSTXTransfer, STXTransferOptions } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";

export const sendSTXTransaction = async (
  amount: string = "5",
  memo: string,
  recipientAddress: string = "SPVT6STGX1AG9E0D8H87HB3N0ZV8SJPCMDMN373D"
) => {
  let transactionId: string | undefined;

  const transactionDetails: STXTransferOptions = {
    network: new StacksMainnet(),
    recipient: recipientAddress,
    amount: amount + "000000",
    memo: memo,
    appDetails: {
      name: "Link Barn",
      icon: "/images/unik.png",
    },
    onFinish: async (response: { txId: string }) => {
      transactionId = response.txId;
      //setTxId(response.txId);
      //return response.txId;
    },
    onCancel: () => {
      console.log("User canceled");
    },
  };

  await openSTXTransfer(transactionDetails);
  return transactionId;
};
