// Client-side admin authentication check
export async function isAuthenticated(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/check', {
      cache: 'no-store',
    });
    if (response.ok) {
      const data = await response.json();
      return data.authenticated || false;
    }
    return false;
  } catch (error) {
    return false;
  }
}

