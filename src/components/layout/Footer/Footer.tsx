import Image from 'next/image'
import { socials } from '@/data/socials'

function Footer() {
  return (
    <div className="mt-9 px-6 py-10 pb-[51px] text-white/25 lg:mt-[195px] lg:px-[60px] lg:pb-[64px]">
      <div className="flex flex-col-reverse items-center lg:flex-row lg:justify-between">
        <div className="flex flex-col items-center gap-2.5 lg:flex-row lg:gap-8">
          <div>DeltaDex, 2022</div>
        </div>
        <ul className="mb-[80px] flex gap-4 lg:mb-0 lg:gap-8">
          {socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.link}
                className="flex h-10 w-10 items-center justify-center lg:h-8 lg:w-8"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-[44px] hidden lg:block">
        <a
          className="block hover:brightness-125"
          href="https://www.producthunt.com/products/via-protocol"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </div>
    </div>
  )
}

export { Footer }
