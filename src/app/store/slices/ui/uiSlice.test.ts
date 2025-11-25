import { makeStore } from '../../../tests/mocks/redux/store';
import {
  toggleDrawer,
  getIsDrawerOpen,
  getPages,
} from '../../../store/slices/ui/uiSlice';

describe('uiSlice', () => {
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    store = makeStore();
  });

  it('should have initial state', () => {
    const state = store.getState().ui;
    expect(state.isDrawerOpen).toBe(false);
    expect(state.pages).toHaveLength(1);
  });

  it('should toggle the drawer', () => {
    expect(store.getState().ui.isDrawerOpen).toBe(false);

    store.dispatch(toggleDrawer());
    expect(store.getState().ui.isDrawerOpen).toBe(true);

    store.dispatch(toggleDrawer());
    expect(store.getState().ui.isDrawerOpen).toBe(false);
  });

  it('selectors should return correct data', () => {
    const state = store.getState().ui;

    expect(getIsDrawerOpen({ ui: state })).toBe(false);
    expect(getPages({ ui: state })).toEqual(state.pages);

    store.dispatch(toggleDrawer());
    const newState = store.getState().ui;
    expect(getIsDrawerOpen({ ui: newState })).toBe(true);
  });
});
