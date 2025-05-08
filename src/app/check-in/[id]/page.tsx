"use client"

import { useEffect, useRef, useState } from "react"
import { Html5Qrcode } from "html5-qrcode"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function CheckInPage({ params }: { params: { id: string } }) {
  const eventId = params.id;
  const [data, setData] = useState({
    id : eventId,
    decoded : ' '
  })
  const qrCodeRegionId = "qr-reader"
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null)
  const router = useRouter()
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    
    const container = document.getElementById(qrCodeRegionId)
    if (container) {
      container.innerHTML = ""
    }

    const startScanner = async () => {
      try {
        
        if (html5QrCodeRef.current) {
          await html5QrCodeRef.current.stop()
          html5QrCodeRef.current.clear()
          html5QrCodeRef.current = null
        }

        const qrCodeScanner = new Html5Qrcode(qrCodeRegionId)
        html5QrCodeRef.current = qrCodeScanner
        setIsScanning(true)

        await qrCodeScanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          async (decodedText) => {
            setData({ ...data, decoded: decodedText })
            try {
              const res = await axios.put('/api/admin/check-in', data);
              const responseData = res.data;
              alert(responseData.message)
            } catch (error) {
              alert('Something went wrong')
            }
            console.log("QR Code Scanned:", decodedText)

            stopScanner().then(() => {
              alert(`QR Code: ${decodedText}`)
              router.push("/my-events")
            })
          },
          (errorMessage) => {
            console.warn("QR Scan Error:", errorMessage)
          },
        )
      } catch (err) {
        console.error("Failed to start QR scanner:", err)
        setIsScanning(false)
      }
    }

    const stopScanner = async () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current.getState() === 2) {
        try {
          await html5QrCodeRef.current.stop()
          html5QrCodeRef.current.clear()
          setIsScanning(false)
        } catch (error) {
          console.error("Error stopping scanner:", error)
        }
      }
    }

    
    if (!isScanning) {
      startScanner()
    }

    return () => {
      stopScanner()
    }
  }, [router, isScanning])

  const handleClose = async () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.getState() === 2) {
      try {
        await html5QrCodeRef.current.stop()
        html5QrCodeRef.current.clear()
      } catch (error) {
        console.error("Error stopping scanner:", error)
      }
    }
    router.push("/my-events")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-2xl mb-4">Scan QR Code</h1>
      <div id={qrCodeRegionId} className="w-full max-w-xs rounded-lg overflow-hidden" />
      <button onClick={handleClose} className="mt-6 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-all">
        Cancel & Go Back
      </button>
    </div>
  )
}
