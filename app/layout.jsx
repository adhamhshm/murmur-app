import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
    title: "Murmur",
    description: "Share your stories to everyone!"
};

// the layout will wrap everything
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <head>
            <link rel="web icon" href="/assets/icons/favicon.ico"/>
            <title>Murmur</title>
        </head>
        <body>
            <Provider>
                <div className="main">
                    {/* changes to the background */}
                    <div className="gradient" />

                    {/* our main application that will render children */}
                    <main className="app">
                        <Nav />
                        {children}
                        {/* note that we get the children through props, see the RootLayout */} 
                    </main>
                </div>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;