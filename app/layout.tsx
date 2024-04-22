import { GeistSans } from 'geist/font/sans'
import './globals.css'

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'Habits',
    description: 'Record and monitor your habits',
    icons:{
        icon: 'public/favicon.png'
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={GeistSans.className}>
            <body className="bg-background text-foreground">
                <main className="">
                    {children}
                </main>
            </body>
        </html>
    )
}
