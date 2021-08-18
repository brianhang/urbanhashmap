import { AppUser } from '../appTypes';
import { useQuery } from 'react-query';

async function fetchAppUser() {
  const response = await fetch('/api/user');
  if (!response.ok) {
    return null;
  }
  const user = await response.json() as AppUser | null;
  return user;
}

export default function useAppUserQuery() {
  return useQuery('app-user', fetchAppUser, {
    refetchOnMount: false,
    staleTime: 600,
  });
}
