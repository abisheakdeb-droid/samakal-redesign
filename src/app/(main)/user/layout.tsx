import { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User, Bookmark, History, Home } from "lucide-react";
import { clsx } from "clsx";

interface UserLayoutProps {
    children: ReactNode;
}

export default async function UserLayout({ children }: UserLayoutProps)  {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/admin/login?callbackUrl=/user/profile");
    }

    const navItems = [
        { href: "/user/profile", label: "প্রোফাইল", icon: User },
        { href: "/user/bookmarks", label: "সংরক্ষিত", icon: Bookmark },
        { href: "/user/history", label: "ইতিহাস", icon: History },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* User Navigation Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* User Info */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-linear-to-br from-brand-red to-red-600 flex items-center justify-center text-white text-2xl font-bold">
                                {session.user.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{session.user.name || "User"}</h1>
                                <p className="text-gray-500 text-sm">{session.user.email}</p>
                            </div>
                        </div>

                        {/* Home Link */}
                        <Link 
                            href="/" 
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition font-medium text-sm"
                        >
                            <Home size={16} />
                            হোম পেজে যান
                        </Link>
                    </div>

                    {/* Navigation Tabs */}
                    <nav className="flex gap-2 mt-6 border-b border-gray-100 -mb-px overflow-x-auto">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={clsx(
                                        "flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap",
                                        "hover:text-brand-red hover:border-brand-red",
                                        "text-gray-600 border-transparent"
                                    )}
                                >
                                    <Icon size={18} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Content */}
            <main>{children}</main>
        </div>
    );
}
