export const metadata = {
  title: 'NeoSync',
  description: 'Secret Vault',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import Newsletter from '@/components/newsletter'
import Zigzag from '@/components/zigzag'
import Testimonials from '@/components/testimonials'
import Header from '@/components/ui/(default)/header'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Zigzag />
      <Testimonials />
      <Newsletter />
    </>
  )
}
