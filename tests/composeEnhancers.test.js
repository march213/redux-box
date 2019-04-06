import composeEnhancers from '../src/composeEnhancers';
import { compose } from 'redux';

describe('composeEnhancers', () => {
  it('should return default composer', () => {
    const composer = composeEnhancers({ enableDevTools: () => false });
    expect(composer).toBe(compose);
  });

  it('should throw warning', () => {
    const composer = composeEnhancers({ enableDevTools: {} });
    expect(composer).toBe(compose);
  });

  it('should return compose function', () => {
    const composer = composeEnhancers({ composeRedux: () => null });
    expect(composer).toBe(compose);
  });

  it('should return compose function', () => {
    function mockCompose(composer) {
      return 1;
    }
    const composer = composeEnhancers({ composeRedux: () => mockCompose });
    expect(composer).toBe(mockCompose);
  });

  it('should return devTools composer', () => {
    // mock env
    global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = function mockCompose() {
      return 1;
    };
    global.process = {
      env: {
        NODE_ENV: 'development',
      },
    };

    const composer = composeEnhancers();
    expect(composer).toBe(global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__);
  });

  it('should return devTools composer', () => {
    // mock env
    global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = function mockCompose() {
      return 1;
    };

    const composer = composeEnhancers({ enableDevTools: () => true });
    expect(composer).toBe(global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__);
  });
});
