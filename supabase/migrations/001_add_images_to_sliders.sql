-- Migration: sliders tablosuna images sütunu ekle
-- Tarih: 2025-01-19
-- Açıklama: Birden fazla görsel desteği için images array sütunu eklendi

-- images sütununu ekle (text array)
ALTER TABLE sliders ADD COLUMN IF NOT EXISTS images TEXT[];

-- Mevcut image_url verilerini images array'ine taşı
UPDATE sliders
SET images = ARRAY[image_url]
WHERE images IS NULL AND image_url IS NOT NULL;

-- image_url artık zorunlu değil (images kullanılacak)
ALTER TABLE sliders ALTER COLUMN image_url DROP NOT NULL;

-- Yorum: Geriye uyumluluk için image_url korundu, yeni kayıtlarda images kullanılacak
