import { NextResponse } from 'next/server'
import { getPayload } from '@/lib/payload'

export async function GET() {
  try {
    const payload = await getPayload()
    const users = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'ahmdhariri@apps.ipb.ac.id',
        },
      },
    })

    if (users.docs.length > 0) {
      const user = users.docs[0]
      const updated = await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          password: 'AdminGongseng2026!',
        },
      })
      return NextResponse.json({
        success: true,
        message: 'Admin account unlocked and password updated successfully via Payload Native API!',
        email: updated.email,
      })
    }

    return NextResponse.json({ success: false, message: 'User not found' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message })
  }
}
