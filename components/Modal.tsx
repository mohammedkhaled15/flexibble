"use client"

import { useCallback, useRef, ReactNode } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Modal = ({ children }: { children: ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.push("/")
  }, [overlay])
  const handleClick = useCallback((e: React.MouseEvent) => {
    if ((e.target === overlay.current) && onDismiss) {
      onDismiss()
    }
  }, [onDismiss, overlay])
  return (
    <div className="modal" ref={overlay} onClick={handleClick}>
      <button
        type="button"
        onClick={onDismiss}
        className="absolute right-8 top-4"
      >
        <Image src="/close.svg" width={17} height={17} alt="close" />
      </button>
      <div className="modal_wrapper" ref={wrapper}>
        {children}
      </div>
    </div>
  )
}

export default Modal