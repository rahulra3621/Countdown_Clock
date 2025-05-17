# Countdown Clock

A beautiful and interactive countdown clock with both digital and analog displays. This web-based application provides a smooth, intuitive interface for setting and tracking countdown timers.

### Visual Elements
- **Digital Display**: Large, clear digital readout showing hours, minutes, and seconds
- **Analog Clock**: Smooth-moving analog clock face with hour, minute, and second hands
- **Responsive Design**: Adapts seamlessly to different screen sizes
- **Modern UI**: Clean, minimalist design with smooth animations

### Timer Controls
- **Time Input**:
  - Separate fields for hours (0-23), minutes (0-59), and seconds (0-59)
  - Increment/decrement buttons for easy adjustment
  - Input validation and automatic formatting
  - Leading zeros for consistent display

- **Control Buttons**:
  - Start: Begin the countdown
  - Stop: Pause the current countdown
  - Reset: Clear the timer and reset to 00:00:00

### Sound Effects
- Alarm sound when countdown reaches zero
- Alert sound effect after the countdown ends

### Visual Feedback
- Warning state with color change when timer expires
- Smooth transitions and animations
- Interactive hover effects
- Clear button states (enabled/disabled)

### Files
- `index.html`: Main structure and layout
- `styles.css`: Styling and animations
- `script.js`: Timer logic and interactions
- `alarm.mp3`: Alarm sound effect
- `alert.wav`: Alert sound effect

### Browser Support
- Works in modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Uses modern CSS features (CSS variables, flexbox)

## Usage

1. **Setting the Time**:
   - Use the input fields to enter hours, minutes, and seconds
   - Click the up/down arrows to adjust values
   - Values automatically wrap around (59→00, 23→00)

2. **Controls**:
   - Click "Start" to begin countdown
   - Click "Stop" to pause
   - Click "Reset" to clear timer

3. **During Countdown**:
   - Digital display shows remaining time
   - Analog clock hands move smoothly
   - At zero:
     - Alarm sounds
     - Display changes color
     - Tick sound begins at -1 second

## Installation

1. Clone or download the repository
2. Open `index.html` in a web browser
3. No additional installation or dependencies required

## Development

The project uses vanilla JavaScript and CSS, making it easy to modify and extend.
Key components:
- CSS variables for easy theme customization
- Modular JavaScript functions
- Responsive design using flexbox
- Custom audio handling