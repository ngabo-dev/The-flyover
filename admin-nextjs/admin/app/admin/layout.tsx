'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { TeamProvider } from '@/lib/team-context'
import { DataProvider } from '@/lib/data-context'
import { AuthProvider, useAuth } from '@/lib/auth-context'

type NavItem = {
  name: string
  href: string
  icon: string
}

type NavSection = {
  title: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    title: 'Main',
    items: [
      { name: 'Dashboard', href: '/admin', icon: 'home' },
    ],
  },
  {
    title: 'Content (CMS)',
    items: [
      { name: 'Hero Banner', href: '/admin/cms/hero', icon: 'image' },
      { name: 'About Us', href: '/admin/cms/about', icon: 'info' },
      { name: 'Services', href: '/admin/cms/services', icon: 'grid' },
      { name: 'Testimonials', href: '/admin/cms/testimonials', icon: 'message' },
      { name: 'Events', href: '/admin/cms/events', icon: 'calendar' },
      { name: 'Partners', href: '/admin/cms/partners', icon: 'handshake' },
    ],
  },
  {
    title: 'People (CRM)',
    items: [
      { name: 'Team Members', href: '/admin/team', icon: 'users' },
      { name: 'Contacts', href: '/admin/crm/contacts', icon: 'mail' },
      { name: 'Subscribers', href: '/admin/crm/subscribers', icon: 'bell' },
    ],
  },
  {
    title: 'Finance',
    items: [
      { name: 'Donations', href: '/admin/crm/donations', icon: 'dollar' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { name: 'Site Settings', href: '/admin/settings/site', icon: 'settings' },
      { name: 'Navigation', href: '/admin/settings/navigation', icon: 'menu' },
    ],
  },
]

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/admin/login'
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!checked) {
      setChecked(true)
      if (!user && !isLoginPage) {
        router.replace('/admin/login')
      }
    }
  }, [user, isLoginPage, router, checked])

  if (!checked) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800" /></div>
  }

  if (!user && !isLoginPage) return null
  if (isLoginPage) return <>{children}</>
  return <>{children}</>
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set())
  const [sidebarWidth, setSidebarWidth] = useState(256)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const resizeRef = useRef<HTMLDivElement>(null)
  const isResizing = useRef(false)
  const pathname = usePathname()

  const isActive = useCallback((href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }, [pathname])

  const toggleSection = useCallback((title: string) => {
    setCollapsedSections(prev => {
      const next = new Set(prev)
      if (next.has(title)) next.delete(title)
      else next.add(title)
      return next
    })
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return
      const newWidth = Math.max(200, Math.min(480, e.clientX))
      setSidebarWidth(newWidth)
    }
    const handleMouseUp = () => {
      isResizing.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const currentWidth = isCollapsed ? 64 : sidebarWidth

  function renderIcon(icon: string, className = 'h-5 w-5') {
    const props = { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }
    switch (icon) {
      case 'home':
        return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
      case 'users':
        return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-3.464M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      case 'image':
        return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      case 'info':
        return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      case 'grid':
        return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
      case 'message':
        return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
      case 'calendar':
        return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      case 'handshake':
        return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
      case 'mail':
        return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      case 'bell':
        return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V7a4 4 0 00-8 0v4" /></svg>
      case 'dollar':
        return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      case 'settings':
        return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      case 'menu':
        return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      case 'chevron-down':
        return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      case 'chevron-left':
        return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      case 'chevron-right':
        return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      default:
        return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    }
  }

  const isLoginPage = pathname === '/admin/login'

  return (
    <AuthProvider>
    <AuthGate>
    {isLoginPage ? children : (
    <div className="min-h-screen bg-gray-50 flex">
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        style={{ width: currentWidth }}
        className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transition-all duration-300 ease-in-out lg:static lg:inset-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full relative">
          <div className={`border-b border-gray-200 flex items-center ${isCollapsed ? 'justify-center p-3' : 'p-4'}`}>
            {!isCollapsed && (
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-green-800 truncate">Flyover Admin</h1>
                <p className="text-xs text-gray-500 truncate">The Flyover Bridge Africa</p>
              </div>
            )}
            {isCollapsed && (
              <h1 className="text-lg font-bold text-green-800">F</h1>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto overflow-x-hidden">
            {navSections.map((section) => {
              const isSectionCollapsed = collapsedSections.has(section.title)
              return (
                <div key={section.title} className="py-1">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className={`w-full flex items-center text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors ${
                      isCollapsed ? 'justify-center py-2' : 'px-4 py-2'
                    }`}
                  >
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{section.title}</span>
                        <span className={`transition-transform duration-200 ${isSectionCollapsed ? '' : 'rotate-180'}`}>
                          {renderIcon('chevron-down', 'h-3 w-3')}
                        </span>
                      </>
                    )}
                  </button>

                  {(!isSectionCollapsed) && (
                    <div className={isCollapsed ? 'flex flex-col items-center space-y-1 px-1' : 'space-y-0.5 px-2'}>
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`flex items-center rounded-lg transition-colors ${
                            isCollapsed
                              ? 'p-2 justify-center hover:bg-green-50'
                              : 'px-3 py-2 text-sm font-medium'
                          } ${
                            isActive(item.href)
                              ? 'bg-green-50 text-green-800'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-green-800'
                          }`}
                          title={isCollapsed ? item.name : undefined}
                        >
                          <span className={isCollapsed ? '' : 'mr-3'}>
                            {renderIcon(item.icon, isCollapsed ? 'h-5 w-5' : 'h-5 w-5')}
                          </span>
                          {!isCollapsed && (
                            <span className="truncate">{item.name}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="border-t border-gray-200 p-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full flex items-center justify-center p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {renderIcon(isCollapsed ? 'chevron-right' : 'chevron-left', 'h-5 w-5')}
            </button>
          </div>

          <div
            ref={resizeRef}
            className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-green-800/30 active:bg-green-800/50 transition-colors hidden lg:block"
            onMouseDown={() => {
              isResizing.current = true
              document.body.style.cursor = 'col-resize'
              document.body.style.userSelect = 'none'
            }}
          />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen" style={{ marginLeft: 0 }}>
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden text-gray-600 hover:text-green-800"
            >
              {renderIcon('menu', 'h-6 w-6')}
            </button>

            <div className="flex items-center space-x-3 ml-auto">
              <button className="text-gray-400 hover:text-green-800 transition-colors">
                {renderIcon('bell', 'h-5 w-5')}
              </button>
              <button className="text-gray-400 hover:text-green-800 transition-colors">
                {renderIcon('users', 'h-5 w-5')}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <DataProvider><TeamProvider>{children}</TeamProvider></DataProvider>
        </main>
      </div>
    </div>
    )}
    </AuthGate>
    </AuthProvider>
  )
}
