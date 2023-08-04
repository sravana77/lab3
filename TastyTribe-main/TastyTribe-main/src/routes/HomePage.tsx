import { useNavigate, Outlet } from "react-router-dom";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Heading,
} from "@chakra-ui/react";
import { FiCompass, FiMenu } from "react-icons/fi";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlineFoodBank } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";
import { IconType } from "react-icons";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

interface LinkItemProps {
  name: string;
  to: string;
  icon: IconType;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  to: string;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
  name: string | null;
  email: string | null;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Explore", to: "/home/explore", icon: FiCompass },
  { name: "Add Recipes", to: "/home/add_recipe", icon: BiFoodMenu },
  { name: "My Recipes", to: "/home/my_recipe", icon: MdOutlineFoodBank },
  { name: "Signout", to: "/", icon: PiSignOut },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Heading>
            Tasty<span className="highlighted">Tribe</span>
          </Heading>
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => {
        if (link.name === "Signout") {
          return (
            <NavItem key={link.name} to={link.to} icon={link.icon} onClick={handleSignout}>
              {link.name}
            </NavItem>
          );
        } else
          return (
            <NavItem key={link.name} to={link.to} icon={link.icon}>
              {link.name}
            </NavItem>
          );
      })}
    </Box>
  );
};

const NavItem = ({ icon, to, children, ...rest }: NavItemProps) => {
  return (
    <Box as="a" href={to} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "brand.200",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="20"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, name, email, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      ></Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
              <HStack>
                <VStack display="flex" alignItems="flex-end" spacing="1px" ml="2">
                  <Text fontSize="sm">{name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {email}
                  </Text>
                </VStack>
                <Avatar size={"md"} />
              </HStack>
            </MenuButton>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);
        setEmail(user.email);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} name={name} email={email} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  );
};

export default HomePage;
