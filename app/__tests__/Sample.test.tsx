import React from 'react';
import FlyAwayInput from '@/components/FlyAwayInput';
import { render, screen } from '@testing-library/react-native';


test('it renders simple test for the FlyAwayInput component', () => {
  render(<FlyAwayInput value="" onChangeText={() => {}} />);
  
  // Instead of looking for empty text, test for the component's presence
  // You might want to add a testID to your FlyAwayInput component for easier testing
  const input = screen.getByPlaceholderText(''); // Replace '' with your actual placeholder if available
  expect(input).toBeTruthy();
});

// Alternative test if your component has a placeholder
// test('it renders FlyAwayInput with placeholder', () => {
//   const placeholder = 'Enter text here';
//   render(
//     <FlyAwayInput 
//       value="" 
//       onChangeText={() => {}} 
//       placeholder={placeholder}
//     />
//   );
  
//   const input = screen.getByPlaceholderText(placeholder);
//   expect(input).toBeTruthy();
// });

// Test for handling text input
// test('it calls onChangeText when text changes', () => {
//   const mockOnChangeText = jest.fn();
  
//   render(
//     <FlyAwayInput 
//       value="" 
//       onChangeText={mockOnChangeText}
//       placeholder="Test input"
//     />
//   );
  
//   const input = screen.getByPlaceholderText('Test input');
  
//   // Simulate text input
//   // Note: The exact method depends on how your FlyAwayInput handles events
//   // You might need to use fireEvent.changeText or similar
// });