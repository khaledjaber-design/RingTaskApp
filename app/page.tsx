"use client"

import { AppProvider, useApp } from "@/lib/app-context"
import { LoginScreen } from "@/components/screens/login-screen"
import { AuthGoogle } from "@/components/screens/auth-google"
import { AuthFacebook } from "@/components/screens/auth-facebook"
import { AuthApple } from "@/components/screens/auth-apple"
import { AuthEmail } from "@/components/screens/auth-email"
import { ResetFacebook } from "@/components/screens/reset-facebook"
import { ResetEmail } from "@/components/screens/reset-email"
import { DashboardHome } from "@/components/screens/dashboard-home"
import { CalendarHome } from "@/components/screens/calendar-home"
import { DayView } from "@/components/screens/day-view"
import { NewTaskForm } from "@/components/screens/new-task-form"
import { SettingsScreen } from "@/components/screens/settings-screen"
import { NotificationsScreen } from "@/components/screens/notifications-screen"
import { NotificationDetail } from "@/components/screens/notification-detail"
import { IntegrationsScreen } from "@/components/screens/integrations-screen"
import { ConnectApple } from "@/components/screens/connect-apple"
import { ConnectGoogleCal } from "@/components/screens/connect-google-cal"
import { ConnectMicrosoft } from "@/components/screens/connect-microsoft"
import { ConnectEmailSync } from "@/components/screens/connect-email-sync"
import { SyncStatusScreen } from "@/components/screens/sync-status-screen"
import { VoiceModal } from "@/components/voice-modal"

function AppScreens() {
  const { screen } = useApp()

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="w-full h-full animate-fade-slide-in" key={screen}>
        {screen === "login" && <LoginScreen />}
        {screen === "auth-google" && <AuthGoogle />}
        {screen === "auth-facebook" && <AuthFacebook />}
        {screen === "auth-apple" && <AuthApple />}
        {screen === "auth-email" && <AuthEmail />}
        {screen === "reset-facebook" && <ResetFacebook />}
        {screen === "reset-email" && <ResetEmail />}
        {screen === "home" && <DashboardHome />}
        {screen === "calendar" && <CalendarHome />}
        {screen === "day-view" && <DayView />}
        {screen === "new-task" && <NewTaskForm />}
        {screen === "settings" && <SettingsScreen />}
        {screen === "notifications" && <NotificationsScreen />}
        {screen === "notification-detail" && <NotificationDetail />}
        {screen === "integrations" && <IntegrationsScreen />}
        {screen === "connect-apple" && <ConnectApple />}
        {screen === "connect-google" && <ConnectGoogleCal />}
        {screen === "connect-microsoft" && <ConnectMicrosoft />}
        {screen === "connect-email" && <ConnectEmailSync />}
        {screen === "sync-status" && <SyncStatusScreen />}
      </div>
      <VoiceModal />
    </div>
  )
}

export default function Page() {
  return (
    <AppProvider>
      <AppScreens />
    </AppProvider>
  )
}
