import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { fetchStudentById } from '../../api'
import toast from 'react-hot-toast'

import {
  ArrowLeft,
  GraduationCap,
  Phone,
  Mail,
  User,
  Calendar,
  MapPin
} from 'lucide-react'

export default function StudentProfile() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStudent = async () => {
      const res = await fetchStudentById(id)

      if (res.success) {
        setStudent(res.data)
      } else {
        toast.error('Student not found')
        navigate('/admin/students')
      }

      setLoading(false)
    }

    loadStudent()
  }, [id, navigate])

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-28 rounded-xl bg-gray-200"></div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gray-200"></div>

            <div>
              <div className="h-5 w-40 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        <div className="h-52 rounded-2xl bg-gray-200"></div>
        <div className="h-52 rounded-2xl bg-gray-200"></div>
      </div>
    )
  }

  if (!student) return null

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="
          inline-flex
          items-center
          gap-2
          px-4
          py-2
          rounded-xl
          bg-white
          border
          border-gray-200
          shadow-sm
          text-sm
          font-medium
          text-gray-700
          hover:bg-gray-50
          transition
        "
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Profile Header */}
      <div
        className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
          overflow-hidden
        "
      >
        <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />

        <div className="p-5">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className="
                h-14
                w-14
                rounded-2xl
                bg-gradient-to-br
                from-blue-100
                to-indigo-100
                text-blue-700
                flex
                items-center
                justify-center
                text-2xl
                font-bold
                shadow-md
                ring-4
                ring-blue-50
                shrink-0
              "
            >
              {student.name?.charAt(0)?.toUpperCase()}
            </div>

            {/* Student Info */}
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {student.name}
              </h1>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1
                    px-3
                    py-1
                    rounded-full
                    bg-blue-50
                    text-blue-600
                    text-sm
                    font-semibold
                  "
                >
                  <GraduationCap size={14} />
                  Class {student.class}
                </span>

                <span
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-gray-100
                    text-gray-600
                    text-sm
                    font-medium
                  "
                >
                  Roll #{student.rollNumber}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parent Information */}
      <SectionCard title="Parent Information">
        <InfoItem
          icon={<User size={16} />}
          label="Father's Name"
          value={student.parents?.fatherName || '-'}
        />

        <InfoItem
          icon={<User size={16} />}
          label="Mother's Name"
          value={student.parents?.motherName || '-'}
        />

        <InfoItem
          icon={<Phone size={16} />}
          label="Mobile"
          value={student.parents?.mobile || '-'}
        />

        <InfoItem
          icon={<Mail size={16} />}
          label="Email"
          value={student.parents?.email || '-'}
        />
      </SectionCard>

      {/* Personal Information */}
      <SectionCard title="Personal Information">
        <InfoItem
          icon={<Calendar size={16} />}
          label="Date of Birth"
          value={
            student.personal?.dob
              ? new Date(student.personal.dob).toLocaleDateString()
              : '-'
          }
        />

        <InfoItem
          icon={<MapPin size={16} />}
          label="Address"
          value={student.personal?.address || '-'}
        />
      </SectionCard>
    </div>
  )
}

function SectionCard({ title, children }) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-100
        shadow-sm
        p-6
      "
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-5">
        {title}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  )
}

function InfoItem({ icon, label, value }) {
  return (
    <div
      className="
        flex
        items-start
        gap-2
        p-4
        rounded-xl
        bg-slate-50
        border
        border-slate-100
      "
    >
      <div className="text-gray-500 mt-0.5">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-500">
          {label}
        </p>

        <p className="text-sm font-semibold text-gray-900 mt-1 break-words">
          {value}
        </p>
      </div>
    </div>
  )
}