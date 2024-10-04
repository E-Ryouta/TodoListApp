import React, { useContext, useEffect } from "react";
import { withEmotionCache } from "@emotion/react";
import {
  Box,
  Button,
  ChakraProvider,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBoolean,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import type {
  MetaFunction,
  LinksFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { ServerStyleContext, ClientStyleContext } from "./context";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { NavBar } from "@/components/NavBar";
import { SideBar } from "@/components/SideBar/SideBar";
import { theme } from "./theme";
import { alertCookie } from "./entry.server";

export const meta: MetaFunction = () => {
  return [
    { charSet: "utf-8" },
    { title: "My Daily Todo" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
};

export const links: LinksFunction = () => {
  return [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
    },
  ];
};

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    useEffect(() => {
      emotionCache.sheet.container = document.head;
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export const loader = async ({ request }:LoaderFunctionArgs) => {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    return redirect("/todo");
  }

  const alertCookieGet = request.headers.get("Cookie");
  const isAlertCookie = alertCookie
    ? await alertCookie.parse(alertCookieGet)
    : {};
  return isAlertCookie;
};

export const action = async () => {
  const cookieHeader = await alertCookie.serialize("is-alert-myTodo");
  return redirect("/todo", {
    headers: {
      "Set-Cookie": await alertCookie.serialize(cookieHeader),
    },
  });
};

export default function App() {
  const [isOpen, setIsOpen] = useBoolean();
  const feater = useFetcher();
  const isAlertCookie = useLoaderData<typeof loader>();
  const { isOpen: isAlertOpen, onClose: onAlertClose } = useDisclosure({
    defaultIsOpen: isAlertCookie ? false : true,
  });

  const handleConfirmClose = () => {
    feater.submit("", {
      method: "POST",
    });
    onAlertClose();
  };

  return (
    <Document>
      <ChakraProvider theme={theme}>
        <Box bg={"primary"} h={"100vh"}>
          <Box w={"100%"} h={"5%"}>
            <NavBar />
          </Box>
          <Box w={"100%"} h={"95%"}>
            <HStack h={"100%"} gap={0}>
              <Box h={"100%"} zIndex={2} position={"relative"}>
                {isOpen && <SideBar />}
                <IconButton
                  aria-label="SideBarToggle"
                  borderRadius={50}
                  size={"lg"}
                  bg={"white"}
                  position={"absolute"}
                  right={"-56px"}
                  top={"50%"}
                  icon={
                    isOpen ? <IoIosArrowDropleft /> : <IoIosArrowDropright />
                  }
                  onClick={() => setIsOpen.toggle()}
                />
              </Box>
              <Outlet />
            </HStack>
          </Box>
        </Box>
        {isAlertOpen && <AlertMessageModal handleClose={handleConfirmClose} />}
      </ChakraProvider>
    </Document>
  );
}

type AlertMessageModalProps = {
  handleClose: () => void;
};

const AlertMessageModal: React.FC<AlertMessageModalProps> = ({
  handleClose,
}) => {
  return (
    <>
      <Modal
        isOpen={true}
        onClose={() => {}}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent bg={"tertiary"}>
          <ModalHeader color={"secondary"} textAlign={"center"}>
            ご利用上の注意
          </ModalHeader>
          <ModalBody>
            <Text>
              このサイトは、デモ用に作成されたサイトです。
              <br />
              データは全ユーザーで共通のため、
              <Text as="span" color={"red"} fontWeight={"bold"}>
                他のユーザーが登録した情報を閲覧、編集、削除することができます。
              </Text>
              <br />
              したがって、セキュリティの観点から、
              <Text as="span" color={"red"} fontWeight={"bold"}>
                個人情報や機密情報の入力は避けてください。
              </Text>
              <br />
              また、
              <Text as="span" color={"red"} fontWeight={"bold"}>
                データは予告なく削除される場合があります。
              </Text>
              <br />
              ご理解の上、ご利用ください。
            </Text>
          </ModalBody>
          <ModalFooter className="w-auto" justifyContent={"center"}>
            <Button
              bg={"secondary"}
              color={"tertiary"}
              mr={3}
              onClick={handleClose}
            >
              確認しました
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
