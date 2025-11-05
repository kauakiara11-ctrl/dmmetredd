if (!window.matchMedia) {
  window.matchMedia = function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
      addEventListener: function() {},
      removeEventListener: function() {},
      dispatchEvent: function() {},
    };
  };
}

if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function(str: string, newStr: string) {
    if (Object.prototype.toString.call(str) === '[object RegExp]') {
      return this.replace(str as any, newStr);
    }
    return this.split(str).join(newStr);
  };
}

if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function(predicate: Function) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }
      const O = Object(this);
      const len = parseFloat(O.length) || 0;
      if (len === 0) {
        return -1;
      }
      const thisArg = arguments[1];
      let k = 0;
      while (k < len) {
        const Pk = String(k);
        if (predicate.call(thisArg, O[Pk], k, O)) {
          return k;
        }
        k++;
      }
      return -1;
    },
  });
}

if (!window.crypto) {
  window.crypto = {
    getRandomValues: (arr: any) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    },
  } as any;
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
