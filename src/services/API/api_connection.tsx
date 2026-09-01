export function Api_Connection() {
  if (process.env.NEXT_PUBLIC_PRODUCTION === "true") {
    return process.env.NEXT_PUBLIC_URL_PRODUCTION!;
  }
  return process.env.NEXT_PUBLIC_URL_DEVELOPER!;
}
