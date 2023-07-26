import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import localFont from '@next/font/local'


const swiss = localFont({
    src: [{
        path:'../public/swiss911.otf',
        weight:"200"
    }],
    variable: '--font-swiss',

})


export async function generateMetadata(
): Promise<Metadata> {
    return {
        title: {
            default: "Revjeopardy.ai",
            template: `%s - Revenue Operations themed jeopardy`,
        },
        description:
            `Get ready to play a RevOps twist on the classic game show, Jeopardy. 
            Answer questions, win money, and share your score with your friends.`,
        icons: {
            icon: "/icon.ico",
        },
        openGraph: {
            title: "Revenue based Jeopardy",
            description:
                "A RevOps twist on the classic game show, Jeopardy",
            images: [`${process.env.FRONTEND_URL}og`],
        },
        twitter: {
            card: "summary_large_image",
            title: "Salesforce SOQL Generator",
            description:
                '"Transforming English natural language into Salesforce SOQL queries',
            images: ["https://www.asksalesforce.ai/og"],
        },
    }

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
      <div
          style={{ backgroundImage: `url("/jeopardy.jpeg")` }}
          className="flex flex-col h-screen w-screen  bg-cover "

      >
        <main className={`flex flex-col flex-1 ${swiss.variable} font-sans-serif`}>{children}</main>
      </div>
      </body>
    </html>
  )
}
