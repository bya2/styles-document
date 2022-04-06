import IconBox from "@components/reusable/unit1/IconBox";
import ContentBox from "@components/reusable/unit1/ContentBox";

interface Props {
  styles: { [className: string]: string };
  prop__icon?: string;
  prop__content?: string;
  prop__is_tooltip?: boolean;
}

export default function IconItem({ styles, prop__icon, prop__content, prop__is_tooltip }: Props): JSX.Element {
  return (
    <li className={styles.item}>
      <IconBox className={styles.box__icon} prop__icon={prop__icon}/>
      <ContentBox className={styles.box__content} prop__content={prop__content} prop__is_tooltip={prop__is_tooltip}/>
    </li>
  )
}