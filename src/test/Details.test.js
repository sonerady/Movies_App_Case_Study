import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../../../components/button/Button";
import { BrowserRouter, Routes } from "react-router-dom";
import Example from "../Example";

import { useTranslation } from "react-i18next";
import Detail from "../pages/detail/Detail";

jest.mock("react-i18next");

describe("OptionList", () => {
  beforeEach(() => {
    useTranslation.mockReturnValue({ t: (key) => key });
  });

  test("Back button works", () => {
    render(
      <BrowserRouter>
        <Detail />
      </BrowserRouter>
    );
    
  });
});
