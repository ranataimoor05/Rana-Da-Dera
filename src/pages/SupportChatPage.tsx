import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Clock, ShieldAlert } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const SupportChatPage: React.FC = () => {
  const { t } = useI18n();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Assalam-o-Alaikum! Welcome to Rana Da Dera Customer Care. How may I assist you with your order, table booking, or menu inquiry today?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const query = inputText.toLowerCase();
    setInputText('');

    // Simulated responsive support logic
    setTimeout(() => {
      let reply = 'Thank you for reaching out. Our hosting reception in Naseerabad has logged your inquiry.';
      if (query.includes('refund') || query.includes('cancel')) {
        reply = 'Please note that Rana Da Dera has a strict No-Refund Policy once an order has been sent to our live kitchen.';
      } else if (query.includes('hour') || query.includes('time') || query.includes('open')) {
        reply = 'Our kitchen is open daily from 2:00 AM to 3:00 PM. Pre-orders are accepted 24/7.';
      } else if (query.includes('mutton') || query.includes('karahi')) {
        reply = 'Our Mutton Karahi is cooked fresh in pure desi ghee with fresh Potohar mutton in iron woks!';
      } else if (query.includes('delivery') || query.includes('area')) {
        reply = 'We deliver piping hot handis and karahis across Naseerabad, Westridge, Saddar Cantt, Peshawar Road, Tench, Chaklala, and Bahria Town.';
      }

      setMessages(prev => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 700);
  };

  return (
    <div className="support-chat-page" style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '720px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span className="section-subtitle gold-text">Live Assistance</span>
          <h1 className="serif-title gold-gradient-text" style={{ fontSize: '2.2rem' }}>
            Customer Support Desk
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Interactive support assistant for order tracking, inquiries, and dining assistance.
          </p>
        </div>

        <div
          className="glass-panel"
          style={{
            height: '520px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Chat Messages Log */}
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {messages.map(m => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%'
                }}
              >
                {m.sender === 'bot' && (
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-gold-400)', color: 'var(--color-primary-950)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Bot size={18} />
                  </div>
                )}

                <div
                  style={{
                    background: m.sender === 'user' ? 'linear-gradient(135deg, var(--color-primary-800), var(--color-primary-900))' : 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 16px',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                  }}
                >
                  <div>{m.text}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textAlign: 'right', marginTop: '4px' }}>
                    {m.time}
                  </div>
                </div>

                {m.sender === 'user' && (
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} style={{ padding: '14px 20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '10px', background: 'var(--bg-surface-elevated)' }}>
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Type your message or query here..."
              className="form-input"
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn-hero-primary" style={{ padding: '10px 18px' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
