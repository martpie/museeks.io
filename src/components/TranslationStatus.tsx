import { Suspense, useState } from 'react';
import useSWR from 'swr'
import { ErrorBoundary } from 'react-error-boundary';
import styles from './TranslationStatus.module.css';

export default function TranslationStatus() {
  const [branch, setBranch] = useState('master');

  return (
    <ErrorBoundary fallbackRender={({ error }) => {
      console.error('Error in TranslationStatus:', error);
      return (<p>x_x {error.message}</p>);
    }}>
      <BranchSelector branch={branch} setBranch={setBranch} />
      <Suspense fallback={<p>loading...</p>}>
        <TranslationStatusImpl branch={branch} />
      </Suspense>
    </ErrorBoundary>
  );
}

function BranchSelector(props: { branch: string, setBranch: (branch: string) => void }) {
  return (
    <div>
      <label className={styles.notVisible}>
        Branch
      </label>
      <select value={props.branch} onInput={(e) => props.setBranch(e.currentTarget.value)}>
        <option value="master">master</option>
        <option value="release">release</option>
      </select>
    </div>
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
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Language</th>
              <th className={styles.tableHeader}>Missing</th>
              <th className={styles.tableHeader}>Translated</th>
              <th className={styles.tableHeader}>Total</th>
              <th className={styles.tableHeader}>Completion</th>
            </tr>
          </thead>
          <tbody>
            {data.map((stat) => (
              <tr key={stat.language}>
                <td>
                  <a className={styles.link} href={`https://github.com/martpie/museeks/blob/master/src/translations/${stat.language}.po`}>
                    {stat.language}
                  </a>
                </td>
                <td>{stat.missing}</td>
                <td>{stat.translated}</td>
                <td>{stat.total}</td>
                <td className={stat.completionPercentage === 100 ? styles.ok : styles.notOk}>
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
}
