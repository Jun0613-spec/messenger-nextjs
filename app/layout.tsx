import "./globals.css";
import { Figtree } from "next/font/google";

import AuthContext from "./context/AuthContext";
import ActiveStatus from "./components/ActiveStatus";
import ToasterContext from "./context/ToasterContext";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Messenger",
  description: "Messenger App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
