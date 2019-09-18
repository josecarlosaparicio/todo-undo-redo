import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from '../../ngrx/app.state';
import {select, Store} from '@ngrx/store';
import {ChangeThemeAction, DecFontAction, IncFontAction} from '../../ngrx/settings/settings.actions';
import {RedoAction, UndoAction} from '../../undo-redo/undo-redo.actions';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {getRedoAction, getUndoAction} from '../../undo-redo/undo-redo.selectors';
import { getListica } from '../../ngrx/settings/settings.selectors';

@Component({
  selector: 'app-settings-pane',
  templateUrl: './settings-pane.component.html',
  styleUrls: ['./settings-pane.component.scss']
})
export class SettingsPaneComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  private undoItem;
  private redoItem;
  private listica;
  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(getUndoAction), takeUntil(this.unsubscribe$)).subscribe(undoItem => {
      this.undoItem = undoItem;
    });
    this.store.pipe(select(getRedoAction), takeUntil(this.unsubscribe$)).subscribe(redoItem => {
      this.redoItem = redoItem;
    });
    this.store.pipe(select(getListica), takeUntil(this.unsubscribe$)).subscribe(listica => {
        this.listica = listica;
      });
  }

  switchTheme() {
    this.store.dispatch(new ChangeThemeAction());
  }

  incFont() {
    this.store.dispatch(new IncFontAction());
  }

  decFont() {
    this.store.dispatch(new DecFontAction());
  }

  undo() {
    this.store.dispatch(new UndoAction());
  }

  redo() {
    this.store.dispatch(new RedoAction());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
