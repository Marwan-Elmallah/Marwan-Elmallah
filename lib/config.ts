export const config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
} as const

export const getApiUrl = (endpoint: string) => {
  const fullUrl = `${config.apiUrl}${endpoint}`
  console.log("[v0] API URL generated:", fullUrl)
  return fullUrl
}
