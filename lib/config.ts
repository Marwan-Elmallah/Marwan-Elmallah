export const config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://marwanelmallah.vercel.app/",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://bussiness-umj5.onrender.com/api",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
} as const

export const getApiUrl = (endpoint: string) => {
  const fullUrl = `${config.apiUrl}${endpoint}`
  console.log("[v0] API URL generated:", fullUrl)
  return fullUrl
}
