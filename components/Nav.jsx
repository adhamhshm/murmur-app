"use client";

import Link from "next/link"; //allow to move to another pages in the application
import Image from "next/image" //automatically optimize image
import { useState, useEffect } from "react"; //React hooks
import { signIn, signOut, useSession, getProviders } from "next-auth/react"; //utility functions to ease the sign in and sign out things
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const Nav = () => {
  
    //const isUserLoggedIn = true; --> before we apply useSession
    const { data: session} = useSession();

    const router = useRouter();

    {/* create the provider variable */}
    const [providers, setProviders] = useState(null);

    {/* create a toggle nav state */}
    const [toggleDropdown, setToggleDropdown] = useState(false);

    {/* create a callback function that only run at start --> [], initialize the setProviders inside */}
    useEffect(() => {
        const setWebProviders = async () => {
            const response = await getProviders();

            {/* get and set the response */}
            setProviders(response);
        }

        {/* to call the setProviders function */}
        setWebProviders();
    }, []);
    
    return (
    <nav className="flex-between w-full mb-16 pt-4">
        <Link href="/" className="flex gap-2 flex-center">
            <Image src="/assets/icons/logo.png" alt="logo" width={40} height={40} className="object-contain" />
            <p className="logo_text" >Murmur</p>
        </Link>

        {/* desktop navigation */}
        <div className="sm:flex hidden"> {/* to make on small devices, the navigation is hidden */}
            {session?.user ? (
                <div className="flex gap-3 md:gap-5">
                    {/* create post button */}
                    <Link href="/create-story" className="black_btn">
                        Create Post
                    </Link>

                    {/* signout button */}
                    <button type="button" onClick={() => {signOut()}} className="outline_btn">
                        Sign Out
                    </button>

                    {/* profile button */}
                    <Link href="/profile">
                        <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="profile" />
                    </Link>
                </div>
            ): (
                <div className="flex gap-3">
                 
                    {/* firstly, check if provider exists */}
                    {providers && Object.values(providers).map((provider) => (
                        <button type="button" key={provider.name} onClick={() => {signIn(provider.id)}} className="black_btn">
                            Sign In
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* mobile navigation */}
        <div className="sm:hidden flex relative">
            {session?.user ? (
                /* if user is logged in, show the navbar */
                <div className="flex gap-3">
                    <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="profile" onClick={() => setToggleDropdown((prev) => !prev)} />
                    {/* when the user click, the toggle is true, display the dropdown content */}
                    {toggleDropdown && (
                        <div className="dropdown">
                            {/* to the profile */}
                            <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                                My Profile
                            </Link>
                            {/* to create story */}
                            <Link href="/create-story" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                                Create Post
                            </Link>
                            {/* to sign out */}
                            <button type="button" onClick={() => {setToggleDropdown(false); signOut()}} className="mt-5 w-full black_btn_mobile">
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>

            ): (
                <div className="flex gap-3">
                    {/* firstly, check if provider exists */}
                    {providers && Object.values(providers).map((provider) => (
                        <button type="button" key={provider.name} onClick={() => {signIn(provider.id)}} className="black_btn">
                            Sign In
                        </button>
                    ))}
                </div>
            )}
        </div>

    </nav>
  )
}

export default Nav