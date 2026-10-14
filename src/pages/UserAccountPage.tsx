import React from 'react';
import { useBooking } from '../context/BookingContext';
import { UserDashboard } from '../components/user/UserDashboard';
import { LoginForm } from '../components/auth/LoginForm';

export const UserAccountPage: React.FC = () => {
  const { user } = useBooking();

  if (!user) {
    return <LoginForm />;
  }

  return <UserDashboard />;
};
