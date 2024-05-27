"use client"
import { RiCloseLine, RiMenuFill, } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEventHandler, useState } from "react";


type PageReference = {
    href: string;
    name: string;
}

const pages: PageReference[] = [
    { href: '/', name: 'Dashboard' },
    { href: '/create-event', name: 'Create Event' },
    { href: '/events', name: 'Previous Events' },
]


export default function Nav() {
    const pathname = usePathname()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    return (
        <div className="sticky top-0 z-50 h-14 bg-tremor-background dark:bg-dark-tremor-background dark:bg-opacity-75 bg-opacity-75">
            <div className="hidden sm:flex h-full flex items-center px-3">
                <DesktopNavLinks pathname={pathname} />
            </div>
            <div className="sm:hidden h-full flex items-center flex-row-reverse px-6">
                <MobileMenuButton onClick={handleDrawerToggle} />
                <MobileDrawer pathname={pathname} isOpen={isDrawerOpen} onClose={handleDrawerToggle} />
            </div>
        </div>
    );
}


function DesktopNavLinks({ pathname }: { pathname: string }) {
    return (
        <ul className="mt-3 mx-3 flex flex-row space-x-6">
            {pages.map((p) => (
                <li key={p.href} className={`text-m  ${p.href == pathname ? "text-tremor-brand" : "hover:text-tremor-content-subtle dark:hover:text-dark-content-subtle"}`}>
                    <Link href={p.href}>{p.name}</Link>
                </li>
            ))}
        </ul>
    );
}


function MobileMenuButton({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) {

    return (
        <button onClick={onClick}>
            <RiMenuFill size={30} />
        </button>
    );
}


function MobileDrawer({ pathname, isOpen, onClose }: { pathname: string, isOpen: boolean, onClose: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <div
            className={`fixed flex flex-col justify-center items-center z-10 top-0 right-0 h-full w-full bg-tremor-background dark:bg-dark-tremor-background  transition-transform duration-299 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            <button className="absolute right-7 top-4 p-3" onClick={onClose}>
                <RiCloseLine size={30} />
            </button>
            <ul className="flex flex-col justify-center items-center space-y-4">
                {pages.map((p) => (
                    <li key={p.href} className={`text-3xl ${p.href == pathname ? "text-tremor-brand" : "hover:text-tremor-content-subtle dark:hover:text-dark-content-subtle"}`}>
                        <Link href={p.href}>{p.name}</Link>
                    </li>

                ))}

            </ul>
        </div>
    );
}
