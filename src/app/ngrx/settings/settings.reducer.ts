import {SettingsState} from './settings.state';
import {SettingsActions, SettingsActionTypes} from './settings.actions';
import {produce} from 'immer';
import { Action } from '@ngrx/store';

const initialState: SettingsState = {
  currentTheme: 'purple-theme',
  fontSize: 1,
  listica: [{
      tema: 'purple-theme',
      fontSize: 1
  }]
};
export const settingsReducer = (state: SettingsState = initialState, action: SettingsActions) => {
  switch (action.type) {
    case SettingsActionTypes.CHANGE_THEME:
      state.listica[0].tema = state.currentTheme === 'purple-theme' ? 'orange-theme' : 'purple-theme';
      return {...state, currentTheme: state.currentTheme === 'purple-theme' ? 'orange-theme' : 'purple-theme', listica: [...state.listica]};
    case SettingsActionTypes.INC_FONT:
      state.listica[0].fontSize = Math.min(state.fontSize + 0.1, 2);
      return {...state, fontSize: Math.min(state.fontSize + 0.1, 2), listica: [...state.listica]};
    case SettingsActionTypes.DEC_FONT:
      state.listica[0].fontSize = Math.max(state.fontSize - 0.1, 0.5);
      return {...state, fontSize: Math.max(state.fontSize - 0.1, 0.5), listica: [...state.listica]};
  }
  return state;
};

export const settingsReducerImmer = (state: SettingsState = initialState, action: SettingsActions) => {
    return produce((draft , settingAction) => {
        switch (settingAction.type) {
          case SettingsActionTypes.CHANGE_THEME:
            draft.listica[0].tema = draft.currentTheme === 'purple-theme' ? 'orange-theme' : 'purple-theme';
            draft.currentTheme = draft.currentTheme === 'purple-theme' ? 'orange-theme' : 'purple-theme';
            return;
          case SettingsActionTypes.INC_FONT:
            draft.listica[0].fontSize = Math.min(draft.fontSize + 0.1, 2);
            draft.fontSize = Math.min(draft.fontSize + 0.1, 2);
            return;
          case SettingsActionTypes.DEC_FONT:
            draft.listica[0].fontSize =  Math.max(draft.fontSize - 0.1, 0.5);
            draft.fontSize = Math.max(draft.fontSize - 0.1, 0.5);
            return;
        }
        return draft;
    }, initialState)(state, action);
};
