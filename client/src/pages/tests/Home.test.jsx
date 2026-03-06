// import testing tools from react testing library
import { render, screen } from "@testing-library/react";
// import userEvent for simulating user interactions
import userEvent from "@testing-library/user-event";
// import the component to test
import Home from "../Home";

// mock the ParticleSphere component since it uses three.js which can cause issues in tests
jest.mock("../../components/ParticleSphere", () => () => (
  <div data-testid="particle-sphere">Mock Sphere</div>
));

// create mock function to replace the real nav behavior of useNavigate from react-router-dom
const mockNavigate = jest.fn();

// mock react router so that useNavigate uses mock function instead of real navigation
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// group of tests for the Home page component
describe("Home page", () => {
  // clear the mock nav function before each test to reset its call history
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  // test that the hero title is rendered on the homepage
  test("renders the homepage hero title", () => {
    render(<Home />);

    expect(
      screen.getByText(/your personalized quiz journey starts here/i),
    ).toBeInTheDocument();
  });

  // test that the Get Started button is visible on the homepage and can be clicked to navigate to the auth page
  test("clicking Get Started navigates to /auth", async () => {
    const user = userEvent.setup();

    render(<Home />);

    await user.click(screen.getByRole("button", { name: /get started/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/auth");
  });
});
