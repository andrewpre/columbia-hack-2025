export function getUserIdFromCookies(): string | null {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("userId="))
      ?.split("=")[1] || null
  );
}
