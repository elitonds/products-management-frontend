import { StyledCard } from "./card.style";

interface Props {
  children: any;
  title: string;
  className?: string;
}

const Card: React.FC<Props> = (props) => {
  const { children } = props;
  return <StyledCard {...props}>{children}</StyledCard>;
};

export default Card;
