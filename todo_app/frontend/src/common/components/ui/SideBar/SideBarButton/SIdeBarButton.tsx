import { Button } from "@chakra-ui/react";

type SideBarButtonProps = {
  buttonTitle: string;
  leftIcon: JSX.Element;
};

export function SideBarButton({ ...props }: SideBarButtonProps) {
  return (
    <Button
      leftIcon={props.leftIcon}
      variant={"ghost"}
      w={"100%"}
      size={"lg"}
      bg={"white"}
      color={"secondary"}
    >
      {props.buttonTitle}
    </Button>
  );
}
