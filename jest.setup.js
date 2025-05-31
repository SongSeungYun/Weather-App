// jest.setup.js
import '@testing-library/jest-dom';

// fetch 전역 모킹
global.fetch = jest.fn();