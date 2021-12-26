import styles from './Link.module.css';

type Props = {
  href: string;
  children: string;
  openInNewTab?: boolean;
};

const Link: React.FC<Props> = (props) => {
  const { children, openInNewTab, ...rest } = props;

  const openInNewTabProps = openInNewTab
    ? {
        target: '_blank',
        rel: 'noreferrer',
      }
    : {};

  return (
    <a className={styles.link} {...rest} {...openInNewTabProps}>
      {children}
    </a>
  );
};

export default Link;
