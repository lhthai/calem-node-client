import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import NotFoundPage from "pages/not-found";
import UnauthorizePage from "pages/unauthorize";
import InvoicePage from "pages/invoice/InvoicePage";
import { ProtectedRoute } from "components/layout/ProtectedRoute";
import MainLayout from "components/layout/MainLayout";
import { theme as baseTheme } from "./theme";
import { routes } from "routes";
import useNotification from "hooks/useNotification";
import { registerChartJs } from "utils";

registerChartJs()
const App = () => {
  const { colorMode } = useSelector((state) => state.appState);
  const { Notification } = useNotification();

  const theme = createTheme({
    ...baseTheme,
    palette: {
      mode: colorMode,
      primary: {
        contrastText: "#FFFFFF",
        dark: "#a63206",
        main: "#d94c16",
        light: "#a63206",
      },
      // success: {
      //   contrastText: "#FFFFFF",
      //   dark: colors.green[900],
      //   main: colors.green[600],
      //   light: colors.green[900],
      // },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/* <AuthProvider> */}
        <CssBaseline />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>{routes}</Route>
          </Route>
          {/* <Route path="/signin" element={<SignInPage />} /> */}
          <Route path="/unauthorize" element={<UnauthorizePage />} />
          <Route path="/hoa-don" element={<InvoicePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {/* </AuthProvider> */}
      </BrowserRouter>
      <Notification />
    </ThemeProvider>
  );
};

export default App;
