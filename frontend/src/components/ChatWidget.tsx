'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import { MessageSquare, X, Send, Bot, User } from 'lucide-react'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 z-50 animate-bounce
          ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 hover:scale-110'}`}
        style={{
          background: 'var(--gradient-primary)',
          boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)',
        }}
        aria-label="Open chat"
      >
        <MessageSquare className="w-7 h-7 text-white" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-full max-w-[380px] h-[550px] max-h-[85vh] z-50 flex flex-col transition-all duration-500 origin-bottom-right
          ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}
      >
        <div className="glass-card flex-1 flex flex-col overflow-hidden p-0 border border-accent-purple/30 shadow-[0_16px_64px_rgba(0,0,0,0.5)] h-full">
          
          {/* Header */}
          <div 
            className="flex items-center justify-between p-4 border-b border-white/10"
            style={{ background: 'linear-gradient(90deg, rgba(124,58,237,0.1), rgba(255,140,66,0.05))' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-lg leading-tight tracking-tight">SCT Assistant</h3>
                <p className="text-xs text-[var(--accent-cyan)] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors text-[var(--text-muted)] hover:text-white"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm mb-4">
                <strong>Error:</strong> {error.message}
              </div>
            )}
            
            {messages.length === 0 && !error && (
              <div className="text-center text-[var(--text-secondary)] py-8 px-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-accent-purple/10 border border-accent-purple/20">
                  <MessageSquare className="w-8 h-8 text-accent-purple" />
                </div>
                <p className="font-medium text-white mb-2">Welcome to Samargalo Token!</p>
                <p className="text-sm">Ask me anything about the SCT token, total supply, or how to earn rewards.</p>
              </div>
            )}
            
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'rounded-tr-sm text-white'
                      : 'rounded-tl-sm bg-white/5 border border-white/10 text-[var(--text-secondary)]'
                  }`}
                  style={m.role === 'user' ? { background: 'var(--gradient-primary)' } : {}}
                >
                  {m.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-accent-purple font-heading">
                      <Bot className="w-3.5 h-3.5" />
                      SCT AI
                    </div>
                  )}
                  {m.role === 'user' && (
                    <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-white/80 font-heading justify-end">
                      You
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-4 max-w-[80%]">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent-purple animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-accent-orange animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-accent-cyan animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-black/20">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input || ''}
                onChange={handleInputChange}
                placeholder="Ask about SCT..."
                className="input-dark flex-1 text-sm py-3 px-4 shadow-inner"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input || !input.trim()}
                className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                style={{ background: 'var(--gradient-primary)' }}
                aria-label="Send message"
              >
                <Send className="w-5 h-5 text-white ml-0.5" />
              </button>
            </form>
            <p className="text-[10px] text-center text-[var(--text-muted)] mt-3">
              AI responses may be inaccurate.
            </p>
          </div>
          
        </div>
      </div>
    </>
  )
}
