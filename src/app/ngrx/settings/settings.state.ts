import {EntityState} from '@ngrx/entity';
import {Todo} from '../../models/todo';

export interface SettingsState {

  fontSize: number;
  currentTheme: string;
  listica: Objetico[];
}

export interface Objetico {
    tema: string;
    fontSize: number;
}
