import { Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useLocation } from 'react-router-dom'

const navigation = [
  { name: 'Головна', href: '/' },
  { name: 'Правила', href: '/rules' },
  { name: 'Часті питання', href: '/faq' },
]

const servers = [
  { name: 'Сабсервер', href: '/subserver' },
  { name: 'Домініон', href: '/dominion' },
]

const Header = () => {
  const location = useLocation()

  const isActive = (href) => location.pathname === href

  return (
    <Disclosure as="nav" className="bg-green-900/20 z-50 relative">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">
            <a href="/" className="flex items-center text-gray-200 font-bold text-lg">
              <img src="/logo512.png" alt="M4SUB" className="w-8 h-8 mr-2" />
              M4SUB
            </a>

            <div className="hidden md:flex space-x-4 items-center uppercase font-bold">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 hover:bg-gray-700 transition ${isActive(item.href) ? 'bg-[#c5629a] pointer-events-none' : ''}`}
                >
                  {item.name}
                </a>
              ))}

              <Menu as="div" className="relative">
                <Menu.Button className="px-4 py-2 flex items-center hover:bg-gray-700 transition">
                  СЕРВЕРИ
                  <ChevronDownIcon className="w-4 h-4 ml-2" />
                </Menu.Button>

                <Menu.Items className="absolute left-0 mt-2 w-40 bg-[#452136] shadow-lg">
                  {servers.map((server) => (
                    <Menu.Item key={server.name}>
                      {({ active }) => (
                        <a
                          href={server.href}
                          className={`block px-4 py-2 ${active ? 'bg-gray-700' : ''} ${isActive(server.href) ? 'bg-[#c5629a] pointer-events-none' : ''}`}
                        >
                          {server.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>

              <a
                href="https://discord.gg/fxqnU9by3M"
                target="_blank"
                rel="noreferrer"
                className="cornerCutSmall px-4 py-2 bg-[#5865f2] hover:bg-[#f390d0] text-gray-200 transition flex items-center">
                <img src="/icons/light-discord.png" alt="Discord Icon" className="w-6 h-6 mr-2" />
                Discord
              </a>
            </div>

            <Disclosure.Button className="md:hidden flex items-center justify-center w-8 h-8 text-gray-200">
              {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </Disclosure.Button>
          </div>

          <Disclosure.Panel className="absolute top-full left-0 w-full md:hidden bg-[#202c28] space-y-1 px-2 py-4 uppercase font-bold shadow-lg z-50">

            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 hover:bg-gray-700 transition ${isActive(item.href) ? 'bg-[#c5629a] pointer-events-none' : ''}`}
              >
                {item.name}
              </a>
            ))}

            <div className="w-full">
              <details className="w-full">
                <summary className="px-4 py-2 cursor-pointer hover:bg-gray-700 transition">СЕРВЕРИ</summary>
                <div className="w-full bg-green-900/40 mt-1">
                  {servers.map((server) => (
                    <a
                      key={server.name}
                      href={server.href}
                      className={`block px-4 py-2 hover:bg-gray-700 transition`}
                    >
                      {server.name}
                    </a>
                  ))}
                </div>
              </details>
            </div>



            <a
              href="https://discord.gg/fxqnU9by3M"
              target="_blank"
              rel="noreferrer"
              className="block px-4 py-2 bg-[#5865f2] hover:bg-[#f390d0] text-gray-200 transition flex items-center"
            >
              <img src="/icons/light-discord.png" alt="Discord Icon" className="w-6 h-6 mr-2" />
              Discord
            </a>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header
