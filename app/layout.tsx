import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: "Kingdom of Heaven Threads",
  description: "Reverent, Biblical apparel and art. He died for us; we live for Him.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <header className="border-b border-neutral-800 bg-neutral-950">
              <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                  <Link href="/" className="text-2xl font-bold tracking-tight text-amber-100">
                    Kingdom of Heaven Threads
                  </Link>
                  <div className="flex items-center gap-6">
                    <Link
                      href="/products"
                      className="text-neutral-300 hover:text-white transition-colors"
                    >
                      Products
                    </Link>
                    <CartDrawer />
                  </div>
                </div>
              </nav>
            </header>

            <main className="flex-1">
              {children}
            </main>

            <footer className="border-t border-neutral-800 bg-neutral-950 py-8 mt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-neutral-400 text-sm">
                <p>He died for us; we live for Him.</p>
                <p className="mt-2">Kingdom of Heaven Threads &copy; {new Date().getFullYear()}</p>
              </div>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
