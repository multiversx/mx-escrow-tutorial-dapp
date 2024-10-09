import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks/account/useGetAccountInfo";
import { Card } from "../../../components/Card";
import { FormatAmount, Trim } from "@multiversx/sdk-dapp/UI";

export const AccountInfo = () => {
  const {
    address,
    account: { balance, username },
    shard,
  } = useGetAccountInfo();
  return (
    <Card title="Account" subtitle="Connected account details">
      <div>
        <strong>Address:</strong> <Trim text={address} />
      </div>
      <div>
        <strong>Balance:</strong> <FormatAmount value={balance} />
      </div>
      <div>
        <strong>Shard:</strong> {shard}
      </div>
      <div>
        <strong>Hero Tag:</strong> {username || "N/A"}
      </div>
    </Card>
  );
};
