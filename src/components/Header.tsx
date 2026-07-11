"use client";

import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface shadow-header">
      <div className="max-w-layout mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-dark-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">n</span>
            </div>
            <span className="font-bold text-lg text-text hidden sm:block">
              누띵즈
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="글, 주제, 키워드 검색..."
                className="w-full h-10 pl-10 pr-4 bg-surface-muted border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" strokeWidth="2" />
                <path d="M21 21l-4-4" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-text hover:bg-surface-hover rounded-lg transition-colors"
            >
              홈
            </Link>
            <Link
              href="/category/info"
              className="px-4 py-2 text-sm font-medium text-text-muted hover:bg-surface-hover rounded-lg transition-colors"
            >
              정보
            </Link>
            <Link
              href="/category/tips"
              className="px-4 py-2 text-sm font-medium text-text-muted hover:bg-surface-hover rounded-lg transition-colors"
            >
              꿀팁
            </Link>
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-text-muted hover:bg-surface-hover rounded-lg"
              aria-label="검색"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" strokeWidth="2" />
                <path d="M21 21l-4-4" strokeWidth="2" />
              </svg>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-text-muted hover:bg-surface-hover rounded-lg"
              aria-label="메뉴"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {searchOpen && (
          <div className="pb-3 lg:hidden">
            <input
              type="text"
              placeholder="글, 주제, 키워드 검색..."
              autoFocus
              className="w-full h-10 px-4 bg-surface-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 w-64 h-full bg-surface z-50 shadow-xl lg:hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="font-bold text-lg">누띵즈</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-text-muted hover:bg-surface-hover rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth="2" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <nav className="p-4 space-y-1">
              <Link href="/" className="block px-4 py-3 text-text font-medium hover:bg-surface-hover rounded-lg">
                홈
              </Link>
              <Link href="/category/info" className="block px-4 py-3 text-text-muted hover:bg-surface-hover rounded-lg">
                정보
              </Link>
              <Link href="/category/tips" className="block px-4 py-3 text-text-muted hover:bg-surface-hover rounded-lg">
                꿀팁
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
