// import testing tools from react testing library
import { render, screen } from "@testing-library/react";
// import userEvent for simulating user interactions
import userEvent from "@testing-library/user-event";
// import the component to test
import Auth from "../Auth";

// create mock functions to replace the real nav and auth actions
const mockNavigate = jest.fn();
const mockLogin = jest.fn();
const mockSignup = jest.fn();

// mock react router so that useNavigate uses mock function instead of real navigation
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// mock the auth context so that useAuth returns our mock functions and a default unauthenticated state
jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
    signup: mockSignup,
    isAuthenticated: false,
  }),
}));

// group of tests for the Auth page component
describe("Auth page", () => {
  // clear mock functions before each test to reset their call history
  beforeEach(() => {
    mockNavigate.mockClear();
    mockLogin.mockClear();
    mockSignup.mockClear();
  });

  // test that the login form appears by default when the page loads
  test("renders login mode by default", () => {
    render(<Auth />);

    expect(
      screen.getByRole("heading", { name: /log in/i }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
  });

  // test switching from login mode to create account mode
  test("switches to create account mode and shows signup fields", async () => {
    const user = userEvent.setup();

    render(<Auth />);

    await user.click(screen.getByRole("button", { name: /create account/i }));

    // verify sign up fields are now visible
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });
});
