import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import WelcomeScreen from "./welcome/welcome.screen";
import NotFoundScreen from "./404/not-found.screen";
import CreateScreen from "./owner/create/create.screen";
import SettingsScreen from "./owner/settings/settings.screen";
import ParticipantsScreen from "./owner/participants/participants.screen";
import QuestionsScreen from "./owner/questions/questions.screen";
import ResultsScreen from "./owner/results/results.screen";
import FinishScreen from "./owner/finish/finish.screen";
import ParticipateScreen from "./participant/participate/participate.screen";
import ParticipateQuestionsScreen from "./participant/questions/questions.screen";
import ParticipateFinishScreen from "./participant/finish/finish.screen";
import { Header } from "../components/style/header.component";

import { RootState } from "../store/configure.store";
import { useSelector } from "react-redux";

const PagesNavigation = () => {
  const ui = useSelector((state: RootState) => state.ui);

  return (
    <Router>
      <Header title={ui.title} />
      <Switch>
        <Route exact path="/" component={WelcomeScreen} />
        <Route exact path="/create" component={CreateScreen} />
        <Route exact path="/:testOwnerUuid/editor" component={SettingsScreen} />
        <Route
          exact
          path="/:testOwnerUuid/participants"
          component={ParticipantsScreen}
        />
        <Route
          exact
          path="/:testOwnerUuid/questions"
          component={QuestionsScreen}
        />
        <Route exact path="/:testOwnerUuid/finish" component={FinishScreen} />
        <Route exact path="/:testOwnerUuid/results" component={ResultsScreen} />

        <Route
          exact
          path="/:testParticipateUuid/"
          component={ParticipateScreen}
        />
        <Route
          exact
          path="/:testParticipateUuid/questions"
          component={ParticipateQuestionsScreen}
        />
        <Route
          exact
          path="/:testParticipateUuid/finish"
          component={ParticipateFinishScreen}
        />
        <Route exact path="/404" component={NotFoundScreen} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

export default PagesNavigation;
