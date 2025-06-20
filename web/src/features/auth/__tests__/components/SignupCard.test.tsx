import SignupCard from '../../components/SignupCard';
import { render, screen } from '@testing-library/react';


describe('SignupCard', () => {
  it('renders the SignupCard with title and description', () => {
    render(
      <SignupCard>
        <div>Form content goes here</div>
      </SignupCard>
    );

    expect(screen.getByText('S\'inscrire')).toBeInTheDocument();
    expect(screen.getByText('Créez votre compte utilisateur')).toBeInTheDocument();
    expect(screen.getByText('Form content goes here')).toBeInTheDocument();
  });
});