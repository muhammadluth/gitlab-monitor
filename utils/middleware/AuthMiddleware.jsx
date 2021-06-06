import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

export default function AuthMiddleware({ children }) {
  const { pathname } = useRouter();
  const [session, loading] = useSession();

  if (pathname !== "/auth/signin") {
    if (!loading && !session) {
      window.location.href = "/auth/signin";
    } else if (!loading && session) {
      window.location.href = "/admin/dashboard";
    }
  }

  return children;
}
