import React, { createContext, useCallback, useContext, useState } from 'react';

import { useEffect } from 'react';

export type AppUser = {
  id: number,
  name: string,
  fbid: string,
};

const AppUserContext = createContext<AppUser | null>(null);

type Props = React.PropsWithChildren<{
  fallback?: React.ReactNode | null,
}>;

export function AppUserProvider(props: Props) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [inFlight, setInFlight] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/user');
        const user = await response.json() as AppUser | null;
        setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setInFlight(false);
      }
    }
    fetchUser();
  }, [setInFlight, setUser]);

  return (
    <AppUserContext.Provider value={user}>
      {inFlight ? props.fallback : props.children}
    </AppUserContext.Provider>
  );
}

export function useAppUser() {
  return useContext(AppUserContext);
}
