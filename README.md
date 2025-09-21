# Minesweeper Game

A classic Minesweeper implementation built with HTML, CSS, and JavaScript.

## How to Play

The objective is to reveal all cells on the board that don't contain mines while avoiding clicking on any mines.

### Basic Rules

1. **Left-click** on a cell to reveal it
2. **Right-click** on a cell to flag it as a potential mine
3. Numbers on revealed cells indicate how many mines are adjacent to that cell
4. Empty cells (no adjacent mines) will automatically reveal neighboring empty areas
5. You have **3 lives** - hitting a mine costs you one life
6. Game ends when you either:
   - Hit 3 mines (Game Over)
   - Reveal all non-mine cells (You Win!)

### Special Features

- **First Click Safety**: Your first click will never be a mine
- **Auto-Expand**: Clicking empty cells automatically reveals connected empty areas
- **Lives System**: Get 3 chances instead of instant game over
- **Visual Feedback**: Revealed and unrevealed cells have different appearances

## Getting Started

1. Open `index.html` in your web browser
2. Choose a difficulty level or start with Easy (4x4, 2 mines)
3. Click any cell to begin!

## Difficulty Levels

- **Easy**: 4x4 grid with 2 mines
- **Medium**: 8x8 grid with 14 mines
- **Hard**: 12x12 grid with 32 mines

## Controls

- **Left Click**: Reveal a cell
- **Right Click**: Flag/unflag a cell (prevents accidental clicks)
- **Restart Button**: Start a new game (😃 normal, 🤯 game over, 😎 victory)

## Game Mechanics

### Winning
Reveal all cells that don't contain mines. The game will automatically detect when you've won.

### Losing
Hit 3 mines total. When you lose, all mines on the board will be revealed.

### Cell Types
- **Empty Cell**: Shows as blank when revealed
- **Numbered Cell**: Shows count of adjacent mines (1-8)
- **Mine**: Shows 💣 when revealed or when game ends
- **Flagged Cell**: Shows 🚩 (right-click to toggle)

---

Created by Daniel