import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {appReducer} from './app.reducers';
import {undoredoMetaFactory} from '../undo-redo/undo-redo.meta';
import { storeFreeze } from 'ngrx-store-freeze';

import {UNDOABLE_OPERATIONS} from '../undo-redo/undoable-operations';
const PERSISTENT_KEYS = ['todos', 'settings.fontSize', 'settings.listica'];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(appReducer, {metaReducers: [undoredoMetaFactory(PERSISTENT_KEYS, UNDOABLE_OPERATIONS)]}),
    EffectsModule.forRoot([]),

    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ]
})
export class NgrxModule {
}
