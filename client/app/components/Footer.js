import React from 'react'
import { assets } from '../assets/assets'
import Image from 'next/image'
import { motion } from 'motion/react'

const Footer = () => {
  const MotionImage = motion(Image)

  const footerLinks = [
    {
      title: 'Quick Links',
      links: ['Home', 'Browse Cars', 'List Your Cars', 'About Us']
    },
    {
      title: 'Resources',
      links: ['Help Center', 'Terms of Services', 'Privacy Policy', 'Insurance']
    },
    {
      title: 'Contact',
      links: [
        'Dummy Luxury Drive',
        'Siraha, Nepal',
        '+974 9702549523',
        'sahrupesh@gmail.com'
      ]
    }
  ]

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-gray-500 mt-40 text-sm px-6 md:px-16 lg:px-24 xl:px-32"
    >
      {/* Top Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-between gap-8 md:gap-12 items-start border-borderColor border-b pb-10"
      >
        {/* Logo + Description */}
        <div className="max-w-xs">
          <MotionImage
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            src={assets.logo}
            alt="logo"
            className="h-9 w-auto"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 leading-relaxed"
          >
            Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
          </motion.p>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-4 mt-6"
          >
            {[assets.facebook_logo, assets.instagram_logo, assets.twitter_logo, assets.gmail_logo].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-300"
              >
                <Image src={icon} alt="social" className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15 w-full md:w-auto">
          {footerLinks.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
            >
              <h2 className="text-base font-semibold uppercase text-gray-800 tracking-wide">
                {section.title}
              </h2>
              <ul className="mt-3 flex flex-col gap-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-gray-800 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col md:flex-row gap-3 items-center justify-between py-6 text-gray-400 text-sm"
      >
        <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#" className="hover:text-gray-800">Privacy</a>
          </li>
          <li>|</li>
          <li>
            <a href="#" className="hover:text-gray-800">Terms</a>
          </li>
          <li>|</li>
          <li>
            <a href="#" className="hover:text-gray-800">Sitemap</a>
          </li>
        </ul>
      </motion.div>
    </motion.footer>
  )
}

export default Footer
