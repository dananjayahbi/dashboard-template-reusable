import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MUIThemeProvider from "./theme-provider";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Box } from '@mui/material';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AuthProvider from "./providers/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard Template",
  description: "A reusable dashboard template for Next.js applications",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the session
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <AuthProvider>
            <MUIThemeProvider>
              {session ? (
                // For authenticated users, show the full dashboard UI
                <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                  <Sidebar />
                  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <Header />
                    <main style={{ 
                      padding: '20px', 
                      flexGrow: 1, 
                      overflow: 'auto',
                      backgroundColor: '#fafafa' 
                    }}>
                      {children}
                    </main>
                  </Box>
                </Box>
              ) : (
                // For unauthenticated users, show only the content
                <>{children}</>
              )}
            </MUIThemeProvider>
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
