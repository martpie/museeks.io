import type { NextPage } from 'next';
import Head from 'next/head';
import ButtonGroup from '../components/ButtonGroup';
import ButtonLink from '../components/ButtonLink';
import Link from '../components/Link';

import styles from '../styles/Home.module.css';

const URL_PREFIX = 'https://github.com/martpie/museeks/releases/download/';
const VERSION = '0.13.0';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Museeks - A simple, clean and cross-platform music player</title>
        <meta
          name='description'
          content='Museeks is a simple, clean and cross-platform music player, focusing on simple features, well crafted.'
        />
        <meta name='author' content='Pierre de la Martinière' />

        <meta
          property='og:title'
          content='Museeks - A simple, clean and cross-platform music player'
        />
        <meta
          property='og:description'
          content='Museeks is a simple, clean and cross-platform music player, written with hipsters techs.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://museeks.io' />
        <meta
          property='og:image'
          content='https://museeks.io/images/screenshot.png'
        />

        <link rel='canonical' href='https://museeks.io' />
      </Head>

      <div className={styles.container}>
        {/* SCREENSHOT */}
        <div className={styles.screenshot} />

        {/* MAIN (left content) */}
        <main className={styles.main}>
          <div className={styles.downloads}>
            <h2 className={styles.downloadsTitle}>
              A simple, clean and cross-platform music player
            </h2>

            <p className={`${styles.downloadsMetas} ${styles.textMuted}`}>
              latest version: {VERSION} (
              <Link
                href='https://github.com/martpie/museeks/releases/tag/0.12.0'
                openInNewTab
              >
                changes
              </Link>
              ) |{' '}
              <Link
                href='https://github.com/martpie/museeks/releases'
                openInNewTab
              >
                other releases
              </Link>
            </p>

            <div className={styles.allDownloads}>
              {/* MAC */}
              <div className={styles.downloadsLinks}>
                <i className={`${styles.osIcon} fa fa-apple`} />
                <ButtonGroup>
                  <ButtonLink
                    href={`${URL_PREFIX}${VERSION}/museeks-x64.dmg`}
                    use='primary'
                    expand
                  >
                    macOS
                  </ButtonLink>
                  <ButtonLink
                      href={`${URL_PREFIX}${VERSION}/museeks-arm64.dmg`}
                      title='macOS M1'
                  >
                    m1
                  </ButtonLink>
                </ButtonGroup>
              </div>

              {/* WINDOWS */}
              <div className={styles.downloadsLinks}>
                <i className={`${styles.osIcon} fa fa-windows`} />
                <ButtonGroup>
                  <ButtonLink
                    href={`${URL_PREFIX}${VERSION}/museeks-x64-setup.exe`}
                    use='primary'
                    expand
                  >
                    Windows 64bits
                  </ButtonLink>
                  <ButtonLink
                    href={`${URL_PREFIX}${VERSION}/museeks-ia32-setup.exe`}
                    title='AppImage 32bits'
                  >
                    32bits
                  </ButtonLink>
                </ButtonGroup>
                <ButtonGroup>
                  <ButtonLink
                    href={`${URL_PREFIX}${VERSION}/museeks-x64-portable.exe`}
                    use='primary'
                    expand
                  >
                    Portable 64bits
                  </ButtonLink>
                  <ButtonLink
                    href={`${URL_PREFIX}${VERSION}/museeks-ia32-portable.exe`}
                    title='AppImage 32bits'
                  >
                    32bits
                  </ButtonLink>
                </ButtonGroup>
              </div>

              {/* LINUX */}
              <div className={styles.downloadsLinks}>
                <i className={`${styles.osIcon} fa fa-linux`} />
                <ButtonGroup>
                  <ButtonLink
                    href={`${URL_PREFIX}${VERSION}/museeks-x86_64.AppImage`}
                    use='primary'
                    expand
                  >
                    AppImage 64bits
                  </ButtonLink>
                  <ButtonLink
                    href={`${URL_PREFIX}${VERSION}/museeks-i386.AppImage`}
                    title='AppImage 32bits'
                  >
                    32bits
                  </ButtonLink>
                </ButtonGroup>

                <ButtonGroup>
                  <ButtonLink
                    href={`${URL_PREFIX}${VERSION}/museeks-amd64.deb`}
                    use='primary'
                    expand
                  >
                    .deb 64bits
                  </ButtonLink>
                  <ButtonLink
                    href={`${URL_PREFIX}${VERSION}/museeks-i386.deb`}
                    title='.deb 32bits'
                  >
                    32bits
                  </ButtonLink>
                </ButtonGroup>

                <ButtonGroup>
                  <ButtonLink
                    href={`${URL_PREFIX}${VERSION}/museeks-x86_64.rpm`}
                    use='primary'
                    expand
                  >
                    .rpm 64bits
                  </ButtonLink>
                  <ButtonLink
                    href={`${URL_PREFIX}${VERSION}/museeks-i686.rpm`}
                    title='.rpm 32bits'
                  >
                    32bits
                  </ButtonLink>
                </ButtonGroup>
              </div>
            </div>

            {/* FOOTER */}
            <footer className={styles.footer}>
              <div className={styles.links}>
                <a
                  href='https://twitter.com/museeks'
                  title='Keep updated !'
                  className={`${styles.linksIcon} fa fa-twitter`}
                />
                <a
                  href='https://github.com/martpie/museeks'
                  title='Bugs reports, features requests and sources'
                  className={`${styles.linksIcon} fa fa-github`}
                />
              </div>
              <div className={`${styles.madeBy} ${styles.textMuted}`}>
                made with <span className={styles.heart}>♥</span> by{' '}
                <Link href='https://martpie.io' openInNewTab>
                  @martpie
                </Link>{' '}
                and{' '}
                <Link
                  href='https://github.com/martpie/museeks/graphs/contributors'
                  openInNewTab
                >
                  awesome people
                </Link>
                .
              </div>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;

export const config = {
  unstable_runtimeJS: false,
};
