import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe("<App />", () => {
  it('renders Hello World', () => {
    render(<App />);

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
})
