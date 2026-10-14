export function getSafeCallbackUrl(value: string | null): string | null {
  return value?.startsWith("/") && !value.startsWith("//") ? value : null;
}
