import { ClerkProvider } from "@clerk/nextjs";
import { TaskProvider } from "@/components/TaskContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <TaskProvider>
            {children}
          </TaskProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}