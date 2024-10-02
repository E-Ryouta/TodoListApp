import React, { useContext, useEffect } from "react";
import { withEmotionCache } from "@emotion/react";
import {
  Box,
  ChakraProvider,
  HStack,
  IconButton,
  useBoolean,
  VStack,
} from "@chakra-ui/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { ServerStyleContext, ClientStyleContext } from "./context";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { NavBar } from "@/components/NavBar";
import { SideBar } from "@/components/SideBar/SideBar";
import { theme } from "./theme";

export const meta: MetaFunction = () => {
  return [
    { charSet: "utf-8" },
    { title: "New Remix App" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
};

export const links: LinksFunction = () => {
  return [
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

export default function App() {
  const [isOpen, setIsOpen] = useBoolean();

  return (
    <Document>
      <ChakraProvider theme={theme}>
        <VStack bg={"primary"} h={"100vh"} spacing={0}>
          <Box w={"100%"}>
            <NavBar />
          </Box>
          <Box w={"100%"} h={"100%"}>
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
        </VStack>
      </ChakraProvider>
    </Document>
  );
}
