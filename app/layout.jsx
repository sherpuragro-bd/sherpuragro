import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import "./globals.css";
import { Quicksand } from "next/font/google";
import localFont from "next/font/local";
import ScrollToTop from "./components/ui/ScrolltoTop";
import BottomBar from "./components/Header/BottomBar";
import StepProvider from "./components/ui/StepProvider";
import HideWrapper from "./components/ui/HideWrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import ReProgressProviders from "./context/ProgressProvider";
import TanstackQuery from "./context/TanstackQuery";
import Footer from "./components/Footer/Footer";
import { ShopContextProvider } from "./context/ShopContext";
import { AdminContextProvider } from "./context/AdminContext";
import { AppContextProvider } from "./context/AppContext";

const liAdorNoirrit = localFont({
  src: "../public/fonts/adornoirit.ttf",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "শেরপুর এগ্রো",
  description: "শেরপুর এগ্রো বাংলাদেশি একটি এগ্রো প্লাটফর্ম",
  other: {
    "google-site-verification": "eARedgB_T6Jl1dDzWiy9XG9wjm_dTe0pBlYokcqF0w4",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-arp="" className="scroll-smooth">
      <body
        id="body"
        className={`${liAdorNoirrit.className} antialiased text-1 bg-white [&::-webkit-scrollbar]:w-0`}
        data-gr-ext-installed=""
        data-new-gr-c-s-check-loaded="14.1240.0"
      >
        <ReProgressProviders>
          <AppContextProvider>
            <AdminContextProvider>
              <ShopContextProvider>
                <TooltipProvider>
                  <TanstackQuery>
                    <HideWrapper toHide={`/admin`}>
                      <Header />
                    </HideWrapper>
                    <StepProvider>{children}</StepProvider>
                    <Toaster
                      position="center-top"
                      toastOptions={{
                        style: {
                          zIndex:
                            "99999999999999999999999999999999999999999999999999999999999999 !important",
                        },
                        className: "!border !shadow-none !px-5",
                        success: {
                          iconTheme: {
                            primary: "#3bb77e",
                          },
                        },
                      }}
                    />
                    <ScrollToTop />
                    <HideWrapper toHide={`/admin`}>
                      <BottomBar />
                      <Footer />
                    </HideWrapper>
                  </TanstackQuery>
                </TooltipProvider>
              </ShopContextProvider>
            </AdminContextProvider>
          </AppContextProvider>
        </ReProgressProviders>
      </body>
    </html>
  );
}
