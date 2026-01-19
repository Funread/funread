import { axiosAuth } from './axiosInstances';
import { store } from '../redux/store';

describe('axiosAuth session expired handling', () => {
  beforeEach(() => {
    // mock dispatch
    store.dispatch = jest.fn();
    // mock location
    delete window.location;
    window.location = { replace: jest.fn(), pathname: '/app', search: '' };
  });

  test('401 triggers single dispatch and redirect', async () => {
    const instance = axiosAuth();
    // find the response error handler (last registered)
    const handlers = instance.interceptors.response.handlers;
    const errorHandler = handlers[handlers.length - 1].rejected;

    const err = { response: { status: 401 } };

    // call handler twice to ensure single-shot behavior
    try { await errorHandler(err); } catch (e) {}
    try { await errorHandler(err); } catch (e) {}

    expect(store.dispatch).toHaveBeenCalled();
    expect(window.location.replace).toHaveBeenCalledTimes(1);
  });
});
