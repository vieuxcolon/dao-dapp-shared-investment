import React, { ReactNode } from "react";
import WalletConnect from "./WalletConnect";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">DAO Shared Investment</h1>
        <WalletConnect />
      </header>
      <main className="flex-1 p-6">{children}</main>
      <footer className="bg-white shadow p-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} DAO Shared Investment. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
