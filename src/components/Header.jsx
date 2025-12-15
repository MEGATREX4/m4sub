import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation } from 'react-router-dom'

const navigation = [
  { name: 'Новини', href: '/news', icon: 'hn-newspaper' },
  { name: 'Правила', href: '/subserver/rules', icon: ' hn-writing' },
  { name: 'FAQ', href: '/faq', icon: 'hn-question-solid' },
  { name: 'Донат', href: '/donate', icon: 'hn-heart-solid' },
]

const Header = () => {
  const location = useLocation()

  const isActive = (href) => location.pathname === href

  return (
    <Disclosure as="nav" className="bg-[#0a0a12] border-b-[3px] border-[#c5629a]/30 z-50 relative">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-3">
            {/* Logo */}
            <a href="/" className="flex items-center text-white font-bold text-lg minecraftFont gap-2 hover:text-[#c5629a] transition-colors group">
              <img 
                src="/logo512.png" 
                alt="M4SUB" 
                className="w-8 h-8 group-hover:scale-110 transition-transform" 
                style={{ imageRendering: 'pixelated' }} 
              />
              <span>M4SUB</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`
                    px-4 py-2 text-sm font-bold minecraftFont transition-all flex items-center gap-2
                    ${isActive(item.href) 
                      ? 'bg-[#c5629a] text-white pointer-events-none' 
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a2e]'
                    }
                  `}
                >
                  <i className={`hn ${item.icon} text-xs`}></i>
                  {item.name}
                </a>
              ))}

              {/* Discord Button */}
              <a
                href="https://discord.gg/fxqnU9by3M"
                target="_blank"
                rel="noreferrer"
                className="ml-2 cornerCutSmall px-4 py-2 bg-[#5865f2] hover:bg-[#4752c4] text-white text-sm font-bold minecraftFont transition-colors flex items-center gap-2"
              >
                <i className="hn hn-discord"></i>
                Discord
              </a>
            </div>

            {/* Mobile Menu Button */}
            <Disclosure.Button className="md:hidden flex items-center justify-center w-10 h-10 text-gray-400 hover:text-white hover:bg-[#1a1a2e] transition-colors">
              {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </Disclosure.Button>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="md:hidden bg-[#0a0a12] border-t border-[#c5629a]/20">
            <div className="px-3 py-4 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`
                    block px-4 py-3 text-sm font-bold minecraftFont transition-colors flex items-center gap-3
                    ${isActive(item.href) 
                      ? 'bg-[#c5629a] text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a2e]'
                    }
                  `}
                >
                  <i className={`hn ${item.icon}`}></i>
                  {item.name}
                </a>
              ))}

              {/* Discord Button Mobile */}
              <a
                href="https://discord.gg/fxqnU9by3M"
                target="_blank"
                rel="noreferrer"
                className="block px-4 py-3 bg-[#5865f2] hover:bg-[#4752c4] text-white text-sm font-bold minecraftFont transition-colors flex items-center gap-3 mt-2"
              >
                <i className="hn hn-discord"></i>
                Discord
              </a>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header