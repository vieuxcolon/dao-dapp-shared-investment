import React from "react";
import { useAccount, useConnect, useDisconnect, useWalletClient } from "../lib/wagmi";

const WalletConnect: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { walletClient } = useWalletClient();

  return (
    <div className="wallet-connect">
      {isConnected && address ? (
        <div>
          <p>Connected as: {address}</p>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div>
          {connectors.map((connector) => (
            <button
              key={connector.id}
              className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
              onClick={() => connect(connector)}
            >
              Connect {connector.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
