import { render, screen, fireEvent } from "@testing-library/react"; // Importing React Lib.
import Home from "./Home";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Home component", () => {
  // Main text renders?
  it("renders hero title and subtitle", () => {
    render(<Home />);

    expect(
      screen.getByText("Your personalized quiz journey starts here."),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Generate personalized quizzes by topic and difficulty/i,
      ),
    ).toBeInTheDocument();
  });

  // Get Started BTN visible?
  it("renders Get Started button", () => {
    render(<Home />);
    expect(
      screen.getByRole("button", { name: /get started/i }),
    ).toBeInTheDocument();
  });

  // Button brings to Login?
  it("navigates to /auth when button is clicked", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(<Home />);

    fireEvent.click(screen.getByRole("button", { name: /get started/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/auth");
  });
});
