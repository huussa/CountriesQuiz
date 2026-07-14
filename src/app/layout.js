import "./globals.css";
import { Poppins } from "next/font/google";
import I18nProvider from "./I18nProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Countries Quiz",
  description: "Test your knowledge of world countries with this fun quiz app!",
};

export default function RootLayout({ children }) {
  return (
      <html lang="ar" className={poppins.variable}>
        <body>
          <I18nProvider>{children}</I18nProvider>
        </body>
      </html>
  );
}
