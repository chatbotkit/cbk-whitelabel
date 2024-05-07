'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { useParams } from 'next/navigation'

import { addFile, deleteFile } from '@/actions/file'
import LoadingSpinner from '@/components/LoadingSpinner'
import { FormButton } from '@/components/ui/FormButton'

import { FileInstance } from '@chatbotkit/sdk/file/v1'
import {
  ArrowDownIcon,
  CloudIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/solid'

import { toast } from 'sonner'

export default function UploadFileInput({ files }: { files: FileInstance[] }) {
  const [file, setFile] = useState<File>()
  const params: { botId: string } = useParams()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
    },
    onDrop: async (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0])
    },
  })

  return (
    <>
      <form
        action={async (formData) => {
          // Note: There is a bug in Chromium Browsers with React Dropzone
          // https://github.com/react-dropzone/react-dropzone/issues/1290
          formData.delete('file')
          formData.append('file', file as File, file?.name)
          const error = await addFile(formData, params.botId)
          if (error) {
            toast.error('Something went wrong')
          } else {
            toast.success('You source is ready!')
            setFile(undefined)
          }
        }}
      >
        <div className="grid grid-cols-4 gap-6">
          <div
            className={`relative h-[16rem] w-full cursor-pointer overflow-hidden rounded-lg transition duration-150 bg-white col-span-3`}
          >
            <div
              {...getRootProps()}
              className="group relative z-30 h-full w-full overflow-hidden"
            >
              <input {...getInputProps()} name="file" />
              {isDragActive && (
                <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center space-y-2 rounded-lg border border-dashed border-indigo-500 text-center">
                  <ArrowDownIcon className="text-secondary h-8 w-8" />
                  <div className="flex items-center space-x-2">
                    <h3 className="cursor-pointer text-sm font-semibold transition duration-150 group-hover:text-indigo-500">
                      Drop your file here
                    </h3>
                  </div>
                  <p className="text-secondary text-xs">
                    Supported File Types: .pdf, .docx, .txt
                  </p>
                </div>
              )}
              {!isDragActive && (
                <div className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center space-y-2 overflow-hidden rounded-lg border border-dashed border-zinc-400 text-center">
                  <CloudIcon className="text-secondary h-8 w-8" />
                  <div className="flex items-center space-x-2">
                    <h3 className="cursor-pointer text-sm font-semibold underline transition duration-150">
                      Click to upload
                    </h3>
                    <h3 className="text-sm">or Drag & Drop</h3>
                  </div>
                  <p className="text-secondary text-xs">
                    Supported File Types: .pdf, .docx, .txt
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-zinc-200 p-6 flex flex-col">
            {file ? (
              <div className="flex flex-col space-y-4">
                <h3 className="text-sm font-semibold">{file.name}</h3>
                <div className="flex items-center space-x-4">
                  <p className="text-xs font-medium">Type:</p>
                  <p className="text-xs font-medium">{file.type}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-xs font-medium">Size:</p>
                  <p className="text-xs font-medium">
                    {(file.size / (1024 * 1024)).toFixed(2)}MB
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-sm font-semibold">Selected Files</h3>
              </div>
            )}
            <div className="flex items-center space-x-2 mt-auto">
              <FormButton
                pendingState="Processing..."
                disabled={!file}
                className="w-full button"
              >
                Upload file
              </FormButton>
              <button
                onClick={() => setFile(undefined)}
                type="button"
                className="button button-outline button-icon"
              >
                <TrashIcon className="min-h-[1rem] min-w-[1rem] text-rose-500" />
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="mt-5 flex flex-col gap-3 mb-10">
        {files?.map((item) => (
          <form
            key={item.id}
            className="bg-white border border-zinc-200 pl-6 pr-2 py-2 flex items-center justify-between rounded-lg"
            action={async () => {
              const error = await deleteFile(item.id)
              if (error) {
                toast.error('Something went wrong')
              }
            }}
          >
            <div className="flex items-center space-x-2">
              <DocumentIcon className="h-4 w-4" />
              <p className="text-sm">{item.name}</p>
            </div>
            <FormButton
              pendingState={<LoadingSpinner />}
              className="h-8 w-8 button button-outline button-icon"
            >
              <TrashIcon className="min-h-[0.9rem] min-w-[0.9rem] text-rose-500" />
            </FormButton>
          </form>
        ))}
      </div>
    </>
  )
}
