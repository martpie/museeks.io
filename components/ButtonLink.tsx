import styles from './ButtonLink.module.css';

type Props = {
  href: string;
  children: string;
  title?: string;
  use?: 'secondary' | 'primary';
  expand?: boolean;
};

const ButtonLink: React.FC<Props> = (props) => {
  const { use = 'secondary', expand, children, ...rest } = props;

  return (
    <a
      className={`${styles.buttonLink} ${use === 'primary' && styles.primary} ${
        expand && styles.expand
      }`}
      {...rest}
    >
      {children}
    </a>
  );
};

export default ButtonLink;
