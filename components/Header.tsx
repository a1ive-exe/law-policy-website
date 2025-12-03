// components/Header.tsx  (NO "use client" at the top)
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Scale } from "lucide-react";

type HeaderProps = { isAdmin?: boolean };

export default function Header({ isAdmin = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-lg">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <Link href="/" className="text-2xl font-serif font-bold text-slate-900 hover:text-slate-700 transition-colors block">
                Devesh Mandhata
              </Link>
              <span className="hidden text-xs font-medium text-slate-500 md:block">Law & Policy</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link href="/" className="text-slate-700 hover:text-slate-900 font-medium transition-colors relative group">Home<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full" /></Link>
              <Link href="/categories" className="text-slate-700 hover:text-slate-900 font-medium transition-colors relative group">Categories<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full" /></Link>
              <Link href="/general/articles" className="text-slate-700 hover:text-slate-900 font-medium transition-colors relative group">Articles<span className="absolute bottom-0 left-0 w-0.5 bg-amber-600 transition-all group-hover:w-full" /></Link>
              <Link href="/general/blogs" className="text-slate-700 hover:text-slate-900 font-medium transition-colors relative group">Blogs<span className="absolute bottom-0 left-0 w-0.5 bg-amber-600 transition-all group-hover:w-full" /></Link>
              <Link href="/general/papers" className="text-slate-700 hover:text-slate-900 font-medium transition-colors relative group">Papers<span className="absolute bottom-0 left-0 w-0.5 bg-amber-600 transition-all group-hover:w-full" /></Link>
              <Link href="/policy" className="text-slate-700 hover:text-slate-900 font-medium transition-colors relative group">Policy<span className="absolute bottom-0 left-0 w-0.5 bg-amber-600 transition-all group-hover:w-full" /></Link>
              <Link href="/about" className="text-slate-700 hover:text-slate-900 font-medium transition-colors relative group">About<span className="absolute bottom-0 left-0 w-0.5 bg-amber-600 transition-all group-hover:w-full" /></Link>
              <Link href="/contact" className="text-slate-700 hover:text-slate-900 font-medium transition-colors relative group">Contact<span className="absolute bottom-0 left-0 w-0.5 bg-amber-600 transition-all group-hover:w-full" /></Link>

              {/* Only show Admin when logged in */}
              {isAdmin && (
                <Link href="/admin" className="text-slate-700 hover:text-slate-900 font-medium transition-colors relative group text-xs">
                  Admin
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full" />
                </Link>
              )}
            </nav>

            <div className="hidden lg:block w-64">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
