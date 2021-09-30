import { NetworkBar, Overlay } from "@govtechsg/tradetrust-ui-components";
import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { Footer } from "./components/Layout/Footer";
import { NavigationBar } from "./components/Layout/NavigationBar";
import { PrivateRoute } from "./components/PrivateRoute";
import { NETWORK } from "./config";
import { routes } from "./routes";
import styled from "@emotion/styled";
import { PageNotFound } from "./pages/pageNotFound";
import { DemoCreatePage } from "./pages/demoCreate";
import { DemoPage } from "./pages/demo";
import { FeatureFlag } from "./components/FeatureFlag";

const Main = styled.main`
  background-image: url("/static/images/common/wave-lines.png");
  background-size: cover;
`;

const AppContainer = (): React.ReactElement => {
  const location = useLocation();
  const [toggleNavBar, setToggleNavBar] = useState(false);

  useEffect(() => {
    setToggleNavBar(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col min-h-full" data-location={location.pathname}>
      <NetworkBar network={NETWORK}>
        You are currently on <span className="capitalize">{NETWORK}</span> network.
      </NetworkBar>
      <NavigationBar toggleNavBar={toggleNavBar} setToggleNavBar={setToggleNavBar} />
      <Main className="bg-cerulean-50 flex-1">
        <Switch>
          {routes.map((route, id) => (
            <Route key={id} {...route} />
          ))}
          {/* temporary hide demo feature behind flag */}
          <FeatureFlag name="DEMO">
            {NETWORK === "ropsten" && (
              <>
                <PrivateRoute path="/demo/create" redirectPath="/demo" exact>
                  <DemoCreatePage />
                </PrivateRoute>
                <Route path="/demo" exact>
                  <DemoPage />
                </Route>
              </>
            )}
          </FeatureFlag>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Main>
      <Footer />
      <Overlay />
    </div>
  );
};

export default AppContainer;
