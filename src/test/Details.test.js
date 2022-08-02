import { render, screen } from "@testing-library/react";
import Detail from "../pages/detail/Detail";

test("Back Button is working", () => {
  render(<Detail />);
  expect(screen.getByText("Back")).toBeInTheDocument();
});
