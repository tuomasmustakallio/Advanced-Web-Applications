import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button component={RouterLink} to="/" color={"inherit"}>
            {t("home")}
          </Button>
          <Button component={RouterLink} to="/about" color={"inherit"}>
            {t("about")}
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            id="en"
            onClick={() => changeLanguage("en")}
            color={"inherit"}
          >
            en
          </Button>
          <Button
            id="fi"
            onClick={() => changeLanguage("fi")}
            color={"inherit"}
          >
            fi
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
