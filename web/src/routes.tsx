import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import UpdateOrphanage from './pages/UpdateOrphanage';
import DeleteOrphanage from './pages/DeleteOrphanage';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Landing} exact/>
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanages/create" exact component={CreateOrphanage} />
        <Route path="/orphanages/update/:id" component={UpdateOrphanage} />
        <Route path="/orphanages/delete/:id" component={DeleteOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;