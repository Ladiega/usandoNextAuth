export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/dashboard/:path*']// /:path* protege todas las rutas que estan dentro de la carpeta. un ejemplo sera una nueva carpeta dentro de dashprofile com profile.
}