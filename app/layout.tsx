import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import localFont from '@next/font/local'
import Script from "next/script";


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
            default: "Revjeopardy.com",
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
            title: "Revenue based Jeopardy",
            description:
                'A RevOps twist on the classic game show, Jeopardy',
            images: [`${process.env.FRONTEND_URL}og`],
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
    <head>
        {process.env.NODE_ENV === "production" && <Script id="clarityScript">
            {
                `(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "i5wlwjw4tn");`
            }
        </Script>}
    </head>
      <body className={`${inter.className}`}>
      <div
          style={{ backgroundImage: `url("/jeopardy.jpeg")` }}
          // className="flex flex-col  min-h-screen w-screen bg-red-400 "

      >
        <main className={`flex flex-col flex-1 ${swiss.variable} font-sans-serif`}>{children}</main>
      </div>
      </body>
    </html>
  )
}
