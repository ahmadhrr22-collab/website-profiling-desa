import React from 'react'
import { MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WAButtonProps {
  nomorWA: string
  pesanWA?: string
  namaItem?: string
  className?: string
  label?: string
}

export function WAButton({
  nomorWA,
  pesanWA,
  namaItem,
  className,
  label = 'Hubungi via WhatsApp',
}: WAButtonProps) {
  // Bersihkan nomor WA dari spasi, tanda hubung, dll.
  const cleanedNo = nomorWA.replace(/[^0-9]/g, '')
  
  // Format nomor WA ke 62 (menghilangkan angka 0 di depan jika ada, lalu tambah 62)
  let formattedNo = cleanedNo
  if (formattedNo.startsWith('0')) {
    formattedNo = '62' + formattedNo.substring(1)
  } else if (!formattedNo.startsWith('62')) {
    formattedNo = '62' + formattedNo
  }

  // Buat pesan default jika tidak dispesifikasi
  const defaultPesan = namaItem 
    ? `Halo, saya tertarik dengan "${namaItem}". Boleh saya tahu informasi lebih lanjut?`
    : `Halo, saya ingin menanyakan informasi terkait Desa Gongseng.`
    
  const finalPesan = pesanWA || defaultPesan
  const url = `https://wa.me/${formattedNo}?text=${encodeURIComponent(finalPesan)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-sm hover:shadow-md cursor-pointer text-sm w-full md:w-auto',
        className
      )}
    >
      <MessageSquare className="w-5 h-5" />
      <span>{label}</span>
    </a>
  )
}
export default WAButton
