import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquare, ThumbsUp, Send } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { initialReviews } from '../mocks/mockSettings';
import { Review } from '../types/promotions';

export const ReviewsPage: React.FC = () => {
  const { t, language } = useI18n();
  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);

  // Review Form
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [dishName, setDishName] = useState('Mutton Karahi');
  const [location, setLocation] = useState('Rawalpindi');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !comment) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      customerName: authorName,
      rating,
      date: new Date().toISOString().split('T')[0],
      commentEn: comment,
      commentUr: comment,
      dishName,
      location,
      isVerifiedPurchase: true,
      status: 'approved'
    };

    setReviewsList([newReview, ...reviewsList]);
    setAuthorName('');
    setComment('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="reviews-page" style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-subtitle gold-text">Patron Testimonials</span>
          <h1 className="serif-title gold-gradient-text" style={{ fontSize: '2.6rem' }}>
            {t('navReviews')}
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '8px auto 0' }}>
            Real reviews and impressions from our valued patrons across Rawalpindi, Islamabad, and Naseerabad.
          </p>
        </div>

        {/* Aggregate Score Card */}
        <div className="glass-panel" style={{ padding: '28px', textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', color: 'var(--color-gold-400)', marginBottom: '8px' }}>
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} size={26} fill="var(--color-gold-400)" />
            ))}
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 900 }}>4.9 / 5.0</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Based on verified authentic dining and delivery experiences in Naseerabad.
          </p>
        </div>

        {/* Submit Review Form */}
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '40px' }}>
          <h3 className="serif-title" style={{ fontSize: '1.3rem', marginBottom: '16px' }}>
            Share Your Dining Experience
          </h3>

          {submitted && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontSize: '0.85rem' }}>
              <CheckCircle2 size={18} />
              <span>Thank you! Your verified review has been published.</span>
            </div>
          )}

          <form onSubmit={handleSubmitReview}>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  placeholder="e.g. Sardar Hamza"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Rating</label>
                <select
                  value={rating}
                  onChange={e => setRating(Number(e.target.value))}
                  className="form-select"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5 Exceptional)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5 Very Good)</option>
                  <option value={3}>⭐⭐⭐ (3/5 Average)</option>
                </select>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Dish Ordered</label>
                <select
                  value={dishName}
                  onChange={e => setDishName(e.target.value)}
                  className="form-select"
                >
                  <option value="Mutton Karahi">Mutton Karahi Desi Ghee</option>
                  <option value="Chicken Handi">Chicken Handi (Boneless)</option>
                  <option value="Royal Mix BBQ Platter">Royal Mix BBQ Platter</option>
                  <option value="Special Beef Nihari">Dera Special Beef Nihari</option>
                  <option value="Bannu Mutton Pulao">Bannu Mutton Pulao</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Location / Area</label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="e.g. Westridge, Rawalpindi"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Your Review & Comments *</label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Describe the aroma, taste, tenderness, and service..."
                className="form-textarea"
              />
            </div>

            <button type="submit" className="btn-hero-primary" style={{ marginTop: '10px' }}>
              <Send size={16} />
              <span>Submit Review</span>
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {reviewsList.map(rev => (
            <div key={rev.id} className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{rev.customerName}</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    {rev.location} • {rev.date}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ display: 'flex', color: 'var(--color-gold-400)' }}>
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="var(--color-gold-400)" />
                    ))}
                  </div>
                  {rev.isVerifiedPurchase && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#4ade80', background: 'rgba(34, 197, 94, 0.1)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                      <CheckCircle2 size={12} />
                      <span>Verified Dine</span>
                    </span>
                  )}
                </div>
              </div>

              {rev.dishName && (
                <div style={{ fontSize: '0.82rem', color: 'var(--color-gold-400)', fontWeight: 600, marginBottom: '8px' }}>
                  Dish: {rev.dishName}
                </div>
              )}

              <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                "{language === 'ur' ? rev.commentUr : rev.commentEn}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
