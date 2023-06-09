import { Container } from "@chakra-ui/react";
import { Header } from "./components";
import {
  HomePage,
  LoginPage,
  PostPage,
  ProfilePage,
  RegisterPage,
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useEffect } from "react";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {}, []);

  return (
    <Router>
      {userInfo && <Header />}
      <main>
        <Container paddingY={"5"} maxW="container.sm">
          <Routes>
            <Route exact path="/Login" element={<LoginPage />} />
            <Route exact path="/Register" element={<RegisterPage />} />

            <Route
              exact
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/Home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/Post/:id"
              element={
                <ProtectedRoute>
                  <PostPage />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/Profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
