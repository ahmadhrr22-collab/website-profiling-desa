import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail, MessageSquare } from 'lucide-react'
import { getPayload } from '@/lib/payload'

// Custom Instagram SVG icon since brand icons are removed in recent lucide-react versions
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export async function Footer() {
  let contacts = null
  try {
    const payload = await getPayload()
    contacts = await payload.findGlobal({
      slug: 'kontak-sosmed',
      depth: 1,
    })
  } catch (err) {
    console.error('Failed to fetch contact info for footer:', err)
  }

  // Fallback defaults jika admin belum mengisi data di CMS
  const nomorWA = contacts?.nomorWA || ''
  const email = contacts?.email || 'kantor@desagongseng.id'
  const alamat = contacts?.alamat || 'Kantor Desa Gongseng, Kec. Megaluh, Jombang, Jawa Timur'
  const instagram = contacts?.instagram || ''

  // Format nomor WA ke wa.me link
  let waLink = '#'
  if (nomorWA) {
    const cleaned = nomorWA.replace(/[^0-9]/g, '')
    const formatted = cleaned.startsWith('0') ? '62' + cleaned.substring(1) : cleaned.startsWith('62') ? cleaned : '62' + cleaned
    waLink = `https://wa.me/${formatted}?text=Halo%20Kantor%20Desa%20Gongseng%2C%20saya%20ingin%20menanyakan%20informasi...`
  }

  return (
    <footer className="w-full bg-primary text-white border-t border-secondary/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Kolom 1: Profil Singkat */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                <Image
                  src="/images/logo-kabupaten-jombang.png"
                  alt="Logo Kabupaten Jombang"
                  width={40}
                  height={40}
                  className="object-contain drop-shadow-md"
                />
              </div>
              <span className="text-lg font-bold tracking-wider">Desa Gongseng</span>
            </div>
            <p className="text-sm text-light/80 leading-relaxed max-w-sm">
              Website resmi Desa Gongseng, Kec. Megaluh, Kab. Jombang, Jawa Timur. 
              Pusat informasi layanan administrasi, tata kelola pemerintahan, dan potensi pertanian desa.
            </p>
            <p className="text-xs text-light/50 font-medium">
              Program KKN-T Mahasiswa Institut Pertanian Bogor 2026.
            </p>
          </div>

          {/* Kolom 2: Akses Cepat */}
          <div className="space-y-4">
            <h3 className="text-base font-bold tracking-wider text-accent border-b border-secondary/35 pb-2 inline-block">
              Akses Cepat
            </h3>
            <ul className="space-y-2 text-sm text-light/85">
              <li>
                <Link href="/profil-desa" className="hover:text-accent transition-colors">
                  Profil Desa
                </Link>
              </li>
              <li>
                <Link href="/potensi-pertanian" className="hover:text-accent transition-colors">
                  Potensi & Pertanian Desa
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-accent transition-colors">
                  Galeri Kegiatan
                </Link>
              </li>
              <li>
                <Link href="/perangkat-desa" className="hover:text-accent transition-colors">
                  Pemerintahan & Perangkat
                </Link>
              </li>
              <li>
                <Link href="/layanan-informasi" className="hover:text-accent transition-colors">
                  Layanan & Kegiatan Warga
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-accent transition-colors">
                  Portal CMS Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak Resmi */}
          <div className="space-y-4">
            <h3 className="text-base font-bold tracking-wider text-accent border-b border-secondary/35 pb-2 inline-block">
              Hubungi Kami
            </h3>
            <ul className="space-y-3 text-sm text-light/85">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">{alamat}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-accent transition-colors break-all">
                  {email}
                </a>
              </li>
              {nomorWA && (
                <li className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-accent shrink-0" />
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    +{nomorWA.startsWith('0') ? '62' + nomorWA.substring(1) : nomorWA.startsWith('62') ? nomorWA : '62' + nomorWA} (WhatsApp)
                  </a>
                </li>
              )}
              {instagram && (
                <li className="flex items-center gap-3">
                  <InstagramIcon className="w-5 h-5 text-accent shrink-0" />
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors break-all"
                  >
                    Instagram @desagongseng
                  </a>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Hak Cipta */}
        <div className="border-t border-secondary/25 mt-10 pt-6 text-center text-xs text-light/50">
          <p>© {new Date().getFullYear()} Pemerintah Desa Gongseng. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
