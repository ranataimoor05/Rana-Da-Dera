import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, MessageSquare, PhoneCall, ShieldAlert, CreditCard, Bike } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { Link } from 'react-router-dom';

interface FaqItem {
  qEn: string;
  qUr: string;
  aEn: string;
  aUr: string;
  category: 'orders' | 'reservations' | 'policy' | 'delivery';
}

const faqs: FaqItem[] = [
  {
    category: 'orders',
    qEn: 'Can I edit or change my order items after placing an order?',
    qUr: 'کیا آرڈر جمع کروانے کے بعد پکوان یا مقدار تبدیل کی جا سکتی ہے؟',
    aEn: 'No. To ensure instant firing in our woks and thermal boxes, orders cannot be edited online once submitted. Please contact our Naseerabad kitchen helpline directly at 0301-4431520 for any urgent verbal coordination.',
    aUr: 'نہیں۔ آن لائن آرڈر جمع ہونے کے بعد تبدیل نہیں ہو سکتا۔ کسی بھی فوری رہنمائی کے لیے ہماری ہیلپ لائن 0301-4431520 پر رابطہ کریں۔'
  },
  {
    category: 'policy',
    qEn: 'What is your refund policy?',
    qUr: 'کیا رقم کی واپسی (ریفنڈ) کی سہولت موجود ہے؟',
    aEn: 'Rana Da Dera operates a strict NO-REFUND POLICY. Freshly cooked desi dishes cannot be returned, cancelled, or refunded once transmitted to the kitchen.',
    aUr: 'رانا دا ڈیرہ میں تمام کھانے اور بکنگز پر سخت نو ریفنڈ پالیسی لاگو ہے۔ کچن میں تیاری کے بعد رقم واپس نہیں کی جاتی۔'
  },
  {
    category: 'delivery',
    qEn: 'What areas in Rawalpindi do you deliver to?',
    qUr: 'راولپنڈی کے کن علاقوں میں ڈیلیوری کی جاتی ہے؟',
    aEn: 'We provide express hot thermal delivery to Naseerabad, Westridge I, II & III, Saddar Cantt, Peshawar Road, Tench Bhatta, Chaklala Scheme III, Bahria Town, and selective Islamabad sectors.',
    aUr: 'ہم نصیر آباد، ویسٹریج، صدر کینٹ، پشاور روڈ، ٹینچ بھاٹہ، چکلالہ، بحریہ ٹاؤن اور اسلام آباد تک گرم کھانا پہنچاتے ہیں۔'
  },
  {
    category: 'orders',
    qEn: 'What are the kitchen operating hours?',
    qUr: 'کچن کے اوقات کار کیا ہیں؟',
    aEn: 'Our kitchen operates daily from 2:00 AM to 3:00 PM. You can place pre-orders and scheduled deliveries at any time.',
    aUr: 'کچن روزانہ رات 2:00 بجے سے دوپہر 3:00 بجے تک کھلا رہتا ہے۔ پیشگی آرڈر کسی بھی وقت دیے جا سکتے ہیں۔'
  },
  {
    category: 'reservations',
    qEn: 'How far in advance should I book a table?',
    qUr: 'ٹیبل بکنگ کتنے دن پہلے کروانی چاہیے؟',
    aEn: 'For regular dining, reservations a few hours in advance are recommended. For weekend family gatherings (10+ people), please book at least 24 hours ahead.',
    aUr: 'فیملی کھانے کے لیے چند گھنٹے قبل اور بڑی پارٹی کے لیے 24 گھنٹے قبل بکنگ کروائیں۔'
  }
];

export const HelpPage: React.FC = () => {
  const { t, language } = useI18n();
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqs.filter(f => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return f.qEn.toLowerCase().includes(q) || f.aEn.toLowerCase().includes(q);
  });

  return (
    <div className="help-page" style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-subtitle gold-text">Customer Support</span>
          <h1 className="serif-title gold-gradient-text" style={{ fontSize: '2.6rem' }}>
            {t('navHelp')}
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '8px auto 0' }}>
            Answers to common questions regarding ordering, delivery zones, timings, and policies.
          </p>
        </div>

        {/* Search */}
        <div className="menu-search-box" style={{ maxWidth: '100%', marginBottom: '30px' }}>
          <Search size={18} className="menu-search-icon" />
          <input
            type="text"
            placeholder="Search FAQs regarding refunds, delivery, menu..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="menu-search-input"
          />
        </div>

        {/* FAQ Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="glass-card" style={{ padding: '20px', cursor: 'pointer' }} onClick={() => setOpenIndex(isOpen ? null : idx)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {language === 'ur' ? faq.qUr : faq.qEn}
                  </h3>
                  {isOpen ? <ChevronUp size={20} className="gold-text" /> : <ChevronDown size={20} />}
                </div>

                {isOpen && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                    {language === 'ur' ? faq.aUr : faq.aEn}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Channel Options */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
            <PhoneCall size={32} className="gold-text" style={{ margin: '0 auto 10px' }} />
            <h4 style={{ fontWeight: 700, marginBottom: '6px' }}>Phone Support</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>0301-4431520</p>
            <a href="tel:03014431520" className="btn-hero-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Call Helpline
            </a>
          </div>

          <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
            <MessageSquare size={32} color="#25D366" style={{ margin: '0 auto 10px' }} />
            <h4 style={{ fontWeight: 700, marginBottom: '6px' }}>WhatsApp Desk</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>Instant response 24/7</p>
            <a href="https://wa.me/923014431520" target="_blank" rel="noopener noreferrer" className="btn-hero-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Open Chat
            </a>
          </div>

          <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
            <HelpCircle size={32} color="#3b82f6" style={{ margin: '0 auto 10px' }} />
            <h4 style={{ fontWeight: 700, marginBottom: '6px' }}>Live Web Chat</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>Interactive assistant</p>
            <Link to="/support" className="btn-hero-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Launch Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
