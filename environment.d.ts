interface EnvironmentVariables {
  readonly NEXT_PUBLIC_KEY_SALT: string
  readonly NEXT_PUBLIC_API_APP: string
  readonly NEXT_PUBLIC_ENV: string
  readonly NEXT_PUBLIC_BUILD: string
  readonly API_KEY: string
  readonly MERCHANT_ID: string
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables { }
}
