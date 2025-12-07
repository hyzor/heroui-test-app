'use client'
import dynamic from 'next/dynamic'

const ResumeViewer = dynamic(() => import('./resume'), {
 ssr: false
})
export default ResumeViewer
