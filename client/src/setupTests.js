// import custom jest matchers from jest-dom to allow for assertions on DOM nodes
import "@testing-library/jest-dom";
// import TextEncoder and TextDecoder from util to provide these APIs in the test environment since jsdom doesn't include them by default
import { TextEncoder, TextDecoder } from "util";

// assign textendcoder and textdecoder to global scope so they can be used in tests without needing to import them in each test file
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
