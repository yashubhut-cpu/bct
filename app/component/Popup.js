import { useEffect, useState } from "react"
import { X } from "lucide-react"

const Popup = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!isVisible) return null

  return (
    <div
      className={`fixed top-4 right-4 rounded-lg shadow-lg flex flex-col max-w-sm w-full z-50 overflow-hidden ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <p className="text-white font-semibold">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false)
            onClose()
          }}
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          <X size={20} />
        </button>
      </div>
      <div className="w-full bg-white bg-opacity-30 h-1 bottom-0 rounded-full overflow-hidden">
        <div
          className="h-full bg-white animate-shrink-width"
          style={{
            animation: "shrinkWidth 3s linear forwards",
          }}
        />
      </div>
    </div>
  )
}

export default Popup