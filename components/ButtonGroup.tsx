import styles from './ButtonGroup.module.css';

type Props = {};

const ButtonGroup: React.FC<Props> = (props) => {
  return <div className={styles.buttonGroup}>{props.children}</div>;
};

export default ButtonGroup;
