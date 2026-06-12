"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { login as loginApi, me as meApi } from "@/lib/api/queries/login";
import { UserProps } from "../types/user";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const TOKEN_KEY = "token";
const USER_KEY = "user";

interface AuthState {
  user: UserProps | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  mustChangePassword: boolean; // ✅ State baru untuk penanda di Frontend
  setMustChangePassword: (val: boolean) => void; // ✅ Setter untuk mereset setelah sukses ganti pass
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserProps | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [mustChangePassword, setMustChangePassword] = useState(false); // ✅ Default false
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!token && (!!user || mustChangePassword);

  const clearStoredAuth = () => {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(USER_KEY);
    setToken(null);
    setUser(null);
    setMustChangePassword(false);
  };

  useEffect(() => {
    const storedToken = Cookies.get(TOKEN_KEY);
    const storedUser = Cookies.get(USER_KEY);

    if (!storedToken) {
      Promise.resolve().then(() => setIsLoading(false));
      return;
    }

    meApi()
      .then((res) => {
        if (res?.data) {
          setToken(storedToken);
          const newMemberData = {
            ...res.data,
            profile_photo: res.data?.media?.find(
              (find: any) => find.type === "profile_photo",
            )?.image_url,
          };
          setUser(newMemberData);

          // ✅ Cek flag dari response user (jika bypass middleware terjadi pada method GET /me)
          if (res.data.must_change_password) {
            setMustChangePassword(true);
          }

          Cookies.set(USER_KEY, JSON.stringify(res.data), { expires: 7 });
        } else {
          clearStoredAuth();
        }
      })
      .catch((err: any) => {
        console.dir(err); // ✅ Gunakan console.dir untuk melihat struktur object asli di devtools

        // ✅ Diperluas agar mencakup pengecekan status 403 ATAU string pembanding pada code/message
        const isMustChangePassword =
          err.status === 403 ||
          err.code === "MUST_CHANGE_PASSWORD" ||
          err.message?.includes("MUST_CHANGE_PASSWORD");

        if (isMustChangePassword) {
          setToken(storedToken);
          setMustChangePassword(true);

          // Ambil sisa data user lama dari cookie agar UI nama/profile tidak kosong saat modal muncul
          if (storedUser) {
            try {
              setUser(JSON.parse(storedUser));
            } catch {
              clearStoredAuth();
            }
          }
        } else {
          clearStoredAuth();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const refreshAuth = useCallback(async () => {
    const storedToken = Cookies.get(TOKEN_KEY);
    if (!storedToken) return;

    try {
      const res = await meApi();
      if (res?.data) {
        // Set token kembali (jika sebelumnya tertahan)
        setToken(storedToken);

        const newMemberData = {
          ...res.data,
          profile_photo: res.data?.media?.find(
            (find: any) => find.type === "profile_photo",
          )?.image_url,
        };

        setUser(newMemberData);

        // ✅ Matikan flag ganti password karena backend sudah meloloskan request /me
        setMustChangePassword(false);

        // Update cookie dengan data user yang baru
        Cookies.set(USER_KEY, JSON.stringify(res.data), { expires: 7 });
      }
    } catch (err) {
      console.error("Gagal memperbarui data auth:", err);
      // Jika ternyata errornya bukan karena password lagi, tapi token expired, barulah clear
      clearStoredAuth();
    }
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      const res = await loginApi({ username, password });
      if (!res?.data?.token || !res?.data?.user) {
        throw new Error(res?.message || "Login failed");
      }
      const { token, user: userData } = res.data;
      const newUserData = {
        ...userData,
        profile_photo: userData?.media?.find(
          (find: any) => find.type === "profile_photo",
        )?.image_url,
      };

      Cookies.set(TOKEN_KEY, token, { expires: 7 });
      Cookies.set(USER_KEY, JSON.stringify(newUserData), { expires: 7 });
      setToken(token);
      setUser(newUserData);

      // ✅ Cek flag ganti password saat login sukses
      if (userData.must_change_password) {
        setMustChangePassword(true);
        router.replace("/portal"); // Tetap ke portal, tapi modal ganti password akan ter-trigger
      } else {
        setMustChangePassword(false);
        router.replace("/portal");
      }
    },
    [router],
  );

  const logout = useCallback(() => {
    clearStoredAuth();
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        mustChangePassword,
        setMustChangePassword,
        login,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return null;
  }
  return <>{children}</>;
}
