import { Button } from "@chakra-ui/react";
import { Link } from "@remix-run/react";

type SideBarButtonProps = {
  buttonTitle: string;
  leftIcon: JSX.Element;
  navigateTo: string;
};

export function SideBarButton({
  buttonTitle,
  leftIcon,
  navigateTo,
}: SideBarButtonProps) {
  return (
    <Link to={navigateTo}>
      <Button
        leftIcon={leftIcon}
        variant={"ghost"}
        w={"200px"}
        size={"lg"}
        bg={"white"}
        color={"secondary"}
      >
        {buttonTitle}
      </Button>
    </Link>
  );
}
