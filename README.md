# MTownBET

MTownBET is a casino made for learning purposes.

## Installation

```bash
Make a pull request and download the project file.
```

## Usage

This is a manual on how to modify and maintain the gamemodes as well as expanding new gamemodes.

### Roulette:
```javascript
Draw(); //Draws the roulettebar when rolling.
CreateNuwBet(); //Creates the betting field for individual numbers.
Slide(); //Acceleration and retardation for the roulettebar and calculations for the result.
Roll(); //Sets the length of the spin.
LockBets(); //Checks for active bets and removes value from balance, returns true if bet is active.
ClearBets(); //Clears all bet fields and sets them back to 0.
Payouts(color, number); //Pays the user back if bet was invested on the winning color or number.
BetColor(color); //Adds value to the chosen color or odd/even.
BetNumber(number); //Adds value to the chosen number.
Refund(); //Returns all value back to the user balance.
```

### Crash:
```javascript
crasher(); //
graph(); //
bet(); //
restart(); //
clean(); //
```

### Slots:
```javascript
window.onload //
tick(); //
spin(); //
bet(); //
updateNumbers(); //
payTable(); //
win(wich); //
loose(); //
```

The following manuals show the utilities and tools that are being used.

### betfieldJS:
```javascript
ChangeBalance(value); //Used to pay or charge user, removes value from cookies.

//THE FOLLOWING ARE PURELY BEHIND-THE-SCENES FUNCTIONS:
main(); //Called when page is loaded, gets user balance from cookies.
add(amount); //Changes the current bet value by given amount (+10, +100, -10, -100).
multiply(factor); //Changes the current bet value by given factor (0.5, 2).
setMax(); //Sets the current bet value to current balance available.
clearBet(); //Sets the current bet value to 0.
getCurrentBet(); //Gets the current bet value when user writes amount using keyboard.
changeText(); //Sets the text input to the current bet value.
writee(); //Called when user writes to make sure the written value is not more than current balance.
UpdateMax(); //Shows the current balance including the temporarily lost value when betted but not rolled.
```

### utils:
```javascript
setCookie(name, value, days); //Saves a cookie by name with value and sets expiration date to days.
getCookie(name); //Returns the value found in cookie found by given name.
```


## You'll have a chance of winning the it everytime
