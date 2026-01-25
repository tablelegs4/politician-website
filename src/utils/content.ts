/**
 * コンテンツ読み込みユーティリティ
 *
 * src/data/ 配下のJSONファイルを読み込むためのヘルパー関数
 * カスタマイズ時はこれらのJSONファイルを編集してください
 */

import siteConfigData from '../data/site.json';
import profileData from '../data/profile.json';
import faqData from '../data/faq.json';

// 型定義
export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  politician: {
    name: string;
    nameReading: string;
    title: string;
    position: string;
    office: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  messages?: Array<{
    question: string;
    answer: string;
  }>;
  greeting: {
    title: string;
    message: string;
  };
  cta: {
    primary: {
      label: string;
      url: string;
    };
    secondary: {
      label: string;
      url: string;
    };
  };
  trustElements: {
    mode: 'incumbent' | 'newcomer';
    incumbent: {
      proposals: number;
      questions: number;
      cases: number;
      lastUpdated: string;
    };
    newcomer: {
      expertise: string[];
      experience: string[];
      communityWork: string[];
    };
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    formUrl: string;
  };
  activityLinks?: {
    note?: string;
    youtube?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
  };
  ogp: {
    title: string;
    description: string;
    image: string;
  };
}

export interface Profile {
  name: string;
  nameReading: string;
  photo: string;
  position: string;
  affiliation: string;
  shortBio: string;
  fullBio: string;
  expertise: string[];
  nickname?: string;
  basicInfo?: {
    activityArea?: string;       // 活動地域
    birthYear?: string;          // 生年
    currentAddress?: string;     // 現住所
    birthplace?: string;         // 出身地
    education?: string;          // 最終学歴
    motto?: string;              // 座右の銘
    respectedPerson?: string;    // 尊敬する人物
    family?: string;             // 家族構成
    hobbies?: string;            // 趣味（任意）
    petName?: string;            // 愛犬の名前（任意）
    morningRoutine?: string;     // 朝の日課（任意）
  };
  personalInfo?: {
    items: Array<{
      title: string;
      content: string;
    }>;
  };
  history: Array<{
    year: string;
    event: string;
  }>;
  politicalBelief?: {
    title: string;
    detail: string;
  } | string;
  achievements?: string[];
  contact: {
    office: string;
    email: string;
    phone: string;
  };
}

export interface FaqItem {
  question: string;
  answer: string;
  order: number;
  featured: boolean;
}

export interface FaqData {
  items: FaqItem[];
}

/**
 * サイト設定を取得
 */
export function getSiteConfig(): SiteConfig {
  return siteConfigData as SiteConfig;
}

/**
 * プロフィール情報を取得
 */
export function getProfile(): Profile {
  return profileData as Profile;
}

/**
 * FAQ情報を取得
 */
export function getFaq(): FaqData {
  return faqData as FaqData;
}

/**
 * 注目FAQを取得（TOPページ用）
 */
export function getFeaturedFaq(limit: number = 3): FaqItem[] {
  const faq = getFaq();
  return faq.items
    .filter(item => item.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, limit);
}
