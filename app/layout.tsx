import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { CustomQueryClientProvider } from '@/components/CustomQueryClientProvider'

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'Habits',
    description: 'Record and monitor your habits',
    icons: {
        icon: 'public/favicon.png'
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <CustomQueryClientProvider>
            <html lang="en" className={GeistSans.className}>
                <body className="bg-tremor-background dark:bg-dark-tremor-background text-tremor-content dark:text-dark-tremor-content">
                    <main className="">
                        {children}
                    </main>
                </body>
            </html>
        </CustomQueryClientProvider>
    )
}
