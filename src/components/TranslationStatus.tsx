"use client";

import { Suspense, useDeferredValue } from 'react';
import { useState } from 'react';
import useSWR from 'swr'

export default function TranslationStatus() {
  const [branch, setBranch] = useState('master');
  const deferredBranch = useDeferredValue(branch);

  return (
    <>
      <label>
        Branch
        <input
          type="text"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />
      </label>
      <Suspense fallback={<div>loading...</div>}>
        <TranslationStatusImpl branch={deferredBranch} />
      </Suspense>
    </>
  );
}

type TranslationStatusImplProps = {
  branch: string;
}

function TranslationStatusImpl(props: TranslationStatusImplProps) {
  const { data, error } = useSWR(
    `https://api.github.com/repos/martpie/museeks/contents/src/translations?ref=${props.branch}`,
    translationsFetcher,
    {
      suspense: true,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      // fallbackData: []
    }
  );

  if (error) {
    return <p>⚠️ Failed to load translation status: {error.message}</p>;
  }

  return (
    <>
      {data.length === 0 ? (
        <p>No translation files found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Language</th>
              <th>Missing</th>
              <th>Translated</th>
              <th>Total</th>
              <th>Completion</th>
            </tr>
          </thead>
          <tbody>
            {data.map((stat) => (
              <tr key={stat.language}>
                <td>{stat.language}</td>
                <td>{stat.missing}</td>
                <td>{stat.translated}</td>
                <td>{stat.total}</td>
                <td>
                  {stat.completionPercentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

/**
 * GitHub API helpers
 */


interface TranslationStats {
  language: string;
  missing: number;
  translated: number;
  total: number;
  completionPercentage: number;
}

async function translationsFetcher(url: string): Promise<Array<TranslationStats>> {
  const response = await fetch(url);

  try {
    if (!response.ok) {
      throw new Error(`Failed to fetch translations: ${response.statusText}`);
    }

    const files = await response.json();

    const translationFiles = files.filter((file: any) =>
      file.name.endsWith('.po') // Exclude English as it's the base language
    );

    // Process each .po file
    const stats = await Promise.all(translationFiles.map(async (file: any) => {
      const contentResponse = await fetch(file.download_url);
      const content = await contentResponse.text();

      // Count msgid and non-empty msgstr to determine translation status
      const msgidMatches = content.match(/msgid "[^"].*"/g) || [];
      const msgstrMatches = content.match(/msgstr "[^"].*"/g) || [];
      const nonEmptyMsgstr = msgstrMatches.filter(str => str !== 'msgstr ""').length;

      // Get language code from filename (e.g., "fr.po" -> "fr")
      const langCode = file.name.replace('.po', '');
      // Convert language code to corresponding emoji flag
      const language = langCode;

      // Calculate percentage
      const total = msgidMatches.length;
      const translated = nonEmptyMsgstr;
      const completionPercentage = total > 0 ? Math.round((translated / total) * 100) : 0;

      return {
        language,
        missing: total - translated,
        translated,
        total,
        completionPercentage,
      };
    }));

    // Sort by completion percentage descending
    return stats.sort((a, b) => b.completionPercentage - a.completionPercentage);
  } catch (error) {
    console.error('Error fetching translation data:', error);
    return [];
  }
}
