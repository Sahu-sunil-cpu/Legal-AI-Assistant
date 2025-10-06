"use client"

import { Send, Paperclip, X, FileText, Image, Bot, User, FileIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState, useRef, useEffect } from "react"
import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown'
import { Markdown } from "./Markdown"
import { useApp } from "./context/AppContext"
import AISpinner from "./Loader"





export function ChatInterface() {
  const { state, dispatch } = useApp();
  const [message, setMessage] = useState("")
  const [attachedFiles, setAttachedFiles] = useState<{
    file: File,
    url: string,
  }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { messages, sendMessage, status, stop, setMessages, resumeStream } = useChat();
  const [inputWidth, setInputWidth] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null)



  const suggestions = [
    "What are my tenant rights if my landlord refuses to fix plumbing issues",
    "Please analyze this rental agreement and tell me if anything looks risky",
    "What should I do if I received a court notice for a civil case?",
    "I’ve uploaded a lease agreement — does it comply with tenant protection laws?",

  ]

  useEffect(() => {
    if (!state.newThread) return;
    setAttachedFiles([]);
    setMessage("");

  }, [state.newThread])

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion)
  }

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  // useEffect(() => {
  //   if(attachedFiles.length <= 0) return;
  //   attachedFiles.forEach(async f => {
  //     setAttachedFilesUrl
  //     const file = await convertToBase64(f);
  //     const type = f.type == 'application/pdf' ? f.type : 'image/png'
  //     setAttachedFilesUrl(prev => [...prev, {url: file, type: type, name: f.name}]);

  //     console.log(attachedFilesUrl)
  //   })
  // }, [attachedFiles])

  const handleSendMessage = () => {
    console.log(messages)
    dispatch({ type: "SET_NEW_THREAD", payload: false })
    dispatch({ type: "SET_RESPONSE_LOADING", payload: true })

    if (message.trim()) {
      sendMessage({
        role: 'user',
        parts: [
          // check if imageUrl is defined, if so, add it to the message
          ...(attachedFiles.length > 0
            ?
            attachedFiles.map(f =>
            ({
              type: 'file' as const,
              mediaType: f.file.type == 'application/pdf' ? f.file.type : 'image/png',
              url: f.url,
              filename: f.file.name
            })
            )


            : []),
          { type: 'text' as const, text: message },
        ],
      });

      // sendMessage({ text: message });
      setMessage("");
      setAttachedFiles([]);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileAttach = () => {
    fileInputRef.current?.click()
  }


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const files = Array.from(e.target.files || [])
    files.forEach(async f => {

      const fileUrl = await convertToBase64(f);
      // const type = 
      setAttachedFiles(prev => [...prev, { file: f, url: fileUrl }]);

    })
    //  setAttachedFiles(prev => [...prev, ...files]);
  }

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image;
    return FileText
  }

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px'
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  return (
    <div className="flex-1 flex flex-col h-full relative w-full max-w-full bg-[#303030] text-white">
  {/* Main Content Area */}
  <div className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 pb-40 w-full">
    {!messages[0] || state.newThread ? (
      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-3xl font-bold mb-2 text-white">
            How can I help you today?
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8 justify-center flex-wrap">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              className="px-6 py-3 rounded-full bg-[#3a3a3a] border border-gray-600 hover:bg-[#4a4a4a] text-white transition text-sm sm:text-base"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    ) : (
      <div className="flex flex-col gap-3 mb-8 w-full max-w-3xl sm:max-w-2xl px-2 whitespace-normal">
        <div className="flex-1 overflow-y-auto px-1 py-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="text-wrap overflow-x-auto break-words max-w-full whitespace-pre-wrap">
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm sm:text-base shadow-md ${
                      msg.role === 'user'
                        ? 'bg-[#4b5563] text-white border border-gray-600'
                        : ' text-white border border-gray-600'
                    }`}
                  >
                    {msg.parts.map((part, i) => {
                      switch (part.type) {
                        case 'text':
                          return (
                            <div
                              key={`${msg.id}-${i}`}
                              className="overflow-x-auto break-words max-w-full whitespace-pre-wrap"
                            >
                              {msg.role === 'user' ? (
                                <div>{part.text}</div>
                              ) : (
                                <Markdown>
                                  {Array.isArray(part.text)
                                    ? part.text.join(' ')
                                    : part.text}
                                </Markdown>
                              )}
                            </div>
                          );
                        case 'file':
                          return (
                            <div key={part.filename}>
                              {part.mediaType !== 'image/png' ? (
                                <div className="flex min-w-52 max-w-60 items-center bg-gray-700 gap-3 mb-1 border border-gray-600 px-4 py-3 rounded-xl text-sm shadow-sm">
                                  <FileIcon className="w-4 h-4 text-gray-300 shrink-0" />
                                  <div className="flex flex-col min-w-0">
                                    <span className="truncate max-w-40 text-white font-medium">
                                      {part.filename}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <img
                                  key={(part.filename || 'image') + i}
                                  className="max-w-24 p-2 border border-gray-600 rounded"
                                  src={part.url}
                                  alt={part.mediaType ?? 'image'}
                                />
                              )}
                            </div>
                          );
                        case 'tool-weather':
                        case 'tool-convertFahrenheitToCelsius':
                          return (
                            <pre key={`${msg.id}-${i}`}>
                              <div className="text-sm font-bold text-white mb-2">
                                {JSON.stringify(part, null, 2)}
                              </div>
                            </pre>
                          );
                      }
                    })}
                  </div>
                </div>
              </div>
            ))}

            {(status === 'submitted' || status === 'streaming') && (
              <div>
                {status === 'submitted' && (
                  <img src="/lexi.svg" alt="Loading..." className="mx-auto" />
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    )}
  </div>

  {/* Fixed Input Area */}
  <div className="bottom-0 left-0 right-0 sticky w-full bg-[#303030]">
    <div className="max-w-3xl mx-auto px-3 sm:px-4 pb-6 pt-8 w-full">
      {attachedFiles.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-3">
          {attachedFiles.map((file, index) => {
            const FileIcon = getFileIcon(file.file);
            return (
              <div key={index}>
                <button
                  onClick={() => removeFile(index)}
                  className="hover:text-gray-800 transition-colors p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="flex items-center gap-3 border text-sm shadow-sm border-gray-600 rounded-xl bg-gray-700">
                  {file.file.type === 'application/pdf' ||
                  file.file.type === 'application/docx' ? (
                    <div className="flex items-center bg-gray-700 gap-3 border border-gray-600 px-4 py-3 rounded-xl text-sm shadow-sm">
                      <FileIcon className="w-4 h-4 text-gray-300 shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="truncate max-w-40 text-white font-medium">
                          {file.file.name}
                        </span>
                        <span className="text-xs text-gray-300">
                          {(file.file.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={URL.createObjectURL(file.file)}
                      alt="img"
                      className="max-w-24 border border-gray-600 rounded-xl"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div
        className="relative border border-gray-100 rounded-2xl shadow-lg"
        onClick={(e) => setInputWidth(e.currentTarget.clientWidth)}
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-3 py-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleFileAttach}
            className="w-9 h-9 p-0 hover:bg-gray-900 rounded-lg transition-all duration-200 shrink-0"
          >
            <Paperclip className="w-4 h-4 text-white " />
          </Button>

          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent border-0 outline-none text-white placeholder:text-gray-400 resize-none min-h-[28px] max-h-[200px] overflow-y-auto text-sm sm:text-base"
            rows={1}
          />

          <Button
            onClick={handleSendMessage}
            disabled={
              (!message.trim() && attachedFiles.length === 0) || status !== 'ready'
            }
            className="w-9 h-9 p-0 bg-white hover:bg-gray-300 disabled:bg-gray-600 text-black rounded-lg transition-all duration-200 shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="text-center mt-3">
        <p className="text-xs text-gray-400">
          legal-assistant-ui can make mistakes. Check important info.
        </p>
      </div>
    </div>
  </div>
</div>

  )
}




