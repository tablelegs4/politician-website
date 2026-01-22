/**
 * note.com の記事を取得するユーティリティ
 *
 * RSSフィードから記事一覧を取得し、ビルド時に最新記事を表示
 * 記事はビルドのたびに自動更新される
 */

export interface NoteArticle {
  title: string;
  link: string;
  pubDate: Date;
  description: string;
  thumbnail?: string;
}

/**
 * noteのRSSフィードから記事一覧を取得
 * @param username noteのユーザー名（URLの末尾部分）
 * @param limit 取得する記事数
 */
export async function getNoteArticles(username: string, limit: number = 5): Promise<NoteArticle[]> {
  const rssUrl = `https://note.com/${username}/rss`;

  try {
    const response = await fetch(rssUrl);

    if (!response.ok) {
      console.warn(`note RSS fetch failed: ${response.status}`);
      return [];
    }

    const xmlText = await response.text();
    const articles = parseRss(xmlText);

    return articles.slice(0, limit);
  } catch (error) {
    console.warn('note RSS fetch error:', error);
    return [];
  }
}

/**
 * RSSのXMLをパースして記事一覧を抽出
 */
function parseRss(xmlText: string): NoteArticle[] {
  const articles: NoteArticle[] = [];

  // <item>タグを抽出
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemContent = match[1];

    const title = extractTag(itemContent, 'title');
    const link = extractTag(itemContent, 'link');
    const pubDateStr = extractTag(itemContent, 'pubDate');
    const description = extractTag(itemContent, 'description');

    // サムネイル画像を取得（media:thumbnail または enclosure から）
    const thumbnail = extractMediaThumbnail(itemContent);

    if (title && link) {
      articles.push({
        title: decodeHtmlEntities(title),
        link,
        pubDate: pubDateStr ? new Date(pubDateStr) : new Date(),
        description: decodeHtmlEntities(stripHtml(description || '')),
        thumbnail,
      });
    }
  }

  return articles;
}

/**
 * XMLタグの内容を抽出
 */
function extractTag(content: string, tagName: string): string | undefined {
  // CDATAセクションを考慮
  const cdataRegex = new RegExp(`<${tagName}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tagName}>`, 'i');
  const cdataMatch = content.match(cdataRegex);
  if (cdataMatch) {
    return cdataMatch[1].trim();
  }

  // 通常のタグ
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : undefined;
}

/**
 * メディアサムネイルを抽出
 */
function extractMediaThumbnail(content: string): string | undefined {
  // media:thumbnail
  const mediaThumbnailMatch = content.match(/<media:thumbnail[^>]*url="([^"]+)"/i);
  if (mediaThumbnailMatch) {
    return mediaThumbnailMatch[1];
  }

  // enclosure (type="image/...")
  const enclosureMatch = content.match(/<enclosure[^>]*url="([^"]+)"[^>]*type="image/i);
  if (enclosureMatch) {
    return enclosureMatch[1];
  }

  // descriptionの中の最初の画像
  const description = extractTag(content, 'description');
  if (description) {
    const imgMatch = description.match(/<img[^>]+src="([^"]+)"/i);
    if (imgMatch) {
      return imgMatch[1];
    }
  }

  return undefined;
}

/**
 * HTMLタグを除去
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}

/**
 * HTMLエンティティをデコード
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}
