import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Types
export type UserRole = "student" | "faculty" | "admin";
export type Theme = "light" | "dark" | "inked";

interface UserProfile {
  name: string;
  role: UserRole;
  avatar: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  title: string; // e.g. "Rookie", "Sidekick", "Hero"
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "alert";
  read: boolean;
  timestamp: Date;
}

interface MockDataContextType {
  user: UserProfile;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  notifications: Notification[];
  addNotification: (
    notification: Omit<Notification, "id" | "read" | "timestamp">,
  ) => void;
  markAsRead: (id: string) => void;
  addXp: (amount: number) => void;
  toggleTheme: () => void;
}

const defaultUser: UserProfile = {
  name: "Alex Johnson",
  role: "student",
  avatar: "/placeholder.svg",
  level: 1,
  xp: 450,
  nextLevelXp: 1000,
  title: "Rookie Student",
};

const MockDataContext = createContext<MockDataContextType | undefined>(
  undefined,
);

export const MockDataProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [theme, setTheme] = useState<Theme>("light");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Initialize theme from local storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      applyTheme("dark");
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark", "inked");
    root.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    if (theme === "light") handleSetTheme("dark");
    else if (theme === "dark") handleSetTheme("inked");
    else handleSetTheme("light");
  };

  const addNotification = (
    notification: Omit<Notification, "id" | "read" | "timestamp">,
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      read: false,
      timestamp: new Date(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const addXp = (amount: number) => {
    setUser((prev) => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      let newNextLevelXp = prev.nextLevelXp;
      let newTitle = prev.title;

      // Level up logic
      if (newXp >= newNextLevelXp) {
        newXp -= newNextLevelXp;
        newLevel += 1;
        newNextLevelXp = Math.floor(newNextLevelXp * 1.5);

        // Title progression
        if (newLevel >= 5) newTitle = "Sidekick";
        if (newLevel >= 10) newTitle = "Hero";
        if (newLevel >= 20) newTitle = "Legend";

        // Add level up notification
        addNotification({
          title: "LEVEL UP!",
          message: `You reached Level ${newLevel}! You are now a ${newTitle}!`,
          type: "success",
        });
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        nextLevelXp: newNextLevelXp,
        title: newTitle,
      };
    });
  };

  return (
    <MockDataContext.Provider
      value={{
        user,
        theme,
        setTheme: handleSetTheme,
        notifications,
        addNotification,
        markAsRead,
        addXp,
        toggleTheme,
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (context === undefined) {
    throw new Error("useMockData must be used within a MockDataProvider");
  }
  return context;
};
