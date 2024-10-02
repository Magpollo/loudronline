# Audio Mystery Game MVP Roadmap

## Overview

The Audio Mystery Game MVP is a time-based, single-level audio guessing game integrated into the Loudronline website. Players listen to audio clips and guess the sound, song, or artist within a set time limit. They can share their scores on social media.

## Features

1. Single Game Level

   - Multiple audio clips within one level
   - Time-based gameplay (e.g., 60 seconds total)

2. Audio Playback

   - Play/Pause functionality
   - Ability to replay audio (with time penalty)

3. User Input

   - Text input for user guesses
   - Submit button for answers

4. Scoring

   - Immediate feedback on correct/incorrect answers
   - Running score display
   - Time remaining display

5. Game Flow

   - Start game
   - Progress through audio clips within time limit
   - End game when time runs out or all clips are guessed

6. Social Sharing

   - Share score on Twitter after game completion

7. Integration with Loudronline
   - Accessible from main navigation
   - Consistent styling with the main site

## Architecture

1. File Structure

   ```
   src/
     app/
       games/
         audio-mystery/
           page.tsx
           components/
             AudioPlayer.tsx
             AnswerInput.tsx
             ScoreDisplay.tsx
             Timer.tsx
             ShareScore.tsx
           utils/
             gameLogic.ts
             socialShare.ts
   ```

2. Data Management

   - Hardcoded game data in a separate file (e.g., `gameData.ts`)
   - No backend integration for MVP

3. State Management

   - Use React's useState for local state management
   - Consider useReducer for more complex state logic if needed

4. Component Breakdown

   - `page.tsx`: Main game component and logic
   - `AudioPlayer.tsx`: Handles audio playback
   - `AnswerInput.tsx`: Manages user input and submission
   - `ScoreDisplay.tsx`: Shows current score
   - `Timer.tsx`: Displays and manages game timer
   - `ShareScore.tsx`: Handles social sharing functionality

5. Styling
   - Utilize existing Tailwind CSS setup
   - Ensure responsive design for mobile and desktop

## Game Logic

1. Game Initialization

   - Load audio clips and correct answers
   - Set initial score to 0
   - Start timer (e.g., 60 seconds)
   - Start with the first audio clip

2. Gameplay Loop

   - Play audio clip
   - Accept user input
   - Check answer against correct answer
   - Update score
   - Move to next audio clip or end game
   - Continuously update timer

3. Scoring System

   - +1 point for correct answer
   - No points for incorrect answer
   - Display running total out of total possible points

4. Timer Logic

   - Countdown from initial time (e.g., 60 seconds)
   - End game when timer reaches 0
   - Optional: Time penalty for replaying audio

5. Game Completion
   - Display final score and time taken
   - Option to share score on Twitter
   - Option to replay the game

## Social Sharing Integration

1. Twitter API Integration

   - Use Twitter's Web Intent for sharing (no API key required)
   - Construct share URL with game score and custom message

2. Share Button
   - Implement ShareScore component
   - Display after game completion

## Integration Steps

1. Create new route in Next.js for the game
2. Add link to the game in the main navigation
3. Ensure game component inherits global styles and layout
4. Implement social sharing functionality

## Testing Strategy

1. Unit Tests

   - Test individual components (AudioPlayer, AnswerInput, ScoreDisplay, Timer, ShareScore)
   - Test game logic functions

2. Integration Tests

   - Test full game flow from start to finish
   - Verify timer functionality
   - Check social sharing feature

3. Accessibility Testing
   - Ensure game is keyboard navigable
   - Test with screen readers

## Future Enhancements (Post-MVP)

1. Multiple levels with increasing difficulty
2. User authentication and persistent scores
3. Leaderboards
4. Backend integration for dynamic content
5. More social media platforms for sharing

## Conclusion

This MVP version of the Audio Mystery Game delivers a time-based, engaging single-level experience with social sharing capabilities. It provides immediate value to Loudronline users while laying the groundwork for future enhancements.
