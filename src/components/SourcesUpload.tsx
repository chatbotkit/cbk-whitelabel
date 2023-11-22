'use client'

import {
  ArrowDownIcon,
  CloudIcon,
  DocumentArrowUpIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/Button'
import { XMarkIcon } from '@heroicons/react/20/solid'

type UploadInputProps = {
  setJsonlData?: React.Dispatch<React.SetStateAction<Dataset[]>>
}

type Message = {
  role: string
  content: string
}

type Dataset = {
  messages: Message[]
}

const UploadInput: React.FC<UploadInputProps> = ({ setJsonlData }) => {
  const [file, setFile] = useState<File>()
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      maxFiles: 1,
      accept: {
        'application/jsonl': ['.jsonl'],
        'application/json': ['.json'],
      },
      onDrop: async (acceptedFiles: File[]) => {
        console.log('accepted files')
      },
    })

  return (
    <div className="grid grid-cols-4 gap-6">
      <div
        className={`relative h-[16rem] w-full cursor-pointer overflow-hidden rounded-lg transition duration-150 bg-white col-span-3`}
      >
        {file ? (
          <div className="border border-main rounded-lg h-full w-full flex flex-col items-center justify-center relative">
            <Button
              variant="default"
              size="icon"
              onClick={() => setFile(undefined)}
              className="absolute top-2 right-2 h-9 w-9"
            >
              <XMarkIcon className="h-4 w-4" />
            </Button>
            <DocumentArrowUpIcon className="h-4 w-4 mb-1" />
            <h2 className="text-base font-medium">{file.name}</h2>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className="group relative z-30 h-full w-full overflow-hidden"
          >
            <input name="jsonl-file" {...getInputProps()} maxLength={1} />
            {isDragActive && (
              <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center space-y-2 rounded-lg border border-dashed border-indigo-500 text-center">
                <ArrowDownIcon className="text-secondary h-8 w-8" />
                <div className="flex items-center space-x-2">
                  <h3 className="cursor-pointer text-sm font-semibold transition duration-150 group-hover:text-indigo-500">
                    Drop your file here
                  </h3>
                </div>
                <p className="text-secondary text-xs">
                  Supported File Types: .pdf, .doc, .docx, .txt
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
                  Supported File Types: .pdf, .doc, .docx, .txt
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg border border-zinc-200 p-6 flex flex-col">
        <h1>hi</h1>
        <Button className="w-full mt-auto">Upload files</Button>
      </div>
    </div>
  )
}

export default UploadInput
