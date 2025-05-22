
import { useAuth as useClerkAuth } from "@clerk/clerk-react";

export const useAuth = () => {
const { isSignedIn, isLoaded } = useClerkAuth();

return {
    isAuthenticated: isSignedIn,
    isLoading: !isLoaded,
};
};
