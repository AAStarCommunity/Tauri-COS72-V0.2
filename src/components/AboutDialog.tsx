'use client'

import { useState, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/core'
import Image from 'next/image'

interface SystemInfo {
  os: string
  arch: string
  version: string
  kernelVersion?: string
}

interface AboutDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function AboutDialog({ isOpen, onClose }: AboutDialogProps) {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null)

  useEffect(() => {
    if (isOpen && !systemInfo) {
      // Get system info via Tauri
      invoke('get_system_info').then((info: unknown) => {
        setSystemInfo(info as SystemInfo)
      }).catch(console.error)
    }
  }, [isOpen, systemInfo])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex flex-col items-center space-y-4">
          {/* Logo */}
          <div className="w-16 h-16 relative">
            <Image 
              src="/logo.png" 
              alt="COS72 Logo" 
              width={64}
              height={64}
              className="rounded-lg"
            />
          </div>
          
          {/* App Info */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">COS72</h2>
            <p className="text-sm text-gray-600 mt-1">Empower Community！</p>
          </div>

          {/* Version Info */}
          <div className="w-full space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Version:</span>
              <span className="font-mono">0.13.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Build:</span>
              <span className="font-mono">Tauri 2.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-mono">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Platform:</span>
              <span className="font-mono">
                {systemInfo ? `${systemInfo.os} ${systemInfo.arch}` : 'Loading...'}
              </span>
            </div>
            {systemInfo?.version && (
              <div className="flex justify-between">
                <span className="text-gray-600">OS Version:</span>
                <span className="font-mono">{systemInfo.version}</span>
              </div>
            )}
          </div>

          {/* Tech Stack */}
          <div className="w-full border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Built with:</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">React:</span>
                <span className="font-mono">19.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next.js:</span>
                <span className="font-mono">15.3.2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tauri:</span>
                <span className="font-mono">2.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rust:</span>
                <span className="font-mono">Latest</span>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
} 