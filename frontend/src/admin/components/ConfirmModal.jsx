import React from "react"

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 animate-fadeIn">
        
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">
          {title || "Confirm Action"}
        </h2>

        {/* Message */}
        <p className="text-sm text-gray-600 mt-2">
          {message || "Are you sure you want to continue?"}
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  )
}

export default ConfirmModal