import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

//I mocked the ParticleSphere component in my Jest tests because these tests are focused on verifying the Home page content and layout. The sphere is a child visual component, so mocking it keeps the unit test focused on the homepage itself

jest.mock('../components/ParticleSphere', () => () => <div>Mock ParticleSphere</div>);

describe('Home page', () => {
  const renderHome = () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  };

  test('renders the main homepage heading', () => {
    renderHome();
    expect(
        //verifying it shows "Your personalized quiz journey starts here." so it it rrendering the main heading correctly 
      screen.getByRole('heading', {
        name: /your personalized quiz journey starts here/i,
      })
    ).toBeInTheDocument();
  });

  test('renders the homepage subtitle text', () => {
    renderHome();
    expect(
        //checks that the supporting paragraph appear 
      screen.getByText(/generate personalized quizzes by topic and difficulty/i)
    ).toBeInTheDocument();
  });

  test('renders the get started button', () => {
    renderHome();
    expect(
        // making sure the get started button is on the page
      screen.getByRole('button', { name: /get started/i })
    ).toBeInTheDocument();
  });

  test('renders the ai caption text', () => {
    renderHome();
    expect(
        //making sure that the bottom caption is appearing
      screen.getByText(/quizzes powered by ai/i)
    ).toBeInTheDocument();
  });
});